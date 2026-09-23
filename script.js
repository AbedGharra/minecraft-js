const Game = {
  // 0 = air, 1 = grass, 2 = dirt
  // 3 = rock, 4 = wood, 5 = leaves

    selectedTool: null,
    selectedBlock: null,

    inventory: {
        grass: 0,
        dirt: 0,
        rock: 0,
        wood: 0,
        leaves: 0
    },

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

    selectTool(toolName) {
        this.selectedTool = toolName;
        this.selectedBlock = null;
        this.renderInventory();

        const buttons = document.querySelectorAll(".tool-button");

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

    selectBlock(tileType) {
        if (this.inventory[tileType] <= 0) {
            return;
        }

        this.selectedBlock = tileType;
        this.selectedTool = null;

        document.querySelectorAll(".tool-button").forEach((button) => {
            button.classList.remove("selected");
            button.setAttribute("aria-pressed", "false");
        });

        this.renderInventory();

        document.querySelector("#game-message").textContent =
            `Selected block: ${tileType}`;
    },

    renderInventory() {
        const inventoryElement = document.querySelector("#inventory");

        inventoryElement.innerHTML = "";

        for (const tileType in this.inventory) {
            const count = this.inventory[tileType];

            if (count === 0) {
                continue;
            }

            const item = document.createElement("button");
            item.type = "button";
            item.classList.add("inventory-item");
            item.textContent = `${tileType}: ${count}`;

            const isSelected = this.selectedBlock === tileType;

            item.classList.toggle("selected", isSelected);
            item.setAttribute("aria-pressed", String(isSelected));

            item.addEventListener("click", () => {
                this.selectBlock(tileType);
            });

            inventoryElement.appendChild(item);
        }
    },

    addToInventory(tileType) {
        this.inventory[tileType]++;
        this.renderInventory();
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

        this.addToInventory(tileType);

        this.world[row][col] = 0;
        this.renderWorld();

        message.textContent =
            `Collected ${tileType}. Total: ${this.inventory[tileType]}`;
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
Game.renderInventory();