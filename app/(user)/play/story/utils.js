
export const getRandomWords = (words, count = 5) => {
    let randomWords = [];
    let tempWords = [...words]; // Create a copy of words array
    
    for (let i = 0; i < count && tempWords.length > 0; i++) {
        // Generate random index
        const randomIndex = Math.floor(Math.random() * tempWords.length);
        // Add the random word to our selection
        randomWords.push(tempWords[randomIndex]);
        // Remove the selected word to avoid duplicates
        tempWords.splice(randomIndex, 1);
    }
    return randomWords;
};
