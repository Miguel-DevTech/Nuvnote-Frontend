import { gql } from '@apollo/client';

export const GET_TASKS = gql`
    query GetTasks {
        tasks {
        id
        name
        priority
        done
        }
    }
`;

export const ADD_TASK = gql`
    mutation AddTask($name: String!, $priority: String!) {
        addTask(name: $name, priority: $priority) {
        id
        name
        priority
        done
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id)
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $name: String, $done: Boolean) {
        updateTask(id: $id, name: $name, done: $done) {
        id
        name
        priority
        done
        }
    }
`;
