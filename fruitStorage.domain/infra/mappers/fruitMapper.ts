import { Fruit } from "@/fruitStorage.domain/core/entities/fruit";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";
import { FruitModel } from "../models/fruitModel";

export class FruitMapper {
  /**
   * @desciption This method accepts a database object (a Mongo document) as its argument and converts it
   * into a Fruit domain object. It creates instances of the value objects FruitName, FruitDescription,
   * FruitAmount, and FruitLimit using the properties of the persistence object, and then creates a new
   * Fruit object with these value objects.
   */
  static toDomain(persistenceObject: any): Fruit {
    const name = FruitName.create({ value: persistenceObject.name });
    const description = FruitDescription.create({
      value: persistenceObject.description,
    });
    const limit = FruitLimit.create({ value: persistenceObject.limit });
    return new Fruit({ name, description, limit });
  }

  /**
   * @desciption This method accepts a Fruit domain object as its argument and converts it into a database
   * object (a Mongo document). It extracts the values from the value objects name, description, amount,
   * and limit of the domain object and returns an object containing these properties.
   */
  static toPersistence(domainObject: Fruit): any {
    return new FruitModel({
      name: domainObject.name.value,
      description: domainObject.description.value,
      limit: domainObject.limit.value,
    });
  }
}
