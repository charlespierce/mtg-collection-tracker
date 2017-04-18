import * as React from 'react';
import { Board } from './board';
import { calculateWinner } from '../libs/calculateWinner';

interface BoardState {
    squares: (string | null)[];
}

interface GameState {
    history: BoardState[];
    stepNumber: number;
    xIsNext: boolean;
}

export class Game extends React.PureComponent<void, GameState> {
    constructor() {
        super();

        this.state = {
            history: [
                { squares: [] }
            ],
            stepNumber: 0,
            xIsNext: true
        }
    }

    private nextPlayer() {
        return this.state.xIsNext ? "X" : "O";
    }

    private handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (!calculateWinner(squares) && !squares[i]) {
            squares[i] = this.nextPlayer();
            this.setState({
                history: history.concat([{ squares }]),
                xIsNext: !this.state.xIsNext,
                stepNumber: this.state.stepNumber + 1
            });
        }
    }

    private jumpTo(move: number) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0
        })
    }

    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = winner ? `${winner} Wins!` : `Next Player: ${this.nextPlayer()}`;

        const moves = history.map((step, move) => (
            <li><a href="#" onClick={ () => this.jumpTo(move) }>{move ? `Move # ${move}` : "Game Start" }</a></li>
        ));

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={ current.squares } onClick={ (i) => this.handleClick(i) } />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}
