import { gql } from "@apollo/client";

export const CREATE_FRUIT_MUTATION = gql`
  mutation ($name: String!, $description: String!, $limit: Int!) {
    createFruit(name: $name, description: $description, limit: $limit) {
      name
      description
      limit
    }
  }
`;

export const UPDATE_FRUIT_MUTATION = gql`
  mutation ($name: String!, $description: String!, $limit: Int!) {
    updateFruit(name: $name, description: $description, limit: $limit) {
      name
      description
      limit
    }
  }
`;

export const DELETE_FRUIT_MUTATION = gql`
  mutation ($name: String!, $forceDelete: Boolean) {
    deleteFruit(name: $name, forceDelete: $forceDelete) {
      name
    }
  }
`;

export const STORE_FRUIT_MUTATION = gql`
  mutation ($name: String!, $amount: Int!) {
    storeFruit(name: $name, amount: $amount) {
      name
    }
  }
`;

export const REMOVE_FRUIT_MUTATION = gql`
  mutation ($name: String!, $amount: Int!) {
    removeFruit(name: $name, amount: $amount) {
      name
    }
  }
`;
