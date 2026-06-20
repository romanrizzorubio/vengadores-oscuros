### Skill: Gestión de Villanos

Este skill describe cómo implementar la gestión de vida de los Villanos en el proyecto Vengadores Oscuros, incluyendo el backend y el frontend.

**IMPORTANTE**: El término `villain` y sus derivados (ej. `villainLife`, `VILLAIN`) en este documento son marcadores de posición (**placeholders**). Deben ser reemplazados por el nombre real del villano que se esté implementando en ese momento (ej. `redSkull`, `redSkullLife`, `RED_SKULL`).

#### Backend

1.  **Constantes**:
    *   Añadir en `packages/back/src/types/constants.ts` (reemplazando `VILLAIN` por el nombre del villano):
        ```typescript
        export const [VILLAIN]_LIFE_PER_PLAYER = 10;
        export const [VILLAIN]_LIFE_EXP_PER_PLAYER = 15;
        ```

2.  **Modelo de Datos**:
    *   Actualizar `packages/back/src/types/GameData.ts` (reemplazando `villain` por el nombre del villano):
        ```typescript
        [villain]Life: number;
        [villain]MaxLife: number;
        ```

3.  **Inicialización**:
    *   En `packages/back/src/services/initGame.ts`, inicializar a 0.
    *   En `packages/back/src/services/startTables.ts`, calcular la vida máxima (reemplazando `villain` por el nombre del villano):
        ```typescript
        const { normal, expert } = getNumPlayers(data);
        data.[villain]Life = [VILLAIN]_LIFE_PER_PLAYER * normal + [VILLAIN]_LIFE_EXP_PER_PLAYER * expert;
        data.[villain]MaxLife = [VILLAIN]_LIFE_PER_PLAYER * normal + [VILLAIN]_LIFE_EXP_PER_PLAYER * expert;
        ```

4.  **Servicio de Actualización**:
    *   Crear `packages/back/src/services/update[Villain]Life.ts`.
    *   **Lógica de Límites**: Al actualizar el valor, se debe asegurar que la vida no exceda el máximo ni sea inferior a cero:
        ```typescript
        let actualValue = value;
        if (data.[villain]Life + value > data.[villain]MaxLife) {
          actualValue = data.[villain]MaxLife - data.[villain]Life;
        } else if (data.[villain]Life + value < 0) {
          actualValue = -data.[villain]Life;
        }
        data.[villain]Life += actualValue;
        ```
    *   El servicio debe recibir el `value` y el `tableNumber` (aunque la vida del villano suele ser global, se sigue el patrón de recibir la mesa que reporta el cambio).
    *   Cuando la vida llega a 0 (`data.[villain]Life === 0`), se suele avanzar de fase en `advanceGame.ts` o dentro del mismo servicio si es un evento crítico.

5.  **Rutas API**:
    *   Registrar el nuevo endpoint en `packages/back/src/routes/gameRoutes.ts`:
        ```typescript
        router.post("/[villain]-life", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
          const { value, table } = req.body;
          res.send(update[Villain]Life(value, table));
        });
        ```

#### Frontend

1.  **Diccionarios y Tipos**:
    *   Añadir `[VILLAIN]: ID` en `PanelTypeDict` dentro de `packages/front/src/types/Dicts.ts`.
    *   Actualizar `DataService` y `Data` en `packages/front/src/types/Data.ts` con los nuevos campos.
    *   Añadir el endpoint `/[villain]-life` en `packages/front/src/data/core/endpoints.ts`.

2.  **Componentes**:
    *   En `packages/front/src/components/Panel/Panel.tsx`, mapear `PanelTypeDict.[VILLAIN]` a la imagen correspondiente.

3.  **Parsers**:
    *   Actualizar `packages/front/src/utils/parsers.ts` para procesar `[villain]Life` y `[villain]MaxLife`.

4.  **Servicios y Hooks**:
    *   Crear un servicio en `packages/front/src/data/services/[villain]Life.ts`.
    *   Añadir el método en `useSendData.tsx`.
    *   Crear un hook `use[Villain].tsx`.

5.  **Integración en Fases**:
    *   Añadir el componente `Panel` con los controles de vida en la fase correspondiente.
    *   Asegurar que los controles se oculten si `readOnly` es true.
