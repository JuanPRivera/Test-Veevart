//Run app with node and run 'npm i prompt-sync' to allow user inputs in console.
const prompt = require('prompt-sync')({sigint: true});
let players; //Indicates the number players.
let finishPlayers = []; //This arrays saves the finishing players in order.
let current = [0, 0, 0, 0]; //This array indicates the current position of the players.

//Do while to validate that the number of players entered is correct (from 1 to 4).
//Maximum 4 because the game can get too long.
do{
    players = parseInt(prompt('Indicate the number of players (Maximum 4): '));
}while(isNaN(players) || players < 1 || players > 4)

//This objects are the ladders and snakes that will be in the game with their correct positions.
//Defines the given ladders and snakes with their head and tail.
const {ladders, snakes} = {
    "ladders":{
        "3": 11,
        "6": 17,
        "9": 18,
        "10": 12
    },
    "snakes":{
        "14": 4,
        "19": 8,
        "22": 20,
        "24": 16
    }
}

//This do while will run until all players have finished the game
do{
    //This for indicates the current turn of the round.
    for(let i = 1; i <= players; i++){
        //If that allows only players who have not finished the game to play.
        if (!finishPlayers.includes(i)) {
            console.log(`Player ${i} it's your turn`); //Required print.
            const dice = Math.floor(Math.random() * 6) + 1; //Random number from 1 to 6. Throw the dice.
            console.log(`Dice roll ${dice}`); //Required print.
            if((current[i - 1] + dice) > 25){ //if the player goes over the limit, the positions exceeded will be returned.
                console.log(`Player ${i} exceeds position 25`); //Required print.
                current[i - 1] = (25 - (dice - (25 - current[i - 1]))); //Calculate exceeded positions
                console.log(`Player ${i} moves to position 25 and returns to position ${current[i - 1]}`); //Required print.
            }else{ //if the player doesn't go over the limit, the player advances to the next position.
                current[i - 1] += dice 
                console.log(`Player ${i} moves to position ${current[i - 1]}`); //Required print.
            }
            if (snakes[current[i - 1]]) { //If the current position of the player is the head of a snake, the player descends until the tail.
                current[i - 1] = snakes[current[i - 1]]; //The new current position is the tail of the snake.
                console.log(`Player ${i} descends to position ${current[i - 1]}`); //Required print.
            } else if (ladders[current[i - 1]]) { //If the current position of the player is the head of a ladder, the player climbs it until the tail.
                current[i - 1] = ladders[current[i - 1]]; //The new current position is the tail of the ladder.
                console.log(`Player ${i} climbs the ladder to position ${current[i - 1]}`); //Required print.
            }
            if(current[i - 1] === 25){ //True if the player reaches the target.
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
console.log('\n End of the game'); //Required print.