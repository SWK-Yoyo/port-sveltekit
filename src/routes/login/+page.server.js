/** @type {import('./$types').PageServerLoad} */
import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import mongodb from '$lib/server/Mongodb.js';
const db = mongodb;

export async function load() {
    return {};
};

export const actions = {
    default: async ({ request }) => {
        // const data = await request.formDate();
        // const params = {
        //     username: data.username.trim(),
        //     password: bcrypt.hash(data.password.trim(), 10)
        // }
        // const usersCollection = db.collection('users')
        // const user = usersCollection.findOne({ username: params.username });
        // throw error(500, 'test')

    }
}