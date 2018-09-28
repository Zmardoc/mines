import { Injectable } from '@angular/core';
import { Square } from '../classes/square';

export enum GameState{
  Running = 0, 
  Win = 1,
  Lost = 2,
  Menu = 3
}
@Injectable({
  providedIn: 'root'
})
export class GameService {

  public battlefield: Square[][];
  public minesCount: number;
  public rows: number;
  public cols: number;
  public countReveal: number;
  public flagPlaced: number;
  public gameState: GameState;

  constructor(rows: number, cols: number, minesCount: number) { 

    this.minesCount = minesCount;
    this.rows = rows;
    this.cols = cols;
    this.countReveal = 0;
    this.gameState = GameState.Menu;
    this.flagPlaced = 0;
  }

  createBattlefield(){

    this.fillBattlefield();
    this.generateMines();
    this.calculateNumbers();
    this.gameState = GameState.Running;
  }

  fillBattlefield(){
    this.battlefield = [];
    for(var x = 0; x < this.rows; x++){
      this.battlefield[x] = [];
      for(var y = 0; y < this.cols; y++){
          this.battlefield[x][y] = new Square(x, y, false, -1);        
      }
    }
  }

  generateMines(){

    var minesPlaced = 0;

    while(minesPlaced < this.minesCount) {
      
      var generX = Math.floor(Math.random() * this.rows);
      var generY = Math.floor(Math.random() * this.cols);

      if(!this.battlefield[generX][generY].mine){
        this.battlefield[generX][generY].mine = true;
        minesPlaced++;
      }
    }
  }

  getMinesAround(posX: number, posY: number): number{

    var minesAround = 0;
    for(var x = -1; x <= 1; x++){
      for(var y = -1; y <= 1; y++){

        var edgeX = posX + x;
        var edgeY = posY + y;

        if(edgeX >= 0 && edgeX < this.rows && edgeY >= 0 && edgeY < this.cols){
          if(this.battlefield[edgeX][edgeY].mine){
            minesAround++;
          }
        }
      }
    }
    return minesAround;
  }

  calculateNumbers(){

    for(var x = 0; x < this.rows; x++){
      for(var y = 0; y < this.cols; y++){

        if(!this.battlefield[x][y].mine){
          var minesAround = this.getMinesAround(x, y);
          this.battlefield[x][y].minesAround = minesAround;
        }
      }
    }
  }

  showSquare(square: Square) {

    if(!square.revealed){
      if(square.mine){
        this.showOtherMines();
        square.finalMine = true;
        this.gameState = GameState.Lost;
      }
      else if(square.minesAround == 0){
        this.showFreeSquaresAround(square);
        this.checkAllEmptyRevealed();
      }
      else{
        square.innerText = square.minesAround.toString();
        if(square.flag){
          this.flagPlaced--;
          square.flag = false;
        }
        this.countReveal++;
        this.checkAllEmptyRevealed();      
      }
      square.revealed = true;
    }    
  }

  showFreeSquaresAround(square: Square){

    square.revealed = true;
    if(square.flag) {
      this.flagPlaced--;
    }
    square.flag = false;
    this.countReveal++;
    square.innerText = square.minesAround.toString();
    if(square.minesAround == 0){

      for(var x = -1; x <= 1; x++){
        for(var y = -1; y <= 1; y++){
  
          var edgeX = square.posX + x;
          var edgeY = square.posY + y;
  
          if(edgeX >= 0 && edgeX < this.rows && edgeY >= 0 && edgeY < this.cols){
            var squareNeighbour = this.battlefield[edgeX][edgeY];
            if(!squareNeighbour.revealed){
              this.showFreeSquaresAround(squareNeighbour);
            }
          }
        }
      }
    }
  }

  checkAllEmptyRevealed(){
    
    if(this.countReveal == this.rows * this.cols - this.minesCount){
      this.showOtherMinesFlags();
      this.gameState = GameState.Win;
      console.log(this.countReveal + " : " + (this.rows * this.cols - this.minesCount));
    }
  }

  setFlag(square: Square){

    if(!square.revealed){
      square.flag = !square.flag;
      if(square.flag){
        this.flagPlaced++;
      }
      else{
        this.flagPlaced--;
      }
    }
  }

  showOtherMinesFlags(){
    for(var x = 0; x < this.rows; x++){
      for(var y = 0; y < this.cols; y++){
        if(this.battlefield[x][y].mine){
          this.battlefield[x][y].flag = true;
        }
      }
    }
  }

  showOtherMines(){
    for(var x = 0; x < this.rows; x++){
      for(var y = 0; y < this.cols; y++){
        if(this.battlefield[x][y].mine){
          this.battlefield[x][y].revealed = true;
        }
      }
    }
  }
  delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
