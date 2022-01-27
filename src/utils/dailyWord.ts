import { wordList } from '.././data/data'

export function dailyWord(wordBank: string[]) {
    const dailyWord = wordList[Math.floor(Math.random() * wordList.length)]
    return dailyWord
}
