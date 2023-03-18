import { Fruit } from "../entities/fruit";
import { FruitName } from "../valueObjects/fruitName";
import { FruitDescription } from "../valueObjects/fruitDescription";
import { FruitLimit } from "../valueObjects/fruitLimit";

interface CreateFruitProps {
  name: FruitName;
  description: FruitDescription;
  limit: FruitLimit;
}

/**
 * @description It is responsible for creating instances of `Fruit` entity based
 * on the provided properties. It encapsulates the instantiation logic and ensures
 * that the created instances are valid.
 */
export class FruitFactory {
  async createFruit(props: CreateFruitProps): Promise<Fruit> {
    const name = FruitName.create(props.name);
    const description = FruitDescription.create(props.description);
    const limit = FruitLimit.create(props.limit);
    return new Fruit({ name, description, limit });
  }
}
