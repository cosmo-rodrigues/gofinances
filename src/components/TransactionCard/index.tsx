import React from 'react';
import { categories } from '../../utils/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardDataProps {
    id: string;
    transactionType: 'in' | 'out';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface TransactionCardProps {
    data: TransactionCardDataProps
}

export const TransactionCard = ({ data }: TransactionCardProps) => {

    const { transactionType, name, amount, category, date } = data;
    const categoryData = categories.find(item => item.key === category)!;
    const formattedAmount = transactionType === 'out'?`-${amount}`:amount;

    return (
        <Container>
            <Title>{name}</Title>
            <Amount type={transactionType}>{formattedAmount}</Amount>
            <Footer>
                <Category>
                    <Icon name={categoryData.icon} />
                    <CategoryName>{categoryData.name}</CategoryName>
                </Category>
                <Date>{date}</Date>
            </Footer>
        </Container>
    );
}