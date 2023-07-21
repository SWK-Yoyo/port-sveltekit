<script>
    export let value;
    export let x;
    export let y;
    export let merge = false;
    import { scale } from "svelte/transition";
    let backgroundClass = ["red-100", "red-200"];
    let bgColor = "";
    $: bgColor = backgroundClass[Math.log2(value) - 1];
</script>

<!-- -->
<div
    on:transitionend
    on:animationend
    in:scale={{ duration: 300, start: 0.6 }}
    class="tile {bgColor}"
    class:merge
    style="--x:{x};--y:{y}"
>
    {value}
</div>

<style>
    .red-100 {
        background-color: hsl(194, 100%, 86%);
    }
    .red-200 {
        background-color: hsl(0, 100%, 77%);
    }
    .tile {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 0.5rem;
        font-weight: bold;
        font-size: 5vw;
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
