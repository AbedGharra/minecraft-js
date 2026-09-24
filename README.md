# Minecraft JS

A 2D Minecraft-inspired browser game made with HTML, CSS, and JavaScript.

## Play

[Play Minecraft JS](https://abedgharra.github.io/minecraft-js/)

## About the app

I built a small block world where the player can move, jump, collect blocks, and place them somewhere else. Each type of block needs the correct tool to collect it. Collected blocks appear in the inventory, where the player can select them for placement.

The project includes a main menu, a How to Play page, and a button to reset the world.

## Features

- Player movement, jumping, and gravity
- Axe, pickaxe, and shovel
- Different block types with textures
- Inventory for collected blocks
- Breaking and placing blocks within the player's reach
- Reset World button

## Controls

| Action | Control |
| --- | --- |
| Move left | A or Left Arrow |
| Move right | D or Right Arrow |
| Jump | W, Up Arrow, or Space |
| Select a tool or inventory block | Click its slot |
| Break or place a block | Click a nearby location |
| Restart | Click Reset World |

Use the **axe** for wood and leaves, the **pickaxe** for rock, and the **shovel** for grass and dirt.

## What was hard

The most challenging part was making movement, jumping, and gravity work together. The player also needs to interact with blocks while moving, so I added checks for the player's position and distance from the block.

Connecting the world to the inventory was another challenge. When a block is collected or placed, the world and inventory both need to update correctly.

## Known bugs and limitations

- Placing a block directly beneath the player while jumping can take several tries because the timing is difficult.
- The world has a fixed layout and is not randomly generated.
- The game is a small 2D project, so it does not include all the features of Minecraft.

## My review

This project helped me understand how HTML, CSS, and JavaScript work together to create an interactive game. I practiced updating the page with JavaScript, handling keyboard and mouse input, and keeping track of the world and inventory.

I am happy that the main gameplay works. If I continue working on it, I would improve block placement during jumps and add more variety to the world.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Main menu |
| `instructions.html` | How to Play page |
| `game.html` | Game page |
| `style.css` | Layout and appearance |
| `script.js` | Game logic |
| `assets/` | Block textures |
