import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Table,
  Input,
  Button,
  Container,
  Spacer,
  Grid,
} from "@nextui-org/react";
import {
  GET_ALL_FRUITS_QUERY,
  GET_FRUIT_BY_NAME_QUERY,
} from "@/graphql/queries";
import {
  CREATE_FRUIT_MUTATION,
  UPDATE_FRUIT_MUTATION,
  DELETE_FRUIT_MUTATION,
  STORE_FRUIT_MUTATION,
  REMOVE_FRUIT_MUTATION,
} from "@/graphql/mutations";

interface Fruit {
  name: string;
  description: string;
  limit: number;
}

export default function FruitList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(0);

  const { data, loading, error, refetch } = useQuery(GET_ALL_FRUITS_QUERY);

  const [createFruit] = useMutation(CREATE_FRUIT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_FRUITS_QUERY }],
  });

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "description",
      label: "DESCRIPTION",
    },
    {
      key: "limit",
      label: "LIMIT",
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createFruit({ variables: { name, description, limit } });
    setName("");
    setDescription("");
    setLimit(0);
    refetch(); // Refresh the fruit list after creating a new fruit
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Container fluid>
        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={12} md={4}>
            <form onSubmit={handleSubmit}>
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                type="number"
                label="Limit"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              />
              <Spacer y={1} />
              <Button type="submit">Create Fruit</Button>
            </form>
          </Grid>
          <Grid xs={12} md={8}>
            <Spacer y={2} />
            <Table
              bordered
              shadow={false}
              selectionMode="multiple"
              aria-label="Example static bordered collection table"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              <Table.Body>
                {data.getAllFruits.map((fruit: Fruit) => (
                  <Table.Row key={fruit.name}>
                    <Table.Cell>{fruit.name}</Table.Cell>
                    <Table.Cell>{fruit.description}</Table.Cell>
                    <Table.Cell>{fruit.limit}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
