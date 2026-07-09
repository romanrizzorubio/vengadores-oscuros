### Skill: Gestión de Fase de Avance (Advance Phase)

Este skill describe cómo implementar una fase de transición que permite a los jugadores avanzar manualmente a la siguiente etapa del juego mediante un botón.

#### Frontend

1.  **Diccionarios**:
    - Añadir `ADVANCE: ID` en `PhaseDict` y `PanelTypeDict` en `packages/front/src/types/Dicts.ts`.

2.  **Componente de Fase**:
    - Crear `packages/front/src/phases/AdvancePhase/AdvancePhase.tsx`.
    - Utilizar el componente `Panel` con el tipo `PanelTypeDict.ADVANCE`.
    - Implementar el botón de avance usando el hook `useAdvance`:
      ```typescript
      const { advance } = useAdvance();
      const handleAdvance = useCallback(() => advance(), [advance]);

      // En el Panel:
      buttons={{
        label: 'Avanzar',
        size: SizeDict.L,
        onClick: handleAdvance,
      }}
      ```

3.  **Integración**:
    - Importar y añadir la fase en `HomePage.tsx` (con `readOnly`) y `TablePage.tsx`.
