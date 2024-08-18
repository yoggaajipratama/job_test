function wordCount(INPUT, QUERY) {
    return QUERY.map(query => INPUT.filter(word => word === query).length);
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(wordCount(INPUT, QUERY));
