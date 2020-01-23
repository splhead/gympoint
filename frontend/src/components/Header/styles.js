import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
`;

export const LogoMenuContainer = styled.div`
  display: flex;
  align-items: center;

  nav {
    margin-left: 40px;
  }

  li {
    display: inline;
    font-size: 16px;
    font-weight: bold;

    a {
      color: #999;
    }

    a.selected {
      color: #444;
    }
  }

  li + li {
    margin-left: 40px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    display: block;
    color: #666;
  }

  a {
    display: block;
    color: #ee4d64;
    margin-top: 8px;
  }
`;

export const LogoContainer = styled.div`
  width: 316px;
  border-right: 1px solid #ccc;
  display: flex;
`;
