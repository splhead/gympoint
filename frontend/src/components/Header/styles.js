import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
      border-right: 1px solid #ccc;
    }

    li {
      display: inline;
      margin-right: 24px;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
`;
