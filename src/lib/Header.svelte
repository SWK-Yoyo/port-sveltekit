<script>
</script>

<header class="p-3">
    <nav>
        <section class="mobile-menu">
            <button>menu</button>
        </section>
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
        position: relative;
        z-index: 2;
    }
    a {
        font-size: 1.3rem;
        color: var(--font-secondary-color);
        text-decoration: none;
    }
    nav {
        display: flex;
        gap: var(--space-3);
        justify-content: space-between;
    }
    section {
        min-width: 4rem;
        align-items: center;
        justify-content: center;
    }

    section.menu {
        height: 100svh;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 3rem;
        align-items: center;
        width: 70%;
        max-width: 350px;
        background-color: #515151d1;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        padding: 5rem 0;
        top: 0;
        left: 0;
        z-index: -1;
    }

    @media (min-width: 630px) {
        section.menu {
            position: relative;
            height: unset;
            justify-content: start;
            gap: 3rem;
            flex-direction: row;
            background: unset;
            box-shadow: none;
            flex-grow: 1;
            padding: unset;
            overflow-x: auto;
            display: flex;
        }
        .mobile-menu {
            display: none;
        }
    }
</style>
