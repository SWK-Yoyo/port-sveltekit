import { MongoClient } from 'mongodb';
import { MONGO_URL, MONGO_DB } from "$env/static/private"

const url = MONGO_URL
export default new MongoClient(url).db(MONGO_DB)

