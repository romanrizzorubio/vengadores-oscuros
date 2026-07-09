import { Container, Wrapper } from './HomePage.styles';
import { KingdomPhase } from '../../phases/KingdomPhase/KingdomPhase';
import { PhaseDict } from '../../types/Dicts';
import { InitPhase } from '../../phases/InitPhase/InitPhase';
import { Timer } from '../../components/Timer/Timer';
import { WaitingTablesPhase } from '../../phases/WaitingTablesPhase/WaitingTablesPhase';
import { useGameContext } from '../../contexts/GameContext';
import { ElcalaMal } from '../../components/ElcalaMal/ElcalaMal';
import { useMemo } from 'react';
import { KingdomDefeatedPhase } from '../../phases/KingdomDefeatedPhase/KingdomDefeatedPhase';
import { ExposedPhase } from '../../phases/ExposedPhase/ExposedPhase';
import { CaptainPhase } from '../../phases/CaptainPhase/CaptainPhase';

const HomePage = () => {
  const {
    data,
    data: { phase },
  } = useGameContext();

  console.log('HomePage render, phase:', phase);

  const showElcalaMals = useMemo(
    () =>
      [PhaseDict.KINGDOM, PhaseDict.KINGDOM_DEFEATED].some((p) => p === phase),
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
        {phase === PhaseDict.CAPTAIN_LOSE && <CaptainPhase />}
        {phase === PhaseDict.CAPTAIN_WIN && <CaptainPhase hasWin />}
      </Container>
    </Wrapper>
  );
};

export default HomePage;
