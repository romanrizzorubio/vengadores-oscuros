import styled from 'styled-components';

export const Wrapper = styled.div<{ $highlighted?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m};
  padding: ${({ theme, $highlighted }) => ($highlighted ? theme.spacing.m : '0')};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  background-color: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.background.tertiary : 'transparent'};
  border: ${({ theme, $highlighted }) =>
    $highlighted ? `2px solid ${theme.colors.border.tertiary}` : 'none'};
`;

export const Heading = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.L};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const CompactWrapper = styled.div<{
  $highlighted?: boolean;
  $fixedWidth?: boolean;
  $defeated?: boolean;
}>`
  display: ${({ $defeated }) => ($defeated ? 'flex' : 'grid')};
  justify-content: ${({ $defeated }) => ($defeated ? 'center' : 'normal')};
  align-items: ${({ $defeated }) => ($defeated ? 'center' : 'normal')};
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: ${({ theme }) => theme.spacing.s};
  padding: ${({ theme }) => theme.spacing.s};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  background-color: rgba(255, 255, 255, 0.05);
  border: ${({ theme, $highlighted }) =>
    $highlighted
      ? `3px solid ${theme.colors.text.secondary}`
      : `1px solid ${theme.colors.text.secondary}`};
  width: ${({ $fixedWidth }) => ($fixedWidth ? '300px' : 'auto')};
  flex-shrink: 0;
  min-height: ${({ $defeated }) => ($defeated ? '100px' : 'auto')};
`;

export const CompactImageWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const CompactImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.s};
`;

export const CompactTitle = styled.h4<{ $defeated?: boolean }>`
  margin: 0;
  font-size: ${({ theme, $defeated }) => ($defeated ? theme.typography.sizes.L : theme.typography.sizes.S)};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const CompactProgressWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
`;

export const CompactControlsWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
`;

export const ListWrapper = styled.div<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
  flex-wrap: ${({ $horizontal }) => ($horizontal ? 'wrap' : 'nowrap')};
  gap: ${({ theme }) => theme.spacing.s};
  width: 100%;
`;
