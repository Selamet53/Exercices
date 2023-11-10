import BoardManager from "../src/boardManger.js";
import TicTacToe from "../src/ticTacToe.js";
import { jest } from "@jest/globals";

describe("TicTacToe tests", () => {
    let ttt;
    let manager;
    function buildHTML() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        document.body.append(cell);
        const button = document.createElement("button");
        button.setAttribute("id", "reset");
        document.body.append(button);

        const winnerName = document.createElement("h2");
        winnerName.setAttribute("id", "winner-name");
        document.body.append(winnerName);

        const turnName = document.createElement("h2");
        turnName.setAttribute("id", "turn-name");
        document.body.append(turnName);
    }

    // TODO : Compléter la configuration des tests
    beforeEach(() => {
        ttt = new TicTacToe();
        manager = new BoardManager();
        buildHTML();
    });

    it("todo", () => {
        expect(true).toEqual(false);
    });
});