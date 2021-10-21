//Run app with node and run 'npm i prompt-sync' to allow user inputs in console.
//This objects are the ladders and snakes that will be in the game with their correct positions.
const prompt = require('prompt-sync')({sigint: true});
let players;
let finishPlayers = [];
var current = [0, 0, 0, 0];

do{
    players = parseInt(prompt('Indicate the number of players (Maximum 4): '));

}while(isNaN(players) || players < 1 || players > 4)

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

do{
    for(let i = 1; i <= players; i++){

        if (!finishPlayers.includes(i)) {
            console.log(`Player ${i} it's your turn`);
            const dice = Math.floor(Math.random() * 6) + 1;
            console.log(`Dice roll ${dice}`);
            if((current[i - 1] + dice) > 25){
                console.log(`Player ${i} exceeds position 25`);
                console.log(`Player ${i} stays in position ${current[i - 1]}`);
            }else{ 
                current[i - 1] += dice 
                console.log(`Player ${i} moves to position ${current[i - 1]}`);
            }
            if (snakes[current[i - 1]]) {
                current[i - 1] = snakes[current[i - 1]];
                console.log(`Player ${i} descends to position ${current[i - 1]}`);
            } else if (ladders[current[i - 1]]) {
                current[i - 1] = ladders[current[i - 1]];
                console.log(`Player ${i} climbs the ladder to position ${current[i - 1]}`);
            }
            if(current[i - 1] === 25){
                finishPlayers.push(i);
                console.log(`Player ${i} has finish the game`);
            }
            console.log('\n')
        }
    }
    /* console.log(current);
    console.log(finishPlayers.length, '\n'); */
}while(finishPlayers.length !== players)

if (finishPlayers.length > 1) {
    console.log('PODIUM: ');
    console.log(`Winner: Player ${finishPlayers[0]}`);
    for(let i = 1; i < finishPlayers.length; i++){
        console.log(`Position ${i + 1}: Player ${finishPlayers[i]}`);
    }
}
console.log('\n End of the game');