
// 包含多个文件的内容 


(function(modules) {
    function require(id) {
        
    
        const [fn, mapping] = modules[id]
        const module = {
            exports: {}
        }
        console.log(fn)

        function localRequire(filePath) {
            const id = mapping[filePath];
            return require(id);
        }
        fn(localRequire, module, module.exports)
    
        return module.exports;
    
    }
    require(0)
})({
    
        "0": [function (require, module, exports) {
            "use strict";

var _foo = require("./foo");
/*
 * @Author: Sunny
 * @Date: 2022-11-08 00:09:14
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-11 10:43:24
 * @Description: 
 * @FilePath: /mini-webpack/example/main.js
 */

// import user from '/user.json'

// console.log(user)
(0, _foo.foo)();
console.log('mian.js'); 
        }, {"./foo":1}],  
    
        "1": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
function foo() {
  console.log('foo');
} 
        }, {}],  
    
})