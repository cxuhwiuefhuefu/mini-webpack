
// 书写我们实际的逻辑


import fs from "fs"
import path from 'path' // 通过 path 模块可以很方便的去处理下路径
import parser from '@babel/parser' // dom -> ast
import traverse from '@babel/traverse' // 遍历 ast
import ejs from 'ejs'
import { transformFromAst } from "@babel/core" // 转换代码   从 esm 转化为 非JS
import { jsonLoader } from './jsonLoader.js'
let id = 0;

// webpack 配置
const webpackConfig = {
    module: {
        rules: [
            {
                test: /\.json/,
                // use: jsonLoader
                use: [jsonLoader]
            }
        ]
    }
}

// console.log(traverse)
function createAsset(filePath) {
    // 1. 获取文件内容

    // const source = fs.readFileSync('./example/main.js', {
    let source = fs.readFileSync(filePath, {
    // const source = fs.readFileSync('/Users/cmh/Desktop/selfProject/mini-webpack/example/foo.js', {
        encoding: "utf-8"
    })

    
    // initLoader   json -> js
    const loaders = webpackConfig.module.rules;
    // 给 loader 添加依赖的这个函数
    const loaderContext = {
        addDeps (dep) {
            console.log('addDeps', dep)
        }
    }

    loaders.forEach(({test, use}) => {
        // console.log("test.test(filePath)", test.test(filePath))
        if(test.test(filePath)) {
            // source =  use(source);
            if(Array.isArray(use)) {
                use.forEach((fn) => {
                    // source = fn(source)
                    source = fn.call(loaderContext, source)
                    console.log('转化为后的 json内容 ----> ', source)
                })
            }
        }
    })



    // 2. 获取依赖关系
    // ast --> 抽象语法树
    const ast = parser.parse(source, {
        sourceType: "module"
    });


    const deps = []; // esm 代码转化为 非 js代码
    traverse.default(ast, {
        ImportDeclaration({node}) {
            deps.push(node.source.value);
        }
    })


    let {code} = transformFromAst(ast, null, {
        presets: ["env"]
    }) 

   
    return {
        filePath,
        code,
        deps,
        mapping: {}, 
        id: id++
    }
}


function createGraph () {
    const mainAsset = createAsset("./example/main.js");
    const queue = [mainAsset];
    for(const asset of queue) {
        asset.deps.forEach((relativePath) => {
            const child = createAsset(path.resolve('./example', relativePath))
            asset.mapping[relativePath] = child.id;
            queue.push(child)
        });
    }

    return queue
}
const graph = createGraph()
// console.log("graph", graph)


function build(graph) {
    const template = fs.readFileSync("./bundle.ejs", {
        encoding: "utf-8"
    })
    const data = graph.map((asset) => {
        // console.log('asset', asset)
        const {id, code, mapping} = asset;
        return {
            id,
            code,
            mapping
        }
    })

    const code = ejs.render(template, { data })
    fs.writeFileSync('./dist/bundle.js', code)
}
build(graph)