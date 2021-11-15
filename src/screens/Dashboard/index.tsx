import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

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
  TransactionList,
  LogoutButton,
  LoadContainer,
} from './styles';

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12000',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '13/04/2020',
    },
    {
      type: 'positive',
      title: 'Desenvolvimento de App',
      amount: 'R$ 15000',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '10/07/2020',
    },
    {
      type: 'negative',
      title: 'McBook Pro',
      amount: 'R$ 7000',
      category: {
        name: 'Compra',
        icon: 'dollar-sign',
      },
      date: '12/02/2020',
    },
  ];
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

      <Transactions>
        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
