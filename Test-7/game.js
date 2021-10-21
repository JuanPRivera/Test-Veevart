//Run app with node
//This objects are the stairs and snakes that will be in the game with their correct positions.
const {stairs, snakes} = {
    "stairs":{
        "3": 11,
        "6": 17,
        "9": 18,
        "10": 12
    },
    "ladders":{
        "14": 4,
        "19": 8,
        "22": 20,
        "24": 16
    }
}
//This variable indicate the current position of the player
let current = 0;

//This do while will execute while the player is not in position 25
do{
    //Random int to generate a random number between 1 and 6 including them.
    const dice = Math.floor(Math.random() * 6) + 1;
    //Print the number that rolls the dice.
    console.log(`Dice roll ${dice}`);
    //If the player exceeds position 25, the player will stay in the current position.
    if((current + dice) > 25){
        console.log('Player exceeds position 25');
        console.log(`Player stays in position ${current}`);
    }else{ 
        //If the player doesn't exceed position 25, the player will move to the next position.
        current += dice 
        console.log(`Player moves to position ${current}`);
    }
    /* In case that the player moves to a position where there is a snake,
    the player will descend */
    if (snakes[current]) {
        current = snakes[current];
        console.log(`Player descends to position ${current}`);
    } else if (ladders[current]) {
        /* If there is'n a snake but there is a ladder,
        the player will climb it */
        current = ladders[current];
        console.log(`Player climbs the ladder to position ${current}`);
    }
    console.log('\n');
}while(current != 25)

console.log('End of the game');