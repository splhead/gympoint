import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;

  h1 {
    color: #444;
  }

  aside {
    display: flex;
    align-items: center;

    form {
      height: 40px;
      border-radius: 4px;
      margin-left: 16px;
      border: 1px solid #ccc;
      background: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }

    input {
      width: 100%;
      height: 100%;
      border: 0;
      padding: 0 4px;

      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const RegisterButton = styled.button`
  height: 40px;
  display: flex;
  align-items: center;
  background: #ee4d64;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 20px;
  border: 0;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 4px;
`;

export const StudentTable = styled.table`
  width: 100%;
  line-height: 1.6rem;

  thead th {
    text-align: left;
    color: #444;
  }

  tbody td {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #666;

    a.edit {
      font-size: 15px;
      color: #4d85ee;
      margin-right: 8px;
    }

    a.delete {
      font-size: 15px;
      color: #de3b3b;
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  th.age,
  td.age {
    text-align: center;
  }

  td.actions {
    text-align: right;
  }
`;
