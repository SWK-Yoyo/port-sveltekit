import {
    API_URL
} from  '$env/static/private'
export async function load({ fetch }) {
    const setting = await fetch(`${API_URL}/settings/default`)
    if(setting.ok)
    console.log("setting" , setting)
    return {};
}