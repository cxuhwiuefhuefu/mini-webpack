/*
 * @Author: Sunny
 * @Date: 2022-11-14 23:23:14
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-15 09:56:04
 * @Description: 
 * @FilePath: /mini-webpack/tapableDemo.js
 */

import {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } from "tapable";

//  // 初始化同步钩子
// const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// // 注册事件
// hook.tap('flag1', (arg1,arg2,arg3) => {
//     console.log('flag1:',arg1,arg2,arg3)
// })

// hook.tap('flag2', (arg1,arg2,arg3) => {
//     console.log('flag2:',arg1,arg2,arg3)
// })

// // 调用事件并传递执行参数
// hook.call('19Qingfeng','wang','haoyu')



// const { SyncBailHook } = require('tapable');

// const hook = new SyncBailHook(['arg1', 'arg2', 'arg3']);

// // 注册事件
// hook.tap('flag1', (arg1, arg2, arg3) => {
//   console.log('flag1:', arg1, arg2, arg3);
//   // 存在返回值 阻断flag2事件的调用
//   return true
// });

// hook.tap('flag2', (arg1, arg2, arg3) => {
//   console.log('flag2:', arg1, arg2, arg3);
// });

// // 调用事件并传递执行参数
// hook.call('19Qingfeng', 'wang', 'haoyu');







// 初始化同步钩子
const hook = new SyncWaterfallHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1:', arg1, arg2, arg3);
  // 存在返回值 修改flag2函数的实参
  return 'github';
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
});

hook.tap('flag3', (arg1, arg2, arg3) => {
  console.log('flag3:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('19Qingfeng', 'wang', 'haoyu');
