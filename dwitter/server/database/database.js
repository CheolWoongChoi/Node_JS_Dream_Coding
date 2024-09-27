import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  /**
   * 항상,,
   * useNewUrlParser, useUnifiedTopology, useCreateIndex : true
   * useFindAndModify : false
   */

  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}
