<script>
    import InputText from "$lib/form-component/InputText.svelte";
    import { usersPattern } from "$lib/form.js";
    import { PUBLIC_API_URL } from "$env/static/public";
    import Box from "../../lib/Box.svelte";
    export let data;
    function onSubmit(e) {
        e.preventDefault();
    }
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
        ></InputText>
        <InputText
            pattern={$usersPattern.password.regex}
            name="password"
            placeholder="Password"
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
