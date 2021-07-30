const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
class DeletePlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        const options = this.options
        compiler.hooks.emit.tapAsync('DeletePlugin', (compilation, callback) => {
            for (const nameAndPath in compilation.assets) {
                if (!ModuleFilenameHelpers.matchObject({ include: options.include, exclude: options.exclude }, nameAndPath)) {
                    compilation.deleteAsset(nameAndPath)
                };
            }
            callback()
        })

    }
}

module.exports = DeletePlugin