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
        cell.tile = 1;
        return {
            x: cell.x,
            y: cell.y,
            value: value,
        };
    }

    function newGame() {
        cells.forEach((cell) => (cell.tile = null));
        cells = cells;
        tiles = [];
        tiles = tiles;
        // set timeout for re-render create tile
        setTimeout(() => {
            tiles.push(genTIle());
            tiles.push(genTIle());
            tiles = tiles;
        }, 100);
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
                    }, 150);
                }
                break;
            // move right
            case 39:
                if (moveRight()) {
                    tiles.push(genTIle());
                    tiles = tiles;
                }
                break;
            // move up
            case 38:
                if (moveUp()) {
                    tiles.push(genTIle());
                    tiles = tiles;
                }
                break;
            // move down
            case 40:
                if (moveDown()) {
                    tiles.push(genTIle());
                    tiles = tiles;
                }
                break;
            default:
                break;
        }
    }
    function moveLeft() {
        // prepare array to move
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.y] = gridCell[cell.y] || [];
            gridCell[cell.y][cell.x] = cell;
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) {
                tiles.splice(i, 1);
            } else {
                prepareMove[tile.y][tile.x].tileEle = tile;
            }
        });
        tiles = tiles;
        // move array
        return slideTiles(prepareMove);
    }
    function moveRight() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.y] = gridCell[cell.y] || [];
            gridCell[cell.y][cell.x] = cell;
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) {
                tiles.splice(i, 1);
            } else {
                prepareMove[tile.y][tile.x].tileEle = tile;
            }
        });
        prepareMove.map((val) => val.reverse());
        // move array
        return slideTiles(prepareMove);
    }
    function moveUp() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.x] = gridCell[cell.x] || [];
            gridCell[cell.x][cell.y] = cell;
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) {
                tiles.splice(i, 1);
            } else {
                prepareMove[tile.x][tile.y].tileEle = tile;
            }
        });
        // move array
        return slideTiles(prepareMove);
    }
    function moveDown() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.x] = gridCell[cell.x] || [];
            gridCell[cell.x][cell.y] = cell;
            return gridCell;
        }, []);
        tiles.forEach((tile, i) => {
            if (tile.deleteStatus) {
                tiles.splice(i, 1);
            } else {
                prepareMove[tile.x][tile.y].tileEle = tile;
            }
        });
        prepareMove.map((val) => val.reverse());
        // move array
        return slideTiles(prepareMove);
    }

    function slideTiles(cells2) {
        console.log(cells2);
        let moveStatus = false;
        for (let i = 0; i < Object.keys(cells2).length; i++) {
            let prev = 0;
            let mergeStatus = false;
            for (let j = 1; j < Object.keys(cells2[i]).length; j++) {
                let cell = cells2[i][j];
                let prevCell = cells2[i][prev];
                if (cell.tile === null) continue;
                let tile = cell.tileEle;
                let prevTile = prevCell.tileEle;
                if (prevCell?.tile) {
                    // merge tile if tile value = prevTile value
                    if (
                        cell.tile.value === prevCell.tile?.value &&
                        !mergeStatus
                    ) {
                        // set tile
                        tile.x = prevTile.x;
                        tile.y = prevTile.y;
                        tile.value *= 2;
                        tile.mergeStatus = true;
                        prevTile.deleteStatus = true;
                        // set cell
                        prevCell.tile = 1;
                        cell.tile = null;
                        moveStatus = true;
                        mergeStatus = true;
                    } else {
                        prev++;
                        prevCell = cells2[i][prev];
                        // check tile !== prevTile for move if move status merge is reset
                        if (tile.x !== prevCell.x || tile.y !== prevCell.y) {
                            mergeStatus = false;
                            moveStatus = true;
                            tile.x = prevCell.x;
                            tile.y = prevCell.y;
                            prevCell.tile = 1;
                            cell.tile = null;
                        }
                    }
                } else {
                    tile.x = prevCell.x;
                    tile.y = prevCell.y;
                    prevCell.tile = 1;
                    cell.tile = null;
                    moveStatus = true;
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
