var arrFloors = []; //The array that contains the floors needed for the first parameter.
var floorsQuan = 4; //Number that indicates how many floors I want to push in the first array (arrFloors)
var init = 15; //Floor where the lift starts.
var inpFloors = [];

//For to push a random integer into floors, the first parameter needed.
//If you want to push more floors, change the floorsQuan's argument

for(let i = 0; i < floorsQuan; i++){
    let randomFloor;
    let randomInput;
    let obj;
    //Do while for no repeating floor
    do{
        randomFloor = Math.floor(Math.random() * 29) + 1;
    }while(arrFloors.includes(randomFloor, 0) || arrFloors.includes(init, 0) || inpFloors.includes(randomFloor))
    arrFloors.push(randomFloor);

    do{
        randomInput = Math.floor(Math.random() * 29) + 1;
    }while(arrFloors.includes(randomInput) || inpFloors.includes(randomInput) || randomInput == init)
    inpFloors.push(randomInput);
}
console.log(arrFloors);
console.log(inpFloors);

function getClosest(arr, ind){
    var closest = arr.reduce(function(prev, curr) {
        return (Math.abs(curr - ind) < Math.abs(prev - ind) ? curr : prev);
    });
    return closest;
}

function lift(floors, initFloor, inputs){
    var closest = getClosest(floors, initFloor);
    var remFloors = [...floors];
    var current = initFloor
    var up;
    var counter = 0;
    
    closest > initFloor ? up = true : up = false
    console.log(`Lift on floor ${current}`); //Print the current floor.
    closest > current ? up = true : up = false; //True if current floor is less than the next floor.

    do{
        var max = Math.max(...remFloors);
        var min = Math.min(...remFloors);

        if(up == true){
            for(let i = current; i <= max; i++){
                if(remFloors.includes(i, 0)){
                    console.log('Lift going up');
                    console.log(`Lift on floor ${i}`);
                    console.log('Lift stops');
                    if(floors.includes(i, 0) && remFloors.includes(i, 0)){
                        let idx = floors.indexOf(i);
                        remFloors.push(inputs[idx]);
                        console.log(`Entered floor ${inputs[idx]}`);
                    }
                    console.log('\n');
                    remFloors.splice(remFloors.indexOf(i), 1);
                }
            }
            current = max
            up = false;
        }else{
            for(let j = current; j >= min; j--){
                if(remFloors.includes(j, 0)){
                    console.log('Lift going down');
                    console.log(`Lift on floor ${j}`);
                    console.log('Lift stops');
                    if(floors.includes(j, 0) && remFloors.includes(j, 0)){
                        let idx = floors.indexOf(j);
                        remFloors.push(inputs[idx]);
                        console.log(`Entered floor ${inputs[idx]}`);
                    }
                    console.log('\n');
                    remFloors.splice(remFloors.indexOf(j), 1);
                }
            }
            current = min;
            up = true;
        }
        counter += 1;
        console.log(counter);
    }while(counter <= floors.length)
}

lift(arrFloors, init, inpFloors);