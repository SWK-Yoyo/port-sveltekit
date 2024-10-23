

import { navigator } from "$lib/storage/setting.js"
export async function load({ fetch }) {
    const response = await fetch(`http://localhost:3000/settings/default`)
    if (!response.ok) {
        return;
    }
    const res = await response.json()
    navigator.update(nav => res.data.menuList)
    return {};
}