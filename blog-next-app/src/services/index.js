import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: process.env.NEXT_PUBLIC_MY_TOKEN,
  },
});
export const getPosts = async () => {
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

  return result.postsConnection;
};

export const getRecentPosts = async () => {
  const query = gql`
  query getPostDetails()
  {posts(
    orderBy:createdAt_ASC
    last:3
    
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
    }
  `;
  const result = await graphQLClient.request(query);

  return result.posts;
};

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await graphQLClient.request(query);

  return result.posts;
};
