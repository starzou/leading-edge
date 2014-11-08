/*
 * https://github.com/starzou
 *
 * Copyright (c) 2014 StarZou
 * Licensed under the MIT license.
 */

/**
 *@class event
 *@description
 *@time 2014-11-08 17:29
 *@author StarZou
 **/
'use strict';

var buttons = document.querySelectorAll('button'),
    button1 = buttons[0],
    target = button1,
    myClick = function () {
        console.log('调用 %s 元素的 click事件监听器', this);
    };

buttons[1].addEventListener('click', function (event) {
    while (target) {
        console.log('为 %s 元素绑定click事件', target);

//        onclick 属性方式, 添加事件监听器
//        target.onclick = myClick; //事件冒泡


        // addEventListener 方式, 添加事件监听器
        target.addEventListener('click', myClick, true); // 事件捕获
//        target.addEventListener('click', myClick, false); //事件冒泡, 不设置, 默认

        target = target.parentNode;
    }
    event.stopPropagation();
});

console.log(buttons);