import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';
import logo from '../../assets/gympoint.png';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido!')
    .required('O e-mail é necessário!'),
  password: Yup.string().required('A senha é necessária!'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GymPoint" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <label for="email">SEU EMAIL</label>
          <Input name="email" placeholder="exemplo@email.com" />
          <label for="password">SUA SENHA</label>
          <Input type="password" name="password" placeholder="********" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no Sistema'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}
