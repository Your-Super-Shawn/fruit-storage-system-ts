import { FruitDescription } from "../valueObjects/fruitDescription";
import { FruitLimit } from "../valueObjects/fruitLimit";
import { FruitName } from "../valueObjects/fruitName";
import { Entity } from "@/fruitStorage.domain/common/entity";

interface FruitProps {
  name: FruitName;
  description: FruitDescription;
  limit: FruitLimit;
}

export class Fruit extends Entity<FruitProps> {
  constructor(props: FruitProps) {
    super(props);
  }

  get name(): FruitName {
    return this.props.name;
  }

  get description(): FruitDescription {
    return this.props.description;
  }

  get limit(): FruitLimit {
    return this.props.limit;
  }

  public setDescription(description: FruitDescription): void {
    this.props.description = description;
  }

  public setLimit(limit: FruitLimit): void {
    this.props.limit = limit;
  }

  public setName(name: FruitName): void {
    this.props.name = name;
  }

  public equals(other: Fruit): boolean {
    return this.props.name.equals(other.props.name);
  }

  public toString(): string {
    return this.props.name.toString();
  }
}
