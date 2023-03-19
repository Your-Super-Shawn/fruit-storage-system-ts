import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ErrorReminderBox from "@/components/ErrorReminderBox";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Table,
  Input,
  Button,
  Container,
  Spacer,
  Grid,
  Row,
  Col,
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
import CreateFruitForm from "./Forms/CreateFruitForm";
import DeleteFruitForm from "./Forms/DeleteFruitForm";
import RemoveFruitForm from "./Forms/RemoveFruitForm";
import StoreFruitForm from "./Forms/StoreFruitForm";
import UpdateFruitForm from "./Forms/UpdateFruitForm";

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
    <div className={styles.center}>
      <Container fluid>
        {/* Section 1 - New Fruit Input Form */}
        <Row justify="center">
          <Col>
            <CreateFruitForm onSuccess={() => refetch()} />
          </Col>
          <Spacer x={1} />
          <Col>
            <UpdateFruitForm onSuccess={() => refetch()} />
          </Col>
          <Spacer x={1} />
          <Col>
            <StoreFruitForm onSuccess={() => refetch()} />
          </Col>
          <Spacer x={1} />
          <Col>
            <RemoveFruitForm onSuccess={() => refetch()} />
          </Col>
          <Spacer x={1} />
          <Col>
            <DeleteFruitForm onSuccess={() => refetch()} />
          </Col>
        </Row>

        <Spacer y={2} />

        {/* Section 2 - Fruit Table */}
        <Row justify="center">
          <Col span={12}>
            <Table
              bordered
              shadow={false}
              selectionMode="multiple"
              aria-label="Example static bordered collection table"
            >
              <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Description</Table.Column>
                <Table.Column>Limit</Table.Column>
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
          </Col>
        </Row>
        <Spacer y={2} />
        <Row justify="center">
          <Col span={12}>
            <ErrorReminderBox>
              <ErrorMessage message={"Test!"} />
            </ErrorReminderBox>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
