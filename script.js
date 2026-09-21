const Game = {
  // 0 = air, 1 = grass, 2 = dirt
  // 3 = rock, 4 = wood, 5 = leaves

  world: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 5, 5, 0, 0, 0, 0],
    [0, 5, 4, 5, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 3, 3, 2, 2, 3, 2],
    [3, 3, 3, 3, 3, 3, 3, 3]
  ],

  tileTypes: ["air", "grass", "dirt", "rock", "wood", "leaves"],

    renderWorld() {
        const worldElement = document.querySelector("#world");

        worldElement.innerHTML = "";

        for (let row = 0; row < this.world.length; row++) {
            for (let col = 0; col < this.world[row].length; col++) {

                const tileNumber = this.world[row][col];
                const tileType = this.tileTypes[tileNumber];

                const tile = document.createElement("button");
                tile.type = "button";
                tile.classList.add("tile", `tile-${tileType}`);

                tile.dataset.row = row;
                tile.dataset.col = col;

                tile.setAttribute(
                    "aria-label",
                    `${tileType}, row ${row + 1}, column ${col + 1}`
                );

                worldElement.appendChild(tile);
            }
        }
    }

};

Game.renderWorld();