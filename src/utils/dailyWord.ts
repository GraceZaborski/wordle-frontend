import { wordList } from '.././data/data'

function dailyWord(wordList: string[]) {
    const dailyWord = wordList[Math.floor(Math.random() * wordList.length)]
    return dailyWord
}

console.log(dailyWord)