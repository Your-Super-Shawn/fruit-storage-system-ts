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
import { GET_ALL_FRUITS_QUERY } from "@/graphql/queries";
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
  const { data, refetch } = useQuery(GET_ALL_FRUITS_QUERY);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };

  return (
    <div className={styles.center}>
      <Container fluid>
        {/* Section 1 - New Fruit Input Form */}
        <Row justify="center">
          <Col>
            <CreateFruitForm />
          </Col>
          <Spacer x={1} />
          <Col>
            <UpdateFruitForm />
          </Col>
          <Spacer x={1} />
          <Col>
            <StoreFruitForm />
          </Col>
          <Spacer x={1} />
          <Col>
            <RemoveFruitForm />
          </Col>
          <Spacer x={1} />
          <Col>
            <DeleteFruitForm />
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
        {/* Section 3 - Error Message */}
        <Row justify="center">
          <Col span={12}>
            <ErrorReminderBox>
              <ErrorMessage message={errorMessage} />
            </ErrorReminderBox>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
