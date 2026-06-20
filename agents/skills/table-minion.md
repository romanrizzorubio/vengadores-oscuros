### Skill: Gestión de Esbirros por Mesa (Table Minion)

Este skill describe cómo implementar la gestión de un **Esbirro** o **Enemigo** que aparece de forma individual en cada mesa (ej. Elcala Mal, Soldados de Hydra). A diferencia de los planes globales, estos se gestionan como una lista donde cada entrada pertenece a una mesa específica.

**IMPORTANTE**: 
- El esbirro tiene una **Vida fija por mesa** (no escala con el número de jugadores).
- Los valores gestionados son la **Vida** (`life`) y su estado de **Derrotado** (`defeated`).
- Los marcadores de posición (**placeholders**) como `[minion]`, `[Minion]` y `[MINION]` deben reemplazarse por el nombre real (ej. `elcalaMal`, `ElcalaMal`, `ELCALA_MAL`).

#### Backend

1.  **Constantes**:
    *   Añadir en `packages/back/src/types/constants.ts`:
        ```typescript
        export const [MINION]_LIFE = 9;
        ```

2.  **Modelo de Datos**:
    *   En `packages/back/src/types/GameData.ts`, definir el tipo y añadirlo al estado global:
        ```typescript
        export type [Minion]Data = {
          table: number;
          life: number;
          maxLife: number;
          defeated: boolean;
        };

        export type GameData = {
          // ...
          [minion]: [Minion]Data[];
        };
        ```

3.  **Inicialización**:
    *   En `packages/back/src/services/initGame.ts`, inicializar como array vacío:
        ```typescript
        data.[minion] = [];
        ```

4.  **Servicios de Actualización**:
    *   Crear `packages/back/src/services/change[Minion].ts`.
    *   **Añadir**: Crea una instancia para la mesa si no existe.
        ```typescript
        export function add[Minion](table: number): GameData {
          return updateGameState((data) => {
            const exists = data.[minion].find((e) => e.table === table);
            if (!exists) {
              const maxLife = [MINION]_LIFE;
              data.[minion].push({ table, life: maxLife, maxLife, defeated: false });
            }
          });
        }
        ```
    *   **Actualizar Vida**:
        ```typescript
        export function update[Minion]Life(table: number, life: number): GameData {
          return updateGameState((data) => {
            const item = data.[minion].find((e) => e.table === table);
            if (item) {
              item.life = Math.max(0, Math.min(life, item.maxLife));
              if (item.life === 0) item.defeated = true;
            }
          });
        }
        ```

5.  **Rutas API**:
    *   Registrar endpoints en `packages/back/src/routes/gameRoutes.ts`:
        ```typescript
        router.post("/[minion]/add", (req, res) => res.send(add[Minion](req.body.table)));
        router.post("/[minion]/life", (req, res) => res.send(update[Minion]Life(req.body.table, req.body.life)));
        ```

#### Frontend

1.  **Tipos y Servicios**:
    *   Definir `[Minion]Data` en `packages/front/src/types/Data.ts`.
    *   Crear `packages/front/src/data/services/[minion].ts` con las llamadas a los nuevos endpoints.

2.  **Componente UI**:
    *   Crear `packages/front/src/components/[Minion]/[Minion].tsx`.
    *   Debe manejar dos modos:
        - **Lectura (ReadOnly)**: Lista horizontal de todos los esbirros (usado en `HomePage`).
        - **Mesa (TablePage)**: Botón para añadir si no existe, y panel de control si existe.
    *   **Lógica de Visualización**:
        - Si está derrotado, mostrar un estilo visual distinto (ej. texto "Derrotado").
        - Si es la mesa propia, mostrar controles de vida (`Controls`) y barra de progreso completa.
        - Si es otra mesa, mostrar solo barra de progreso compacta.

3.  **Integración**:
    *   Añadir el ID en `PanelTypeDict` (`packages/front/src/types/Dicts.ts`).
    *   Insertar el componente `[Minion]` en la fase o página correspondiente.
    *   Si el esbirro bloquea el avance, validar que `data.[minion].every(m => m.defeated)` antes de permitir el cambio de fase.
