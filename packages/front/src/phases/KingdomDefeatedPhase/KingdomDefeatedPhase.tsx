import { Wrapper } from './KingdomDefeatedPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { useAdvance } from '../../hooks/useAdvance';

export type KingdomDefeatedPhaseProps = {
  readOnly?: boolean;
};

export const KingdomDefeatedPhase = ({
  readOnly = false,
}: KingdomDefeatedPhaseProps) => {
  const { advance } = useAdvance();

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.KINGDOM_DEFEATED}
        msg="Norman Osborn ha sido descubierto, estaba usando los recursos del Estado para sus planes usando supervillanos fingiendo ser nuestros héroes de siempre."
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Avanzar',
                size: SizeDict.L,
                onClick: advance,
              }
        }
      />
    </Wrapper>
  );
};
