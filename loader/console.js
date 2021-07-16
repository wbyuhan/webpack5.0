module.exports = function(content) {
    console.log('%c 🍮 content: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', content);
    return handleConsole(content)
}

function handleConsole(content) {
    return content.replace(/console.log\(['|"](.*?)['|"]\)/, '')
}