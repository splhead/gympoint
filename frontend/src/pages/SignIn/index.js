import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';
import logo from '../../assets/gympoint.png';

export default function SignIn() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="GymPoint" />
        <label for="email">SEU EMAIL</label>
        <Input name="email" placeholder="exemplo@email.com" />
        <label for="password">SUA SENHA</label>
        <Input name="password" placeholder="********" />

        <button type="button">Entrar no Sistema</button>
      </Content>
    </Container>
  );
}
