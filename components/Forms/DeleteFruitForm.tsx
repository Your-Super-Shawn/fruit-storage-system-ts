import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Button, Spacer } from "@nextui-org/react";
import { GET_ALL_FRUITS_QUERY } from "@/graphql/queries";
import { DELETE_FRUIT_MUTATION } from "@/graphql/mutations";
import { Checkbox } from "@nextui-org/react";

interface Props {
  onError: (message: string) => void;
}

export default function DeleteFruitForm(props: Props) {
  const [name, setName] = useState("");
  const [forceDelete, setForceDelete] = useState(true);

  const [deleteFruit] = useMutation(DELETE_FRUIT_MUTATION, {
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
    await deleteFruit({ variables: { name, forceDelete } });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Spacer y={1} />
      <Checkbox
        defaultSelected
        size="sm"
        isSelected={forceDelete}
        onChange={() => setForceDelete(!forceDelete)}
      >
        Force Delete
      </Checkbox>
      <Spacer y={1} />
      <Button type="submit" color="error">
        Delete
      </Button>
    </form>
  );
}
