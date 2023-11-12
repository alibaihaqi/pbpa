import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  connectToDevTools: JSON.parse(process.env.NEXT_PUBLIC_GRAPHQL_DEV_TOOLS || 'false'),
})
