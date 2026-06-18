import { Wrapper } from './KingdomPhase.styles';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useKingdom } from '../../hooks/useKingdom';

export type KingdomPhaseProps = {
  readOnly?: boolean;
};

export const KingdomPhase = ({ readOnly = false }: KingdomPhaseProps) => {
  const {
    minions,
    minionsValue,
    darkAvengersThreat,
    darkAvengersThreatValue,
    addMinion,
    changeDarkAvengersThreat,
  } = useKingdom();

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.DARK_REIGN}
        progress={{ percentage: minions, value: minionsValue, label: 'Esbirros' }}
        hasBackground={readOnly}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Añadir',
                size: SizeDict.M,
                onClick: () => addMinion(1),
              }
        }
      />
      <Panel
        type={PanelTypeDict.DARK_AVENGERS}
        progress={{ percentage: darkAvengersThreat, value: darkAvengersThreatValue, label: 'Amenaza' }}
        controls={readOnly ? undefined : { onChange: changeDarkAvengersThreat }}
        hasBackground={readOnly}
      />
    </Wrapper>
  );
};
