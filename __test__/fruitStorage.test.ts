import { Fruit } from "@/fruitStorage.domain/core/entities/fruit";
import { FruitName } from "@/fruitStorage.domain/core/valueObjects/fruitName";
import { FruitDescription } from "@/fruitStorage.domain/core/valueObjects/fruitDescription";
import { FruitLimit } from "@/fruitStorage.domain/core/valueObjects/fruitLimit";
import { FruitFactory } from "@/fruitStorage.domain/core/factories/fruitFactory";
import { FruitRepository } from "@/fruitStorage.domain/core/repositories/fruitRepository";
import { FruitService } from "@/fruitStorage.domain/services/fruitService";
import { FruitAmount } from "@/fruitStorage.domain/core/valueObjects/fruitAmount";

// Mock the FruitRepository & FruitFactory
jest.mock("../fruitStorage.domain/core/repositories/fruitRepository");
jest.mock("../fruitStorage.domain/core/factories/fruitFactory");

const fruitRepository = new FruitRepository();
const fruitFactory = new FruitFactory();
const fruitService = new FruitService(fruitRepository, fruitFactory);

const lemon = {
  name: FruitName.create({ value: "lemon" }),
  description: FruitDescription.create({ value: "this is a lemon" }),
  limit: FruitLimit.create({ value: 5 }),
};

describe("Fruit storage system", () => {
  beforeEach(async () => {
    // cleaning up the mess left behind the previous test
    jest.clearAllMocks();
  });

  // Task 1
  describe("createFruitForFruitStorage", () => {
    // Test 1.1
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
    // Test 1.2
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
    // Test 1.3
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
      const createdLemon = await fruitFactory.createFruit(lemon);
    });
    // Test 2.1
    it("should update description with appropriate length", async () => {
      // Arrange
      const updatedDescription = "updated lemon description";
      const mockUpdateFruit = jest
        .spyOn(fruitRepository, "updateFruitForFruitStorage")
        .mockResolvedValueOnce();
      // Act
      const updatedLemon = await fruitRepository.updateFruitForFruitStorage(
        lemon.name,
        FruitDescription.create({ value: updatedDescription }),
        lemon.limit
      );
      // Assert
      expect(mockUpdateFruit).toHaveBeenCalledWith(
        lemon.name,
        FruitDescription.create({ value: updatedDescription }),
        lemon.limit
      );
      expect(mockUpdateFruit).toHaveBeenCalledTimes(1);
      expect(updatedLemon).toBeUndefined();
    });

    // Test 2.2
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
          lemon.name,
          longDescriptionInstance,
          lemon.limit
        );
      }).rejects.toThrowError(
        new Error("Fruit description cannot be longer than 30 characters.")
      );
    });
  });

  // Task 3
  describe("deleteFruitFromFruitStorage", () => {
    beforeEach(async () => {
      // setup initial valid fruit -lemon
      await fruitFactory.createFruit(lemon);
    });
    // Test 3.1
    it("should not delete if the fruit have left amount and forceDelete is false", async () => {
      // Act & Assert
      try {
        await fruitRepository.deleteFruitFromFruitStorage(lemon.name, false);
      } catch (error: any) {
        expect(error.message).toBe(
          "Cannot delete fruit with a non-zero limit."
        );
      }
    });
    // Test 3.2
    it("should delete if forceDelete is true", async () => {
      // Arrange
      const mockDeleteFruit = jest
        .spyOn(fruitRepository, "deleteFruitFromFruitStorage")
        .mockResolvedValueOnce();
      // Act
      const deletedLemon = await fruitRepository.deleteFruitFromFruitStorage(
        lemon.name,
        true
      );
      // Assert
      expect(mockDeleteFruit).toHaveBeenCalledWith(lemon.name, true);
      expect(mockDeleteFruit).toHaveBeenCalledTimes(1);
      expect(deletedLemon).toBeUndefined();
    });
  });

  // Task 4
  describe("storeFruitToFruitStorage", () => {
    beforeEach(async () => {
      await fruitFactory.createFruit(lemon);
    });
    // Test 4.1
    it("should store the fruit with appropriate amount", async () => {
      // Arrange
      const addAmount = FruitAmount.create({ value: 5 });
      const mockStoreFruit = jest
        .spyOn(fruitRepository, "storeFruitToFruitStorage")
        .mockResolvedValueOnce();
      // Act
      await fruitRepository.storeFruitToFruitStorage(lemon.name, addAmount);
      // Assert
      expect(mockStoreFruit).toHaveBeenCalledWith(lemon.name, addAmount);
      expect(mockStoreFruit).toHaveBeenCalledTimes(1);
    });

    // Test 4.2
    it("should not store the fruit if the total limit is over 10", async () => {
      // Arrange
      const addAmount = FruitAmount.create({ value: 6 }); // 5 + 6 = 11 total
      const mockStoreFruit = jest
        .spyOn(fruitRepository, "storeFruitToFruitStorage")
        .mockResolvedValueOnce();
      // Act & Assert
      try {
        await fruitRepository.storeFruitToFruitStorage(lemon.name, addAmount);
      } catch (error: any) {
        expect(error.message).toBe(
          new Error("Fruit amount cannot be more than 10.")
        );
      }
    });
  });

  // Task 5
  describe("removeFruitFromFruitStorage", () => {
    beforeEach(async () => {
      await fruitFactory.createFruit(lemon);
    });
    // Test 5.1
    it("should remove the fruits with appropriate amount", async () => {
      // Arrange
      const removeAmount = FruitAmount.create({ value: 5 });
      const mockRemoveFruit = jest
        .spyOn(fruitRepository, "removeFruitFromFruitStorage")
        .mockResolvedValueOnce();
      // Act
      await fruitRepository.removeFruitFromFruitStorage(
        lemon.name,
        removeAmount
      );
      // Assert
      expect(mockRemoveFruit).toHaveBeenCalledWith(lemon.name, removeAmount);
      expect(mockRemoveFruit).toHaveBeenCalledTimes(1);
    });
    // Test 5.2
    it("should not remove the fruits if the limit is less than 0", async () => {
      // Arrange
      const removeAmount = FruitAmount.create({ value: 6 }); // 5 - 6 = -1
      const mockRemoveFruit = jest
        .spyOn(fruitRepository, "removeFruitFromFruitStorage")
        .mockResolvedValueOnce();
      // Act & Assert
      try {
        await fruitRepository.removeFruitFromFruitStorage(
          lemon.name,
          removeAmount
        );
      } catch (error: any) {
        expect(error.message).toBe(
          new Error("Fruit amount cannot be less than 0.")
        );
      }
    });
  });

  // Task 6
  describe("findFruit", () => {
    beforeEach(async () => {
      await fruitFactory.createFruit(lemon);
    });
    // Test 6.1
    it("should find out the fruit if it exists", async () => {
      // Arrange
      const lemonInstance = Fruit.create(lemon);
      const mockFindFruit = jest
        .spyOn(fruitRepository, "findFruit")
        .mockResolvedValueOnce(lemonInstance);
      // Act
      const foundLemon = await fruitRepository.findFruit(lemon.name);
      // Assert
      expect(mockFindFruit).toHaveBeenCalledWith(lemon.name);
      expect(mockFindFruit).toHaveBeenCalledTimes(1);
      expect(foundLemon.equals(lemonInstance)).toBeTruthy();
    });
    // Test 6.2
    it("should not find out fruit if the name does not exist", async () => {
      // Arrange
      const notExistFruitName = FruitName.create({ value: "not a lemon" });
      // Act & Assert
      try {
        await fruitRepository.findFruit(notExistFruitName);
      } catch (error: any) {
        expect(error.message).toBe(new Error("Fruit does not exist."));
      }
    });
  });
});
