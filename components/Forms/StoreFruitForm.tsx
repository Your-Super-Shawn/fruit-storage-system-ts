import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Button, Spacer } from "@nextui-org/react";
import { GET_ALL_FRUITS_QUERY } from "@/graphql/queries";
import { STORE_FRUIT_MUTATION } from "@/graphql/mutations";

interface Props {
  onError: (message: string) => void;
}

export default function StoreFruitForm(props: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const [storeFruit] = useMutation(STORE_FRUIT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_FRUITS_QUERY }],
    onCompleted: () => {
      props.onError("");
    },
    onError: (error) => {
      props.onError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await storeFruit({ variables: { name, amount } });
    setName("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Spacer y={0.5} />
      <Input
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <Spacer y={1} />
      <Button type="submit" color="success">
        Store
      </Button>
    </form>
  );
}
