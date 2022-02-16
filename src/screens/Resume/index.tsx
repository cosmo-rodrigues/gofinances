import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { TransactionCardDataProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { currecyFormat } from '../Dashboard';

import { Container, Header, Title, Content } from './styles';

const dataKey = '@gofinances:transactions';

interface CategoryHistoryData {
    key: string;
    categoryName: string;
    total: string;
    color: string;
}

export const Resume = () => {

    const [categoriesHistoryData, setCategoriesHistoryData] = useState<CategoryHistoryData[]>([] as CategoryHistoryData[]);

    const loadData = async () => {
        const response = await AsyncStorage.getItem(dataKey);
        const formattedResponse = response ? JSON.parse(response) as TransactionCardDataProps[] : [] as TransactionCardDataProps[];

        const outTransactions = formattedResponse.filter(item => item.transactionType === 'out');

        const totalByCategory: CategoryHistoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outTransactions.forEach(transaction => {
                if (transaction.category === category.key) {
                    categorySum += Number(transaction.amount);
                }
            });

            if (categorySum > 0) {
                totalByCategory.push({
                    key: category.key,
                    categoryName: category.name,
                    total: currecyFormat(categorySum),
                    color: category.color
                });
            }
        });

        console.log(totalByCategory);

        setCategoriesHistoryData(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content>
                {categoriesHistoryData.map(item => (
                    <HistoryCard
                        key={item.key}
                        title={item.categoryName}
                        amount={item.total}
                        color={item.color} />
                ))}
            </Content>
        </Container>
    );
}