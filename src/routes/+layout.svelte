<script>
    import Header from "$lib/Header.svelte";
    import "../app.css";
</script>

<section>
    <Header></Header>
</section>
<main>
    <slot></slot>
</main>

<style>
    main {
        padding: 1rem;
    }
    main {
        max-width: 1500px;
        margin: auto;
        /* padding: 5rem; */
    }
</style>
