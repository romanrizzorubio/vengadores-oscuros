import { useMemo } from 'react';
import { Bar, Container, Content, Value } from './Progress.styles';
import { StatusBarDict } from '../../types/Dicts';

export type ProgressProps = {
  percentage: number;
  value?: number;
  maxValue?: number;
  invert?: boolean;
  label?: string;
  hasBackground?: boolean;
  compact?: boolean;
};

export const Progress = ({
  percentage,
  value,
  maxValue,
  label,
  invert = false,
  hasBackground = false,
  compact = false,
}: ProgressProps) => {
  const status = useMemo(() => {
    if (invert) {
      if (percentage < 33) {
        return StatusBarDict.HIGH;
      } else if (percentage < 66) {
        return StatusBarDict.MEDIUM;
      }
    } else {
      if (percentage > 66) {
        return StatusBarDict.HIGH;
      } else if (percentage > 33) {
        return StatusBarDict.MEDIUM;
      }
    }

    return StatusBarDict.LOW;
  }, [percentage, invert]);

  return (
    <Container $hasBackground={hasBackground} $compact={compact}>
      <Bar $percentage={percentage} $status={status} />
      <Content $compact={compact}>
        <Value>
          {value !== undefined ? (maxValue !== undefined ? `${value} / ${maxValue}` : value) : percentage}
          {label && ` (${label})`}
        </Value>
      </Content>
    </Container>
  );
};
