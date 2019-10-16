const decipher = (alphapet: string[]) => (cipherText: string) => (shift: number): string => {
    const cipherTextArray: string[] = Array.from(cipherText);
    const decipherTextArray = cipherTextArray.map((char) => {
        if (!alphapet.includes(char)) return char;
        const index = alphapet.indexOf(char);
        const newChar = index + shift < alphapet.length -1 ? index + shift : index + shift - alphapet.length - 1 
        return alphapet[newChar];
    })
    return decipherTextArray.join('');
}

export default decipher;