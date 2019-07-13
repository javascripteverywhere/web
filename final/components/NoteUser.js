import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
    }
  }
`;

const NoteUser = props => {
  return (
    <Query query={GET_ME}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        if (data.me.id === props.note.author.id) {
          return (
            <React.Fragment>
              <FavoriteNote
                me={data.me}
                noteId={props.note.id}
                favoriteCount={props.note.favoriteCount}
              />{' '}
              <br />
              <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
              <DeleteNote noteId={props.note.id} />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <FavoriteNote
                me={data.me}
                noteId={props.note.id}
                favoriteCount={props.note.favoriteCount}
              />
            </React.Fragment>
          );
        }
      }}
    </Query>
  );
};

export default NoteUser;
