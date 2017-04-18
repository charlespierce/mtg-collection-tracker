import * as React from 'react';
import { Board } from './board';

export class Game extends React.PureComponent<any, any> {
    public render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{ /* status */ }</div>
                    <ol>{ /* TODO */ }</ol>
                </div>
            </div>
        );
    }
}
