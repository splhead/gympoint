import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Profile, LogoMenuContainer, LogoContainer } from './styles';

import logo from '~/assets/logo_gympoint.png';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <LogoMenuContainer>
        <LogoContainer>
          <img src={logo} alt="GymPoint" />
        </LogoContainer>
        <nav>
          <ul>
            <li>
              <NavLink to="/students" activeClassName="selected" exact>
                ALUNOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/plans" activeClassName="selected" exact>
                PLANOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/registrations" activeClassName="selected" exact>
                MATRÍCULAS
              </NavLink>
            </li>
            <li>
              <NavLink to="/help-orders" activeClassName="selected" exact>
                PEDIDOS DE AUXÍLIO
              </NavLink>
            </li>
          </ul>
        </nav>
      </LogoMenuContainer>

      <Profile>
        <strong>{profile.name}</strong>
        <a href="/" onClick={handleSignOut}>
          sair do sistema
        </a>
      </Profile>
    </Container>
  );
}
