//import { Rules } from "./src/Rules.ts";
var Rules = /** @class */ (function () {
    function Rules() {
        this.started = false;
        this.finished = false;
        this.playerVictory = false;
        this.cpuVictory = false;
        this.cpuCanShoot = false;
        this.playerCanShoot = false;
    }
    Rules.prototype.checkWin = function (who, tab) {
        if (!who) //false - player, true- cpu
            this.playerVictory = true;
        else
            this.cpuVictory = true;
        for (var i = 0; i < tab.length; i++) {
            for (var j = 0; j < tab[i].length; j++) {
                if (tab[i][j] == 1) {
                    if (!who)
                        this.playerVictory = false;
                    else
                        this.cpuVictory = false;
                    break;
                }
                else
                    continue;
            }
        }
        if (this.playerVictory) {
            alert("YOU WON!!!!!!!!");
            this.finished = true;
        }
        if (this.cpuVictory) {
            alert("CPU WON!!!!!!!!");
            this.finished = true;
        }
    };
    Rules.prototype.currentPlayer = function () {
        document.getElementById("tips").innerHTML = "";
        if (this.playerCanShoot)
            document.getElementById("tips").innerHTML = "Ruch gracza";
        else
            document.getElementById("tips").innerHTML = "Ruch komputera";
    };
    return Rules;
}());
var root = document.createElement("div");
root.id = "cpt";
var tip = document.createElement("div");
tip.id = "tips";
var h1 = document.createElement("h1");
h1.id = "currentPlayer";
tip.appendChild(h1);
var rules = new Rules();
var playerShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var cpuShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var cpuShots = [[]];
var tab = [[]];
var playerTab = [[]];
var tmpShipOnTab = [];
var tmpChosenShip;
var tmpChosenShipId;
var shipsPainted = [];
var shipDirection = true; //true = poziomo, false = pionowo
var clickedButton;
function initTab(tab) {
    for (var i = 0; i < 12; i++) {
        tab[i] = [];
        for (var j = 0; j < 12; j++) {
            if (i == 0 || i == 11 || j == 0 || j == 11) {
                tab[i][j] = 0;
            }
            else
                tab[i][j] = 0;
        }
    }
}
function clearTab(tab) {
    for (var i = 0; i < tab.length; i++) { //dol
        for (var j = 0; j < tab[i].length; j++) { //prawo
            tab[i][j] = 0;
        }
    }
}
function getElevation(tab, x, y) {
    if (typeof (tab[x - 1]) != "undefined" && typeof (tab[x + 1]) != "undefined" && tab[x][y] == 0 && tab[x][y + 1] == 0 && tab[x + 1][y] == 0 && tab[x - 1][y] == 0 && tab[x][y - 1] == 0 && tab[x + 1][y + 1] == 0 && tab[x + 1][y - 1] == 0 && tab[x - 1][y - 1] == 0 && tab[x - 1][y + 1] == 0 && typeof (tab[x - 1][y]) != "undefined" && typeof (tab[x + 1][y]) != "undefined" && typeof (tab[x][y - 1]) != "undefined" && typeof (tab[x][y + 1]) != "undefined") {
        return true;
    }
    else {
        return false;
    }
}
function placeShips(tab, ships) {
    var shipsTab = [[]];
    var placed = true;
    var tmpTab = [[]];
    while (typeof (cpuShips[0]) != "undefined") {
        var ship = cpuShips[0];
        var randomX = Math.floor((Math.random() * 10) + 1);
        var randomY = Math.floor((Math.random() * 10) + 1);
        var direction = Math.floor((Math.random() * 2) + 0); //0 - poziom, 1 - pion
        if (direction == 0) {
            if (getElevation(tab, randomX, randomY)) {
                tmpTab.push([direction, randomX, randomY]);
                for (var j = 0; j < ship; j++) {
                    if (getElevation(tab, randomX + j, randomY)) {
                        continue;
                    }
                    else {
                        tmpTab = [[]];
                        placed = false;
                        break;
                    }
                }
            }
        }
        if (direction == 1) {
            if (getElevation(tab, randomX, randomY)) {
                tmpTab.push([direction, randomX, randomY]);
                for (var j = 0; j < ship; j++) {
                    if (getElevation(tab, randomX, randomY + j)) {
                        continue;
                    }
                    else {
                        tmpTab = [[]];
                        placed = false;
                        break;
                    }
                }
            }
        }
        if (typeof (tmpTab[1]) != "undefined") {
            for (var l = 0; l < ship; l++) {
                var x = tmpTab[1][1];
                var y = tmpTab[1][2];
                if (tmpTab[1][0] == 0)
                    tab[x + l][y] = 1;
                else
                    tab[x][y + l] = 1;
            }
            tmpTab = [[]];
            cpuShips.shift();
        }
    }
}
function paintTab(tab, who) {
    var cont = document.createElement("div");
    cont.classList.add("cont");
    var table = document.createElement("table");
    for (var i = 1; i < tab.length - 1; i++) {
        var tr = document.createElement("tr");
        for (var j = 1; j < tab[i].length - 1; j++) {
            var td = document.createElement("td");
            if (!who) { //0 - player, 1 - cpu
                td.id = i + "_" + j + "_P";
            }
            else {
                td.id = i + "_" + j + "_CPU";
                td.addEventListener("click", function zbij() {
                    if (rules.playerCanShoot) {
                        var id = this.id.split("_");
                        var idX = Number(id[0]);
                        var idY = Number(id[1]);
                        if (tab[idX][idY] == 1) {
                            this.innerHTML = "⨉";
                            tab[idX][idY] = 0;
                            rules.checkWin(false, tab);
                        }
                        else
                            this.innerHTML = "᛫";
                        this.removeEventListener("click", zbij);
                        rules.cpuCanShoot = true;
                        rules.playerCanShoot = false;
                    }
                });
            }
          //  if (tab[i][j] == 1)
          //      td.classList.add("red");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    cont.appendChild(table);
    root.appendChild(cont);
}
function paintPlayerTab(tab) {
    var cont = document.createElement("div");
    cont.classList.add("cont");
    var table = document.createElement("table");
    for (var i = 1; i < tab.length - 1; i++) {
        var tr = document.createElement("tr");
        for (var j = 1; j < tab[i].length - 1; j++) {
            var td = document.createElement("td");
            td.id = i + "_" + j + "_P";
            td.addEventListener("mouseover", function over() {
                if (typeof (tmpChosenShip) != "undefined" && tmpChosenShip != null) {
                    var tmp = this.id.split("_");
                    var chosenX = Number(tmp[0]);
                    var chosenY = Number(tmp[1]);
                    console.log("xy", chosenX, chosenY);
                    var m = true;
                    for (var g = 0; g < tmpChosenShip; g++) {
                        if (shipDirection) {
                            if (m)
                                var tmpId = (chosenX + g) + "_" + chosenY + "_P";
                            m = false;
                            var tmpId2 = (chosenX + g) + "_" + chosenY + "_P";
                            if (getElevation(playerTab, chosenX + g, chosenY)) {
                                document.getElementById(tmpId2).style.backgroundColor = "green";
                                tmpChosenShipId = tmpId;
                                tmpShipOnTab.push(tmpId2);
                            }
                            else {
                                console.log("nie ok");
                                console.log(tmpId);
                                //document.getElementById(tmpId).style.backgroundColor = "red"
                                tmpChosenShipId = "";
                                tmpShipOnTab.push(tmpId);
                                for (var h = 0; h < tmpShipOnTab.length; h++) {
                                    if (document.getElementById(tmpShipOnTab[h]) != null)
                                        document.getElementById(tmpShipOnTab[h]).style.backgroundColor = "red";
                                }
                            }
                        }
                        else {
                            if (m)
                                var tmpId = (chosenX) + "_" + (chosenY + g) + "_P";
                            m = false;
                            var tmpId2 = (chosenX) + "_" + (chosenY + g) + "_P";
                            if (getElevation(playerTab, chosenX, chosenY + g)) {
                                document.getElementById(tmpId2).style.backgroundColor = "green";
                                tmpChosenShipId = tmpId;
                                tmpShipOnTab.push(tmpId2);
                            }
                            else {
                                console.log("nie ok");
                                //document.getElementById(tmpId).style.backgroundColor = "red"
                                tmpShipOnTab.push(tmpId);
                                for (var h = 0; h < tmpShipOnTab.length; h++) {
                                    if (document.getElementById(tmpShipOnTab[h]) != null)
                                        document.getElementById(tmpShipOnTab[h]).style.backgroundColor = "red";
                                }
                                tmpChosenShipId = "";
                            }
                        }
                    }
                }
            });
            td.addEventListener("mouseleave", function leave() {
                if (typeof (tmpShipOnTab) != "undefined") {
                    for (var c = 0; c < tmpShipOnTab.length; c++) {
                        var id = tmpShipOnTab[c].toString();
                        document.getElementById(id).style.backgroundColor = "white";
                    }
                    tmpShipOnTab = [];
                }
                if (typeof (shipsPainted) != "undefined") {
                    for (var c = 0; c < shipsPainted.length; c++) {
                        if (document.getElementById(shipsPainted[c]) != null)
                            document.getElementById(shipsPainted[c]).style.backgroundColor = "blue";
                    }
                }
            });
            td.addEventListener("click", function () {
                if (tmpChosenShipId != "" && typeof (tmpChosenShipId) != "undefined") {
                    console.log(tmpChosenShipId);
                    var tmpid = tmpChosenShipId.split("_");
                    var chosenX = Number(tmpid[0]);
                    var chosenY = Number(tmpid[1]);
                    console.log("dlugosc: " + tmpChosenShip);
                    console.log("id: " + clickedButton);
                    for (var g = 0; g < tmpChosenShip; g++) {
                        if (shipDirection) {
                            playerTab[chosenX + g][chosenY] = 1;
                            var tmpOD = (chosenX + g) + "_" + chosenY + "_P";
                            shipsPainted.push(tmpOD);
                        }
                        else {
                            playerTab[chosenX][chosenY + g] = 1;
                            var tmpOD = chosenX + "_" + (chosenY + g) + "_P";
                            shipsPainted.push(tmpOD);
                        }
                    }
                    tmpChosenShip = null;
                    document.getElementById(clickedButton).remove();
                    if (!document.getElementById("buttons").hasChildNodes()) {
                        console.log("mozna strzelac");
                        rules.playerCanShoot = true;
                        rules.currentPlayer();
                    }
                    clickedButton = null;
                    console.table(playerTab);
                }
            });
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    cont.appendChild(table);
    root.appendChild(cont);
}
function cpuPick(tab, picked) {
    var randomX = Math.floor((Math.random() * 10) + 1);
    var randomY = Math.floor((Math.random() * 10) + 1);
    var pickOk = false;
    while (!pickOk) {
        for (var i = 0; i < picked.length; i++) {
            if (randomX != picked[i][0] || randomY != picked[i][1]) {
                pickOk = true;
                continue;
            }
            else {
                pickOk = false;
                randomY = Math.floor((Math.random() * 10) + 1);
                randomX = Math.floor((Math.random() * 10) + 1);
                break;
            }
        }
    }
    if (pickOk) {
        setTimeout(function () {
            picked.push([randomX, randomY]);
            var td = randomX + "_" + randomY + "_P";
            var cell = document.getElementById(td);
            if (tab[randomX][randomY] == 1) {
                cell.innerHTML = "⨉";
            }
            else
                cell.innerHTML = "᛫";
            rules.playerCanShoot = true;
            rules.currentPlayer();
        }, 1000);
    }
    rules.cpuCanShoot = false;
}
function cpuShoot() {
    if (!rules.finished) {
        if (rules.cpuCanShoot) {
            rules.currentPlayer();
            cpuPick(playerTab, cpuShots);
        }
        requestAnimationFrame(cpuShoot);
    }
}
function shipsMenu(playerShips) {
    var cont = document.createElement("div");
    cont.classList.add("cont");
    cont.id = "buttons";
    console.log(playerShips);
    for (var i = 0; i < playerShips.length; i++) {
        var row = document.createElement("div");
        var shipBt = document.createElement("div");
        row.classList.add("shipBtRow");
        var shipBtLength = playerShips[i];
        for (var j = 0; j < shipBtLength; j++) {
            var shipBtSegment = document.createElement("div");
            shipBtSegment.classList.add("shipBtSegment");
            shipBt.id = "S_" + shipBtLength + "_" + j;
            shipBt.appendChild(shipBtSegment);
        }
        shipBt.addEventListener("click", function () {
            var tmp = this.id.split("_");
            tmpChosenShip = Number(tmp[1]);
            clickedButton = this.id;
        });
        //row.appendChild();
        cont.appendChild(shipBt);
    }
    root.appendChild(cont);
}
function colorAll() {
    for (var i = 0; i < playerTab.length; i++) {
        for (var j = 0; j < playerTab[i].length; j++) {
            if (playerTab[i][j] == 1) {
                var toColor = i + "_" + j + "_P";
                document.getElementById(toColor).style.backgroundColor = "blue";
            }
        }
    }
    /*
        if (typeof (tmpShipOnTab) != "undefined") {
            for (var i: number = 0; i < tmpShipOnTab.length; i++) {
                if (document.getElementById(tmpShipOnTab[i]) != null)
                    document.getElementById(tmpShipOnTab[i]).style.backgroundColor = "green"
            }
        }
        */
    requestAnimationFrame(colorAll);
}
document.body.appendChild(root);
document.body.appendChild(tip);
if (!rules.finished) {
    initTab(tab);
    initTab(playerTab);
    placeShips(tab, cpuShips);
    shipsMenu(playerShips);
    paintPlayerTab(playerTab);
    paintTab(tab, true);
    cpuShoot();
    colorAll();
}
window.oncontextmenu = function () {
    var tmpTT = [];
    if (shipDirection) {
        //poziom
        // 1_5_P 1_6_P
        /*
        if (typeof (tmpShipOnTab) != "undefined") {
            console.log(tmpShipOnTab, "true")
            for (var i: number = 0; i < tmpShipOnTab.length; i++) {
                var x: number = Number(tmpShipOnTab[i].split("_")[1])
                var y: number = Number(tmpShipOnTab[i].split("_")[0])
                console.log("old: y x" + y, x)
                x += i
                y -= i
                console.log("new: y x" + y + x)
                var newId = y + "_" + x + "_P"
                //tmpShipOnTab.shift()
                //tmpShipOnTab.unshift(newId)
                tmpTT.push(newId)
                if (document.getElementById(tmpShipOnTab[i]) != null)
                    document.getElementById(tmpShipOnTab[i]).style.backgroundColor = "white"
            }
        }
        */
        shipDirection = false;
        //tmpShipOnTab = tmpTT
        //tmpTT = []
    }
    else {
        //pion
        // if (typeof (tmpShipOnTab) != "undefined") {
        /*
    console.log(tmpShipOnTab, "false")
    for (var i: number = 0; i < tmpShipOnTab.length; i++) {
        var x: number = Number(tmpShipOnTab[i].split("_")[1])
        var y: number = Number(tmpShipOnTab[i].split("_")[0])
        console.log("old: y x" + y, x)
        x -= i
        y += i
        console.log("new: y x" + y + x)
        var newId = y + "_" + x + "_P"
        tmpShipOnTab.shift()
        tmpShipOnTab.unshift(newId)
        if (document.getElementById(tmpShipOnTab[i]) != null)
            document.getElementById(tmpShipOnTab[i]).style.backgroundColor = "white"
        tmpTT.push(newId)
    }
    //  }
    console.log(tmpShipOnTab, "false")
    */
        shipDirection = true;
        //    tmpShipOnTab = tmpTT
        //    tmpTT = []
    }
    return false; // cancel default menu
};