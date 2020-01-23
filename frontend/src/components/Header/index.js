import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Profile } from './styles';

import logo from '~/assets/logo_gympoint.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div>
        <img src={logo} alt="GymPoint" />
        <nav>
          <ul>
            <li>ALUNOS</li>
            <li>PLANOS</li>
            <li>MATRÍCULAS</li>
            <li>PEDIDOS DE AUXÍLIO</li>
          </ul>
        </nav>
      </div>

      <Profile>
        <strong>Nome do Usuario</strong>
        <a href="/" onClick={handleSignOut}>
          sair do sistema
        </a>
      </Profile>
    </Container>
  );
}
