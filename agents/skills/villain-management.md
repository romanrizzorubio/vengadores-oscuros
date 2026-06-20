### Skill: Gestión de Villanos

Este skill describe cómo implementar la gestión de vida de los Villanos en el proyecto Vengadores Oscuros, incluyendo el backend y el frontend.

#### Backend

1.  **Constantes**:
    *   Añadir en `packages/back/src/types/constants.ts`:
        ```typescript
        export const VILLAIN_LIFE_PER_PLAYER = 10;
        export const VILLAIN_LIFE_EXP_PER_PLAYER = 15;
        ```

2.  **Modelo de Datos**:
    *   Actualizar `packages/back/src/types/GameData.ts` para incluir los campos globales:
        ```typescript
        villainLife: number;
        villainMaxLife: number;
        ```

3.  **Inicialización**:
    *   En `packages/back/src/services/initGame.ts`, inicializar a 0.
    *   En `packages/back/src/services/startTables.ts`, calcular la vida máxima sumando los valores por cada jugador según el modo (normal/experto):
        ```typescript
        const { normal, expert } = getNumPlayers(data);
        data.villainLife = VILLAIN_LIFE_PER_PLAYER * normal + VILLAIN_LIFE_EXP_PER_PLAYER * expert;
        data.villainMaxLife = VILLAIN_LIFE_PER_PLAYER * normal + VILLAIN_LIFE_EXP_PER_PLAYER * expert;
        ```

4.  **Servicio de Actualización**:
    *   Crear `packages/back/src/services/updateVillainLife.ts` para manejar la lógica de límites (0 a maxLife).
    *   Asegurar que si el incremento supera la vida máxima, se establezca en `villainMaxLife`.
    *   Cuando la vida llega a 0, se suele avanzar de fase en `advanceGame.ts`.

5.  **Rutas API**:
    *   Registrar el nuevo endpoint en `packages/back/src/routes/gameRoutes.ts`:
        ```typescript
        router.post("/villain-life", (req: Request<ValueBody>, res: Response) => {
          const { value } = req.body;
          res.send(updateVillainLife(value));
        });
        ```

#### Frontend

1.  **Diccionarios y Tipos**:
    *   Añadir `VILLAIN: 20` (o el siguiente ID disponible) en `PanelTypeDict` dentro de `packages/front/src/types/Dicts.ts`.
    *   Actualizar `DataService` y `Data` en `packages/front/src/types/Data.ts`.
    *   Añadir el endpoint `/villain-life` en `packages/front/src/data/core/endpoints.ts`.

2.  **Componentes**:
    *   En `packages/front/src/components/Panel/Panel.tsx`, mapear `PanelTypeDict.VILLAIN` a una imagen (por ejemplo, `imgVeranke`).

3.  **Parsers**:
    *   Actualizar `packages/front/src/utils/parsers.ts` para procesar `villainLife` y `villainMaxLife` y calcular el porcentaje para la barra de progreso.

4.  **Servicios y Hooks**:
    *   Crear un servicio en `packages/front/src/data/services/villainLife.ts` que llame al endpoint del backend.
    *   Añadir el método en `useSendData.tsx`.
    *   Crear un hook `useVillain.tsx` para exponer la vida y la función para cambiarla.

5.  **Integración en Fases**:
    *   Añadir el componente `Panel` con los controles de vida en la fase correspondiente (ej. `EnemyPhase.tsx`).
    *   Asegurar que los controles se oculten si `readOnly` es true (vista de Home).
