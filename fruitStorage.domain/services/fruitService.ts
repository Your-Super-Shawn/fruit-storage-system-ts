import { Fruit } from "@/fruitStorage.domain/core/entities/fruit";
import { FruitRepository } from "@/fruitStorage.domain/core/repositories/fruitRepository";
import { FruitFactory } from "@/fruitStorage.domain/core/factories/fruitFactory";
import { FruitAmount } from "@/fruitStorage.domain/core/valueObjects/fruitAmount";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { IFruitService } from "./IFruitService";

/**
 * @description The service layer is where you implement your domain-specific
 * business logic. It coordinates the use of repositories, factories, and Fruit
 * Storage domain components to perform specific tasks.
 * @see https://aspnetboilerplate.com/Pages/Documents/Domain-Services
 */

export class FruitService implements IFruitService {
  constructor(
    private readonly fruitRepository: FruitRepository,
    private readonly fruitFactory: FruitFactory
  ) {}

  /**
   * @description Checks if the provided fruit name is unique by querying the
   * FruitRepository. Returns true if the fruit name is unique, false otherwise.
   * @returns A promise that resolves to a boolean.
   */
  async isUniqueFruitName(name: FruitName): Promise<boolean> {
    const existingFruit = await this.fruitRepository.findFruit(name);
    return existingFruit === null;
  }

  /**
   * @description Stores a specified amount of fruit to the storage by calling
   * the storeFruitToFruitStorage method in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  async storeFruitToFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void> {
    const fruit = await this.fruitRepository.findFruit(name);
    if (fruit) {
      const newLimitValue = fruit.limit.value + amount.value;
      const newLimit = FruitLimit.create({ value: newLimitValue });
      await this.fruitRepository.storeFruitToFruitStorage(name, newLimit);
    } else {
      throw new Error("Fruit not found.");
    }
  }

  /**
   * @description Removes a specified amount of fruit from the storage by calling
   * the removeFruitFromFruitStorage method in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  async removeFruitFromFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void> {
    await this.fruitRepository.removeFruitFromFruitStorage(name, amount);
  }

  /**
   * @description Creates a new fruit in the storage using the FruitFactory to create
   * a new Fruit entity and then storing it using the FruitRepository.
   * @returns A promise that resolves to void.
   */
  async createFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void> {
    await this.fruitFactory.createFruit({ name, description, limit });
  }

  /**
   * @description Updates an existing fruit's properties by calling the method
   * in the FruitRepository.
   * @returns A promise that resolves to void.
   */
  async updateFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void> {
    await this.fruitRepository.updateFruitForFruitStorage(
      name,
      description,
      limit
    );
  }

  /**
   * @description Deletes a fruit from the storage by calling the method in the
   * FruitRepository.
   * @param forceDelete If true, the fruit will be deleted regardless of any
   * existing amount in the storage. If false, the fruit will only be deleted
   * if the amount in the storage is 0.
   * @returns A promise that resolves to void.
   */
  async deleteFruitFromFruitStorage(
    name: FruitName,
    forceDelete: boolean
  ): Promise<void> {
    await this.fruitRepository.deleteFruitFromFruitStorage(name, forceDelete);
  }

  /**
   * @description Finds a fruit by its name by calling the findFruit method in
   * the FruitRepository.
   * @returns A Fruit entity.
   */
  async findFruit(name: FruitName): Promise<Fruit> {
    return await this.fruitRepository.findFruit(name);
  }

  /**
   * @description Finds all fruits in the storage by calling the findAllFruits
   * method in the FruitRepository.
   * @returns An array of Fruit entities.
   */
  async findAllFruits(): Promise<Fruit[]> {
    return await this.fruitRepository.getAllFruits();
  }
}
