import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInterval from './_useInterval';
import Cell from './Cell';

const rowNo = 80;
const colNo = 80;

export const PageHolder = styled.div`
    width: 100vw;
    height: 100vh;
    
    background-color: black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 75px;
`;

const GridHolder = styled.div`
    width: ${10*rowNo}px;
    height: ${10*colNo}px;

    background-color: white;

    display: grid;
    grid-template-columns: repeat(${rowNo}, 10px);
    grid-template-rows: repeat(${colNo}, 10px);
`;

let rules = [];

const expandRule = (l, m, r) => {
    let vals = l + "" + m + "" + r;

    switch (vals) {
        case "111":
            return rules[0];
        case "110":
            return rules[1];
        case "101":
            return rules[2];
        case "100": 
            return rules[3];
        case "011":
            return rules[4];
        case "010":
            return rules[5];
        case "001":
            return rules[6];
        default: 
            return rules[7];
    }
};

const createInitialGrid = () => {
    let initGrid = Array(rowNo).fill().map(() => Array(colNo).fill(0));
    initGrid[0][colNo-1] = 1;
    return initGrid;
};

const generateCA = (currentLine, grid) => {
    let newLine = [];
    for (let i = 0; i < colNo; i++) {
        switch (i) {
            case 0:
                newLine.push(expandRule(grid[currentLine].at(-1), grid[currentLine][i], grid[currentLine][i+1]));
                break;
            case colNo - 1:
                newLine.push(expandRule(grid[currentLine][i-1], grid[currentLine][i], grid[currentLine][0]));
                break;
            default:
                newLine.push(expandRule(grid[currentLine][i-1], grid[currentLine][i], grid[currentLine][i+1]));
                break;
        }
    }

    let newGrid = [...grid];
    for (let i = 0; i < colNo; i++) {
        newGrid[currentLine+1][i] = newLine[i];
    }

    return newGrid;
};

export default function CellularAutomata() {

    const [grid, setGrid] = useState(createInitialGrid());
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        let rule = 110;
        if (rule > 0) {
            while (rule > 0) {
                rules.unshift(rule % 2);
                rule = Math.floor(rule/2);
            }
            while (rules.length < 8) {
                rules.unshift(0);
            }
        } else {
            while (rules.length < 8) {
                rules.unshift(0);
            }
        }
    }, []);

    const intervalFunction = () => {
        setGrid(generateCA(currentLine, grid));
        setCurrentLine(currentLine+1);
    }

    useInterval(grid, intervalFunction, currentLine === rowNo - 1 ? null : 50 );

    return (
        <PageHolder>
            <GridHolder>
                {
                    grid.map((rows, i) =>
                    rows.map((col, j) => 
                        <Cell key={`${i}-${j}`} valueOfCell={grid[i][j]} />
                    ))
                }
            </GridHolder>
        </PageHolder>
    )
}