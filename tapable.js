/*
 * @Author: Sunny
 * @Date: 2022-11-13 18:08:39
 * @LastEditors: Suuny
 * @LastEditTime: 2022-11-14 01:08:13
 * @Description:
 * @FilePath: /mini-webpack/tapable.js
 */

import { SyncHook, AsyncParallelHook } from 'tapable'

class List {
    getRoutes () {}
}

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]), // 同步
            brake: new SyncHook(), // 同步
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"]) // 异步
        };
    }

    setSpeed(newSpeed) {
        // following call returns undefined even when you returned values
        this.hooks.accelerate.call(newSpeed); // 触发事件  同步
    }

    useNavigationSystemPromise(source, target) { // 异步
        const routesList = new List();
        return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
            // res is undefined for AsyncParallelHook
            console.log("useNavigationSystemPromise") // 回调
            return routesList.getRoutes();
        });
    }

    useNavigationSystemAsync(source, target, callback) { // 异步
        const routesList = new List();
        this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
            if(err) return callback(err);
            callback(null, routesList.getRoutes());
        });
    }

}


// 1. 注册
const car = new Car();
car.hooks.accelerate.tap("test 1", (speed) => { // 注册来了对应的事件  同步
    console.log("accelerate", speed)
})
car.hooks.calculateRoutes.tapPromise("test 2 promise", (source, target) => { // 异步
    // console.log("-------------- tapPromise", source, target)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("-------------- tapPromise", source, target)
            resolve()
        }, 0);
    })
})

car.hooks.calculateRoutes.tapPromise("test 2 promise", (source, target) => { // 异步
    // console.log("-------------- tapPromise", source, target)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("-------------- tapPromise", source, target)
            resolve()
        }, 0);
    })
})

// 2. 触发
car.setSpeed(10) // 同步的事件触发方式



car.useNavigationSystemPromise(["1", "2", "3"], 1) // 执行完成所有的事件后才去执行这个
