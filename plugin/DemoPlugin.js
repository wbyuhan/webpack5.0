// plugin demo
const HtmlWebpackPlugin = require('html-webpack-plugin');

class DemoPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        //console.log('%c 🍶 compiler: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', compiler.hooks);
        console.log(this.options.filename);
        // 确定什么时候执行
        // entryOption : 在 webpack 选项中的 entry 配置项 处理过之后，执行插件。
        // afterPlugins : 设置完初始插件之后，执行插件。
        // compilation : 编译创建之后，生成文件之前，执行插件。。
        // emit : 生成资源到 output 目录之前。
        // done : 编译完成。
        // tap ：以同步方式触发钩子；
        // tapAsync ：以异步方式触发钩子；
        // tapPromise ：以异步方式触发钩子，返回 Promise；
        compiler.hooks.compilation.tap("DemoPlugin", (compilation, callback) => {
            // console.log('%c 🍹 compilation: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', compilation);
            // 插件逻辑 调用compilation提供的plugin方法.

            // compilation.getHooks('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            //     // 读取并修改 script 上 src 列表
            //     let jsScr = htmlPluginData.assets.js[0];
            //     htmlPluginData.assets.js = [];
            //     let result = `
            //         <script>
            //             let scriptDOM = document.createElement("script");
            //             let jsScr = "./${jsScr}";
            //             scriptDOM.src = jsScr + "?" + new Date().getTime();
            //             document.body.appendChild(scriptDOM)
            //         </script>
            //     `;
            //     let resultHTML = htmlPluginData.html.replace(
            //         "<!--SetScriptTimestampPlugin inset script-->", result
            //     );
            //     htmlPluginData.html = resultHTML
            // })
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync("DemoPlugin", (data, cb) => {
                console.log('%c 🍧 data: ', 'font-size:20px;background-color: #FCA650;color:#fff;', data);
                const jsSrc = data.bodyTags[0].attributes.scr;
                const result = `<script>
                    let scriptDOM = document.createElement("script");
                    let jsScr = "./${jsSrc}";
                    scriptDOM.src = jsScr + "?" + new Date().getTime();
                    document.body.appendChild(scriptDOM)
                    </script>`

                const resultHTML = data.html.replace("<!--SetScriptTimestampPlugin inset script-->", result);
                data.html = resultHTML
            })
        })
    }
}


module.exports = DemoPlugin