import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 400px;
  max-width: 500px;
  background: #fff;
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  img {
    height: 122px;
    width: 198px;
    margin-bottom: 24px;
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    input + label {
      margin-top: 8px;
    }

    span {
      margin: 8px 0;
      color: #f76f43;
      font-weight: bold;
    }

    input {
      height: 44px;
      padding: 0 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    button {
      height: 44px;
      font-weight: bold;
      font-size: 16px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #ee4d64;
      margin-top: 8px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }
  }
`;
