import * as React from 'react';
import { Square } from './square';

export class Board extends React.Component<any, any> {
    private renderSquare(i: number) {
        return <Square />
    }

    public render() {
        const status = "Next Player: X";

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
