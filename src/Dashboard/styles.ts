import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
  flex-direction: row;
  height: ${RFPercentage(42)}px;
  justify-content: center;
  width: 100%;
`;

export const UserWrapper = styled.View`
  padding: 0 24px;
  width: 100%;
`;

export const UserInfo = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Photo = styled.Image`

`;

export const User = styled.View`

`;

export const UserGreeting = styled.Text`

`;

export const UserName = styled.Text`

`;
