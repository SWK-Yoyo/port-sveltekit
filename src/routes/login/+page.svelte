<script>
    import InputText from "../../lib/form-component/InputText.svelte";
    import { submitForm, usersPattern } from "../../lib/form.js";
    import { PUBLIC_API_URL } from "$env/static/public";

    import Box from "../../lib/Box.svelte";
    export let data;
    let username;
    let password;

    function onSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password);
        submitForm(e, { username, password });
    }

    $: console.log("username", username);
    $: console.log("password", password);
</script>

<div class="white-space"></div>
<form action="{PUBLIC_API_URL}/login" method="post" on:submit={onSubmit}>
    <Box>
        <h1>Sign in</h1>
        <InputText
            pattern={$usersPattern.username.regex}
            name="username"
            placeholder="Username"
            errorText="test tes"
            required={true}
        ></InputText>
        <InputText
            pattern={$usersPattern.password.regex}
            name="password"
            placeholder="Password"
            required={true}
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
