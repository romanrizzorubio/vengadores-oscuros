import { Wrapper } from './CaptainPhase.styles';
import { Panel } from '../../components/Panel/Panel';
import { PanelTypeDict } from '../../types/Dicts';
import { useMemo } from 'react';

export type CaptainPhaseProps = {
  hasWin?: boolean;
};

export const CaptainPhase = ({ hasWin = false }: CaptainPhaseProps) => {
  const msg = useMemo(() => {
    return hasWin
      ? 'Norman Osborn ha caído y, al fin, su Reinado Oscuro ha terminado y vuelve la luz, volvemos a nuestros valores de siempre al nombrar a nuestro Capitán América nuevo Director de S.H.I.E.L.D.'
      : 'Norman Osborn os ha derrotado. Pero para ello ha tenido que quedar expuesto y al fin, su Reinado Oscuro ha terminado y vuelve la luz, volvemos a nuestros valores de siempre al nombrar a nuestro Capitán América nuevo Director de S.H.I.E.L.D.';
  }, [hasWin]);

  return (
    <Wrapper>
      <Panel type={PanelTypeDict.CAPTAIN_AMERICA} msg={msg} />
    </Wrapper>
  );
};
