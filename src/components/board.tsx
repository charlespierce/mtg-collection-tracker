import * as React from 'react';
import { Square } from './square';
import { calculateWinner } from '../libs/calculateWinner';

export interface BoardState {
    squares: (string | null)[];
    xIsNext: boolean;
}

export class Board extends React.PureComponent<any, BoardState> {
    constructor() {
        super();

        this.state = {
            squares: [],
            xIsNext: true
        }
    }

    private nextPlayer() {
        return this.state.xIsNext ? "X" : "O";
    }

    private handleClick(i: number) {
        const squares = this.state.squares.slice();
        if (!calculateWinner(squares) && !squares[i]) {
            squares[i] = this.nextPlayer();
            this.setState({
                squares,
                xIsNext: !this.state.xIsNext
            });
        }
    }

    private renderSquare(i: number) {
        return <Square value={ this.state.squares[i] } onClick={ () => this.handleClick(i) } />
    }

    public render() {
        const winner = calculateWinner(this.state.squares);
        const status = winner ? `${winner} Wins!` : `Next Player: ${this.nextPlayer()}`;

        return (
            <div>
                <div className="status">{ status }</div>
                <div className="board-row">
                    { this.renderSquare(0) }
                    { this.renderSquare(1) }
                    { this.renderSquare(2) }
                </div>
                <div className="board-row">
                    { this.renderSquare(3) }
                    { this.renderSquare(4) }
                    { this.renderSquare(5) }
                </div>
                <div className="board-row">
                    { this.renderSquare(6) }
                    { this.renderSquare(7) }
                    { this.renderSquare(8) }
                </div>
            </div>
        );
    }
}
