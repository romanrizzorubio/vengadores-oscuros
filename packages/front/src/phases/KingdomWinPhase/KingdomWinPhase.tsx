import { Wrapper } from './KingdomWinPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useAdvance } from '../../hooks/useAdvance';

export type KingdomWinPhaseProps = {
  readOnly?: boolean;
};

export const KingdomWinPhase = ({ readOnly = false }: KingdomWinPhaseProps) => {
  const { advance } = useAdvance();
  const msg =
    'Los planes de Norman Osborn siguen su curso, ha obtenido tanto poder que ya no necesita ocultarse y pasa a la siguiente etapa de su plan.';

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.NORMAN_OSBORN}
        msg={msg}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Avanzar',
                size: SizeDict.M,
                onClick: advance,
              }
        }
      />
    </Wrapper>
  );
};
