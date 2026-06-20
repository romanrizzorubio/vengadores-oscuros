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
    *   Crear `packages/back/src/services/update[Villain]Life.ts` para manejar la lógica de límites (0 a maxLife).
    *   Asegurar que si el incremento supera la vida máxima, se establezca en `[villain]MaxLife`.
    *   Cuando la vida llega a 0, se suele avanzar de fase en `advanceGame.ts`.

5.  **Rutas API**:
    *   Registrar el nuevo endpoint en `packages/back/src/routes/gameRoutes.ts`:
        ```typescript
        router.post("/[villain]-life", (req: Request<ValueBody>, res: Response) => {
          const { value } = req.body;
          res.send(update[Villain]Life(value));
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
