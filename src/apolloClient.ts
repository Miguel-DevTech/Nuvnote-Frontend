// src/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'https://taskfy-react-backend.onrender.com/graphql', // ✅ link do back-end já em produção
    credentials: 'include', // ✅ necessário para enviar cookies com requisições
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
