import { gql } from "@apollo/client";

export const GET_ALL_FRUITS_QUERY = gql`
  query {
    getAllFruits {
      name
      description
      limit
    }
  }
`;

export const GET_FRUIT_BY_NAME_QUERY = gql`
  query ($name: String!) {
    getFruitByName(name: $name) {
      name
      description
      limit
    }
  }
`;
