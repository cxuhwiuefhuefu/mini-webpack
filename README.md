<!--
 * @Author: Sunny
 * @Date: 2022-11-08 00:10:23
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-10 23:32:05
 * @Description: 
 * @FilePath: /mini-webpack/readme.md
-->
import 由 esm 模块化规范决定的





任务拆分的思想

(数据) --> 图（graph） --> Text（脚本）

- 基于文件的内容 构建生成图
- 基于图生成对应的脚本


构建一张图需要获取什么呢？
- 1. 文件内容
- 2. 依赖关系


为什么是图关系结构？
因为 mian.js 和 foo.js 会存在循环引用的结构



package.json 添加 "type": "module" 支持 esm 模块


如何获取依赖关系？
- 正则表达式
- AST  （通过 babel 进行处理）


用队列去遍历图
广度优先搜索



esm规范告诉我们 import 只能在顶层作用域里面

非js 模块化思想 -> Commonjs 模块化规范



生成当前的文件的方案
- 字符串拼接
- 模版生成器去生成 ejs


命名重复的问题
- 给每个模块每个唯一的ID，到时候基于ID 进行查找
- 映射关系


用到 ast
- 涉及到编译原理 
- JS 基础知识



babel 只认识 js 不认识 json 所以报错   需要 用到 json
引入 loader 把非 js 文件转化为 js 文件  再次执行