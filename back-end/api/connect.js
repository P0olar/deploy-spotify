import { MongoClient } from "mongodb";

const URI = "mongodb+srv://admin:AdmRotciv!2006@cluster0.645ap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client =  new MongoClient(URI);

export const db = client.db("spotify");
// const songColletion = await db.collection("songs").find({}).toArray();

