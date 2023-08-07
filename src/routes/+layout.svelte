<script>
    /** @type {import('./$types').LayoutData} */
    import Login, { showLoginModal } from "$lib/login-component/Login.svelte";
</script>

<header>
    <p>logo</p>
    <p>logo</p>
    <button on:click={showLoginModal}>Login</button>
</header>

<section>
    <slot />
</section>
<Login />

<style>
    header {
        display: flex;
        justify-content: space-between;
    }
</style>
