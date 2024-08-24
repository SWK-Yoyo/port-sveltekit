<script>
    import InputText from "../../lib/form-component/InputText.svelte";
    import { submitForm, usersPattern } from "../../lib/form.js";
    import { PUBLIC_API_URL } from "$env/static/public";
    import { user } from "../../lib/user.js";
    import Box from "../../lib/Box.svelte";
    import BoxError from "../../lib/BoxError.svelte";

    let error = {
        status: false,
        message: "",
    };

    let params = {
        username: "",
        password: "",
    };

    async function onSubmit(e) {
        error.status = false;
        e.preventDefault();
        const response = await submitForm(e, params);
        if (!response.status) {
            error = {
                status: true,
                message: response.message,
            };
            error = error;
            return;
        }

        window.location.href = "/";
    }
</script>

<div class="white-space"></div>
<form
    action="{PUBLIC_API_URL}/login"
    method="post"
    on:submit={onSubmit}
    novalidate
>
    <Box>
        <h1>Sign in</h1>
        <BoxError show={error.status}>{error.message}</BoxError>
        <InputText
            pattern={$usersPattern.username.regex}
            name="username"
            placeholder="Username"
            errorText="test tes"
            required={true}
            bind:value={params.username}
        ></InputText>
        <InputText
            type="password"
            pattern={$usersPattern.password.regex}
            name="password"
            placeholder="Password"
            required={true}
            bind:value={params.password}
        ></InputText>
        <div class="button-wrapper">
            <a href="/register">Not have an account</a>
            <button>Sign in</button>
        </div>
    </Box>
</form>

<style>
    .button-wrapper {
        width: 100%;
        display: flex;
        justify-content: end;
        gap: 1rem;
    }
</style>
