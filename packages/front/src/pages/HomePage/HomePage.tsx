import { Container, Wrapper } from './HomePage.styles';
import { KingdomPhase } from '../../phases/KingdomPhase/KingdomPhase';
import { PhaseDict } from '../../types/Dicts';
import { SuperChangePhase } from '../../phases/SuperChangePhase/SuperChangePhase';
import { ShipFallPhase } from '../../phases/ShipFallPhase/ShipFallPhase';
import { ShipOpenPhase } from '../../phases/ShipOpenPhase/ShipOpenPhase';
import { OsbornChangePhase } from '../../phases/OsbornChangePhase/OsbornChangePhase';
import { OsbornPhase } from '../../phases/OsbornPhase/OsbornPhase';
import { EnemyPhase } from '../../phases/EnemyPhase/EnemyPhase';
import { InitPhase } from '../../phases/InitPhase/InitPhase';
import { Timer } from '../../components/Timer/Timer';
import { WaitingTablesPhase } from '../../phases/WaitingTablesPhase/WaitingTablesPhase';
import { useGameContext } from '../../contexts/GameContext';
import { SpiderWomanPhase } from '../../phases/SpiderWomanPhase/SpiderWomanPhase';
import { ElcalaMal } from '../../components/ElcalaMal/ElcalaMal';
import { useMemo } from 'react';
import { KingdomDefeatedPhase } from '../../phases/KingdomDefeatedPhase/KingdomDefeatedPhase';
import { ExposedPhase } from '../../phases/ExposedPhase/ExposedPhase';
import { CaptainPhase } from '../../phases/CaptainPhase/CaptainPhase';
import { KingdomWinPhase } from '../../phases/KingdomWinPhase/KingdomWinPhase';

const HomePage = () => {
  const {
    data,
    data: { phase },
  } = useGameContext();

  console.log('HomePage render, phase:', phase);

  const showElcalaMals = useMemo(
    () =>
      [
        PhaseDict.KINGDOM,
        PhaseDict.SHIP_FALL,
        PhaseDict.ENEMY,
        PhaseDict.OSBORN_REVEAL,
      ].some((p) => p === phase),
    [phase],
  );

  return (
    <Wrapper>
      {phase !== PhaseDict.INIT && <Timer />}
      <Container>
        {showElcalaMals && <ElcalaMal readOnly />}
        {phase === PhaseDict.INIT && <InitPhase />}
        {phase === PhaseDict.TABLES && <WaitingTablesPhase />}
        {phase === PhaseDict.KINGDOM && <KingdomPhase readOnly />}
        {phase === PhaseDict.KINGDOM_DEFEATED && <KingdomDefeatedPhase />}
        {phase === PhaseDict.EXPOSED && <ExposedPhase readOnly />}
        {phase === PhaseDict.SUPER_DEFEATED && <SuperChangePhase />}
        {phase === PhaseDict.SUPER_WINER && <SuperChangePhase hasWin />}
        {phase === PhaseDict.SPIDER_WOMAN_LEAVES && <SpiderWomanPhase />}
        {phase === PhaseDict.SHIP_FALL && <ShipFallPhase readOnly />}
        {phase === PhaseDict.SHIP_OPEN && <ShipOpenPhase />}
        {phase === PhaseDict.ENEMY && <EnemyPhase readOnly />}
        {phase === PhaseDict.OSBORN_REVEAL && <OsbornChangePhase />}
        {phase === PhaseDict.VERANKE_LOSE && <OsbornPhase />}
        {phase === PhaseDict.VERANKE_WIN && <OsbornPhase hasWin />}
        {phase === PhaseDict.CAPTAIN_LOSE && <CaptainPhase />}
        {phase === PhaseDict.CAPTAIN_WIN && <CaptainPhase hasWin />}
        {phase === PhaseDict.KINGDOM_WIN && <KingdomWinPhase />}
      </Container>
    </Wrapper>
  );
};

export default HomePage;
