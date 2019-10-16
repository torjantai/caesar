
export const transpose = (alphapet: string[]) => (delta: number, char: string): string => {
    const transposeLookUp = [...alphapet, ...alphapet];
    const index = transposeLookUp.lastIndexOf(char.toLowerCase());
    if (index < 0) return char;
    const newIndex = index - delta;
    const newChar = transposeLookUp[newIndex];
    return newChar;
}



const decipher = (alphapet: string[]) => (cipherText: string) => (shift: number): string => {
    const cipherTextArray: string[] = Array.from(cipherText);
    const decipherTextArray = cipherTextArray.map((char) => {
        return transpose(alphapet)(shift, char);
    })
    return decipherTextArray.join('');
}

export default decipher;