function longest(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';
    
    words.forEach(word => {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });

    return `${longestWord}: ${longestWord.length} characters`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longest(sentence));
