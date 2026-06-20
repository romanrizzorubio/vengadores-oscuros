import { Wrapper } from './ShipFallPhase.styles';
import { PanelTypeDict, SizeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useShip } from '../../hooks/useShip';
import { useVeranke } from '../../hooks/useVeranke';

export type ShipFallPhaseProps = {
  readOnly?: boolean;
};

export const ShipFallPhase = ({ readOnly }: ShipFallPhaseProps) => {
  const { ship, shipValue, addShipCounter } = useShip();
  const { completed, complete, exposed, exposedValue, exposedMax, changeExposed } = useVeranke();
  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.SHIP_FALL}
        progress={{ percentage: ship, value: shipValue, maxValue: 1, label: 'Tiempo' }}
        hasBackground={readOnly}
        buttons={
          readOnly
            ? undefined
            : {
                label: 'Quitar contador',
                size: SizeDict.M,
                onClick: addShipCounter,
              }
        }
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
