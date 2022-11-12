/*
 * @Author: Sunny
 * @Date: 2022-11-11 17:09:58
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-12 17:40:28
 * @Description: fun
 * @FilePath: /mini-webpack/jsonLoader.js
 */


export function jsonLoader(source) {
    console.log('jsonLoader----------> ', source);

    this.addDeps("jsonLoader");

    return `export default ${JSON.stringify(source)}`;
}