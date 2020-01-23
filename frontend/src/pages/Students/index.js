import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';

import { MdAdd, MdSearch } from 'react-icons/md';

import {
  Container,
  Header,
  RegisterButton,
  Content,
  StudentTable,
} from './styles';

export default function Students() {
  //api.get('students');
  return (
    <Container>
      <Header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="">
            <RegisterButton>
              <MdAdd size={20} color="#fff" />
              &nbsp; CADASTRAR
            </RegisterButton>
          </Link>
          <Form>
            <MdSearch size={20} color="#999" />
            <Input name="search" placeholder="Buscar aluno" />
          </Form>
        </aside>
      </Header>
      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th className="age">IDADE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fulano de tal</td>
              <td>fulando@gmail.com</td>
              <td className="age">24</td>
              <td className="actions">
                <a href="#" className="edit">
                  editar
                </a>
                <a href="#" className="delete">
                  apagar
                </a>
              </td>
            </tr>
            <tr>
              <td>Fulano de tal</td>
              <td>fulando@gmail.com</td>
              <td className="age">24</td>
              <td className="actions">
                <a href="#" className="edit">
                  editar
                </a>
                <a href="#" className="delete">
                  apagar
                </a>
              </td>
            </tr>
          </tbody>
        </StudentTable>
      </Content>
    </Container>
  );
}
