# 异步请求 -- 总结

关于异步请求，几种方式？

两种，angular告诉你了：

![](http://i2.muimg.com/567571/cb6259b08374be6b.png)

前者不支持跨域；后者支持。

## 传统同源异步请求XMLHttpRequest

![](http://i1.piimg.com/567571/0fbbe253780e12c0.png)

## 跨域方式 -- jsonp

![](http://i1.piimg.com/567571/7b3e7cfe24182786.png)

## 那么，支持跨域请求的方式有？

为什么最终选择script

- img
    
    `<img src="" alt="">`

    这个之前用于 统计链接；
    
    支持跨域，但是，将其作为图片**，无法实现获取服务器返回的数据**。
    
    **被淘汰**

- iframe -- 在页面内占个位
    
    `<iframe src="" frameborder="0"> </iframe>`    

    可以接收服务端数据，但是**太复杂**，**淘汰**

- link
    
    `<link rel="stylesheet" href="https://www.baidu.com">`    

    会在**CSS处理阶段报错**，无法使用，**淘汰**

- a

    但是，点击才会去请求，这个**更不用考虑**。

### script
    
`<script src=""> <script>`

上面返回如下：`callback({id:1, name: '张三', age: 18})

然后，返回的数据 -- 函数，会调用本地函数：

```
<script>
    function callback (data) {
        console.log(data);
    }
    
</script>
```

缺点：需要**全局环境**，如果有多个跨域请求如何解？

**angular解决方案**：只污染一个window.angular，所有的的回调函数挂靠其上。

![](http://on9plnnvl.bkt.clouddn.com/17-4-1/3255189-file_1491053633941_15ac8.png)

- 定义一个全局对象: 
    
    `window.angular = {};`
    
- 全局对象定义一个对象: 

    `angular.callbacks = {};`
    
- 给上面这个对象进行挂靠：

    `angular.callbacks._0 = function() {...};`

但是，有些网站不支持angular的玩儿法！！！！

比如豆瓣API：

这样是支持的：

![](http://on9plnnvl.bkt.clouddn.com/17-4-1/84632984-file_1491054910219_8dd5.png)

注意：

![](http://on9plnnvl.bkt.clouddn.com/17-4-1/6082079-file_1491053421942_bbbf.png)

为什么有个`;` -- 防止上面情况

但是，这样就不可以了：

![](http://on9plnnvl.bkt.clouddn.com/17-4-1/19464237-file_1491053758004_4011.png)

~~同时可以看出，angular在用jsonp做跨域请求的时候，必须给地址加上一个`?callback=JSON_CALLBACK`~~

**jQuery解决方案**：既然污染到全局环境，那名字起得古怪一点

```
function jquery_jsonp123234234234 (arguments) {...};
```
    
## 手写jsonp -- 跨域请求


jsonp.html

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<div id="box"></div>
	</body>
	<script src="http.js"></script>
	<script type="text/javascript">
		var url = 'https://api.douban.com//v2/movie/in_theaters';
		var data = {
			count: 3,
			start: 0,
		};
		function cb (data) {
			console.log(data);
		}
		$jsonp(url, data, cb);
	</script>
</html>
```

http.js

全是注释，其实有用的就几行代码


```
//自己手写跨域组件

//0. 将data转换成URL字符串的形式:{id: 1, name: "zhang3"} --> url+?id=1&name=zhang3
// 1. 处理URL，添加参数（回调函数），让豆瓣知道是跨域请求: url += callback
// 2. 创建script标签
// 3. 挂载回调函数
// 4. 将script标签放到页面中

(function(window, document) {
	
//	函数内部,私有函数
	var jsonp = function(url, data, callback) {
//		挂载回调函数
		var jsonpCb = 'luckyJsonpCb' + Math.random().toString().replace('.', '').substr(1, 6);
//		window对象设置一个全局函数，是污染了全局环境，但是这里仿照jQuery，函数名很变态 
		window[jsonpCb] = callback;
//		当script元素被加到document.body中以后,跨域请求,返回一个jsonpCb的函数调用
//		然后window对象中的jsonCb被执行
		
		
//		将data转换成URL字符串的形式:{id: 1, name: "zhang3"} --> url+?id=1&name=zhang3
//		传入的URL参数可能是带有?
		var search = url.indexOf('?') === -1 ? "?" : '';
		for (var key in data) {
			search += key + '=' + data[key] + '&';
//					  id     =        1
		}
//		search = ''?id=1&name=zhang3&'

//		添加参数（回调函数）
//		var jsonpCb = 'luckyJsonpCb' + Math.random().toString().replace('.', '').substr(1, 6);
		search += 'callback=' + jsonpCb;
		
//		创建script标签
		var scriptEle = document.createElement('script');
		scriptEle.src = url + search;
//		当前context中有了定义了回调函数才可以加载script到document.body中
//		将script标签放到页面中
		document.body.appendChild(scriptEle);
	}
	
//	怎么让这个匿名函数里面这个jsonp函数被外界拿到呢?
    window.$jsonp = jsonp;
})(window, document);

```

返回结果 -- 对象：

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/65408712-file_1491099664141_1e4b.png)

跨域请求成功。

### 注意，当data不需要传参时，能否只传两个参数给jsonp函数？

可以，如何实现：

```
var jsonp = function(url, data, callback) {
    if (typeof data == "function") {
        callback = data;
    }
   // 处理下相应代码即可
}
```

完。