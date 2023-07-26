<script>
    import { fly } from "svelte/transition";
    export let score = 0;
    export let highScore = 0;
    export let plusScore;
</script>

<div class="score-wrapper">
    <div class="high-score">
        <p>High Score</p>
        {highScore > score ? highScore : score}
    </div>
    <div class="score">
        <p>Score</p>
        {score}
        {#if plusScore}
            <span out:fly={{ y: -200, duration: 300 }}>{plusScore}</span>
        {/if}
    </div>
</div>

<style>
    .score-wrapper {
        display: flex;
        gap: 1rem;
        text-align: center;
    }
    .score-wrapper div {
        min-width: 100px;
        background-color: brown;
        padding: 0.5rem;
        color: white;
        border-radius: 0.5rem;
        font-size: 1.5rem;
    }
    p {
        font-size: 0.5rem;
        margin-bottom: 0.7rem;
    }
</style>
