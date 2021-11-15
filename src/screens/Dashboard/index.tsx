import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12000',
      category: {
        key: 'salary',
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
        key: 'salary',
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
        key: 'purchases',
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
          amount='R$12000'
          lastTransaction='Site'
        />
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$15000'
          lastTransaction='Aplicativo'
        />
        <HighlightCard
          type='down'
          title='Saída'
          amount='R$7000'
          lastTransaction='Computador'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
