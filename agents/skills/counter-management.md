### Skill: Gestión de Contadores

Este skill describe cómo implementar la gestión de un contador que se acumula a través de las mesas. Estos contadores pueden ser de dos tipos:
1.  **Incremental (Llenarse)**: Empieza en 0 y sube hasta un máximo (ej. Esbirros derrotados). El botón debe decir **Añadir**.
2.  **Decremental (Vaciarse)**: Empieza en un valor inicial y baja hasta 0 (ej. Enemigos por derrotar). El botón debe decir **Quitar**.

**IMPORTANTE**: El término `counter` y sus derivados (ej. `COUNTER`) son marcadores de posición (**placeholders**). Deben ser reemplazados por el nombre real del contador (ej. `minions`, `MINIONS`).

#### Backend

1.  **Constantes**:
    *   Añadir en `packages/back/src/types/constants.ts`:
        ```typescript
        export const [COUNTER]_MAX_PER_PLAYER = 1; // Para incrementales
        export const [COUNTER]_INIT_PER_PLAYER = 10; // Para decrementales
        ```

2.  **Modelo de Datos**:
    *   En `packages/back/src/types/GameData.ts`, añadir el límite/objetivo:
        ```typescript
        [counter]Max: number; // O [counter]Init
        ```
    *   En `packages/back/src/types/TableData.ts`, añadir el valor por mesa:
        ```typescript
        [counter]: number;
        ```

3.  **Inicialización**:
    *   En `packages/back/src/services/initGame.ts`, inicializar a 0.
    *   En `packages/back/src/services/startTables.ts`:
        ```typescript
        const { normal, expert } = getNumPlayers(data);
        const numPlayers = normal + expert;
        data.[counter]Max = [COUNTER]_MAX_PER_PLAYER * numPlayers;
        ```

4.  **Servicio de Actualización**:
    *   Crear `packages/back/src/services/update[Counter].ts`.
    *   **Lógica de Límites**: Asegurar que el total global no exceda el máximo ni baje de 0.
        ```typescript
        const currentTotal = sum(tables.[counter]);
        let actualValue = value;
        if (currentTotal + value > data.[counter]Max) {
          actualValue = data.[counter]Max - currentTotal;
        } else if (currentTotal + value < 0) {
          actualValue = -currentTotal;
        }
        table.[counter] += actualValue;
        ```
    *   **Cambio de Fase**: Si el contador se llena (incremental) o se vacía (decremental), disparar el avance de fase.

5.  **Rutas API**:
    *   Registrar el endpoint en `packages/back/src/routes/gameRoutes.ts`:
        ```typescript
        router.post("/[counter]", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
          const { value, table } = req.body;
          res.send(update[Counter](value, table));
        });
        ```

#### Frontend

1.  **Diccionarios y Tipos**:
    *   Añadir `[COUNTER_ID]: ID` en `PanelTypeDict` (`packages/front/src/types/Dicts.ts`).
    *   Actualizar `DataService` y `Data` en `packages/front/src/types/Data.ts`.

2.  **Parsers**:
    *   Actualizar `packages/front/src/utils/parsers.ts`:
        ```typescript
        const sum[Counter] = tables.reduce((acc, table) => (table ? acc + table.[counter] : acc), 0);
        // Para incrementales:
        const [counter] = sum[Counter];
        // Para decrementales:
        const [counter] = [counter]Init - sum[Counter];
        ```

3.  **Integración y UI**:
    *   Mapear la imagen en `Panel.tsx`.
    *   En la fase correspondiente, configurar el componente `Panel`.
    *   **Botones**:
        - Si es tipo **llenarse**: `label: 'Añadir'`.
        - Si es tipo **vaciarse**: `label: 'Quitar'`.
    *   Usar el hook `useSendData` para llamar al endpoint.
