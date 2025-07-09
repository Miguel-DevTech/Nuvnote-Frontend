// src/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'https://tasknest-backend-k3lu.onrender.com/graphql',
    credentials: 'include',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;
