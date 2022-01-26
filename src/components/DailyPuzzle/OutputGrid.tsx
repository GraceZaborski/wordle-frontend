import { Box, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';

interface OutputGridInterface {
    word: string
    wordArray: string[]
    currentUser: number
}

function OutputGrid(props: OutputGridInterface) {
    const { word, wordArray, currentUser } = props

    const dailyWord = "which"

    let grid = document.getElementById('grid') as HTMLElement
    buildGrid()
    updateGrid()

    function buildGrid() {
        console.log('building grid')
        if (grid) {
            for (let i = 0; i < 6; i++) {
                let row = document.createElement('div')
                for (let j = 0; j < 5; j++) {
                    let cell = document.createElement('div')
                    cell.className = 'cell'
                    cell.textContent = ''
                    row.appendChild(cell)
                }
                grid.appendChild(row)
            }
        }
    }

    function updateGrid() {
        console.log('upgrading grid')
        if (grid) {
            let row = grid.firstChild
            for (let attempt of wordArray) {
                drawAttempt(row, attempt, false)
                if (row) {
                    row = row.nextSibling
                }
            }
            drawAttempt(row, word, true)
            for (let i = wordArray.length; i < 6; i++) {
                if (row) {
                    updateWhiteSpace(row)
                    row = row.nextSibling
                }
            }
        }
    }

    function updateWhiteSpace(row: any) {
        console.log('updating white spaces')
        for (let i = 0; i < 5; i++) {
            let cell = row.children[i]
            cell.textContent = ""
            cell.style.backgroundColor = '#FFFFFF'
        }
    }


    function drawAttempt(row: any, attempt: string, isCurrent: boolean) {
        for (let i = 0; i < 5; i++) {
            let cell = row.children[i]
            if (attempt[i] !== undefined) {
                cell.textContent = attempt[i]
                cell.style.backgroundColor = getBgColor(attempt, i)
            } else {
                // lol
                cell.style.backgroundColor = '#FFFFFF'
                cell.textContent = ''
                // cell.innerHTML = '<div style="opacity: 0">X</div>'
            }
        }
    }

    function getBgColor(attempt: string, i: number) {
        let correctLetter = dailyWord[i]
        let attemptLetter = attempt[i]
        if (
            attemptLetter === undefined ||
            dailyWord.indexOf(attemptLetter) === -1
        ) {
            return '#808080'
        }
        if (correctLetter === attemptLetter) {
            return '#538d4e'
        }
        return '#b59f3b'
    }


    return (
        <Box>
            <div id="grid"></div>
        </Box >
    )
}

export default OutputGrid;
