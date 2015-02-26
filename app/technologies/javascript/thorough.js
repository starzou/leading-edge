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

(function () {
    function $(selector, element, data) {
        var parents = data || [], midElement;
        if (selector === 'p') {
            midElement = element.parentElement;
            if (midElement) {
                parents.push(midElement);
                $('p', midElement, parents);
            }
        } else if (selector === 'c') {
            midElement = element.children;
            if (midElement) {
                for (var i = 0; i < midElement.length; i++) {
                    var ec = midElement[i];
                    parents.push(ec);
                    $('c', ec, parents);
                }
            }
        }

        return parents;
    }

    var buttonDiv = document.getElementById('buttonDiv');
    console.log($('c', buttonDiv));
})();