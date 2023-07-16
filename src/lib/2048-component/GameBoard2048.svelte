<script>
    import Tile from "$lib/2048-component/Tile.svelte";
    import Cell from "$lib/2048-component/Cell.svelte";
    import { onMount } from "svelte";
    import { escape } from "svelte/internal";

    let myWindow;
    export let boardSize = 4;
    // initial setup
    let id = 0;
    let cells = [];
    let tiles = {};
    onMount(() => {
        if (localStorage.cells) {
            id = localStorage.id;
            cells = JSON.parse(localStorage.cells);
            tiles = JSON.parse(localStorage.tiles);
        } else {
            // initial setup
            for (let i = 0; i < boardSize * boardSize; i++) {
                cells.push({
                    x: Math.floor(i / boardSize),
                    y: i % boardSize,
                    tile: null,
                });
                cells = cells;
            }
            newGame();
        }
    });

    function genTile(value = Math.random() > 0.5 ? 2 : 4) {
        checkGameOver();
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

    function genTileForDebug(po, value = Math.random() > 0.5 ? 2 : 4) {
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
        id = 0;
        cells.forEach((cell) => (cell.tile = null));
        tiles = {};
        cells = cells;
        // set timeout for re-render create tile
        tiles[id] = genTile();
        tiles[id] = genTile();
        tiles = tiles;
        localStorage.setItem("id", id);
        localStorage.setItem("cells", JSON.stringify(cells));
        localStorage.setItem("tiles", JSON.stringify(tiles));
    }

    function moveTiles(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            // move left
            case 37:
                if (moveLeft()) {
                    moveSuccess();
                }
                break;
            // move right
            case 39:
                if (moveRight()) {
                    moveSuccess();
                }
                break;
            // move up
            case 38:
                if (moveUp()) {
                    moveSuccess();
                }
                break;
            // move down
            case 40:
                if (moveDown()) {
                    moveSuccess();
                }
                break;
            default:
                e.target.addEventListener("keyup", moveTiles, {
                    once: true,
                });
                return;
                break;
        }
        e.target.addEventListener("keyup", moveTiles, {
            once: true,
        });

        function moveSuccess() {
            tiles[id] = genTile();
            tiles = tiles;
            cells = cells;
            localStorage.setItem("id", id);
            localStorage.setItem("cells", JSON.stringify(cells));
            localStorage.setItem("tiles", JSON.stringify(tiles));
        }
    }

    function prepareMoveForColumns() {
        let prepareMove = cells.reduce((gridCell, cell) => {
            gridCell[cell.y] = gridCell[cell.y] || [];
            gridCell[cell.y][cell.x] = { cell: cell, tile: null };
            return gridCell;
        }, []);
        Object.values(tiles).forEach((tile, i) => {
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
        Object.values(tiles).forEach((tile, i) => {
            prepareMove[tile.x][tile.y].tile = tile;
        });
        return prepareMove;
    }
    function moveLeft() {
        // prepare array to move
        let prepare = prepareMoveForColumns();
        console.log(tiles);
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
                        tile.prevId = prevTile.id;
                        tile.value *= 2;
                        arr[i][prev].tile = { ...tile };
                        arr[i][j].tile = null;
                        // set cell
                        prevCell.tile = 1;
                        cell.tile = null;
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

    function checkSlide(arr) {
        let moveStatus = false;
        for (let i = 0; i < Object.keys(arr).length; i++) {
            let prev = 0;
            let mergeStatus = false;
            for (let j = 1; j < Object.keys(arr[i]).length; j++) {
                let tile = arr[i][j].tile;
                let prevTile = arr[i][prev].tile;
                let prevCell = arr[i][prev].cell;
                if (tile === null) continue;
                if (prevTile !== null) {
                    if (tile.value === prevTile?.value && !mergeStatus) {
                        moveStatus = true;
                        mergeStatus = true;
                    } else {
                        prev++;
                        prevCell = arr[i][prev].cell;
                        if (tile.x !== prevCell.x || tile.y !== prevCell.y) {
                            mergeStatus = false;
                            moveStatus = true;
                        }
                    }
                } else {
                    moveStatus = true;
                }
            }
        }
        cells = cells;
        tiles = tiles;
        return moveStatus;
    }

    function checkGameOver() {
        if (
            Object.values(tiles).length > 15 &&
            !checkMoveLeft() &&
            !checkMoveRight &&
            !checkMoveUp() &&
            !checkMoveDown()
        ) {
            alert("game over");
            localStorage.removeItem("id", id);
            localStorage.removeItem("cells", JSON.stringify(cells));
            localStorage.removeItem("tiles", JSON.stringify(tiles));
        }
        function checkMoveLeft() {
            let prepare = prepareMoveForColumns();
            return checkSlide(prepare);
        }
        function checkMoveRight() {
            let prepare = prepareMoveForColumns();
            prepare.map((val) => val.reverse());
            return checkSlide(prepare);
        }
        function checkMoveUp() {
            let prepare = prepareMoveForRows();
            return checkSlide(prepare);
        }
        function checkMoveDown() {
            let prepare = prepareMoveForRows();
            prepare.map((val) => val.reverse());
            return checkSlide(prepare);
        }
    }
    function handleTransitionEnd(tile) {
        console.log("transition end");
        if (tile.mergeStatus) {
            tile.merge = true;
            tile.mergeStatus = false;
            delete tiles[tile.prevId];
            delete tile.prevId;
        } else {
            tile.merge = false;
        }
        tiles = tiles;
    }
    function handleAnimationEnd(tile) {
        if (tile.merge) {
            tile.merge = false;
        }
    }
</script>

<svelte:window on:keyup|once={moveTiles} />
<section>
    <button on:click={newGame}>new game</button>
    <div
        class="game-board"
        style="--boardSize:{boardSize};--gap: 1rem;--padding: 1rem;"
    >
        {#each cells as cell (Symbol())}
            <Cell />
        {/each}
        {#each Object.values(tiles) as tile (tile.id)}
            <Tile
                id={tile.id}
                x={tile.x}
                y={tile.y}
                value={tile.value}
                merge={tile.merge}
                on:transitionend={() => handleTransitionEnd(tile)}
                on:animationend={() => handleAnimationEnd(tile)}
            />
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
