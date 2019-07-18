import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = props => {
  return (
    <Query query={IS_LOGGED_IN}>
      {({ data, client }) => (
        <HeaderBar>
          <img src={logo} alt="Notedly Logo" height="40" />
          <LogoText>Notedly</LogoText>
          {/* If logged in display a log out link, else display sign in options */}
          <UserState>
            {data.isLoggedIn ? (
              <ButtonAsLink
                onClick={() => {
                  localStorage.removeItem('token');
                  client
                    .resetStore()
                    // store logged in state
                    .then(() =>
                      client.writeData({ data: { isLoggedIn: false } })
                    )
                    // redirect the user to the homepage
                    .then(() => props.history.push('/'));
                }}
              >
                Logout
              </ButtonAsLink>
            ) : (
              <p>
                <Link to={'/signin'}>Sign In</Link> or{' '}
                <Link to={'/signup'}>Sign Up</Link>
              </p>
            )}
          </UserState>
        </HeaderBar>
      )}
    </Query>
  );
};

export default withRouter(Header);
