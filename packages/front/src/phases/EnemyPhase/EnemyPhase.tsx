import { Wrapper } from './EnemyPhase.styles';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useEnemy } from '../../hooks/useEnemy';
import { useVeranke } from '../../hooks/useVeranke';
import { useGameContext } from '../../contexts/GameContext';

export type EnemyPhaseProps = {
  readOnly?: boolean;
};

export const EnemyPhase = ({ readOnly = false }: EnemyPhaseProps) => {
  const { enemy, enemyValue, changeEnemy } = useEnemy();
  const { data } = useGameContext();
  const { completed, complete, exposed, exposedValue, exposedMax, changeExposed } = useVeranke();

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.ENEMY}
        progress={{ percentage: enemy, value: enemyValue, maxValue: data.enemyInit, label: 'Amenaza' }}
        controls={readOnly ? undefined : { onChange: changeEnemy }}
        hasBackground={readOnly}
      />
      {!readOnly && !completed && (
        <Panel
          type={PanelTypeDict.VERANKE}
          buttons={{
            label: 'Completar',
            size: SizeDict.M,
            onClick: complete,
          }}
        />
      )}
      {completed && (
        <Panel
          type={PanelTypeDict.EXPOSED}
          progress={{ percentage: exposed, value: exposedValue, maxValue: exposedMax, label: 'Amenaza' }}
          hasBackground={readOnly}
          controls={
            readOnly
              ? undefined
              : {
                  onChange: changeExposed,
                  maxValue: exposedMax,
                }
          }
        />
      )}
    </Wrapper>
  );
};
