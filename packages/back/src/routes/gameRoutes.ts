import { Router, Request, Response } from "express";
import { getData } from "../services/getData";
import { initGame } from "../services/initGame";
import { advanceGame } from "../services/advanceGame";
import { updateExposed } from "../services/updateExposed";
import { initTable } from "../services/initTable";
import { resetGame } from "../services/resetGame";
import { startTables } from "../services/startTables";
import { getHeroes } from "../services/getHeroes";
import { PlayerData } from "../types/PlayerData";
import { endGame } from "../services/endGame";
import { addElcalaMal, updateElcalaMalLife } from "../services/changeElcalaMal";
import { resetTable } from "../services/resetTable";
import { updateMinions } from "../services/updateMinions";
import { updateDarkAvengersThreat } from "../services/updateDarkAvengersThreat";
import { updateIronPatriotLife } from "../services/updateIronPatriotLife";
import { updateExposedThreat } from "../services/updateExposedThreat";

interface InitBody {
  players: number;
  end: number;
}

interface ValueBody {
  value: number;
}

interface TableWatcherBody {
  next: boolean;
}

interface TableNumberBody {
  table: number;
}

interface TableBody {
  table: number;
  players: PlayerData[];
  expert: boolean;
}

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json("Hello World!");
});

router.get("/data", (_req: Request, res: Response) => {
  res.send(getData());
});

router.post("/init", (req: Request<InitBody>, res: Response) => {
  const { end } = req.body;
  res.send(initGame(end));
});

router.post("/reset", (_req: Request, res: Response) => {
  res.send(resetGame());
});

router.post("/init-table", (req: Request<TableBody>, res: Response) => {
  const { table, players, expert } = req.body;

  try {
    const data = initTable(table, players, expert);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: "Invalid table initialization" });
  }
});

router.post("/reset-table", (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;

  try {
    const data = resetTable(table);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.get("/heroes", (_req: Request, res: Response) => {
  res.send(getHeroes());
});

router.post("/start-tables", (_req: Request, res: Response) => {
  res.send(startTables());
});

router.post("/advance", (_req: Request, res: Response) => {
  res.send(advanceGame());
});

router.post("/end", (_req: Request, res: Response) => {
  res.send(endGame());
});

router.post("/elcala-mal/add", (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;
  try {
    res.send(addElcalaMal(table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/elcala-mal/life", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { table, value } = req.body;
  try {
    res.send(updateElcalaMalLife(table, value));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/exposed", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateExposed(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/minions", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateMinions(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/dark-avengers-threat", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateDarkAvengersThreat(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/iron-patriot-life", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateIronPatriotLife(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/exposed-threat", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateExposedThreat(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

export default router;
