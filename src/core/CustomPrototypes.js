import React, {
    Component,
    PropTypes,
} from 'react';



/**
 * 深度对象合并
 */
Object.defineProperty(Object.prototype, 'deepAssign', {
    value: function (target, source) {
        let fn = function (target, source) {
            for (let key in source) {
                if (target[key] && source[key] && typeof source[key] === 'object') {
                    source[key] = fn(target[key], source[key]);
                }
            }
            return Object.assign(target, source);
        }
        return fn(target, source);
    },
    enumerable: false
});

/**
 * 对象转url参数
 */
Object.defineProperty(Object.prototype, 'parseParam', {
    value: function (param, key, encode) {
        if (param == null)
            return '';
        let fn = function (param, key, encode) {
            var paramStr = '';
            var t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean') {
                paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
            } else {
                for (var i in param) {
                    var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    paramStr += fn(param[i], k, encode);
                }
            }
            return paramStr;
        }
        return fn(param, key, encode);
    },
    enumerable: false
});

/**
 * 网络请求
 */
Object.defineProperty(Component.prototype, 'request', {
    value: function (url, options) {
        options = options || {};
        let defaultOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 5000,
        };
        Object.deepAssign(options, defaultOptions);
        if (options.body instanceof FormData) {
            options.headers['Accept'] = 'application/FromData';
            options.headers['Content-Type'] = 'multipart/form-data';
        } else {
            if (typeof options.body === 'object') {
                options.body = JSON.stringify(options.body);
            }
        }

        let p = Promise.race([
            fetch(url, options),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('request timeout')), options.timeout)
            })
        ]);
        return p.then(response => response.json()).then(response => response).
            catch(error => {
                window.toast.show('请求超时，请稍后再试');
                console.log('request error', error);
                window.loading.show(false);
                return null;
            });
    },
    enumerable: false
});