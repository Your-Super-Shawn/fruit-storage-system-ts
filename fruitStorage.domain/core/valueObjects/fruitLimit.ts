import { ValueObject } from "../../common/valueObject";

interface FruitLimitProps {
  value: number;
}

export class FruitLimit extends ValueObject<FruitLimitProps> {
  constructor(props: FruitLimitProps) {
    if (props.value < 0) {
      throw new Error("Fruit limit cannot be negative.");
    } else if (props.value > 999) {
      throw new Error("Fruit limit cannot be greater than 999.");
    }
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    if (value < 0) {
      throw new Error("Fruit limit cannot be negative.");
    } else if (value > 999) {
      throw new Error("Fruit limit cannot be greater than 999.");
    }
    this.props.value = value;
  }

  public equals(other: FruitLimit): boolean {
    return this.props.value === other.props.value;
  }

  public toString(): string {
    return this.props.value.toString();
  }

  // Create method for FruitLimit
  public static create(props: FruitLimitProps): FruitLimit {
    if (props.value < 0) {
      throw new Error("Fruit limit cannot be negative.");
    }
    return new FruitLimit(props);
  }
}
