<script>
    import { fly, scale } from "svelte/transition";
    export let score = 0;
    export let highScore = 0;
    export let plusScore;
</script>

<div class="score-wrapper">
    <div>
        <p>High Score</p>g
        {highScore > score ? highScore : score}
    </div>
    <div>
        <p>Score</p>
        <span class="score">
            {score}
            {#key plusScore}
                {#if plusScore}
                    <div
                        class="plus-score"
                        in:scale={{ duration: 150, start: 0.6 }}
                        out:fly={{ y: -20, duration: 250 }}
                        on:introend={() => (plusScore = 0)}
                    >
                        +{plusScore}
                    </div>
                {/if}
            {/key}
        </span>
    </div>
</div>

<style>
    .score-wrapper {
        display: flex;
        gap: 1rem;
        text-align: center;
    }
    .score-wrapper > div {
        min-width: 100px;
        background-color: brown;
        padding: 0.5rem 1rem;
        color: white;
        border-radius: 0.5rem;
        font-size: clamp(1rem, 2vw, 1.5rem);
        position: relative;
    }
    .score {
        position: relative;
    }
    p {
        font-size: clamp(0.5rem, 2vw, 1rem);
        margin-bottom: clamp(0.5rem, 2vw, 1rem);
    }
    .plus-score {
        position: absolute;
        font-size: clamp(0.7rem, 1vw, 1rem);
        top: -25%;
        right: -50%;
        color: #ccc;
    }
</style>
