import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// import our logged in user UI components
import NoteUser from './NoteUser';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the note meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'Favorites' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img src={note.author.avatar} alt="user avatar" height="50px" />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <UserActions>
                  <NoteUser note={note} />
                </UserActions>
              );
            } else {
              return (
                <UserActions>
                  <em>Favorites:</em> {note.favoriteCount}
                </UserActions>
              );
            }
          }}
        </Query>
      </MetaData>
      <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note;
