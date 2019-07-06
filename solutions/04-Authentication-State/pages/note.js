import React from 'react';
// import our GraphQL dependencies
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// import the Note component
import Note from '../components/Note';

// our note query, which accepts an ID variable
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const NotePage = ({ match }) => {
  // store the id found in the url as a variable
  const id = match.params.id;
  return (
    // make our query using the ID found in the URL
    <Query query={GET_NOTE} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...';
        // if there's an error, display this message to the user
        if (error) return <p>Error! Note not found</p>;
        // if successful, pass the data to the note component
        return (
          <div>
            <Note note={data.note} />
          </div>
        );
      }}
    </Query>
  );
};

export default NotePage;
