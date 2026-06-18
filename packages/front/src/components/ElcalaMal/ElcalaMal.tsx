import { useCallback } from 'react';
import { Panel } from '../Panel/Panel';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { ElcalaMalData } from '../../types/Data';
import { addElcalaMalService, updateElcalaMalLifeService } from '../../data/services/elcalaMal';
import { getTableText } from '../../utils/utils';
import {
  Wrapper,
  Heading,
  CompactWrapper,
  CompactImage,
  CompactImageWrapper,
  CompactTitle,
  CompactProgressWrapper,
  CompactControlsWrapper,
  ListWrapper,
} from './ElcalaMal.styles';
import { useGameContext } from '../../contexts/GameContext';
import { Button } from '../../ui/Button/Button';
import { Progress } from '../../ui/Progress/Progress';
import { Controls } from '../Controls/Controls';
import imgElcalaMal from '../../assets/elcalamal.png';

export type ElcalaMalProps = {
  readOnly?: boolean;
};

export const ElcalaMal = ({ readOnly = false }: ElcalaMalProps) => {
  const { data, setData, currentTable } = useGameContext();

  const handleAddElcalaMal = useCallback(async () => {
    if (currentTable < 0) return;

    try {
      const newData = await addElcalaMalService(currentTable);
      if (newData) {
        setData(newData);
      }
    } catch (error) {
      console.error('Error adding Elcala Mal:', error);
    }
  }, [currentTable, setData]);

  const handleLifeChange = useCallback(
    (elcala: ElcalaMalData) => async (delta: number) => {
      try {
        const newLife = elcala.life + delta;
        const updatedData = await updateElcalaMalLifeService(elcala.table, newLife);
        if (updatedData) {
          setData(updatedData);
        }
      } catch (error) {
        console.error('Error updating Elcala Mal life:', error);
      }
    },
    [setData],
  );

  const hasElcalaInCurrentTable = data.elcalaMal.some((e) => e.table === currentTable);

  // HomePage: mostrar todos los Elcala Mal ordenados por mesa en horizontal
  if (readOnly) {
    if (data.elcalaMal.length === 0) {
      return null;
    }

    const sortedElcalas = [...data.elcalaMal].sort((a, b) => a.table - b.table);

    return (
      <Wrapper>
        <ListWrapper $horizontal>
          {sortedElcalas.map((elcala) => {
            const tableText = getTableText(elcala.table);

            if (elcala.defeated) {
              return (
                <CompactWrapper key={elcala.table} $fixedWidth $defeated>
                  <CompactTitle $defeated>{tableText} - Elcala Mal derrotado</CompactTitle>
                </CompactWrapper>
              );
            }

            return (
              <CompactWrapper key={elcala.table} $fixedWidth>
                <CompactImageWrapper>
                  <CompactImage src={imgElcalaMal} alt="Elcala Mal" />
                  <CompactTitle>{tableText}</CompactTitle>
                </CompactImageWrapper>
                <CompactProgressWrapper>
                  <Progress
                    percentage={(elcala.life * 100) / elcala.maxLife}
                    value={elcala.life}
                    label={`${elcala.life}/${elcala.maxLife}`}
                    hasBackground={false}
                    compact
                  />
                </CompactProgressWrapper>
              </CompactWrapper>
            );
          })}
        </ListWrapper>
      </Wrapper>
    );
  }

  // TablePage: diseño compacto mostrando todas las mesas
  // Ordenar: primero la mesa propia, luego las demás por número de mesa
  const sortedElcalas = [...data.elcalaMal].sort((a, b) => {
    if (a.table === currentTable) return -1;
    if (b.table === currentTable) return 1;
    return a.table - b.table;
  });

  return (
    <Wrapper>
      {!hasElcalaInCurrentTable && currentTable >= 0 && (
        <Button label="Llega Elcala Mal" onClick={handleAddElcalaMal} size={SizeDict.L} />
      )}
      {data.elcalaMal.length > 0 && (
        <ListWrapper>
          {sortedElcalas.map((elcala) => {
            const tableText = getTableText(elcala.table);
            const isOwnTable = elcala.table === currentTable;

            if (elcala.defeated) {
              return (
                <CompactWrapper key={elcala.table} $highlighted={isOwnTable} $defeated>
                  <CompactTitle $defeated>{tableText} - Elcala Mal derrotado</CompactTitle>
                </CompactWrapper>
              );
            }

            return (
              <CompactWrapper key={elcala.table} $highlighted={isOwnTable}>
                <CompactImageWrapper>
                  <CompactImage src={imgElcalaMal} alt="Elcala Mal" />
                  <CompactTitle>{tableText}</CompactTitle>
                </CompactImageWrapper>
                <CompactProgressWrapper>
                  <Progress
                    percentage={(elcala.life * 100) / elcala.maxLife}
                    value={elcala.life}
                    label={`${elcala.life}/${elcala.maxLife}`}
                    hasBackground={false}
                    compact={!isOwnTable}
                  />
                </CompactProgressWrapper>
                <CompactControlsWrapper>
                  <Controls maxValue={elcala.maxLife} onChange={handleLifeChange(elcala)} />
                </CompactControlsWrapper>
              </CompactWrapper>
            );
          })}
        </ListWrapper>
      )}
    </Wrapper>
  );
};
