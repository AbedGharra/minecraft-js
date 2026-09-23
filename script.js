const Game = {
  // 0 = air, 1 = grass, 2 = dirt
  // 3 = rock, 4 = wood, 5 = leaves

    initialWorld: [],

    selectedTool: null,
    selectedBlock: null,

    jumpSteps: 0,

    player: {
        row: 3,
        col: 6
    },

    inventory: {
        grass: 0,
        dirt: 0,
        rock: 0,
        wood: 0,
        leaves: 0
    },

    world: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0],
        [0, 5, 4, 5, 0, 0, 0, 0, 0, 0, 5, 4, 5, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 3, 3, 2, 2, 3, 2, 2, 3, 3, 2, 2, 2, 3, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
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
            
            const preview = document.createElement("span");
            preview.classList.add("block-preview" , `tile-${tileType}`);
            preview.setAttribute("aria-hidden", "true");

            const quantity = document.createElement("span");
            quantity.classList.add("inventory-count");
            quantity.textContent = count;

            item.appendChild(preview);
            item.appendChild(quantity);

            item.setAttribute("aria-label", `${tileType}: ${count}`);
            item.title = `${tileType}: ${count}`;


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

    placeFromInventory(row, col) {
        const blockType = this.selectedBlock;
        const message = document.querySelector("#game-message");

        if (blockType === null || this.inventory[blockType] <= 0) {
            return;
        }

        if (this.world[row][col] !== 0) {
            message.textContent = "Choose an empty space.";
            return;
        }

        this.world[row][col] = this.tileTypes.indexOf(blockType);

        this.inventory[blockType]--;

        if (this.inventory[blockType] === 0) {
            this.selectedBlock = null;
        }

        this.renderWorld();
        this.renderInventory();

        message.textContent =
            `Placed ${blockType}. Remaining: ${this.inventory[blockType]}`;
    },

    clickTile(row, col) {

        if (!this.isWithinReach(row, col)) {
            document.querySelector("#game-message").textContent =
                "Move closer to this block.";
            return;
        }

        if (this.selectedBlock !== null) {
            this.placeFromInventory(row, col);
            return;
        }

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

    isWithinReach(row, col) {
        const rowDistance = Math.abs(row - this.player.row);
        const colDistance = Math.abs(col - this.player.col);

        return rowDistance <= 2 && colDistance <= 2;
    },

    resetWorld() {
        this.world = this.initialWorld.map((row) => [...row]);

        for (const tileType in this.inventory) {
            this.inventory[tileType] = 0;
        }

        this.selectedTool = null;
        this.selectedBlock = null;

        document.querySelectorAll(".tool-button").forEach((button) => {
            button.classList.remove("selected");
            button.setAttribute("aria-pressed", "false");
        });

        this.jumpSteps = 0;
        this.player.row = 3;
        this.player.col = 6;    

        this.renderWorld();
        this.renderInventory();

        document.querySelector("#game-message").textContent =
            "World reset. Select a tool to start.";
    },

    setupReset() {
        document.querySelector("#reset-button").addEventListener("click", () => {
            this.resetWorld();
        });
    },


    renderPlayer() {
        const playerElement = document.createElement("div");
        playerElement.className = "player";
        playerElement.setAttribute("aria-label", "Player");

        playerElement.style.setProperty("--player-row", this.player.row);
        playerElement.style.setProperty("--player-col", this.player.col);

        document.querySelector("#world").appendChild(playerElement);
    },

    setupPlayerControls() {
        document.addEventListener("keydown", (event) => {
            let nextCol = this.player.col;

            if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
                event.preventDefault();

                const rowBelow = this.player.row + 1;
                const isOnGround =
                    rowBelow >= this.world.length ||
                    this.world[rowBelow][this.player.col] !== 0;

                const rowAbove = this.player.row - 1;
                const hasRoomAbove =
                    rowAbove >= 0 &&
                    this.world[rowAbove][this.player.col] === 0;

                if (isOnGround && hasRoomAbove) {
                    this.jumpSteps = 1;
                }

                return;
            }

            if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
                    nextCol--;
                } else if (
                    event.key === "ArrowRight" ||
                    event.key.toLowerCase() === "d"
                ) {
                    nextCol++;
                } else {
                    return;
            }

            event.preventDefault();

            if (
            nextCol < 0 ||
            nextCol >= this.world[this.player.row].length ||
            this.world[this.player.row][nextCol] !== 0
            ) {
            return;
            }

            this.player.col = nextCol;
            this.renderWorld();
        });
    },

    startGravity() {
        setInterval(() => {
            if (this.jumpSteps > 0){
                const rowAbove = this.player.row - 1;

                if (rowAbove >= 0 && this.world[rowAbove][this.player.col] === 0) {
                    this.player.row = rowAbove;
                    this.jumpSteps--;
                    this.renderWorld();
                    return;
                }

                this.jumpSteps = 0;
            }
            
            const rowBelow = this.player.row + 1;

            // Fall if air
            if (rowBelow < this.world.length &&
                this.world[rowBelow][this.player.col] === 0
            ) {
                this.player.row = rowBelow;
                this.renderWorld()
            }
        }, 150);
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

        this.renderPlayer();
    }

};

Game.initialWorld = Game.world.map((row) => [...row]);

Game.renderWorld();
Game.setupTools();
Game.renderInventory();
Game.setupReset();
Game.setupPlayerControls();
Game.startGravity();