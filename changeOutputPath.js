/*
 * @Author: Sunny
 * @Date: 2022-11-14 01:11:11
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-14 22:02:29
 * @Description: 
 * @FilePath: /mini-webpack/changeOutputPath.js
 */

export class ChangeOutputPath {
    apply (hooks) { // 传入 hooks  去做事件的注册  
        hooks.emitFile.tap("changeOutputPath", (context) => {
            console.log("-------------changeOutputPath");

            context.changeOutputPath("./dist/Sunny.js")
        })
    }
}