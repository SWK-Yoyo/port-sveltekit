<script>
</script>

<header class="p-3">
    <nav>
        <section class="menu px-5">
            <a href="/work">Work</a>
            <a href="/work">Work</a>
            <a href="/work">Work</a>
            <a href="/work">Work</a>
        </section>
        <section class="">
            <a href="/login">Sign in</a>
        </section>
    </nav>
</header>

<style>
    header {
        display: block;
        background-color: var(--primary-color);
    }
    a {
        font-size: 1.3rem;
        color: var(--font-secondary-color);
        text-decoration: none;
    }
    nav {
        display: flex;
        gap: var(--space-3);
    }
    section {
        min-width: 4rem;
        align-items: center;
        justify-content: center;
    }

    section.menu {
        justify-content: start;
        display: flex;
        gap: 3rem;
        flex-grow: 1;
        overflow-x: auto;
    }
</style>
