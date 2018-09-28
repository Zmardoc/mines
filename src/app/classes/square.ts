export class Square {

    public posX: number;
    public posY: number;
    public mine: boolean;
    public minesAround: number;
    public revealed: boolean;
    public innerText: string;
    public flag: boolean;
    public finalMine: boolean;

    constructor(posX:number, posY:number, mine: boolean, minesAround: number) { 
      this.posX = posX;
      this.posY = posY;
      this.mine = mine;
      this.minesAround = minesAround;
      this.revealed = false;
      this.innerText = "";
      this.flag = false;
      this.finalMine = false;
    }
}