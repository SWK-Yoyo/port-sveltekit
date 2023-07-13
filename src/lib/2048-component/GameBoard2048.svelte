<script>
    import Tile from "$lib/2048-component/Tile.svelte";
    import Cell from "$lib/2048-component/Cell.svelte";
    import { onMount } from "svelte";
    import { escape } from "svelte/internal";

    export let boardSize = 4;
    onMount(() => {
        newGame();
    });
    let cells = [];
    let tiles = [];
    // initial setup
    for (let i = 0; i < boardSize * boardSize; i++) {
        cells.push({
            x: Math.floor(i / boardSize),
            y: i % boardSize,
            tile: null,
        });
        cells = cells;
    }

    function genTIle(value = Math.random() > 0.5 ? 2 : 4) {
        let emptyCells = cells.filter((val) => val.tile === null);
        if (emptyCells.length === 0) return;
        let randomPosition = Math.floor(Math.random() * emptyCells.length);
        let cell = emptyCells[randomPosition];
        let tile = {
            x: cell.x,
            y: cell.y,
            value: value,
        };
        cell.tile = 1;
        return tile;
    }

    function newGame() {
        cells.forEach((cell) => (cell.tile = null));
        cells = cells;
        // set timeout for re-render create tile
        setTimeout(() => {
            tiles.push(genTIle());
            tiles.push(genTIle());
            tiles = tiles;
        }, 200);
    }

    function moveTiles(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            // move left
            case 37:
                if (moveLeft()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                    }, 300);
                }
                break;
            // move right
            case 39:
                if (moveRight()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                    }, 300);
                }
                break;
            // move up
            case 38:
                if (moveUp()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                    }, 300);
                }
                break;
            // move down
            case 40:
                if (moveDown()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                    }, 300);
                }
                break;
            default:
                break;
        }
    }
    function prepareMoveForColumns() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.y] = gridCell[cell.y] || [];
            gridCell[cell.y][cell.x] = { cell: cell, tile: null };
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) return;
            prepareMove[tile.y][tile.x].tile = tile;
        });
        return prepareMove;
    }
    function prepareMoveForRows() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.x] = gridCell[cell.x] || [];
            gridCell[cell.x][cell.y] = { cell: cell, tile: null };
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) return;
            prepareMove[tile.x][tile.y].tile = tile;
        });
        return prepareMove;
    }
    function moveLeft() {
        // prepare array to move
        let prepare = prepareMoveForColumns();
        // move array
        return slideTiles(prepare);
    }
    function moveRight() {
        let prepare = prepareMoveForColumns();
        prepare.map((val) => val.reverse());
        // move array
        return slideTiles(prepare);
    }
    function moveUp() {
        let prepare = prepareMoveForRows();
        // move array
        return slideTiles(prepare);
    }
    function moveDown() {
        let prepare = prepareMoveForRows();
        prepare.map((val) => val.reverse());
        // move array
        return slideTiles(prepare);
    }

    function slideTiles(prepareCellsAndTiles) {
        let moveStatus = false;
        for (let i = 0; i < Object.keys(prepareCellsAndTiles).length; i++) {
            let prev = 0;
            let mergeStatus = false;
            for (
                let j = 1;
                j < Object.keys(prepareCellsAndTiles[i]).length;
                j++
            ) {
                let prepare = prepareCellsAndTiles[i][j];
                let prevPrepare = prepareCellsAndTiles[i][prev];
                if (prepare.tile === null) continue;
                if (prevPrepare?.tile) {
                    // merge tile if tile value = prevTile value
                    if (
                        prepare.tile.value === prevPrepare.tile?.value &&
                        !mergeStatus
                    ) {
                        // set move status
                        moveStatus = true;
                        mergeStatus = true;
                        // set tile
                        prepare.tile.x = prevPrepare.tile.x;
                        prepare.tile.y = prevPrepare.tile.y;
                        prepare.tile.value *= 2;
                        prepare.tile.mergeStatus = true;
                        prevPrepare.tile.deleteStatus = true;
                        // set cell
                        prevPrepare.cell = 1;
                        prepare.cell = null;
                    } else {
                        prev++;
                        prevPrepare = prepareCellsAndTiles[i][prev];
                        // check tile !== prevTile for move if move status merge is reset
                        if (
                            prepare.tile.x !== prevPrepare.cell.x ||
                            prepare.tile.y !== prevPrepare.cell.y
                        ) {
                            // set move merge status
                            mergeStatus = false;
                            moveStatus = true;
                            // set tile
                            prepare.tile.x = prevPrepare.cell.x;
                            prepare.tile.y = prevPrepare.cell.y;
                            // set cell value
                            prevPrepare.cell.tile = 1;
                            prepare.cell.tile = null;
                        }
                    }
                } else {
                    // set move status
                    moveStatus = true;
                    // set tile
                    prepare.tile.x = prevPrepare.cell.x;
                    prepare.tile.y = prevPrepare.cell.y;
                    // set cell value
                    prevPrepare.cell.tile = 1;
                    prepare.cell.tile = null;
                }
            }
        }
        cells = cells;
        tiles = tiles;
        return moveStatus;
    }
</script>

<svelte:window on:keyup={moveTiles} />
<section>
    <button on:click={newGame}>new game</button>
    <div
        class="game-board"
        style="--boardSize:{boardSize};--gap: 1rem;--padding: 1rem;"
    >
        {#each cells as cell, i (Symbol())}
            <Cell />
        {/each}
        {#each tiles as tile}
            <Tile {...tile} />
        {/each}
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        height: 100svh;
        background-color: rgb(84, 84, 84);
    }
    .game-board {
        width: 500px;
        height: 500px;
        background-color: rgb(255, 161, 161);
        border-radius: 1rem;
        display: grid;
        grid-template-rows: repeat(var(--boardSize), 1fr);
        grid-template-columns: repeat(var(--boardSize), 1fr);
        padding: var(--padding);
        gap: var(--gap);
        position: relative;
    }
</style>
