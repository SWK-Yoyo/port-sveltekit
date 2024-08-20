<script>
    import { fly } from "svelte/transition";

    export let show = false;
</script>

{#if show}
    <div in:fly out:fly class="box">
        <div class="close" on:click={(e) => (show = false)}>x</div>
        <p class="head">
            <slot></slot>
        </p>
    </div>
{/if}

<style>
    .box {
        width: 100%;
        color: var(--font-secondary-color);
        background-color: var(--danger-color);
        display: flex;
        box-shadow: var(--box-shadow);
        border-radius: 0.4rem;
        padding: 1.3rem;
        position: relative;
    }
    .close {
        color: black;
        position: absolute;
        right: 0.7rem;
        top: 0.7rem;
    }
    .head {
        font-weight: bold;
    }

    @media (min-width: 630px) {
        .box {
            padding: 2rem;
        }
    }
</style>
