### Skill: Gestión de Fase Final (Final Phase)

Este skill describe cómo implementar la fase final del juego, que suele ser informativa y no permite más acciones.

#### Frontend

1.  **Diccionarios**:
    - Añadir `FINAL: ID` en `PhaseDict` y `PanelTypeDict` en `packages/front/src/types/Dicts.ts`.

2.  **Componente de Fase**:
    - Crear `packages/front/src/phases/FinalPhase/FinalPhase.tsx`.
    - Utilizar el componente `Panel` con el tipo `PanelTypeDict.FINAL`.
    - Esta fase suele ser estática y solo muestra un mensaje o imagen final.

3.  **Integración**:
    - Importar y añadir la fase en `HomePage.tsx` y `TablePage.tsx`.
