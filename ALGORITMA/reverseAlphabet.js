function reverseAlphabet(str) {
    const alphabets = str.match(/[a-zA-Z]/g).reverse().join('');
    const numbers = str.match(/[0-9]/g).join('');
    return alphabets + numbers;
}

const str = "NEGIE1";
console.log(reverseAlphabet(str));
