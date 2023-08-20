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
        const data = await request.formData();
       

    }
}