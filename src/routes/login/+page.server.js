/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('http://localhost:3000/form/pattern/users');
    console.log("response", response)
    const data = await response.json();
    return { pattern: data };
};