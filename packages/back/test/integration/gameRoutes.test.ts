import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import gameRoutes from "../../../src/routes/gameRoutes";
import { resetGameState, updateGameState } from "../../../src/store/gameStore";
import { PhaseDict } from "../../../src/types/dicts";

// Mock socket functions with side effects only
vi.mock("../../src/sockets/socket", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    broadcastGame: vi.fn(),
    setSocketServer: vi.fn(),
  };
});

describe("gameRoutes - Integration Tests", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/", gameRoutes);
    resetGameState();
    vi.clearAllMocks();
  });

  describe("GET /", () => {
    it("should return Hello World", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toBe("Hello World!");
    });
  });

  describe("GET /data", () => {
    it("should return current game data", async () => {
      const response = await request(app).get("/data");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
      expect(response.body).toHaveProperty("tables");
    });
  });

  describe("POST /init", () => {
    it("should initialize game with end time", async () => {
      const endTime = Date.now() + 10000;

      const response = await request(app)
        .post("/init")
        .send({ end: endTime });

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.TABLES);
      expect(response.body.end).toBe(endTime);
    });
  });

  describe("POST /reset", () => {
    it("should reset game to initial state", async () => {
      // First modify the state
      updateGameState((data) => {
        data.phase = PhaseDict.EXPOSED;
      });

      const response = await request(app).post("/reset");

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.INIT);
    });
  });

  describe("POST /advance", () => {
    it("should advance game phase from KINGDOM_DEFEATED to EXPOSED", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.KINGDOM_DEFEATED;
      });

      const response = await request(app).post("/advance");

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.EXPOSED);
    });
  });

  describe("GET /heroes", () => {
    it("should return heroes data", async () => {
      const response = await request(app).get("/heroes");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /start-tables", () => {
    it("should start tables", async () => {
      const response = await request(app).post("/start-tables");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /end", () => {
    it("should end game", async () => {
      const response = await request(app).post("/end");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /init-table", () => {
    it("should initialize a table with players", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
      });

      const response = await request(app)
        .post("/init-table")
        .send({
          table: 0,
          players: [
            { name: "Player 1", hero: "Iron Man" },
            { name: "Player 2", hero: "Thor" }
          ],
          expert: false
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("tables");
      expect(response.body.tables[0]).toHaveProperty("players");
    });

    it("should initialize a table with expert mode", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
      });

      const response = await request(app)
        .post("/init-table")
        .send({
          table: 0,
          players: [
            { name: "Player 1", hero: "Iron Man" }
          ],
          expert: true
        });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].expert).toBe(true);
    });
  });

  describe("POST /reset-table", () => {
    it("should reset a specific table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
        data.tables[0] = {
          players: [{ name: "Player 1", hero: "Iron Man" }],
          expert: false,
          ironPatriotDamage: 3,
          exposed: 1,
          saved: true,
          minions: 0,
          darkAvengersThreat: 5,
          exposedThreat: 0
        };
      });

      const response = await request(app)
        .post("/reset-table")
        .send({ table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].saved).toBe(false);
    });
  });

  describe("POST /exposed", () => {
    it("should update exposed for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.EXPOSED;
        data.tables[0] = {
          players: [],
          expert: false,
          ironPatriotDamage: 0,
          exposed: 0,
          saved: false,
          minions: 0,
          darkAvengersThreat: 0,
          exposedThreat: 0
        };
      });

      const response = await request(app)
        .post("/exposed")
        .send({ value: 3, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].exposed).toBe(3);
    });
  });

  describe("Error handling", () => {
    it("should return 400 for invalid table number in /exposed", async () => {
      const response = await request(app)
        .post("/exposed")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /reset-table", async () => {
      const response = await request(app)
        .post("/reset-table")
        .send({ table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
