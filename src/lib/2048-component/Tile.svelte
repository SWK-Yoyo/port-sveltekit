<script>
    export let value;
    export let x;
    export let y;
    export let merge = false;
    import { scale } from "svelte/transition";
    let backgroundClass = [
        "tile-2",
        "tile-4",
        "tile-8",
        "tile-16",
        "tile-32",
        "tile-64",
        "tile-128",
        "tile-256",
        "tile-512",
        "tile-1024",
        "tile-2048",
        "tile-4096",
    ];
    let bgColor = "";
    $: bgColor = backgroundClass[Math.log2(value) - 1] ?? "tile-wow";
</script>

<!-- -->
<div
    on:transitionend
    on:animationend
    in:scale={{ duration: 300, start: 0.6 }}
    class:merge
    class="tile {bgColor ? bgColor : ''} "
    style="--x:{x};--y:{y}"
>
    {value}
</div>

<style>
    .tile-2 {
        background-color: hsl(32, 100%, 93%);
    }
    .tile-4 {
        background-color: hsl(32, 100%, 80%);
    }
    .tile-8 {
        background-color: hsl(34, 100%, 61%);
        color: white;
    }
    .tile-16 {
        background-color: hwb(34 3% 0%);
        color: white;
    }
    .tile-32 {
        background-color: hwb(22 11% 0%);
        color: white;
    }
    .tile-64 {
        background-color: hwb(15 7% 0%);
        color: white;
    }
    .tile-128 {
        background-color: hwb(15 0% 0%);
        color: white;
    }
    .tile-256 {
        background-color: hwb(9 11% 0%);
        color: white;
    }
    .tile-512 {
        background-color: hwb(345 26% 0%);
        color: white;
    }
    .tile-1024 {
        background-color: hwb(345 17% 0%);
        color: white;
    }
    .tile-2048 {
        background-color: hwb(345 7% 0%);
        box-shadow: -2px 2px 20px -2px hwb(345 7% 0%);
        -webkit-box-shadow: -2px 2px 20px -2px hwb(345 7% 0%);
        -moz-box-shadow: -2px 2px 20px -2px hwb(345 7% 0%);
        color: white;
    }
    .tile-4096 {
        background-color: hwb(345 0% 0%);
        box-shadow: -2px 2px 20px -2px hwb(345 0% 0%);
        -webkit-box-shadow: -2px 2px 20px -2px hwb(345 0% 0%);
        -moz-box-shadow: -2px 2px 20px -2px hwb(345 0% 0%);
        color: white;
    }

    .tile {
        font-family: "Rubik", sans-serif;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 0.5rem;
        font-size: 4vw;
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
        transition: all 100ms;
    }
    .merge {
        z-index: 3;
        animation: merge 50ms ease-in-out;
    }
    @keyframes merge {
        50% {
            transform: scale(1.5);
        }
    }
</style>
