import React from 'react';
// import our GraphQL dependencies
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

// import the NoteForm component
import NoteForm from '../components/NoteForm';

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
    me {
      id
    }
  }
`;

const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
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

const EditNote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  return (
    // make our query using the ID found in the URL
    <Query query={GET_NOTE} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...';
        // if there's an error, display this message to the user
        if (error) return <p>Error! Note not found</p>;
        // if the current user and the author of the note do not match
        if (data.me.id !== data.note.author.id) {
          return <p>You do not have access to edit this note</p>;
        }
        return (
          <Mutation
            mutation={EDIT_NOTE}
            // pass our variables to the mutation
            variables={{ id, content: data.note.content }}
            // if the mutation is successful, redirect to the note's page
            onCompleted={data => {
              if (data) {
                props.history.push(`/note/${data.updateNote.id}`);
              }
            }}
          >
            {(updateNote, { loading, error }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              // pass the data and mutation to the form component
              return (
                <NoteForm content={data.note.content} action={updateNote} />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default EditNote;
