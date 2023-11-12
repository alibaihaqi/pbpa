import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        keyFields: ['contact'],
        fields: {
          contact: {
            ...offsetLimitPagination(),
            merge(existing = [], incoming: any) {
              return [...existing, ...incoming];
            },
          },
          
        }
      }
    }
  }),
  connectToDevTools: JSON.parse(process.env.NEXT_PUBLIC_GRAPHQL_DEV_TOOLS || 'false'),
})
