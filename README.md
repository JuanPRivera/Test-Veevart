# HOW TO RUN THE CODE

### Requirements:

#### - Node.js
If don't have Node.js, you can download it through this link.
https://nodejs.org/es/
You can download the LTS version or the latest.  
  
To run any file you only have to be inside "JuanRivera-Test-Veevart" folder.

### Test 7 - JS files
First, you have to run "npm install" to install the modules needed.

- game.js: Size of the board is 5x5 and only with one player.  
- gamePlayers.js: Size of the board is 5x5 and you can indicate the number of players (Max 4, the game can get too long).  
- customGame.js: This is for a custom game, you can indicate the size of the board and the number of players.  
  
If you want to run all the files with one command, run "npm run start:test7".  
  
If you want to run the files individually with one command, run each commando below:  
- game.js: "npm run start:test7-0".  
- gamePlayers.js: "npm run start:test7-1".  
- customGame.js: "npm run start:test7-2".

### Test 7 - cls files
First, open the folder named "Apex" that is in the directory "src/Test7/".
Open the files in a new playground in salesforce and save the classes.
Then, open an execute anonymous window or 'CTRL + E' and run the game
with the command "Main.main(numPlayers, width, height)" in the terminal.
#### Information:
- numPlayers: Numbers of players in the game (integer. Maximum 4).
- Width: Numbers of columns of the board (integer. Minimun 5).
- Height: Numbers of files of the board (integer. Minimum 5).

### Test 9 - JS files
Information:

- lift.js: Exercise with one lift.  
- lift2.js: Exercise with two lifts.  
  
If you want to run all the files with one command, run "npm run start:test9".  
  
If you want to run the files individually with one command, run each commando below:  
- lift.js: "npm run start:test9-0".  
- lift2.js: "npm run start:test9-1".

### Documentation
After running "npm install", run "npm run docs". That will create a folder named "docs".  
Open the file named "global.html" that is inside the folder named "docs" with your browser and you will see the documentation.

###### 
###### Happy hacking :)