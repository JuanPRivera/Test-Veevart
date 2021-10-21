//Class start is the game controller.
public class Start {
    Board board;
    List<Player> players = new List<Player>();
    Integer [] finishPlayers = new List<Integer>();
    Map<Integer, Integer> snakes;
    Map<Integer, Integer> ladders;
    public Start(Integer qPlayers, Board myBoard){
        board = myBoard; //Take the board created in Main class.
        snakes = board.getSnakes(); //Get the snakes of the board created.
        ladders = board.getLadders(); //Get the ladders of the board created.
        System.debug('The number of players is ' + qPlayers); //Print the numbers of players.
        createPlayers(qPLayers); //Create the player indicated to the Main class.
        play(qPlayers, board.getGameSize()); //Start the game and good luck!!
    }
    
    //Method to create the players indicated.
    public void createPlayers(Integer qPlayers){
        for(Integer i = 0; i < qPlayers; i++){
            players.add(new Player(0)); //Add the new player to the array of players.
        }
    }
    
    public void play(Integer nPlayers, Integer gameSize){
        //This do while will run until all players have finished the game
        do{
            //This for indicates the current turn of the round.
            for(Integer i = 1; i <= nPlayers; i++){
                //If that allows only players who have not finished the game to play.
                if(!finishPlayers.contains(i)){
                    System.debug('Player ' + i + ' it\'s your turn');
                    Integer dice = Integer.valueOf(Math.random() * 6) + 1; //Random number from 1 to 6. Throw the dice.
                    Integer current = players[i-1].getPosition(); //Get the current position of the current player.
                    System.debug('Dice roll ' + dice);
                    
                    //if the player goes over the limit, the positions exceeded will be returned.
                    if(current + dice > gameSize){
                        System.debug('Player ' + i + ' exceeds position ' + gameSize);
                        current = gameSize - (dice - (gameSize - current));
                        System.debug('Player ' + i + ' moves to position ' + gameSize + ' and returns to position ' + current);
                    }else{ //if the player doesn't go over the limit, the player advances to the next position.
                        players[i-1].setPosition(current + dice);
                        current = players[i-1].getPosition();
                        System.debug('Player ' + i + ' moves to position ' + current);
                    }
                    //If the current position of the player is the head of a snake, the player descends until the tail.
                    if(snakes.containsKey(current)){ 
                        players[i-1].setPosition(snakes.get(current));
                        current = players[i-1].getPosition();
                        System.debug('Player ' + i + ' descends to position ' + current);
                    }
                    //If the current position of the player is the head of a ladder, the player climbs it until the tail.
                    else if(ladders.containsKey(current)){
                        players[i-1].setPosition(ladders.get(current));
                        current = players[i-1].getPosition();
                        System.debug('Player ' + i + ' climbs the ladder to position ' + current);
                    }
                    if(current == gameSize){ //True if the player reaches the target.
                        finishPlayers.add(i);
                        System.debug('Player ' + i + ' has finish the game');
                    }
                    System.debug('');
                }
            }
        }while(finishPlayers.size() != nPlayers);
        
        //If there are more than one player, prints the positions or podium.
        if(finishPlayers.size() > 1){
            System.debug('PODIUM:');
            System.debug('Winner: Player ' + finishPlayers[0]);
            for(Integer i = 1; i < finishPlayers.size(); i++){
                System.debug('Position ' + (i + 1) + ': Player ' + finishPlayers[i]);
            }
        }
        System.debug('End of the game');
    }
}