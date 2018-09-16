const utils = {
    stringReplaceAt: (str, repl, index) => str.substr(0, index) + repl + str.substr(index + repl.length),
    getFigureColor: figure => figure.toUpperCase() === figure ? 'white' : 'black'
}

export default utils;