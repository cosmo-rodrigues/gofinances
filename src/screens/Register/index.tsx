import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Button from '../../components/Form/Button';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import InputForm from '../../components/Form/InputForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

const dataKey = '@gofinances:transactions';
interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number().typeError('Informa um valor numérico')
    .positive('O valor não pode ser negativo. Escolha Outcome')
    .required('O valor é obrigatório')
});

export const Register = () => {

  const [transactionType, setTransactionType] = useState<'int' | 'out'>('out');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { control, handleSubmit, formState, reset } = useForm({ resolver: yupResolver(schema) });

  const { navigate } = useNavigation();

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  const handleRegister = async (form: FormData) => {

    if (!transactionType) return Alert.alert('Selecione o tipo da transação');
    if (category.key === 'category') return Alert.alert('Selecione a categoria');

    const { name, amount } = form;

    const newTrasaction = {
      id: String(uuid.v4()),
      name,
      amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTrasaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('out');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar!');
    }

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name={'name'}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={formState.errors.name && formState.errors.name.message}
            />
            <InputForm
              control={control}
              name={'amount'}
              placeholder="Preço"
              keyboardType="decimal-pad"
              error={formState.errors.amount && formState.errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => setTransactionType('in')}
                isActive={transactionType === 'in'} />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => setTransactionType('out')}
                isActive={transactionType === 'out'} />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}