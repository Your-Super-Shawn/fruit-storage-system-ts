import { Row } from "@nextui-org/react";
import React from "react";

const ErrorReminderBox = (props: any) => {
  return (
    <Row data-testid="error-reminder-box" justify="center">
      {props.children}
    </Row>
  );
};

export default ErrorReminderBox;
