import { info } from "./decorators";
export class Rules {
    started: boolean = false
    finished: boolean = false
    playerVictory: boolean = false
    cpuVictory: boolean = false
    cpuCanShoot: boolean = false
    playerCanShoot: boolean = false
    checkWin(who: boolean, tab: number[][]) {
        if (!who) //false - player, true- cpu
            this.playerVictory = true
        else
            this.cpuVictory = true
        for (var i: number = 0; i < tab.length; i++) {
            for (var j: number = 0; j < tab[i].length; j++) {

                if (tab[i][j] == 1) {
                    if (!who)
                        this.playerVictory = false
                    else
                        this.cpuVictory = false
                    break;
                }
                else
                    continue

            }
        }
        if (this.playerVictory) {
            alert("YOU WON!!!!!!!!")
            this.finished = true
        }
        if (this.cpuVictory) {
            alert("CPU WON!!!!!!!!")
            this.finished = true
        }
    }
    currentPlayer() {
        document.getElementById("tips").innerHTML = ""
        if (this.playerCanShoot)
            document.getElementById("tips").innerHTML = "Ruch gracza"
        else
            document.getElementById("tips").innerHTML = "Ruch komputera"
    }
    showInfo(){
 //dokonczyc ten shit
    }
}