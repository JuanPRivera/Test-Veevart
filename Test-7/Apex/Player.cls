//Class Player for each needed player.
public class Player {

    //Position of the player on the board.
    Integer position;
    
    public Player(Integer initPosition){
        //init position will always be 0.
        position = initPosition;
    }
    
    public Integer getPosition(){
        return position;
    }
    
    public void setPosition(Integer newPos){
        position = newPos;
    }
    
}