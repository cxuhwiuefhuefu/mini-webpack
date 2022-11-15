
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

var _foo = require("./foo.js");
var _user = require("./user.json");
var _user2 = _interopRequireDefault(_user);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log("user", _user2.default);
(0, _foo.foo)();
console.log('mian.js'); 
        }, {"./foo.js":1,"./user.json":2}],  
    
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
    
        "2": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\n    \"name\": \"sunny\",\n    \"age\": 18\n}"; 
        }, {}],  
    
})