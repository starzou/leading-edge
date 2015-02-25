/**
 * @class thorough
 * @description 深入学习 js
 * @time 2015-02-25 11:08
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var tilteElement = document.getElementById('tilte');
    var name = '深入学习 js';

    tilteElement.textContent = name;

    function f() {
        var name = 'f 函数 中的name';

        console.log('f this', this);

        function getName() {
            return name;
        }

        return getName;
    }

    var getName = f.call({name: 'f warp'});
    var myName = getName();

    console.log(myName);

})(window, document);