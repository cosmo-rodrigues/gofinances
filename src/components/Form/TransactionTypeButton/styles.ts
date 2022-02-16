import {RectButton} from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps{
    type: 'up' | 'down';
}

interface IconProps extends TypeProps{}

interface ContainerProps extends TypeProps{
    isActive:boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border-radius: 5px;

  ${({isActive, type, theme}) => isActive && css`
  background-color: ${type === 'up' ? theme.colors.success_light : theme.colors.attention_light};
  `};

  ${({isActive}) => !isActive && css`
  border: 1px solid ${({ theme }) => theme.colors.text};
  `};
`;

export const Button = styled(RectButton)`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather) <IconProps>`
font-size: ${RFValue(24)}px;
margin-right: 12px;
color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
