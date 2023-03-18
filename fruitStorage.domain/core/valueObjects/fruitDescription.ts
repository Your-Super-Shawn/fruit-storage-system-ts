import { ValueObject } from "../../common/valueObject";

interface FruitDescriptionProps {
  value: string;
}

export class FruitDescription extends ValueObject<FruitDescriptionProps> {
  constructor(props: FruitDescriptionProps) {
    if (props.value.length === 0) {
      throw new Error("Fruit description cannot be empty.");
    } else if (props.value.length > 30) {
      throw new Error(
        "Fruit description cannot be longer than 100 characters."
      );
    }
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  set value(value: string) {
    if (value.length === 0) {
      throw new Error("Fruit description cannot be empty.");
    } else if (value.length > 30) {
      throw new Error(
        "Fruit description cannot be longer than 100 characters."
      );
    }
    this.props.value = value;
  }

  public equals(other: FruitDescription): boolean {
    return this.props.value === other.props.value;
  }

  public toString(): string {
    return this.props.value;
  }

  // Create method for FruitDescription
  public static create(props: FruitDescriptionProps): FruitDescription {
    if (props.value.length === 0) {
      throw new Error("Fruit description cannot be empty.");
    }
    return new FruitDescription(props);
  }
}
