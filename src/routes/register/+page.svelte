<script>
    import InputText from "$lib/form-component/InputText.svelte";
    import Box from "$lib/Box.svelte";
</script>

<Box>
    <h1>register</h1>

    <InputText name="username" placeholder="Username" pattern=""></InputText>
    <InputText name="password" placeholder="Password" pattern=""></InputText>
    <InputText name="re_password" placeholder="Re-password" pattern=""
    ></InputText>
    <InputText name="email" placeholder="Email" pattern=""></InputText>
    <div class="button-wrapper">
        <a href="/login">Back to Sign in</a>
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
