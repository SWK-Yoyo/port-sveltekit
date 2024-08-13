<script>
    import InputText from "$lib/form-component/InputText.svelte";
    import Box from "../../lib/Box.svelte";
    export let data;
    console.log("data ");
</script>
<div class="white-space"></div>
<Box>
    <h1>Sign in</h1>
    <InputText
        name="username"
        placeholder="Username"
        pattern={data.pattern.username.regex}
    ></InputText>
    <InputText
        name="password"
        placeholder="Password"
        pattern={data.pattern.password.regex}
    ></InputText>
    <div class="button-wrapper">
        <a href="/register">Not have an account</a>
        <button>Sign in</button>
    </div>
</Box>

<style>
    .button-wrapper {
        width: 100%;
        display: flex;
        justify-content: end;
        gap: 1rem;
    }
</style>
