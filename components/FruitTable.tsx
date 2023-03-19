import { useState } from "react";
import { useQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ErrorReminderBox from "@/components/ErrorReminderBox";
import ErrorMessage from "@/components/ErrorMessage";
import { Table, Container, Spacer, Row, Col } from "@nextui-org/react";
import { GET_ALL_FRUITS_QUERY } from "@/graphql/queries";
import CreateFruitForm from "./Forms/CreateFruitForm";
import DeleteFruitForm from "./Forms/DeleteFruitForm";
import RemoveFruitForm from "./Forms/RemoveFruitForm";
import StoreFruitForm from "./Forms/StoreFruitForm";
import UpdateFruitForm from "./Forms/UpdateFruitForm";
import { Text } from "@nextui-org/react";

interface Fruit {
  name: string;
  description: string;
  limit: number;
}

export default function FruitList() {
  const { data } = useQuery(GET_ALL_FRUITS_QUERY);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div className={styles.center}>
      <Container fluid>
        <Row justify="center">
          <Text
            h2
            weight="bold"
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            Backedn APIs (Test Only)
          </Text>
        </Row>
        <Spacer y={5} />
        {/* Section 1 - New Fruit Input Form */}
        <Row justify="center">
          <Col>
            <CreateFruitForm onError={handleErrorMessage} />
          </Col>
          <Spacer x={1} />
          <Col>
            <UpdateFruitForm onError={handleErrorMessage} />
          </Col>
          <Spacer x={1} />
          <Col>
            <StoreFruitForm onError={handleErrorMessage} />
          </Col>
          <Spacer x={1} />
          <Col>
            <RemoveFruitForm onError={handleErrorMessage} />
          </Col>
          <Spacer x={1} />
          <Col>
            <DeleteFruitForm onError={handleErrorMessage} />
          </Col>
        </Row>

        <Spacer y={2} />

        {/* Section 2 - Fruit Table */}
        <Row justify="center">
          <Col span={12}>
            <Table
              bordered
              lined
              headerLined
              shadow={false}
              aria-label="Example static bordered collection table"
            >
              <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Description</Table.Column>
                <Table.Column>Limit</Table.Column>
              </Table.Header>
              <Table.Body>
                {data?.getAllFruits.map((fruit: Fruit) => (
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
