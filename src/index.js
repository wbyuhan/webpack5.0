import './index.less'


class Test {
    constructor() {
        this.renderDiv()
    }

    renderDiv() {
        console.log("this is a message")
        const div = document.createElement('div')
        div.className = 'test'
        div.innerHTML = 'hello world'
        document.body.appendChild(div)
    }
}

new Test()

const asyncFun = () => new Promise((resolve, reject) => {
    resolve();
    reject()
})



function Archiver() {
    var temperature = null;
    var archive = [];

    Object.defineProperty(this, 'temperature', {
        get: function() {
            console.log('get!');
            return temperature;
        },
        set: function(value) {
            temperature = value;
            archive.push({ val: temperature });
        }
    });

    this.getArchive = function() { return archive; };
}

var arc = new Archiver();



const setValue = () => {
    const stack = []
    try {
        console.log(1)
        asyncFun().then(() => {
            arc.temperature = 'aaa'
            console.log(2)
        })
    } catch (error) {
        console.log(3)
    } finally {
        console.log(4)
        console.log('%c 🍭 arc.getArchive(): ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', arc.getArchive());
        arc.getArchive().forEach(item => {
            console.log('%c 🥐 item: ', 'font-size:20px;background-color: #42b983;color:#fff;', item);

        })
    }

    while (stack.length > 0) {

        console.log('%c 🍑 arc.getArchive(): ', 'font-size:20px;background-color: #7F2B82;color:#fff;', arc.getArchive());

    }

}
setValue()