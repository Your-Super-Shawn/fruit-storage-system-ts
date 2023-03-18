import { Fruit } from "@/fruitStorage.domain/core/entities/fruit";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { FruitAmount } from "@/fruitStorage.domain/core/valueObjects/fruitAmount";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";

export interface IFruitService {
  /**
   * @description Checks if the provided fruit name is unique by querying the
   * FruitRepository. Returns true if the fruit name is unique, false otherwise.
   * @returns A promise that resolves to a boolean.
   */
  isUniqueFruitName(name: FruitName): Promise<boolean>;

  /**
   * @description Stores a specified amount of fruit to the storage by calling
   * the storeFruitToFruitStorage method in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  storeFruitToFruitStorage(name: FruitName, amount: FruitAmount): Promise<void>;

  /**
   * @description Removes a specified amount of fruit from the storage by calling
   * the removeFruitFromFruitStorage method in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  removeFruitFromFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void>;

  /**
   * @description Creates a new fruit in the storage using the FruitFactory to create
   * a new Fruit entity and then storing it using the FruitRepository.
   * @returns A promise that resolves to void.
   */
  createFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  /**
   * @description Updates an existing fruit's properties by calling the method
   * in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  updateFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void>;

  /**
   * @description Deletes a fruit from the storage by calling the method in the
   * FruitRepository.
   * @param forceDelete If true, the fruit will be deleted regardless of any
   * existing amount in the storage. If false, the fruit will only be deleted
   * if the amount in the storage is 0.
   * @returns A promise that resolves to void.
   */
  deleteFruitFromFruitStorage(
    name: FruitName,
    forceDelete: boolean
  ): Promise<void>;

  /**
   * @description Finds a fruit by its name by calling the findFruit method in
   * the FruitRepository.
   * @returns A Fruit entity.
   */
  findFruit(name: FruitName): Promise<Fruit>;

  /**
   * @description Finds all fruits in the storage by calling the findAllFruits
   * method in the FruitRepository.
   * @returns An array of Fruit entities.
   */
  findAllFruits(): Promise<Fruit[]>;
}
