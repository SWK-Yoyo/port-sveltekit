<script>
    import InputText from "$lib/form-component/InputText.svelte";
    export let data;
    console.log("data ");
</script>

<section class="box-bg">
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
</section>

<style>
    .button-wrapper {
        display: flex;
    }
</style>
