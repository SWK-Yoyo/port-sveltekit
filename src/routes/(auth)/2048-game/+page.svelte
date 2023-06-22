<script>
    let highScore = 0;
    let tiles = Array(16).fill("");

    function genTile() {
        console.log(tiles);
        let randomNum = Math.floor(Math.random() * 2 + 1) * 2;
        let randomPosition = Math.floor(Math.random() * tiles.length);
        tiles[randomPosition] = randomNum;
        console.log(tiles);
    }
    function restartGame() {
        tiles = Array(16).fill(null);
        genTile();
        genTile();
    }
    restartGame();
</script>

<section>
    <div class="frame-2048">
        {#each tiles as val, inx}
            <span class="tile">{tiles[inx] ?? ""}</span>
        {/each}
    </div>
    <button> New Game </button>
</section>

<style>
    .frame-2048 {
        display: inline-grid;
        grid-template-columns: repeat(4, 75px);
        grid-template-rows: repeat(4, 75px);
        gap: 0.4rem;
        background-color: aliceblue;
        border-radius: 1rem;
        padding: 1rem;
    }
    .tile {
        background-color: rgb(181, 221, 255);
        border-radius: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
