import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import HighlightCard from '../../components/HighlightCard';
import { TransactionCard, TransactionCardDataProps } from '../../components/TransactionCard';

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
  LoggoutButton,
  HighlightCards,
  Transactions,
  TransactionsTitle,
  TransactionList,
  LoadingContainer
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
const dataKey = '@gofinances:transactions';

export const currecyFormat = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const dateFormtat = (date: Date) => {
  return Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(date);
};

interface HighlightCardProps {
  total: string;
  subtitle:string;
}

interface HighlightData {
  in: HighlightCardProps;
  out: HighlightCardProps;
  balance: HighlightCardProps;
}

enum ScreenStatus {
  Loading,
  Ready
}

const getLastTransactionDate = (transactions: TransactionCardDataProps[]): string => {
  const lastTimeStamp = Math.max.apply(Math, transactions.map(item => new Date(item.date).getTime()));
  return `${new Date(lastTimeStamp).getDate()} de ${new Date(lastTimeStamp).toLocaleDateString('pt-BR', {month:'long'})}`;
}

export const Dashboard = () => {

  const [transactions, setTransactions] = useState<TransactionCardDataProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [screenStatus, setScreenStatus] = useState<ScreenStatus>(ScreenStatus.Loading);
  const theme = useTheme();

  let inTotal = 0;
  let outTotal = 0;


  const loadTransactions = async () => {
    setScreenStatus(ScreenStatus.Loading);
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsStoraged = response ? JSON.parse(response) as TransactionCardDataProps[] : [] as TransactionCardDataProps[];

    const formattedTransactions: TransactionCardDataProps[] = transactionsStoraged
      .map((item: TransactionCardDataProps) => {

        if (item.transactionType === 'in') inTotal += Number(item.amount);
        if (item.transactionType === 'out') outTotal += Number(item.amount);

        const formattedAmount = currecyFormat(Number(item.amount));
        const formattedDate = dateFormtat(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount: formattedAmount,
          transactionType: item.transactionType,
          category: item.category,
          date: formattedDate
        }

      });

    const lastTransactionInDate = getLastTransactionDate(transactionsStoraged.filter(item => item.transactionType === 'in'));
    const lastTransactionOutDate = getLastTransactionDate(transactionsStoraged.filter(item => item.transactionType === 'out'));
    const lastTransactionAllDate = getLastTransactionDate(transactionsStoraged);
    const balanceInterval = `01 à ${lastTransactionAllDate}`;

    setHighlightData({
      in: {
        total: currecyFormat(inTotal),
        subtitle:`Última entrada ${lastTransactionInDate}`
      },
      out: {
        total: currecyFormat(outTotal),
        subtitle:`Última saída ${lastTransactionOutDate}`
      },
      balance: {
        total: currecyFormat(inTotal - outTotal),
        subtitle:balanceInterval
      }
    });

    inTotal = 0;
    outTotal = 0;

    setTransactions(formattedTransactions);
    setScreenStatus(ScreenStatus.Ready);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  if (screenStatus === ScreenStatus.Loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size='large' />
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/58959268?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Paulo</UserName>
            </User>
          </UserInfo>
          <LoggoutButton onPress={() => { }}>
            <Icon name="power" />
          </LoggoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="in"
          title="Entradas"
          amount={highlightData.in.total}
          lastTransaction={highlightData.in.subtitle} />
        <HighlightCard
          type="out"
          title="Saídas"
          amount={highlightData.out.total}
          lastTransaction={highlightData.out.subtitle}  />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.balance.total}
          lastTransaction={highlightData.balance.subtitle}  />
      </HighlightCards>

      <Transactions>
        <TransactionsTitle>Listagem</TransactionsTitle>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}