import { Db,  MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function getTheme(name: string) {
  // Connect to the database
  const { client, db } = await connectToDatabase();

  // Find the theme by name
  const theme = await db.collection('themes').findOne({ name });

  // Close the database connection
  client.close();

  return theme;
}
export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Defina MONGODB_URI");
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Defina MONGODB_DB");
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };


  
}
