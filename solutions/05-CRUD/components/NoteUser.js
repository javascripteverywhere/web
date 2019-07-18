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
        return (
          <React.Fragment>
            <FavoriteNote
              me={data.me}
              noteId={props.note.id}
              favoriteCount={props.note.favoriteCount}
            />
            <br />
            {data.me.id === props.note.author.id && (
              <React.Fragment>
                <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
                <DeleteNote noteId={props.note.id} />
              </React.Fragment>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default NoteUser;
