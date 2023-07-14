<script>
    import Tile from "$lib/2048-component/Tile.svelte";
    import Cell from "$lib/2048-component/Cell.svelte";
    import { onMount } from "svelte";
    import { escape } from "svelte/internal";
    let myWindow;
    export let boardSize = 4;
    onMount(() => {
        newGame();
    });
    let id = 1;
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
            id: id++,
            x: cell.x,
            y: cell.y,
            value: value,
        };
        cell.tile = 1;
        return tile;
    }

    function genTIleForDebug(po, value = Math.random() > 0.5 ? 2 : 4) {
        let emptyCells = cells.filter((val) => val.tile === null);
        if (emptyCells.length === 0) return;
        let randomPosition = po;
        let cell = emptyCells[randomPosition];
        let tile = {
            id: id++,
            x: cell.x,
            y: cell.y,
            value: value,
        };
        cell.tile = 1;
        return tile;
    }

    function newGame() {
        cells.forEach((cell) => (cell.tile = null));
        tiles = []
        cells = cells;
        // set timeout for re-render create tile
        tiles.push(genTIle());
        tiles.push(genTIle());
        tiles = tiles;
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
                        e.target.addEventListener("keyup", moveTiles, {
                            once: true,
                        });
                    }, 100);
                    return;
                }
                break;
            // move right
            case 39:
                if (moveRight()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                        e.target.addEventListener("keyup", moveTiles, {
                            once: true,
                        });
                    }, 100);
                    return;
                }
                break;
            // move up
            case 38:
                if (moveUp()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                        e.target.addEventListener("keyup", moveTiles, {
                            once: true,
                        });
                    }, 100);
                    return;
                }
                break;
            // move down
            case 40:
                if (moveDown()) {
                    setTimeout(() => {
                        tiles.push(genTIle());
                        tiles = tiles;
                        e.target.addEventListener("keyup", moveTiles, {
                            once: true,
                        });
                    }, 100);
                    return;
                }
                break;
            default:
                break;
        }
        e.target.addEventListener("keyup", moveTiles, {
            once: true,
        });
    }

    function prepareMoveForColumns() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.y] = gridCell[cell.y] || [];
            gridCell[cell.y][cell.x] = { cell: cell, tile: null };
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
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

    function slideTiles(arr) {
        let moveStatus = false;
        for (let i = 0; i < Object.keys(arr).length; i++) {
            let prev = 0;
            let mergeStatus = false;
            for (let j = 1; j < Object.keys(arr[i]).length; j++) {
                let tile = arr[i][j].tile;
                let prevTile = arr[i][prev].tile;
                let cell = arr[i][j].cell;
                let prevCell = arr[i][prev].cell;

                if (tile === null) continue;
                if (prevTile !== null) {
                    // merge tile if tile value = prevTile value
                    if (tile.value === prevTile?.value && !mergeStatus) {
                        // set move status
                        moveStatus = true;
                        mergeStatus = true;
                        // set tile
                        tile.x = prevTile.x;
                        tile.y = prevTile.y;
                        tile.mergeStatus = true;
                        tile.value *= 2;
                        arr[i][prev].tile = { ...tile };
                        arr[i][j].tile = null;
                        setTimeout(() => {
                            tile.mergeStatus = false;
                            removeTileById(prevTile.id);
                        }, 200);
                        // set cell
                        prevCell = 1;
                        cell = null;
                    } else {
                        prev++;
                        prevCell = arr[i][prev].cell;
                        // check tile !== prevTile for move if move status merge is reset
                        if (tile.x !== prevCell.x || tile.y !== prevCell.y) {
                            // set move merge status
                            mergeStatus = false;
                            moveStatus = true;
                            // set tile
                            tile.x = prevCell.x;
                            tile.y = prevCell.y;
                            arr[i][prev].tile = { ...tile };
                            arr[i][j].tile = null;
                            // set cell value
                            prevCell.tile = 1;
                            cell.tile = null;
                        }
                    }
                } else {
                    // set move status
                    moveStatus = true;
                    // set tile
                    tile.x = prevCell.x;
                    tile.y = prevCell.y;
                    arr[i][prev].tile = { ...tile };
                    arr[i][j].tile = null;
                    // set cell value
                    prevCell.tile = 1;
                    cell.tile = null;
                }
            }
        }
        cells = cells;
        tiles = tiles;
        return moveStatus;
    }
    function removeTileById(id) {
        tiles.forEach((tile, i) => {
            if (tile.id === id) {
                tiles.splice(i, 1);
            }
        });
    }
</script>

<svelte:window on:keyup|once={moveTiles} />
<section>
    <button on:click={newGame}>new game</button>
    <div
        class="game-board"
        style="--boardSize:{boardSize};--gap: 1rem;--padding: 1rem;"
    >
        {#each cells as cell, i (Symbol())}
            <Cell />
        {/each}
        {#each tiles as tile (tile.id)}
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
