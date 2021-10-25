//Class board with the size, ladders and snakes
public class Board {
    //Variables that we need to run the game.
    Integer width, height, gameSize, obstaclesCount, laddersCount, snakesCount, num;
    Double obstacles;
    //[]used -> Array to know the numbers used for the tail and the head of the snakes and ladders.
	Integer [] used = new List<Integer>();
    //Hashmap or map to add the heads and tails of the snakes and ladders
    Map<Integer, Integer> snakes = new Map<Integer, Integer>();
    Map<Integer, Integer> ladders = new Map<Integer, Integer>();
    /*Class constructor.
     gameWidth, gameHeight and gameSize are
     the width, height and size of the board respectively.*/
    public Board(Integer widthR, Integer heightR){
        width = widthR;
        height = heightR;
        gameSize = widthR * heightR; //Calculates the size of the board.
        obstacles = gameSize * 0.32; //Calculates the number of obstacles the board will have.
        obstaclesCount = obstacles.intValue(); //Parse the obstacles value to an integer.
        createTails(); //Method to create the 
        createHeads();
    }
    
    public void createTails(){
        //Generate a random number from 2 to gameSize-3, this doesn't include 1 and the size of the board
		//This number is for the start of a ladder or the end of a snake.
        for(Integer i = 0; i < obstaclesCount; i++){
            do{
                num = Integer.valueOf(Math.random() * (gameSize - 4)) + 2;
            }while(used.contains(num) || used.contains(num + 1) || used.contains(num - 1));
            used.add(num); //Add the number to the array of the numbers used.
        }
    }
    
    public void createHeads(){
    	laddersCount = (obstaclesCount / 2) + 1;
        snakesCount = obstaclesCount - laddersCount;
        for(Integer i = 0; i < obstaclesCount; i++){
            Integer tries = 0;
            //This number is for the start of a ladder or the end of a snake.
            /*Do while to generate a different number from used and if this number cannot be used
              because there isn't an avalaible position, this number is not gonna be used*/
            do{
                num = Integer.valueOf(Math.random() * (gameSize - (used[i] + 1))) + (used[i] + 1);
                tries = tries + 1;
            }while((used.contains(num) || num == 0) && tries < 4);
            if(tries < 4){
                //Generate a head for a snake or a tail for a ladder;
                if(i < snakesCount){
                    snakes.put(num, used[i]);
                }else{
                    ladders.put(used[i], num);
                }
                used.add(num);
            }
        }
    }
    
    public Map<Integer, Integer> getSnakes(){
        return snakes;
    }
    
    public Map<Integer, Integer> getLadders(){
        return ladders;
    }
    
    public Integer getGameSize(){
        return gameSize;
    }
    
}