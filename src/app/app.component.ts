import { Component, OnInit } from '@angular/core';
import { GameService, GameState } from './services/game.service';
import { Square } from './classes/square';
import { MatDialog } from '@angular/material';
import { DialogEnd } from './components/dialog-end';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mines';
  gameService: GameService;
  battlefield: Square[][];
  gameStarted: boolean;
  cols: number; 
  rows: number;
  mines: number;
  revealed: number;
  dialogText: string;
  gameState: GameState;
  bomb: AudioTrack;
  err: String;

  constructor(public dialog: MatDialog) {}
  ngOnInit(){
    this.gameStarted = false;
    this.rows = 9;
    this.cols = 9;
    this.mines = 10;
    this.revealed = 0;
    this.gameState = GameState.Menu;
  }
  inputsValid(): boolean{
    return !(this.rows < 1 || this.cols < 1 || this.mines < 1 || this.cols * this.rows <= this.mines);
  }
  startGame(){

    if(this.inputsValid()){
      this.gameService = new GameService(this.rows, this.cols, this.mines);
      this.gameService.createBattlefield();
      this.battlefield = this.gameService.battlefield;
      this.gameStarted = true;
      this.revealed = this.gameService.countReveal;
      this.gameState = this.gameService.gameState;
    }
  }
  newGame(){
    this.gameStarted = false;
    this.gameService.gameState= GameState.Menu;
    this.gameService.flagPlaced = 0;
    this.gameState = GameState.Menu;
  }
  showSquare(square: Square) {
    this.gameService.showSquare(square);
    this.revealed = this.gameService.countReveal;
    this.gameState = this.gameService.gameState;
    if(this.gameState == GameState.Win){
      this.dialogText = "Vyhráls";
      this.openDialog();
    }
    else if(this.gameState == GameState.Lost){
      /*this.bomb = new Audio();
      this.bomb.src = "../../../assets/bomb.mp3";
      this.bomb.load();
      this.bomb.play();*/
      this.gameService.delay(2000);
      this.dialogText = "Prosrals to";
      this.openDialog();
    }
  }
  setFlag(square: Square) {
    if(!square.revealed){
      this.gameService.setFlag(square);
    }
    return false; 
  }
  openDialog(): void {    
    const dialogRef = this.dialog.open(DialogEnd, {
      width: '250px',
      data: {dialogText: this.dialogText}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newGame();
    });
  }
}
