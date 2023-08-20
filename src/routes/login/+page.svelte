<script>
    /** @type {import('./$types').PageData} */
    import { enhance } from "$app/forms";
    export let data;
    let inputs = {
        username: { value: "", invalid: false },
        password: { value: "", invalid: false },
    };
    const patterns = {
        username: new RegExp(/^[a-zA-Z0-9!@#$%^&*._-]{4,25}$/),
        password: new RegExp(/^[a-zA-Z0-9!@#$%^&*._-]{4,25}$/),
    };
    function submitForm(e) {
        let formValid = true;
        Object.entries(inputs).forEach((input) => {
            const key = input[0];
            input = input[1];
            if (!patterns[key].test(input.value)) {
                console.log(key);
                input.invalid = true;
                formValid = false;
                return;
            }
            input.invalid = false;
        });
        inputs = inputs;
        if (!formValid) {
            return;
        }
    }
</script>

<section>
    <form
        action="/login"
        method="post"
        use:enhance
        on:submit|preventDefault={submitForm}
    >
        <label for="username">Username</label>
        {#if inputs.username.invalid}
            <p class="invalid-text">Username invalid.</p>
        {/if}
        <input
            type="text"
            name="username"
            id="username"
            required
            bind:value={inputs.username.value}
            class:invalid={inputs.username.invalid}
        />

        <label for="password">Password</label>
        {#if inputs.password.invalid}
            <p class="invalid-text">Password invalid.</p>
        {/if}
        <input
            type="password"
            name="password"
            id="password"
            required
            bind:value={inputs.password.value}
            class:invalid={inputs.password.invalid}
        />
        <button>Login</button>
    </form>
</section>
