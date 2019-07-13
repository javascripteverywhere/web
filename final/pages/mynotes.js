import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import NoteFeed from '../components/NoteFeed';

const GET_MY_NOTES = gql`
  query me {
    me {
      id
      username
      notes {
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
  }
`;

const MyNotes = props => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedly';
  });

  return (
    <Query query={GET_MY_NOTES} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        // if the data is loading, our app will display a loading message
        if (loading) return 'Loading...';
        // if there is an error fetching the data, display an error message
        if (error) return `Error! ${error.message}`;
        // if the query is successful and there are notes, return the feed of notes
        // else if the query is successful and there aren't notes, display a message
        if (data.me.notes.length !== 0) {
          return <NoteFeed notes={data.me.notes} />;
        } else {
          return <p>No notes yet</p>;
        }
      }}
    </Query>
  );
};

export default MyNotes;
