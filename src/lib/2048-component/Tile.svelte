<script>
    export let value;
    export let x;
    export let y;
    export let mergeStatus = false;
    export let deleteStatus = false;
    import { scale } from "svelte/transition";
    let merge = false;
    function handleTransition() {
        if (mergeStatus) {
            merge = true;
        }
    }
    function handleAnimationend() {
        merge = false;
    }
</script>

<!-- -->
{#if !deleteStatus}
    <div
        on:transitionend={handleTransition}
        on:animationend={handleAnimationend}
        in:scale={{ duration: 300, start: 0.6 }}
        class="tile"
        class:merge
        class:mergeStatus
        style="--x:{x};--y:{y}"
    >
        {value}
    </div>
{/if}

<style>
    .tile {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: red;
        border-radius: 0.5rem;
        top: calc(
            var(--y) * (100% / var(--boardSize) - (var(--gap) * 0.25)) +
                var(--gap)
        );
        left: calc(
            var(--x) * (100% / var(--boardSize) - (var(--gap) * 0.25)) +
                var(--gap)
        );
        width: calc((100% / var(--boardSize)) - (var(--gap) + 0.25rem));
        height: calc((100% / var(--boardSize)) - (var(--gap) + 0.25rem));
        transition: all 200ms;
    }
    .merge {
        animation: merge 100ms ease;
    }
    .mergeStatus {
        z-index: 3;
    }
    @keyframes merge {
        50% {
            transform: scale(1.2);
        }
    }
</style>
