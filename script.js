const Game = {
  // 0 = air, 1 = grass, 2 = dirt
  // 3 = rock, 4 = wood, 5 = leaves

selectedTool: null,

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

    selectTool(toolName){
        this.selectedTool = toolName;

        const buttons =document.querySelectorAll(".tool-button");

        buttons.forEach((button) => {
            const isSelected = button.dataset.tool === toolName;

            button.classList.toggle("selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        document.querySelector("#game-message").textContent =
            `Selected tool: ${toolName}`;
    },

    setupTools() {
        const buttons = document.querySelectorAll(".tool-button");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                this.selectTool(button.dataset.tool);
            });
        });
    },

    clickTile(row, col) {
        const tileNumber = this.world[row][col];
        const tileType = this.tileTypes[tileNumber];
        const message = document.querySelector("#game-message");

        if (this.selectedTool === null) {
            message.textContent = "Select a tool first.";
            return;
        }

        if (tileType === "air") {
            return;
        }

        const correctTools = {
            grass: "shovel",
            dirt: "shovel",
            rock: "pickaxe",
            wood: "axe",
            leaves: "axe"
        };

        if (this.selectedTool !== correctTools[tileType]) {
            message.textContent = "Wrong tool for this block.";
            return;
        }

        this.world[row][col] = 0;
        this.renderWorld();

        message.textContent = `Removed: ${tileType}`;
    },

  

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

                tile.addEventListener("click", () => {
                    this.clickTile(row, col);
                });

                worldElement.appendChild(tile);
            }
        }
    }

};

Game.renderWorld();
Game.setupTools();