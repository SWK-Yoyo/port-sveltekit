import { writable } from "svelte/store";
import { PUBLIC_API_URL } from "$env/static/public"

export const usersPattern = writable([]);

export async function getFormPattern(model) {
    const response = await fetch(`${PUBLIC_API_URL}/form/pattern/${model}`)
    if (!response.ok) {
        throw new Error("Can't fetch getFormPattern")
    }
    return await response.json()
}

export function regexToPattern(regex) {
    let pattern = regex.replace(/^\/(.+)\/.+$/, '$1');
    return pattern;
}

export async function submitForm(event, params) {
    const action = event.srcElement.action
    const method = event.srcElement.method
    const formStatus = validateForm(event.target);
    if (!formStatus) {
        return false
    }
    const response = await fetch(action, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    const res = await response.json()
    console.log("res", res)
    return {
        status: response.ok,
        message: res.message,
        data: res.data || []
    }
}

function validateForm(inputs) {
    let formStatus = true;
    let focusInput
    for (const input of inputs) {
        switch (input.type) {
            case 'text':
            case 'password':
                const pattern = input.getAttribute('pattern')
                if (new RegExp(pattern).test(input.value)) {
                    continue
                }
                if (!focusInput) {
                    focusInput = input
                }
                forceInvalid(input)
                formStatus = false
                break;
        }
    }
    if (focusInput) {
        focusInput.focus()
    }
    return formStatus
}

function forceInvalid(input) {
    input.setCustomValidity('This is a forced invalid state.');
    input.reportValidity(); // This will trigger the validation message
}
