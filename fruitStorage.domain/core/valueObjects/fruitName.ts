import { ValueObject } from "../../common/valueObject";

interface FruitNameProps {
  value: string;
}

export class FruitName extends ValueObject<FruitNameProps> {
  constructor(props: FruitNameProps) {
    if (props.value.length === 0) {
      throw new Error("Fruit name cannot be empty.");
    }
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  set value(value: string) {
    if (value.length === 0) {
      throw new Error("Fruit name cannot be empty.");
    }
    this.props.value = value;
  }

  public equals(other: FruitName): boolean {
    return this.props.value === other.props.value;
  }

  public toString(): string {
    return this.props.value;
  }

  // Create method for FruitName
  public static create(props: FruitNameProps): FruitName {
    if (props.value.length === 0) {
      throw new Error("Fruit name cannot be empty.");
    }
    return new FruitName(props);
  }
}
