import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
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

const Home = () => {
  return (
    <Query query={GET_NOTES} fetchPolicy="network-only">
      {/* add the fetchMore argument */}
      {({ data, loading, error, fetchMore }) => {
        // if the data is loading, our app will display a loading message
        if (loading) return 'Loading...';
        // if there is an error fetching the data, display an error message
        if (error) return `Error! ${error.message}`;
        // else if the data is successful, return the feed of notes
        return (
          // add a <React.Fragment> element to provide a parent element
          <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* Only display the Load More button if hasNextPage is true */}
            {data.noteFeed.hasNextPage && (
              //  onClick peform a query, passing the current cursor as a variable
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      cursor: data.noteFeed.cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return {
                        noteFeed: {
                          cursor: fetchMoreResult.noteFeed.cursor,
                          hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                          // combine the new results and the old
                          notes: [
                            ...previousResult.noteFeed.notes,
                            ...fetchMoreResult.noteFeed.notes
                          ],
                          __typename: 'noteFeed'
                        }
                      };
                    }
                  })
                }
              >
                Load more
              </Button>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Home;
