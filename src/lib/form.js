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
    console.log("event", event)
    const action = event.srcElement.action
    const method = event.srcElement.method
    const formStatus = validateForm(event.target);
    console.log("formStatus", formStatus)
    // return false
    // const response = await fetch(action, {
    //     method: method,
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(params)
    // })
    // const res = await response.json()
    // console.log("res", res)
    // return {
    //     status: response.ok,
    //     message: res.message,
    //     data: res.data || []
    // }
}

function validateForm(inputs) {
    let formStatus = true;
    let focusInput
    console.log(inputs)
    for (const input of inputs) {
        switch (input.type) {
            case 'text' || 'password':
                const pattern = input.getAttribute('pattern')
                console.log("input ", input)
                console.log("pattern", pattern)
                if (new RegExp(pattern).test(input.value)) {
                    continue
                }
                if (!focusInput) {
                    focusInput = input
                }
                // input.reportValidity()
                formStatus = false
                break;
        }
    }
    return formStatus
}