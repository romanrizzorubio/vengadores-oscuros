import { Wrapper } from './ExposedPhase.styles';
import { PanelTypeDict } from '../../types/Dicts';
import { Panel } from '../../components/Panel/Panel';
import { useExposed } from '../../hooks/useExposed';

export type ExposedPhaseProps = {
  readOnly?: boolean;
};

export const ExposedPhase = ({ readOnly = false }: ExposedPhaseProps) => {
  const {
    ironPatriotLife,
    ironPatriotLifeValue,
    ironPatriotMaxLife,
    exposedThreat,
    exposedThreatValue,
    exposedThreatMax,
    changeIronPatriotLife,
    changeExposedThreat,
  } = useExposed();

  return (
    <Wrapper>
      <Panel
        type={PanelTypeDict.IRON_PATRIOT}
        progress={{
          percentage: ironPatriotLife,
          value: ironPatriotLifeValue,
          maxValue: ironPatriotMaxLife,
          label: 'Vida',
        }}
        controls={
          readOnly
            ? undefined
            : { onChange: changeIronPatriotLife, maxValue: ironPatriotMaxLife }
        }
        hasBackground={readOnly}
      />
      <Panel
        type={PanelTypeDict.EXPOSED}
        progress={{
          percentage: exposedThreat,
          value: exposedThreatValue,
          maxValue: exposedThreatMax,
          label: 'Amenaza',
        }}
        controls={
          readOnly
            ? undefined
            : { onChange: changeExposedThreat, maxValue: exposedThreatMax }
        }
        hasBackground={readOnly}
      />
    </Wrapper>
  );
};
