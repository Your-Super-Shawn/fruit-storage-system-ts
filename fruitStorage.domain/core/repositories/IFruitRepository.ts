import { Fruit } from "../entities/fruit";
import { FruitName } from "../valueObjects/fruitName";
import { FruitAmount } from "../valueObjects/fruitAmount";
import { FruitDescription } from "../valueObjects/fruitDescription";
import { FruitLimit } from "../valueObjects/fruitLimit";

export interface IFruitRepository {
  /**
   * @description Find a fruit by its name.
   * @param name The name of the fruit to find.
   * @returns The fruit if found, otherwise null.
   * @throws Error if the fruit is not found.
   */
  findFruit(name: FruitName): Promise<Fruit | null>;

  /**
   * @description Store a specified amount of fruit to the storage.
   * @param name The name of the fruit to store.
   * @param amount The amount of the fruit to store.
   * @throws Error if the fruit is not found.
   * @throws Error if the fruit limit is exceeded.
   */
  storeFruitToFruitStorage(name: FruitName, amount: FruitAmount): Promise<void>;

  /**
   * @description Remove a specified amount of fruit from the storage.
   * @param name The name of the fruit to remove.
   * @param amount The amount of the fruit to remove.
   * @throws Error if the fruit is not found.
   * @throws Error if the fruit limit is exceeded.
   * @throws Error if the fruit limit is insufficient.
   */
  removeFruitFromFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void>;

  /**
   * @description Create a new fruit in the storage.
   * @param name The name of the fruit to create.
   * @param description the descriptiopn of the fruit to create.
   * @param limit the limit of the fruit to create.
   * @throws Error if the fruit already exists.
   * @throws Error if the fruit limit is exceeded.
   * @throws Error if the fruit limit is insufficient.
   */
  createFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  /**
   * @description Update an existing fruit's properties.
   * @param name The name of the fruit to update.
   * @param description the descriptiopn of the fruit to update.
   * @param limit the limit of the fruit to update.
   * @throws Error if the fruit is not found.
   * @throws Error if the fruit limit is exceeded.
   * @throws Error if the fruit limit is insufficient.
   */
  updateFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  /**
   * @description Delete a fruit from the storage
   * @param name The name of the fruit to delete.
   * @param forceDelete If true, delete the fruit regardless of any existing constraints.
   * @throws Error if the fruit is not found.
   */
  deleteFruitFromFruitStorage(
    name: FruitName,
    forceDelete: boolean
  ): Promise<void>;

  /**
   * @description Find all fruits in the storage.
   * @returns a list of all fruits in the storage.
   */
  findAllFruits(): Promise<Fruit[]>;

  /**
   * @description Delete all fruits from the storage.
   * @param forceDelete If true, delete all fruits regardless of any existing constraints.
   */
  deleteAllFruits(forceDelete: boolean): Promise<void>;
}
