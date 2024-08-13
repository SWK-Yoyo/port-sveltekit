<section class="box-bg">
    <div class="box">
        <slot></slot>
    </div>
</section>

<style>
    .box-bg {
        background-color: var(--section-color);
        box-shadow: var(--box-shadow);
        border-radius: 1rem;
        max-width: 450px;
        padding: 1.3rem;
        margin: auto;
    }
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.7rem;
        max-width: 450px;
        margin: auto;
    }

    @media (min-width: 630px) {
        .box-bg {
            padding: 2rem;
        }
    }
    
</style>
