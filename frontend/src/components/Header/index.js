import React from 'react';

import { Container } from './styles';

import logo from '~/assets/logo_gympoint.png';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="GymPoint" />
      <nav>
        <ul>
          <li>ALUNOS</li>
          <li>PLANOS</li>
          <li>MATRÍCULAS</li>
          <li>PEDIDOS DE AUXÍLIO</li>
        </ul>
      </nav>
    </Container>
  );
}
