const prompt = require('prompt-sync')({sigint: true});
let current = [0, 0, 0, 0];
let players;
let finishPlayers = [];
let gameWidth;
let gameHeight;

while(isNaN(players) || players < 1 || players > 4){
    players = parseInt(prompt('Indicate the number of players (Maximum 4): '));
}
while(isNaN(gameWidth) || gameWidth < 5){
    gameWidth = parseInt(prompt('Indicate the width of the board (Minimum 5): '));
}
while(isNaN(gameHeight) || gameHeight < 1){
    gameHeight = parseInt(prompt('Indicate the height of the board (Minimum 5): '));
}

const gameSize = gameWidth * gameHeight;
const obstaclesCount = ~~(gameSize * 0.32)
const laddersCount = ~~(obstaclesCount / 2) + 1;
const snakeCount = obstaclesCount - laddersCount;

console.log(laddersCount, snakeCount);

const obstacles = {
    snakes: {},
    ladders: {}
};
const used = [];

for (let i = 0; i < obstaclesCount; i++) {
    let number;
    do {
        number = Math.floor(Math.random() * ((gameSize - 2) - 2)) + 2;
    } while (used.includes(number) || used.includes(number + 1) || used.includes(number - 1))
    used.push(number);
}

for (let i = 0; i < obstaclesCount; i++) {
    //console.log(i + ': {');
    let tries = 0;
    do {
        //console.log(' allUsed: ', used);
        //console.log(' used: ', used[i]);
        number = Math.floor(Math.random() * (gameSize - (used[i] + 1))) + used[i] + 1;
        //console.log(' get: ', number);
        tries++;
    } while ((used.includes(number) || number === 0) && tries < 4);

    //console.log(tries);

    if (tries < 4) {
        if (i < snakeCount) {
            //console.log(' type:', 'Snake');
            obstacles.snakes[number] = used[i];
        } else {
            //console.log(' type:', 'Stair');
            obstacles.ladders[used[i]] = number;
        }
        used.push(number);
    }
    //console.log('}');
}

/* for (let i = 0; i < used.length; i++) {
    for (let j = 0; j < used.length; j++) {
        if (i !== j && used[i] === used[j]) {
            console.log('fallaste');
        }
    }
} */

console.log(obstacles);

//This do while will execute while the player is not in position 25
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

            if (obstacles.snakes[current[i - 1]]) {
                current[i - 1] = obstacles.snakes[current[i - 1]];
                console.log(`Player ${i} descends to position ${current[i - 1]}`);
            } else if (obstacles.ladders[current[i - 1]]) {
                current[i - 1] = obstacles.ladders[current[i - 1]];
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

console.log('End of the game');