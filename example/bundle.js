/*
 * @Author: Sunny
 * @Date: 2022-11-08 15:15:47
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-10 14:59:42
 * @Description: 
 * @FilePath: /mini-webpack/example/bundle.js
 */
// 包含多个文件的内容 


(function(modules) {
    function require(id) {
        
    
        const [fn, mapping] = modules[id]
        const module = {
            export: {}
        }

        function localRequire(filePath) {
            const id = mapping[filePath];
            return require(id)
        }
        console.log(fn)
        fn(localRequire, module, module.exports)
    
        return module.exports;
    
    }
    require(1)
    
    
     
})({
    1: [function (require, module, exports) {
        // import { foo } from "./foo";
        const {foo} = require('./foo.js')
    
        foo();
        console.log('mian.js')
    }, {"./foo.js": 2}],
    2:  [function(require, module, exports) {
        // export function foo() {
        //     console.log('foo')
        // } 
        function foo() {
            console.log('foo')
        }
        module.exports = {
            foo
        } 
    }, {}]
})