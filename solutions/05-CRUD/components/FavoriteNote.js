import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import ButtonAsLink from './ButtonAsLink';

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

const FavoriteNote = props => {
  // store the note's favorite count as state
  const [count, setCount] = useState(props.favoriteCount);

  // store if the user has favorited the note as state
  const [favorited, setFavorited] = useState(
    // check if the note exists in the user favorites list
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  return (
    <Mutation mutation={TOGGLE_FAVORITE} variables={{ id: props.noteId }}>
      {(toggleFavorite, { error }) => {
        if (error) return 'Error!';
        return (
          <React.Fragment>
            {favorited ? (
              <ButtonAsLink
                onClick={() => {
                  toggleFavorite();
                  setFavorited(false);
                  setCount(count - 1);
                }}
              >
                Remove Favorite
              </ButtonAsLink>
            ) : (
              <ButtonAsLink
                onClick={() => {
                  toggleFavorite();
                  setFavorited(true);
                  setCount(count + 1);
                }}
              >
                Add Favorite
              </ButtonAsLink>
            )}
            : {count}
          </React.Fragment>
        );
      }}
    </Mutation>
  );
};

export default FavoriteNote;
