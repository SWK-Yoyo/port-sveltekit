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

    function moveTile() {
        for (let i = 0; i < 4; i++) {
            let prevPosition = 0;
            let prevVal = "";
            // let position = 0;
            for (let x = 0; x < 4; x++) {
                let position = i + x;
                let tile = tiles[position];
                if (prevVal) {
                    if(prevVal === tile){
                        tiles[prevPosition] = tile + tile
                        
                    }
                } else if (tile) {
                    prevVal = tile
                    prevPosition = position
                }
            }
        }
    }

    restartGame();
</script>

<svelte:window on:keyup={moveTile} />
<section>
    <div class="frame-2048">
        {#each tiles as val, inx}
            <span class="tile">{tiles[inx] ?? ""}</span>
        {/each}
    </div>
    <button on:click={restartGame}> New Game </button>
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
