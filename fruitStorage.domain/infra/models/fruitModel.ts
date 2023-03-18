import { Schema, model, models, Document } from "mongoose";
/**
 * @desc In the FruitDocument interface, I use number as a TS type annotation for
 * the amount and limit properties to indicate that they should store numeric values.
 */
interface FruitDocument extends Document {
  name: string;
  description: string;
  limit: number;
}

/**
 * @desc In the fruitSchema definition, I use Number as a value for the amount and limit properties
 * in the schema object to define the type of data to be stored in the MongoDB database. This
 * is a Mongoose-specific usage, where schema types are defined using JS constructors.
 */

const fruitSchema = new Schema<FruitDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  limit: { type: Number, required: true },
});

// if the model has already been defined, it will be reused; otherwise, a new model will be created.
export const FruitModel = models.Fruit || model("Fruit", fruitSchema);
