### Skill: Gestión de Planes Secundarios (Side Scheme)

Este skill describe cómo implementar la gestión de un **Plan Secundario** (Side Scheme). A diferencia de los planes principales, estos tienen un valor inicial de amenaza, no tienen un límite máximo, y su objetivo suele ser eliminarlos (llegar a 0) para avanzar de fase o eliminar un obstáculo.

**IMPORTANTE**:

- El concepto principal es el **Plan Secundario** (`sideScheme`).
- El valor gestionado es la **Amenaza** (`threat`).
- Los marcadores de posición (**placeholders**) como `[sideScheme]` y `[SIDESCHEME]` deben reemplazarse por el nombre real (ej. `legionOfHydra`, `LEGION_OF_HYDRA`).

#### Backend

1.  **Constantes**:
    - Añadir en `packages/back/src/types/constants.ts`:
      ```typescript
      export const [SIDESCHEME]_THREAT_INI_PER_PLAYER = 3;
      ```

2.  **Modelo de Datos**:
    - En `packages/back/src/types/GameData.ts`, añadir el valor inicial global:
      ```typescript
      [sideScheme]ThreatIni: number;
      ```
    - En `packages/back/src/types/TableData.ts`, añadir el acumulador de amenaza por mesa (suele empezar en 0 y ser negativo a medida que se quita amenaza):
      ```typescript
      [sideScheme]Threat: number;
      ```

3.  **Inicialización**:
    - En `packages/back/src/services/initGame.ts`, inicializar los campos a 0.
    - En `packages/back/src/services/startTables.ts`, calcular el valor inicial:
      ```typescript
      const { normal, expert } = getNumPlayers(data);
      const numPlayers = normal + expert;
      data.[sideScheme]ThreatIni = [SIDESCHEME]_THREAT_INI_PER_PLAYER * numPlayers;
      ```

4.  **Servicio de Actualización**:
    - Crear `packages/back/src/services/update[SideScheme]Threat.ts`.
    - La amenaza actual se calcula como `[sideScheme]ThreatIni + sum(tables.[sideScheme]Threat)`.
    - **Lógica de Límites**: Se debe asegurar que el total global no baje de 0. No hay límite máximo.
      ```typescript
      const currentTotal = [sideScheme]ThreatIni + sum(tables.[sideScheme]Threat);
      let actualValue = value;
      if (currentTotal + value < 0) {
        actualValue = -currentTotal;
      }
      table.[sideScheme]Threat += actualValue;
      ```
    - **Cambio de Fase**: Si la amenaza total llega a 0, disparar el avance de fase.

5.  **Rutas API**:
    - Registrar el endpoint en `packages/back/src/routes/gameRoutes.ts`:
      ```typescript
      router.post("/[side-scheme]-threat", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
        const { value, table } = req.body;
        res.send(update[SideScheme]Threat(value, table));
      });
      ```

#### Frontend

1.  **Diccionarios y Tipos**:
    - Añadir `[SIDESCHEME]: ID` en `PanelTypeDict` (`packages/front/src/types/Dicts.ts`).
    - Actualizar `DataService` y `Data` en `packages/front/src/types/Data.ts`.

2.  **Parsers**:
    - Actualizar `packages/front/src/utils/parsers.ts`:
      ```typescript
      const sum[SideScheme]Threat = tables.reduce((acc, table) => (table ? acc + table.[sideScheme]Threat : acc), 0);
      const [sideScheme]Threat = [sideScheme]ThreatIni + sum[SideScheme]Threat;
      ```

3.  **Integración y UI**:
    - Mapear la imagen en `Panel.tsx`.
    - Configurar el componente `Panel` en la fase correspondiente.
    - **Botones**: Usar `label: 'Quitar'` para reducir la amenaza.
    - Usar el hook `useSendData` para llamar al endpoint.
