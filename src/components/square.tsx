import * as React from 'react';

export interface SquareProps {
    onClick: () => void;
    value: string | null;
}

export function Square(props: SquareProps) {
    return (
        <button className="square" onClick={ () => props.onClick() }>
            { props.value }
        </button>
    );
}
