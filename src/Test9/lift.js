var arrFloors = []; //The array that contains the floors needed for the first parameter. The keys.
var floorsQuan = 4; //Number that indicates how many floors I want to push in the first array (arrFloors).
var init = 15; //Floor where the lift starts.
var inpFloors = []; //The array that contains the floors needed for the third parameter. The key values.

//For to push a random integer into floors, the first parameter needed.
//If you want to push more floors, change the floorsQuan's argument


for(let i = 0; i < floorsQuan; i++){
    let randomFloor; //Variable to save the random number for a floor.
    let randomInput; //Variable to save the random number for an input.
    //Do while for no repeating floor
    do{
        randomFloor = Math.floor(Math.random() * 29) + 1; //Generate random integer between 1 and 29.
    }while(arrFloors.includes(randomFloor, 0) || inpFloors.includes(randomFloor) || randomFloor === init)
    arrFloors.push(randomFloor); //Put the random number into the array for the initial floors.
    //Do while for no repeating key
    do{
        randomInput = Math.floor(Math.random() * 29) + 1; //Generate random integer between 1 and 29.
    }while(arrFloors.includes(randomInput) || inpFloors.includes(randomInput) || randomInput === init)
    inpFloors.push(randomInput); //Put the random number into the array for the key values. 
}


//Show the keys and then their values
console.log(arrFloors); //Keys
console.log(inpFloors); //Values

//Function to get the closest number to the initial floor of the lift.
function getClosest(arr, ind){
    var closest = arr.reduce(function(prev, curr) {
        return (Math.abs(curr - ind) < Math.abs(prev - ind) ? curr : prev);
    });
    return closest;
}

function lift(floors, initFloor, inputs){
    var closest = getClosest(floors, initFloor);
    var remFloors = [...floors]; //Variable to know the floors where the lift must stop without passing again if it is not necessary.
    var current = initFloor; //Variable to know the current floor where the lift is.
    var up; //Variable to know if the lift is going up or down.
    
    closest > initFloor ? up = true : up = false
    console.log(`Lift on floor ${current}`); //Print the current floor.
    closest > current ? up = true : up = false; //True if current floor is less than the next floor.

    //Do while to go to all the requested floors until there are none left 
    do{
        var max = Math.max(...remFloors); //Get the max number of the requested floors.
        var min = Math.min(...remFloors); //Get the min number of the requested floors.

        //If the lift is going up, the lift will stop when it reaches the max number of the requested floors.
        if(up == true){
            //For to pass through all floors from the current until it reaches the max number of the requested floors. Lift will stop if it passes a required floor. 
            for(let i = current; i <= max; i++){
                //If the floor the lift is passing through is a required floor, Lift will stop.
                if(remFloors.includes(i, 0)){
                    //Required prints.
                    console.log('Lift going up');
                    console.log(`Lift on floor ${i}`);
                    console.log('Lift stops');
                    //If a the current floor is required and is a non used key, add a new required floor (the key value) to the array.
                    if(floors.includes(i, 0) && remFloors.includes(i, 0)){
                        //Take the index from the floor array to search the key value in the key values array and add it to the required floors array.
                        let idx = floors.indexOf(i);
                        remFloors.push(inputs[idx]);
                        //If the new required floor is greater than the current max number, change the max number value to the new required floor value.
                        inputs[idx] > i ? max = inputs[idx] : null;
                        //Require print.
                        console.log(`Entered floor ${inputs[idx]}`);
                    }
                    console.log('\n');
                    remFloors.splice(remFloors.indexOf(i), 1); //Remove the required floor if the elevator passed through it.
                }
            }
            current = max; //Change the current floor to the max number value to know where the lift stops and where the lift will start the next route.
            up = false; //Change up to false to know in the next route the lift have to go down.
        }else{ //But if the lift is going down, the lift will stop when it reaches the min number of the requested floors.
            //For to pass through all floors from the current until it reaches the min number of the requested floors. Lift will stop if it passes a required floor. 
            for(let j = current; j >= min; j--){
                //If the floor the lift is passing through is a required floor, Lift will stop.
                if(remFloors.includes(j, 0)){
                    //Required prints.
                    console.log('Lift going down');
                    console.log(`Lift on floor ${j}`);
                    console.log('Lift stops');
                    //If a the current floor is required and is a non used key, add a new required floor (the key value) to the array.
                    if(floors.includes(j, 0) && remFloors.includes(j, 0)){
                        //Take the index from the floor array to search the key value in the key values array and add it to the required floors array.
                        let idx = floors.indexOf(j);
                        remFloors.push(inputs[idx]);
                        //If the new required floor is less than the current min number, change the min number value to the new required floor value.
                        inputs[idx] < j ? min = inputs[idx] : null;
                        //Required print.
                        console.log(`Entered floor ${inputs[idx]}`);
                    }
                    console.log('\n');
                    remFloors.splice(remFloors.indexOf(j), 1); //Remove the required floor if the elevator passed through it.
                }
            }
            current = min; //Change the current floor to the min number value to know where the lift stops and where the lift will start the next route.
            up = true; //Change up to true to know in the next route the lift have to go up.
        }
    }while(remFloors.length != 0) //If there are no required floors, the lift will stop.
}

lift(arrFloors, init, inpFloors);