import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

// our delete note mutation
const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

const DeleteNote = props => {
  return (
    <Mutation
      mutation={DELETE_NOTE}
      variables={{ id: props.noteId }}
      // if the mutation is successful, redirect to the mynote page
      onCompleted={({ deleteNote }) => {
        props.history.push('/mynotes');
      }}
    >
      {deleteNote => {
        return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
      }}
    </Mutation>
  );
};

export default withRouter(DeleteNote);
