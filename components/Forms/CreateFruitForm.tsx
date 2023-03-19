import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Button, Spacer } from "@nextui-org/react";
import { GET_ALL_FRUITS_QUERY } from "@/graphql/queries";
import { CREATE_FRUIT_MUTATION } from "@/graphql/mutations";

interface Props {
  onError: (message: string) => void;
}

export default function CreateFruitForm(props: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(0);

  const [createFruit] = useMutation(CREATE_FRUIT_MUTATION, {
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
    await createFruit({ variables: { name, description, limit } });
    setName("");
    setDescription("");
    setLimit(0);
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
      <Button type="submit">Create</Button>
    </form>
  );
}
