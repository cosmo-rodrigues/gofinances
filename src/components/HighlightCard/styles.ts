import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'in' | 'out' | 'total'
}

interface IconProps extends TypeProps{

}

interface ContainerProps extends TypeProps{

}

interface TitleProps extends TypeProps{

}

interface AmountProps extends TypeProps{

}

interface LastTransactionProps extends TypeProps{

}

export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme, type }) => 
  type === 'total'? theme.colors.secondary:theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
  type === 'total'? theme.colors.shape:theme.colors.text_dark};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;
  ${({ type }) => type === 'in' && css`
  color: ${({ theme }) => theme.colors.success};
  `};
  ${({ type }) => type === 'out' && css`
  color: ${({ theme }) => theme.colors.attention};
  `};
  ${({ type }) => type === 'total' && css`
  color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Content = styled.View`
  
`;

export const Amount = styled.Text<AmountProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
  type === 'total'? theme.colors.shape:theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTrnsaction = styled.Text<LastTransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
  type === 'total'? theme.colors.shape:theme.colors.text};
`;
