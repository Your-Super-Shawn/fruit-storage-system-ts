import { makeSchema, objectType } from "nexus";
import { FruitService } from "@/fruitStorage.domain/services/fruitService";
import { FruitRepository } from "@/fruitStorage.domain/core/repositories/fruitRepository";
import { FruitFactory } from "@/fruitStorage.domain/core/factories/fruitFactory";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";
import { FruitAmount } from "@/fruitStorage.domain/core/valueObjects/fruitAmount";

const fruitRepository = new FruitRepository();
const fruitFactory = new FruitFactory();
const fruitService = new FruitService(fruitRepository, fruitFactory);

// Define GraphQL types here
const Fruit = objectType({
  name: "Fruit",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.int("limit");
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    // Get a list of all fruits.
    t.list.field("fruits", {
      type: "Fruit",
      resolve: async () => {
        return await fruitService.findAllFruits();
      },
    });
    // Get a single fruit by its name.
    t.field("fruit", {
      type: "Fruit",
      args: {
        name: "String",
      },
      resolve: async (_parent, { name }) => {
        const fruitName = FruitName.create({ value: name });
        return await fruitService.findFruit(fruitName);
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    // Create a new fruit.
    t.field("createFruit", {
      type: "Fruit",
      args: {
        name: "String",
        description: "String",
        limit: "Int",
      },
      resolve: async (_parent, { name, description, limit }) => {
        const fruitName = FruitName.create({ value: name });
        const fruitDescription = FruitDescription.create({
          value: description,
        });
        const fruitLimit = FruitLimit.create({ value: limit });
        await fruitService.createFruitForFruitStorage(
          fruitName,
          fruitDescription,
          fruitLimit
        );
        return { name, description, limit };
      },
    });
    // Update a fruit's description and limit by its name.
    t.field("updateFruit", {
      type: "Fruit",
      args: {
        name: "String",
        description: "String",
        limit: "Int",
      },
      resolve: async (_parent, { name, description, limit }) => {
        const fruitName = FruitName.create({ value: name });
        const fruitDescription = FruitDescription.create({
          value: description,
        });
        const fruitLimit = FruitLimit.create({ value: limit });
        await fruitService.updateFruitForFruitStorage(
          fruitName,
          fruitDescription,
          fruitLimit
        );
        return { name, description, limit };
      },
    });
    // Delete a fruit by its name.
    t.field("deleteFruit", {
      type: "Fruit",
      args: {
        name: "String",
        forceDelete: "Boolean",
      },
      resolve: async (_parent, { name, forceDelete }) => {
        const fruitName = FruitName.create({ value: name });
        await fruitService.deleteFruitFromFruitStorage(fruitName, forceDelete);
        return { name };
      },
    });
    // Add a fruit to the fruit storage.
    t.field("storeFruit", {
      type: "Fruit",
      args: {
        name: "String",
        amount: "Int",
      },
      resolve: async (_parent, { name, amount }) => {
        const fruitName = FruitName.create({ value: name });
        const fruitAmount = FruitAmount.create({ value: amount });
        await fruitService.storeFruitToFruitStorage(fruitName, fruitAmount);
        return { name };
      },
    });
    // Remove a fruit from the fruit storage.
    t.field("removeFruit", {
      type: "Fruit",
      args: {
        name: "String",
        amount: "Int",
      },
      resolve: async (_parent, { name, amount }) => {
        const fruitName = FruitName.create({ value: name });
        const fruitAmount = FruitAmount.create({ value: amount });
        await fruitService.removeFruitFromFruitStorage(fruitName, fruitAmount);
        return { name };
      },
    });
  },
});

export const schema = makeSchema({
  types: [Fruit, Query, Mutation],
  outputs: {
    typegen: __dirname + "/nexus-typegen.ts",
    schema: __dirname + "/schema.graphql",
  },
});
