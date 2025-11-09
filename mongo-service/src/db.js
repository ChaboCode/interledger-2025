import mongoose from "mongoose";

export async function connectMongo(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    autoIndex: true
  });
  console.log("✅ Conectado a Mongo");
}
