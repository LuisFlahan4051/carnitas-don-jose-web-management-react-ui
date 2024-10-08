import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const uri = 'http://localhost:8080' 
//const uri = 'http://192.168.0.16:8080/'
const httpLink = createHttpLink({
    uri,
    credentials: 'same-origin',
    
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    credentials: 'include'
}) 
export const URIAPI = uri