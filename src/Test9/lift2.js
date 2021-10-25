/**
 * Array that contains the floors needed for the first parameter.
 * @type {Array}
 */
var arrFloors = [];

/**
 * Number that indicates how many floors I want to push in the first array (arrFloors).
 * @type {Array}
 */
var floorsQuan = 6;

/**
 * Object with the current position of the lifts, if the lift is going up or down and the floors required for each lift.
 * @type {{1:{current: Number, up: boolean, rem: Array}, 2:{current: Number, up: boolean, rem: Array}}}
 */
var myLifts = {
    1:{
        'current': 18,
        'up': null,
        'rem': []
    }, 
    2:{
        'current': 5,
        'up': null,
        'rem': []
    }
}

/**
 * Object with the keys and their values.
 * @type {Object}
 */
var keys = { }

for(let i = 0; i < floorsQuan; i++){
    /**
     * Variable to save the random number for a floor.
     * @type {Number}
     */
    let randomFloor;

    /**
     * Variable to save the random number for an input.
     * @type {Number}
     */
    let randomInput;

    //Do while for no repeating number in initial floors
    do{
        randomFloor = Math.floor(Math.random() * 29) + 1;
    }while(arrFloors.includes(randomFloor, 0) || randomFloor === myLifts[1].current || randomFloor === myLifts[2].current);
    arrFloors.push(randomFloor); //Put the random number inside the array for the initial floors.

    //Do while for no repeating number with its key
    do{
        randomInput = Math.floor(Math.random() * 29) + 1;
    }while(randomInput == arrFloors[i]);
    keys[arrFloors[i]] = {};
    keys[arrFloors[i]].ok = false;
    keys[arrFloors[i]].val = randomInput;
}

console.log(keys);

/**
 * Function to get the closest number.
 * @param {Array} arr Array where the function will find the closest number. 
 * @param {Number} ind Number to which the function will look for the closest.
 * @returns {Number} The closest number
 */
function getClosest(arr, ind){
    var closest = arr.reduce((prev, curr) => {
        return (Math.abs(curr - ind) < Math.abs(prev - ind) ? curr : prev);
    });
    return closest;
}

/**
 * Function to start the process.
 * @param {Array} floors Array that contains the floors needed (Initial floors required). 
 * @param {Object} lift Object with the current position of the lifts, if the lift is going up or down and the floors required for each lift.
 * @param {Object} inputs Object with the keys and their values.
 * @returns {void}
 */
function lift(floors, lift, inputs){

    floors.sort((a, b) => a - b);

    /**
     * Object to clone the myLift object.
     * @type {Object}
     */
    let lifts = JSON.parse(JSON.stringify(lift));
    console.log('lifts: ', lifts);
    console.log('\n');

    /**
     * Function to go up or down.
     * @param {Number} obj This is the current lift is working. 
     * @param {Number} next Tells the lift which floor to go to.
     * @param {Number} del Indicates if the system has to remove a floor from initial floors, from the required floors or both.
     * @param {Boolean} up Tells the lift if it has to go up or down.
     * @returns {void}
     */
    function goUpDown(obj, next, del, up){
        up ? console.log(`Lift ${obj} going up`) : console.log(`Lift ${obj} going down`);
        up ? lifts[obj].up = true : lifts[obj].up = false;
        lifts[obj].current = next
        console.log(`Lift ${obj} on floor ${next}`);
        console.log(`Lift ${obj} stops`);
        lifts[obj].up = true;

        if(del == 0){//rem
            for(let i = 0; i < lifts[obj].rem.length; i++) {
                if(lifts[obj].rem[i] == next){lifts[obj].rem.splice(i, 1); i--;}
            }
        }else if(del == 1){//floors
            floors.splice(floors.indexOf(next), 1);
        }else if(del == 2){
            for(let i = 0; i < lifts[obj].rem.length; i++) {
                if(lifts[obj].rem[i] == next){lifts[obj].rem.splice(i, 1); i--;}
            }
            floors.splice(floors.indexOf(next), 1)
        }
    }

    for (let i = 1; i <= 2; i++) {
        console.log(`Lift ${i} on floor ${lifts[i].current}`);
        const close = getClosest(floors, lifts[i].current);
        close > lifts[i].current ? lifts[i].up = true : lifts[i].up = false
        lifts[i].up ? console.log(`Lift ${i} going up`) : console.log(`Lift ${i} going down`);
        lifts[i].current = close;
        console.log(`Lift ${i} on floor ${lifts[i].current}`);
        console.log(`Entered floor ${inputs[close].val}`);
        lifts[i].rem.push(inputs[close].val)
        inputs[close].ok = true;
        floors.splice(floors.indexOf(close), 1);
        console.log('\n');
    }

    while (floors.length !== 0 || lifts[1].rem.length !== 0 || lifts[2].rem.length !== 0){

        Object.entries(lifts).forEach(el => {
            if(el[1].rem.length !== 0 || floors.length !== 0){

                floors.sort((a, b) => a - b);
                el[1].rem.sort((a, b) => a - b);

                /**
                 * The first number greater than the current floor of the initial floors.
                 * @type {Number}
                 */
                let bigFloor = floors.find(e => e > el[1].current);

                /**
                 * The first number greater than the current floor of the required floors.
                 * @type {Number}
                 */
                let bigRem = el[1].rem.find(e => e > el[1].current);
                floors.sort((a, b) => b - a);
                el[1].rem.sort((a, b) => b - a);

                /**
                 * The first number less than the current floor of the initial floors.
                 * @type {Number}
                 */
                let lessFloor = floors.find(e => e < el[1].current);

                /**
                 * The first number less than the current floor of the required floors.
                 * @type {Number}
                 */
                let lessRem = el[1].rem.find(e => e < el[1].current);

                if(el[1].up === true){
                    if (bigFloor || bigRem) {
                        if (bigFloor && bigRem) {
                            if(bigFloor > bigRem){
                                goUpDown(el[0], bigRem, 0, true);
                            }else if(bigFloor < bigRem){
                                goUpDown(el[0], bigFloor, 1, true);
                            }else{
                                goUpDown(el[0], bigRem, 2, true);
                            }
                        }else if(bigRem){
                            goUpDown(el[0], bigRem, 0, true);
                        }else{
                            goUpDown(el[0], bigFloor, 1, true);
                        }
                    }else if(lessFloor || lessRem){

                        if(lessFloor && lessRem){
                            if(lessFloor > lessRem){
                                goUpDown(el[0], lessFloor, 1, false);
                            }else if(lessFloor < lessRem){
                                goUpDown(el[0], lessRem, 0, false);
                            }else{
                                goUpDown(el[0], lessRem, 2, false);
                            }
                        }else if(lessRem){
                            goUpDown(el[0], lessRem, 0, false);
                        }else{
                            goUpDown(el[0], lessFloor, 1, false);
                        }
                    }
                }else{
                    if (lessFloor || lessRem) {
                        if(lessFloor && lessRem){
                            if(lessFloor > lessRem){
                                goUpDown(el[0], lessFloor, 1, false);
    
                            }else if(lessFloor < lessRem){
                                goUpDown(el[0], lessRem, 0, false);
                                
                            }else{
                                goUpDown(el[0], lessRem, 2, false);
                            }
                        }else if(lessRem){
                            goUpDown(el[0], lessRem, 0, false);

                        }else{
                            goUpDown(el[0], lessFloor, 1, false);
                        }
                    }else if(bigFloor || bigRem){

                        if (bigFloor && bigRem) {

                            if(bigFloor > bigRem){
                                goUpDown(el[0], bigRem, 0, true);
    
                            }else if(bigFloor < bigRem){
                                goUpDown(el[0], bigFloor, 1, true);
                            }else{
                                goUpDown(el[0], bigRem, 2, true);
                            }
                        }else if(bigRem){
                            goUpDown(el[0], bigRem, 0, true);

                        }else{
                            goUpDown(el[0], bigFloor, 1, true);
                        }
                    }
                }
                if(inputs[el[1].current] && inputs[el[1].current].ok == false){

                    el[1].rem.push(inputs[el[1].current].val);
                    inputs[el[1].current].ok = true;
                    console.log(`Entered floor ${inputs[el[1].current].val}`);
                    console.log('\n');
                }else{console.log('\n')}
            }
        });
    }
    console.log(lifts);
    console.log(floors);
}

lift(arrFloors, myLifts, keys)