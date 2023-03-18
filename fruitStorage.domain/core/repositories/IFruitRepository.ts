import { Fruit } from "../entities/fruit";
import { FruitName } from "../valueObjects/fruitName";
import { FruitAmount } from "../valueObjects/fruitAmount";
import { FruitDescription } from "../valueObjects/fruitDescription";
import { FruitLimit } from "../valueObjects/fruitLimit";

export interface IFruitRepository {
  // 0. Find a fruit by its name.
  findFruit(name: FruitName): Promise<Fruit>;

  // 1. Store a specified amount of fruit to the storage.
  storeFruitToFruitStorage(name: FruitName, amount: FruitAmount): Promise<void>;

  // 2. Remove a specified amount of fruit from the storage.
  removeFruitFromFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void>;

  // 3. Create a new fruit in the storage.
  createFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  // 4. Update an existing fruit's properties.
  updateFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  // 5. Delete a fruit from the storage; if forceDelete is true, delete it regardless of any existing constraints.
  deleteFruitFromFruitStorage(
    name: FruitName,
    forceDelete: boolean
  ): Promise<void>;
}
