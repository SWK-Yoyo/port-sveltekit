<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<header>
    <p>logo</p>
    <p>logo</p>
    <button>Login</button>
</header>
<section>
    <slot />
</section>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }
</style>
