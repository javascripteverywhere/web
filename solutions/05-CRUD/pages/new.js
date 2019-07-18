import React, { useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import NoteForm from '../components/NoteForm';

// our new note query
const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const NewNote = props => {
  useEffect(() => {
    // update the document title
    document.title = 'New Note — Notedly';
  });

  return (
    <Mutation
      mutation={NEW_NOTE}
      // if the mutation is successful, redirect to the note's page
      onCompleted={data => {
        if (data) {
          props.history.push(`note/${data.newNote.id}`);
        }
      }}
    >
      {(newNote, { loading, error }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <NoteForm action={newNote} />;
      }}
    </Mutation>
  );
};

export default NewNote;
