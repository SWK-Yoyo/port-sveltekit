<script>
    export let value;
    export let x;
    export let y;
    export let merge = false;
    import { scale } from "svelte/transition";
    let background = [];
    let color = [];
</script>

<!-- -->
<div
    on:transitionend
    on:animationend
    in:scale={{ duration: 300, start: 0.6 }}
    class="tile"
    class:merge
    style="--x:{x};--y:{y}"
>
    {value}
</div>

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
        z-index: 3;
        animation: merge 150ms ease-in-out;
    }
    @keyframes merge {
        50% {
            transform: scale(1.12);
        }
    }
</style>
