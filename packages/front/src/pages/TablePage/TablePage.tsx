import { Container, Heading, Wrapper } from './TablePage.styles';
import { KingdomPhase } from '../../phases/KingdomPhase/KingdomPhase';
import { PhaseDict } from '../../types/Dicts';
import { OsbornChangePhase } from '../../phases/OsbornChangePhase/OsbornChangePhase';
import { OsbornPhase } from '../../phases/OsbornPhase/OsbornPhase';
import { Timer } from '../../components/Timer/Timer';
import { WaitingPhase } from '../../phases/WaitingPhase/WaitingPhase';
import { CreateTablePhase } from '../../phases/CreateTablePhase/CreateTablePhase';
import { useMemo } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { SetTable } from '../../components/SetTable/SetTable';
import { getTableText } from '../../utils/utils';
import { ElcalaMal } from '../../components/ElcalaMal/ElcalaMal';
import { KingdomDefeatedPhase } from '../../phases/KingdomDefeatedPhase/KingdomDefeatedPhase';
import { ExposedPhase } from '../../phases/ExposedPhase/ExposedPhase';
import { CaptainPhase } from '../../phases/CaptainPhase/CaptainPhase';

const TablePage = () => {
  const {
    data: { phase },
    currentTable,
  } = useGameContext();

  const tableText = useMemo(() => getTableText(currentTable), [currentTable]);

  const showElcalaMals = useMemo(
    () => [PhaseDict.KINGDOM, PhaseDict.SHIP_FALL, PhaseDict.ENEMY, PhaseDict.EXPOSED].some((p) => p === phase),
    [phase],
  );

  return (
    <Wrapper>
      {phase !== PhaseDict.INIT && <Timer />}
      {currentTable < 0 ? (
        <SetTable />
      ) : (
        <>
          {tableText && <Heading>{tableText}</Heading>}
          {showElcalaMals && <ElcalaMal />}
          <Container>
            {phase === PhaseDict.INIT && <WaitingPhase />}
            {phase === PhaseDict.TABLES && <CreateTablePhase />}
            {phase === PhaseDict.KINGDOM && <KingdomPhase />}
            {phase === PhaseDict.KINGDOM_DEFEATED && <KingdomDefeatedPhase readOnly />}
            {phase === PhaseDict.EXPOSED && <ExposedPhase />}
            {phase === PhaseDict.OSBORN_REVEAL && <OsbornChangePhase readOnly />}
            {phase === PhaseDict.VERANKE_LOSE && <OsbornPhase />}
            {phase === PhaseDict.VERANKE_WIN && <OsbornPhase hasWin />}
            {phase === PhaseDict.CAPTAIN_LOSE && <CaptainPhase />}
            {phase === PhaseDict.CAPTAIN_WIN && <CaptainPhase hasWin />}
          </Container>
          {showElcalaMals && <ElcalaMal onlyDefeated />}
        </>
      )}
    </Wrapper>
  );
};

export default TablePage;
