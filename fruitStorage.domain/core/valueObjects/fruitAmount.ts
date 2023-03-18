import { ValueObject } from "../../common/valueObject";

interface FruitAmountProps {
  value: number;
}

export class FruitAmount extends ValueObject<FruitAmountProps> {
  constructor(props: FruitAmountProps) {
    if (props.value < 0) {
      throw new Error("Fruit amount cannot be negative.");
    } else if (props.value > 10) {
      throw new Error("Fruit amount cannot be greater than 10.");
    }
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public equals(other: FruitAmount): boolean {
    return this.props.value === other.props.value;
  }

  public toString(): string {
    return this.props.value.toString();
  }

  // Create method for FruitAmount
  public static create(props: FruitAmountProps): FruitAmount {
    if (props.value < 0) {
      throw new Error("Fruit amount cannot be negative.");
    }
    return new FruitAmount(props);
  }
}
