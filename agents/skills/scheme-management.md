### Skill: Gestión de Planes (Scheme)

Este skill describe cómo implementar la gestión de un **Plan** (Scheme) cuya **Amenaza** (Threat) progresa desde un valor inicial hasta un máximo (ej. Plan de Vengadores Oscuros, Plan de Descubiertos).

**IMPORTANTE**:

- El concepto principal es el **Plan** (`scheme`).
- El valor gestionado es la **Amenaza** (`threat`).
- Los marcadores de posición (**placeholders**) como `[scheme]` y `[SCHEME]` deben reemplazarse por el nombre real (ej. `darkAvengers`, `DARK_AVENGERS`).

#### Backend

1.  **Constantes**:
    - Añadir en `packages/back/src/types/constants.ts`:
      ```typescript
      export const [SCHEME]_THREAT_INI_PER_PLAYER = 2;
      export const [SCHEME]_THREAT_MAX_PER_PLAYER = 10;
      ```

2.  **Modelo de Datos**:
    - En `packages/back/src/types/GameData.ts`, añadir los límites globales:
      ```typescript
      [scheme]ThreatIni: number;
      [scheme]ThreatMax: number;
      ```
    - En `packages/back/src/types/TableData.ts`, añadir el acumulador de amenaza por mesa:
      ```typescript
      [scheme]Threat: number;
      ```

3.  **Inicialización**:
    - En `packages/back/src/services/initGame.ts`, inicializar los campos a 0.
    - En `packages/back/src/services/startTables.ts`, calcular valores iniciales:
      ```typescript
      const { normal, expert } = getNumPlayers(data);
      const numPlayers = normal + expert;
      data.[scheme]ThreatIni = [SCHEME]_THREAT_INI_PER_PLAYER * numPlayers;
      data.[scheme]ThreatMax = [SCHEME]_THREAT_MAX_PER_PLAYER * numPlayers;
      ```

4.  **Servicio de Actualización**:
    - Crear `packages/back/src/services/update[Scheme]Threat.ts`.
    - La amenaza acumulada se calcula como `[scheme]ThreatIni + sum(tables.[scheme]Threat)`.
    - **Lógica de Límites**: Al actualizar el valor en la mesa, se debe asegurar que el total global no exceda los límites:
      ```typescript
      const currentTotal = [scheme]ThreatIni + sum(tables.[scheme]Threat);
      let actualValue = value;
      if (currentTotal + value > [scheme]ThreatMax) {
        actualValue = [scheme]ThreatMax - currentTotal;
      } else if (currentTotal + value < 0) {
        actualValue = -currentTotal;
      }
      table.[scheme]Threat += actualValue;
      ```
    - Si la amenaza total alcanza el máximo, se suele avanzar a una fase de derrota (ej. `CAPTAIN_LOSE`).

5.  **Rutas API**:
    - Registrar el endpoint en `packages/back/src/routes/gameRoutes.ts`:
      ```typescript
      router.post("/[scheme]-threat", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
        const { value, table } = req.body;
        res.send(update[Scheme]Threat(value, table));
      });
      ```

#### Frontend

1.  **Diccionarios y Tipos**:
    - Añadir `[SCHEME]: ID` en `PanelTypeDict` (`packages/front/src/types/Dicts.ts`).
    - Actualizar `DataService` y `Data` en `packages/front/src/types/Data.ts` con los nuevos campos de amenaza.

2.  **Parsers**:
    - Actualizar `packages/front/src/utils/parsers.ts` para calcular el total y pasar el máximo:
      ```typescript
      const sum[Scheme]Threat = tables.reduce((acc, table) => (table ? acc + table.[scheme]Threat : acc), 0);
      const [scheme]Threat = [scheme]ThreatIni + sum[Scheme]Threat;

      // En el retorno de parseData:
      [scheme]Threat: ([scheme]Threat * 100) / [scheme]ThreatMax,
      [scheme]ThreatValue: [scheme]Threat,
      [scheme]ThreatMax,
      ```

3.  **Integración**:
    - Mapear la imagen del plan en `Panel.tsx`.
    - Añadir el componente `Panel` en la fase correspondiente.
    - Usar el hook `useSendData` para llamar al endpoint `/[scheme]-threat`.
    - Al mostrar la amenaza, pasar el valor máximo al componente `Progress`:
      ```typescript
      <Panel
        type={PanelTypeDict.[SCHEME]}
        progress={{
          percentage: [scheme]Threat,
          value: [scheme]ThreatValue,
          maxValue: [scheme]ThreatMax,
          label: 'Amenaza'
        }}
        controls={readOnly ? undefined : { onChange: change[Scheme]Threat, maxValue: [scheme]ThreatMax }}
      />
      ```
