import { usersPattern, getFormPattern } from "$lib/form.js"
export async function load() {
    let pattern
    usersPattern.subscribe((_pattern) => {
        if (!_pattern.length) {
            return;
        }
        pattern = _pattern
    })
    if (!pattern) {
        const pattern = await getFormPattern('users')
        usersPattern.set(pattern)
    }
};