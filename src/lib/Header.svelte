<script>
    let active = false;

    function toggleActive() {
        active = !active;
    }
</script>

<header class="p-3">
    <nav>
        <section class="mobile-menu">
            <button on:click={toggleActive} class="no-bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                    ><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                        fill="#ffffff"
                        d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                    /></svg >
            </button>
        </section>
        <section class="menu px-5" class:active>
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
        align-items: center;
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
        left: -70%;
        z-index: -1;
        transition: 1s;
    }
    section.menu.active {
        left: 0;
    }

    @media (min-width: 630px) {
        section.menu {
            transition: unset;
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
            left: unset;
            display: flex;
        }
        .mobile-menu {
            display: none;
        }
    }
</style>
