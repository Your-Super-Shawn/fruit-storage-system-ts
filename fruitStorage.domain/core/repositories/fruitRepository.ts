import { Fruit } from "../entities/fruit";
import { FruitName } from "../valueObjects/fruitName";
import { FruitAmount } from "../valueObjects/fruitAmount";
import { FruitDescription } from "../valueObjects/fruitDescription";
import { FruitLimit } from "../valueObjects/fruitLimit";
import { IFruitRepository } from "./IFruitRepository";
import { FruitModel } from "../../infra/models/fruitModel";
import { FruitFactory } from "../factories/fruitFactory";
import { FruitMapper } from "@/fruitStorage.domain/infra/mappers/fruitMapper";

/**
 * @description  Its main responsibility is to provide an abstraction for
 * accessing and persisting domain objects. It handles data storage,
 * retrieval, and deletion.
 */

const fruitFactory = new FruitFactory();

export class FruitRepository implements IFruitRepository {
  fruitFactory: any;
  fruitRepository: any;
  // 0. [Query] Find a fruit by its name.
  public async findFruit(name: FruitName): Promise<Fruit> {
    const fruit = await FruitModel.findOne({ name: name.value });
    if (fruit) {
      return fruit;
    } else {
      throw new Error("Fruit does not exist.");
    }
  }

  // 1. [Mutation] Store a specified amount of fruit to the storage.
  public async storeFruitToFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void> {
    const fruit = await FruitModel.findOne({ name: name.value });
    if (fruit) {
      const newLimitValue = fruit.limit + amount.value;
      await FruitModel.updateOne(
        { name: name.value },
        { limit: newLimitValue }
      );
    } else {
      throw new Error("Fruit not found.");
    }
  }

  // 2. [Mutation] Remove a specified amount of fruit from the storage.
  public async removeFruitFromFruitStorage(
    name: FruitName,
    amount: FruitAmount
  ): Promise<void> {
    const fruit = await FruitModel.findOne({ name: name.value });
    if (fruit) {
      if (fruit.limit >= amount.value) {
        const newLimitValue = fruit.limit - amount.value;
        await FruitModel.updateOne(
          { name: name.value },
          { limit: newLimitValue }
        );
      } else {
        throw new Error("Insufficient fruit limit.");
      }
    } else {
      throw new Error("Fruit not found.");
    }
  }

  // 3. [Mutation] Create a new fruit in the storage.
  public async createFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void> {
    const existingFruit = await this.findFruit(name);
    if (!existingFruit) {
      // const newFruit = await fruitFactory.createFruit({
      //   name,
      //   description,
      //   limit,
      // });
      // await FruitMapper.toPersistence(newFruit);
      const newFruit = new FruitModel({
        name: name.value,
        description: description.value,
        limit: limit.value,
      });
      await newFruit.save();
    } else {
      throw new Error("Fruit with the same name already exists.");
    }
  }

  // 4. [Mutation] Update an existing fruit's properties.
  public async updateFruitForFruitStorage(
    name: FruitName,
    description: FruitDescription,
    limit: FruitLimit
  ): Promise<void> {
    const existingFruit = await this.findFruit(name);
    if (existingFruit) {
      await FruitModel.updateOne(
        { name: name.value },
        { description: description.value, limit: limit.value }
      );
    } else if (FruitDescription.length > 30) {
      throw new Error("Fruit description cannot be longer than 30 characters.");
    } else {
      throw new Error("Fruit not found.");
    }
  }

  // 5. [Mutation] Delete a fruit from the storage;
  // if `forceDelete` is true, delete it regardless of any existing constraints.
  public async deleteFruitFromFruitStorage(
    name: FruitName,
    forceDelete: boolean
  ): Promise<void> {
    if (forceDelete) {
      await FruitModel.deleteOne({ name: name.value });
    } else {
      const fruit = await FruitModel.findOne({ name: name.value });
      if (fruit && fruit.limit === 0) {
        await FruitModel.deleteOne({ name: name.value });
      } else if (!fruit) {
        throw new Error("Fruit not found.");
      } else {
        throw new Error("Cannot delete fruit with a non-zero limit.");
      }
    }
  }

  // 6. [Query] Get all fruits in the storage.
  public async findAllFruits(): Promise<Fruit[]> {
    const fruits = await FruitModel.find();
    return fruits;
  }

  // 7. [Mutation] Delete all fruits from the storage; if forceDelete is true, delete them regardless of any existing constraints.
  public async deleteAllFruits(forceDelete: boolean): Promise<void> {
    if (forceDelete) {
      await FruitModel.deleteMany({});
    } else {
      const fruits = await FruitModel.find();
      if (fruits.length > 0) {
        let allFruitsHaveZeroLimit = true;
        fruits.forEach((fruit) => {
          if (fruit.limit !== 0) {
            allFruitsHaveZeroLimit = false;
          }
        });
        if (allFruitsHaveZeroLimit) {
          await FruitModel.deleteMany({});
        } else {
          throw new Error(
            "Some fruits have non-zero limit. Cannot delete without forceDelete set to true."
          );
        }
      } else {
        throw new Error("No fruits to delete.");
      }
    }
  }
}
