import styled, { DefaultTheme } from 'styled-components';
import { Size, SizeDict } from '../../types/Dicts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledInput = styled.input<{ $size: Size }>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: 0.5rem;
  font-size: ${({ $size, theme }: { $size: Size; theme: DefaultTheme }) => {
    const sizes: Record<Size, string> = {
      [SizeDict.S]: theme.typography.sizes.M,
      [SizeDict.M]: theme.typography.sizes.L,
      [SizeDict.L]: theme.typography.sizes.XL,
    };

    return sizes[$size];
  }};
`;
