import { Fruit } from "@/fruitStorage.domain/core/entities/fruit";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";
import { FruitFactory } from "@/fruitStorage.domain/core/factories/fruitFactory";
import { FruitRepository } from "@/fruitStorage.domain/core/repositories/fruitRepository";
import { FruitService } from "@/fruitStorage.domain/services/fruitService";

// Mock the FruitRepository
jest.mock("../fruitStorage.domain/core/repositories/fruitRepository");

// Mock the FruitFactory
jest.mock("../fruitStorage.domain/core/factories/fruitFactory");

const fruitRepository = new FruitRepository();
const fruitFactory = new FruitFactory();
const fruitService = new FruitService(fruitRepository, fruitFactory);

const validFruit = {
  name: FruitName.create({ value: "lemon" }),
  description: FruitDescription.create({ value: "this is a lemon" }),
  limit: FruitLimit.create({ value: 5 }),
};

describe("Fruit storage system", () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    jest.clearAllMocks();
  });

  // Task 1
  describe("createFruitForFruitStorage", () => {
    /**
     * Test 1.1 - Create a fruit called: lemon with the description this is a lemon and a limit of 10,
     * this should pass & create a domain event.
     */
    it("should create with lemon fruit.", async () => {
      // Arrange
      const fruit1 = new Fruit({
        name: FruitName.create({ value: "lemon" }),
        description: FruitDescription.create({ value: "this is a lemon" }),
        limit: FruitLimit.create({ value: 10 }),
      });
      const mockCreateFruit = jest
        .spyOn(fruitFactory, "createFruit")
        .mockResolvedValue(fruit1);
      // Act
      const createdFruit = await fruitFactory.createFruit(fruit1);
      // Assert
      expect(mockCreateFruit).toHaveBeenCalledWith(fruit1);
      expect(mockCreateFruit).toHaveBeenCalledTimes(1);
      expect(createdFruit.name.value).toEqual("lemon");
      expect(createdFruit.description.value).toEqual("this is a lemon");
      expect(createdFruit.limit.value).toEqual(10);
    });
    /**
     * Test 1.2 - Create a fruit called: lemon with the description this is a fruit with a very long
     * description and a limit of 10 ; verify this should fail
     */
    it("should not create with very long description.", async () => {
      // Arrange
      const longDescription =
        "this is a fruit with a very long description that exceeds the allowed limit";

      // Act & Assert
      expect(() => {
        const fruit2 = {
          name: FruitName.create({ value: "lemon" }),
          description: FruitDescription.create({ value: longDescription }),
          limit: FruitLimit.create({ value: 10 }),
        };
      }).toThrowError("Fruit description cannot be longer than 30 characters.");
    });
    /**
     * Test 1.3 - Create a fruit called: lemon with the description this is a lemon and a limit of 10
     * twice, this should fail.
     */
    it("should not create if the fruit exists", async () => {
      // Arrange
      const fruit3 = new Fruit({
        name: FruitName.create({ value: "lemon" }),
        description: FruitDescription.create({ value: "this is a lemon" }),
        limit: FruitLimit.create({ value: 10 }),
      });
      const mockCreateFruit = jest
        .spyOn(fruitRepository, "createFruitForFruitStorage")
        .mockResolvedValueOnce()
        .mockRejectedValue(
          new Error("Fruit with the same name already exists.")
        );
      // Act
      await fruitRepository.createFruitForFruitStorage(
        fruit3.name,
        fruit3.description,
        fruit3.limit
      ); // Create the fruit for the first time
      mockCreateFruit.mockClear(); // Clear the mock
      // Assert
      await expect(
        fruitRepository.createFruitForFruitStorage(
          fruit3.name,
          fruit3.description,
          fruit3.limit
        )
      ).rejects.toEqual(new Error("Fruit with the same name already exists."));
      expect(mockCreateFruit).toHaveBeenCalledWith(
        fruit3.name,
        fruit3.description,
        fruit3.limit
      );
      expect(mockCreateFruit).toHaveBeenCalledTimes(1);
    });
  });

  // Task 2
  describe("updateFruitForFruitStorage", () => {
    beforeEach(async () => {
      const lemon = new Fruit(validFruit);
      const createdLemon = await fruitFactory.createFruit(lemon);
    });
    /**
     * Test 2.1 - Assume the lemon fruit is already created in task 1, in the createFruitForStorage do
     * this in a way you see fit (e.g. seeding the database in the test). Call the mutation to update
     * the description of the lemon fruit to: updated lemon description , verify this should pass.
     */
    it("should update description with appropriate length", async () => {
      // Arrange
      const updatedDescription = "updated lemon description";
      const mockUpdateFruit = jest
        .spyOn(fruitRepository, "updateFruitForFruitStorage")
        .mockResolvedValueOnce();
      // Act
      const updatedLemon = await fruitRepository.updateFruitForFruitStorage(
        validFruit.name,
        FruitDescription.create({ value: updatedDescription }),
        validFruit.limit
      );
      // Assert
      expect(mockUpdateFruit).toHaveBeenCalledWith(
        validFruit.name,
        FruitDescription.create({ value: updatedDescription }),
        validFruit.limit
      );
      expect(mockUpdateFruit).toHaveBeenCalledTimes(1);
      expect(updatedLemon).toBeNull;
    });
    /**
     * Test 2.2 - Assume the lemon fruit is already created in test 1, call the createFruitForFruitStorage,
     * do this in a way you see fit (e.g. seeding the database in the test). Call the updateFruitForFruitStorage
     * mutation to update the description of the lemon fruit to: updated lemon with a long description , verify
     * this should fail
     */
    it("should not update with long description ", async () => {
      // Arrange
      const longDescription =
        "this is a fruit with a very long description that exceeds the allowed limit";

      // Act & Assert
      await expect(async () => {
        const longDescriptionInstance = FruitDescription.create({
          value: longDescription,
        });
        await fruitRepository.updateFruitForFruitStorage(
          validFruit.name,
          longDescriptionInstance,
          validFruit.limit
        );
      }).rejects.toThrowError(
        new Error("Fruit description cannot be longer than 30 characters.")
      );
    });
  });

  // Task 3
  describe("deleteFruitFromFruitStorage", () => {
    beforeEach(async () => {
      const lemon = new Fruit(validFruit);
      await fruitFactory.createFruit(lemon);
    });
    /**
     * Test 3.1 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage,
     * do this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons.
     * Call deleteFruitFromFruitStorage this should fail
     */
    it("should not delete if the fruit have left amount and forceDelete is false", async () => {
      // Arrange
      const mockDeleteFruit = jest
        .spyOn(fruitRepository, "deleteFruitFromFruitStorage")
        .mockResolvedValueOnce();
      // Act
      await fruitRepository.deleteFruitFromFruitStorage(validFruit.name, false);
      // Assert
      expect(mockDeleteFruit).toHaveBeenCalledWith(validFruit.name, false);
      expect(mockDeleteFruit).toHaveBeenCalledTimes(1);
    });
    /**
     * Test 3.2 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage,
     * do this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons.
     * Call deleteFruitFromFruitStorage with forceDelete=true this should pass & create a domain event.
     */
    it("should delete if forceDelete is true", async () => {
      // Arrange
      const mockDeleteFruit = jest
        .spyOn(fruitRepository, "deleteFruitFromFruitStorage")
        .mockResolvedValueOnce();
      // Act
      await fruitRepository.deleteFruitFromFruitStorage(validFruit.name, true);
      // Assert
      expect(mockDeleteFruit).toHaveBeenCalledWith(validFruit.name, true);
      expect(mockDeleteFruit).toHaveBeenCalledTimes(1);
    });
  });

  // Task 4
  describe("storeFruitToFruitStorage", () => {
    beforeEach(async () => {
      const lemon = new Fruit(validFruit);
      await fruitFactory.createFruit(lemon);
    });
    /**
     * Test 4.1 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage,
     * do this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons.
     * Call storeFruitToFruitStorage this should pass as it is below the limit of 10.
     */
    it("should store the fruit with appropriate amount", async () => {});
    /**
     * Test 4.2 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage,
     * do this in a way you see fit (e.g. seeding the database in the test) with an amount of 11 lemons.
     * Call storeFruitToStorage this should fail as it is above the limit of 10.
     */
    it("should not store the fruit if the limit is over 10", async () => {});
  });

  // Task 5
  describe("removeFruitFromFruitStorage", () => {
    beforeEach(async () => {
      const lemon = new Fruit(validFruit);
      await fruitFactory.createFruit(lemon);
    });
    /**
     * Test 5.1 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage do
     * this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons. Call
     * removeFruitFromFruitStorage with: {name: 'lemon', amount: 5} this should pass as there are 5 lemons
     * in storage.
     */
    it("should remove the fruits with appropriate amount", async () => {});
    /**
     * Test 5.2 - Assume the lemon fruit is already created in task 1, in the createFruitForFruitStorage, do
     * this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons. Call
     * removeFruitFromFruitStorage with: {name: 'lemon', amount: 6} this should fail as there are 5 lemons
     * in storage.
     */
    it("should not remove the fruits if the limit is less than 0", async () => {});
  });

  // Task 6
  describe("findFruit", () => {
    beforeEach(async () => {
      const lemon = new Fruit(validFruit);
      await fruitFactory.createFruit(lemon);
    });
    /**
     * Test 6.1 - Assume the lemon fruit is already created in task 1, in the createFruitFromFruitStorage, do
     * this in a way you see fit (e.g. seeding the database in the test). Call the findFruit with {name: 'lemon'}
     * this should return the lemon object and pass.
     */
    it("should find out the fruit if it exists", async () => {});
    /**
     * Test 6.2 - Call the findFruit with {name: 'not a lemon'} this should return not the lemon object and
     * throw an error.
     */
    it("should not find out the fruit if the name is wrong", async () => {});
  });
});
