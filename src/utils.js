const utils = {
    stringReplaceAt: (str, repl, index) => str.substr(0, index) + repl + str.substr(index + repl.length)
}

export default utils;