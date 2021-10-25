/* Author: Juan Pablo Rivera González
 * 
 * Class that starts the game. Receive a number of players
 * and the size of the board */
public class Main {
    //Constructor
	public static void main(Integer players, Integer width, Integer height){
        //Only allows from 1 to 4 players.
        //If you put a big number for the size of the board, the game can get too long.
        if(players < 1 || players > 4){
            System.debug('Please try again, the minimum number of players is 1,');
            System.debug('and the maximum number of players is 4');
        }else if(width < 5 || height < 5){
            System.debug('Please try again, the minimum number for');
            System.debug('the width and the height is 5');
        }else{
            //Create the board for the game.
            Board board = new Board(width, height);
            //Start the by creating the controller named Start.
            Start start = new Start(players, board);
        }
    }
}