import React from 'react';
import {
    Container,
    Header,
    Title,
    Icon,
    Content,
    Amount,
    LastTrnsaction
} from './styles';

interface HighlightCardProps {
    type: 'in' | 'out' | 'total',
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    in: 'arrow-up-circle',
    out: 'arrow-down-circle',
    total: 'dollar-sign'
}

const HighlightCard = ({ type, title, amount, lastTransaction }: HighlightCardProps) => {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>
            <Content>
                <Amount type={type}>{amount}</Amount>
                <LastTrnsaction type={type}>{lastTransaction}</LastTrnsaction>
            </Content>
        </Container>
    );
}

export default HighlightCard;