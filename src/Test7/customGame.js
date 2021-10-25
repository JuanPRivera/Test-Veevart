//Require prompt-sync
const prompt = require('prompt-sync')({sigint: true}); //Module required for an user input in console.
/**
 * This array indicates the current position of the players. 
 * @type {Array}
 */
let current = [0, 0, 0, 0];

/**
 * Indicates the number of players.
 * @type {Number}
 */
let players;

/**
 * This arrays saves the finishing players in order.
 * @type {Array<Number>}
 */
let finishPlayers = [];

/**
 * This number indicates the width of the board.
 * @type {Number}
 */
let gameWidth;

/**
 * This number indicates the height of the board.
 * @type {Number}
 */
let gameHeight;

//While to validate that the number of players entered is correct (from 1 to 4).
//Maximum 4 because the game can get too long.
while(isNaN(players) || players < 1 || players > 4){
    players = parseInt(prompt('Indicate the number of players (Maximum 4): '));
}
//While to validate that the width of the board is correct.
//Minimum 5 for a better experience.
//If you put a big number the game can get too long.
while(isNaN(gameWidth) || gameWidth < 5){
    gameWidth = parseInt(prompt('Indicate the width of the board (Minimum 5): '));
}
//While to validate that the height of the board is correct.
//Minimum 5 for a better experience.
//If you put a big number the game can get too long.
while(isNaN(gameHeight) || gameHeight < 1){
    gameHeight = parseInt(prompt('Indicate the height of the board (Minimum 5): '));
}

/**
 * This number indicates the size of the board.
 * @type {Number}
 */
const gameSize = gameWidth * gameHeight;

/**
 * This number indicates how many obstacles the game can have.
 * @type {Number}
 */
const obstaclesCount = ~~(gameSize * 0.32);

/**
 * This number indicates the max number of ladders the game can have.
 * @type {Number}
 */
const laddersCount = ~~(obstaclesCount / 2) + 1;

/**
 * This number indicates the max number of snakes the game can have.
 * @type {Number}
 */
const snakeCount = obstaclesCount - laddersCount;

/**
 * This object contains two objects. These objects are the ladders and snakes that will be in the game with their correct positions.
 * @type {{snakes: {Number: Number}, ladders: {Number: Number}}}
 */
const obstacles = {
    snakes: {},
    ladders: {}
};

/**
 * Array to know the numbers used for the tail and the head of the snakes and ladders. (For no repeating number)
 * @type {Array<Number>}
 */
const used = []; //Array to know the numbers used for the tail and the head of the snakes and ladders.

/**
 * Function to create the board with its obstacles.
 * @returns {void}
 */
function createBoard(){
    //Generate a random number from 2 to gameSize-3, this doesn't include 1 and the size of the board
    for (let i = 0; i < obstaclesCount; i++) {
        /**
         * This is the random number for the start of a ladder or the end of a snake. This number is for the start of a ladder or the end of a snake too.
         * @type {Number}
         */
        let number;
        //Do while to for no repeating number.
        do {
            number = Math.floor(Math.random() * (gameSize - 4)) + 2;
        } while (used.includes(number) || used.includes(number + 1) || used.includes(number - 1))
        used.push(number); //Add the number to the array of the numbers used.
    }

    for (let i = 0; i < obstaclesCount; i++) {
        /**
         * This number indicates that the random number cannot be used because there is no space available.
         * @type {Number}
         */
        let tries = 0;
        /*Do while to generate a different number from used and if this number cannot be used
        because there isn't an available position, this number is not gonna be used*/
        do {
            number = Math.floor(Math.random() * (gameSize - (used[i] + 1))) + used[i] + 1;
            tries++;
        } while ((used.includes(number) || number === 0) && tries < 4);

        if (tries < 4) {
            //Generate a head for a snake or a tail for a ladder;
            if (i < snakeCount) {
                obstacles.snakes[number] = used[i];
            } else {
                obstacles.ladders[used[i]] = number;
            }
            used.push(number); //Add the number to the array of the numbers used.
        }
    }

    console.log(obstacles); //Print the snakes and the ladders so you can see if there is a ladder or a snake in a position.
}

/**
 * Function to start the game with the created board and the specified players.
 * @returns {void}
 */
function startGame(){

    //This do while will run until all players have finished the game
    do{
        //This for indicates the current turn of the round.
        for(let i = 1; i <= players; i++){
            //If that allows only players who have not finished the game to play.
            if (!finishPlayers.includes(i)) {
                console.log(`Player ${i} it's your turn`); //Required print.
                /**
                 * This number indicates the random number that the dice rolled.
                 * @type {Number}
                 */
                const dice = Math.floor(Math.random() * 6) + 1;
                console.log(`Dice roll ${dice}`); //Required print.
                if((current[i - 1] + dice) > gameSize){ //if the player goes over the limit, the positions exceeded will be returned.
                    console.log(`Player ${i} exceeds position ${gameSize}`); //Required print.
                    current[i - 1] = (gameSize - (dice - (gameSize - current[i - 1]))); //Calculate exceeded positions
                    console.log(`Player ${i} moves to position ${gameSize} and returns to position ${current[i - 1]}`); //Required print.
                }else{ //if the player doesn't go over the limit, the player advances to the next position.
                    current[i - 1] += dice 
                    console.log(`Player ${i} moves to position ${current[i - 1]}`); //Required print.
                }
                if (obstacles.snakes[current[i - 1]]) { //If the current position of the player is the head of a snake, the player descends until the tail.
                    current[i - 1] = obstacles.snakes[current[i - 1]]; //The new current position is the tail of the snake.
                    console.log(`Player ${i} descends to position ${current[i - 1]}`); //Required print.
                } else if (obstacles.ladders[current[i - 1]]) { //If the current position of the player is the head of a ladder, the player climbs it until the tail.
                    current[i - 1] = obstacles.ladders[current[i - 1]]; //The new current position is the tail of the ladder.
                    console.log(`Player ${i} climbs the ladder to position ${current[i - 1]}`); //Required print.
                }
                if(current[i - 1] === gameSize){ //True if the player reaches the target.
                    finishPlayers.push(i); //Add the player to the finishPlayers array. This player won't play more because he finishes the game.
                    console.log(`Player ${i} has finish the game`); //Print the player who finishes the game.
                }
                console.log('\n')
            }
        }
    }while(finishPlayers.length !== players)

    //If there are more than one player, prints the positions or podium.
    if (finishPlayers.length > 1) {
        console.log('PODIUM: ');
        console.log(`Winner: Player ${finishPlayers[0]}`);
        for(let i = 1; i < finishPlayers.length; i++){
            console.log(`Position ${i + 1}: Player ${finishPlayers[i]}`);
        }
    }
    console.log('End of the game'); //Required print.

}

createBoard();
startGame();