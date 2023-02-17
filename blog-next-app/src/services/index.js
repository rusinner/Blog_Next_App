import { gql, GraphQLClient } from "graphql-request";

export const getPosts = async () => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: process.env.NEXT_PUBLIC_MY_TOKEN,
    },
  });

  const query = gql`
    query Assets {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result.postConnection;
};
