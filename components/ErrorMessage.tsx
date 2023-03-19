import { Row, Text } from "@nextui-org/react";
import React from "react";

const ErrorMessage = (props: any) => {
  return (
    <Row justify="center">
      <Text data-testid="error-message-box" h4 color="error">
        {props.message}
      </Text>
    </Row>
  );
};

export default ErrorMessage;
