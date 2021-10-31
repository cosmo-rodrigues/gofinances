import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  // TransactionList,
  LogoutButton,
  LoadContainer,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/69174761?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Cosmo</UserName>
            </User>
          </UserInfo>

          <Icon name='power' />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$1700'
          lastTransaction='Bônus mensal'
        />
      </HighlightCards>
    </Container>
  );
}
