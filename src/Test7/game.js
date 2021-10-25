//Run app with node
//This objects are the stairs and snakes that will be in the game with their correct positions.
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
//This variable indicate the current position of the player
let current = 0;

//Function to start the game with the created board and the specified players.
function startGame(){
    //This do while will execute while the player is not in position 25
    do{
        //Random int to generate a random number from 1 to 6. Throw the dice.
        const dice = Math.floor(Math.random() * 6) + 1;
        //Print the number that rolls the dice.
        console.log(`Dice roll ${dice}`);
        //If the player exceeds position 25, the player will stay in the current position.
        if((current + dice) > 25){
            console.log('Player exceeds position 25');
            current = (25 - (dice - (25 - current)));
            console.log(`Player moves to position 25 and returns to position ${current}`);
        }else{ 
            //If the player doesn't exceed position 25, the player will move to the next position.
            current += dice 
            console.log(`Player moves to position ${current}`);
        }
        /* In case that the player moves to a position where there is a snake,
        the player will descend */
        if (snakes[current]) {
            current = snakes[current]; //The new current position is the tail of the snake.
            console.log(`Player descends to position ${current}`);
        } else if (ladders[current]) {
            /* If there is'n a snake but there is a ladder,
            the player will climb it */
            current = ladders[current]; //The new current position is the tail of the ladder.
            console.log(`Player climbs the ladder to position ${current}`);
        }
        console.log('\n');
    }while(current != 25)

    console.log('End of the game');
}

startGame();