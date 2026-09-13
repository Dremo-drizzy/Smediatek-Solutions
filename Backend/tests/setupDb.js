import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

// Each test file gets its own in-memory MongoDB instance — slower than a
// single shared instance, but keeps files fully isolated regardless of
// Jest's worker/parallelism settings.
export const connectTestDb = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
};

export const closeTestDb = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
};

export const clearTestDb = async () => {
  const { collections } = mongoose.connection;
  await Promise.all(Object.values(collections).map((collection) => collection.deleteMany({})));
};
