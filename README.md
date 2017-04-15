# 豆瓣电影单页应用（SPA）

展示地址：http://luckybai.top/project/movie/

## 练手AngularJS小项目

对路由加深下理解：

规则 对应 不同的视图

ng-view -- 占位符

当匹配上规则时，view放上去

![](http://i2.muimg.com/567571/af90d77bd67fa232.png)

![](http://i1.piimg.com/567571/b95c29b19e2cdf78.png)

此外，提醒一下：

因为常用命令中参数不容易记，可以将每个命令制作成snippet，这样tab出命令时候，自动补全所有的参数。

## step-01 构建项目结构

- 克隆项目骨架

这个项目可以作为angular开发的一个骨架，不用自己手动配置；尤其以后项目中，一般都会有，直接clone后就有了环境。

```bash
$ git clone --depth=1 https://github.com/Micua/angular-boilerplate.git moviecat
$ cd moviecat
```

看一下package.json和bower.json包，学习下它们的机构。


`$ cnpm run start`

- 安装项目依赖

```bash
$ bower install bootstrap --save
```

```
.editorconfig -- 统一不同开发者的不同开发工具的不同开发配置
在Sublime中使用需要安装一个EditorConfig的插件
```

- 为NG做一个项目骨架的目的是为了快速开始一个新的项目
- angular-seed

npm 在 package.json中的script节点中可以定义脚本任务，



## 初始化，当你不懂的时候，坑太多了。。。

终于跑通了...

![](http://i4.buimg.com/567571/35e8e9b469b97145.png)


### 几个坑

1. 当拿到上面的框架时候，看一下框架

    ![](http://i1.piimg.com/567571/9b3118e5bfd41818.png)

2. 用人家的HTML+CSS，引包

3. ng-app ng-view

4. 写主模块

    ```
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('movieCat', [
    'ngRoute',
    'movieCat.in_theaters',
    'movieCat.coming_soon',
    'movieCat.top250'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise(
      		{
      			redirectTo: '/in_theaters'
      		}
      	);
    }]);

    ```
5. 写子模块

    ```
    (function(angular) {
    	'use strict';
    	// 创建正在热映模块
    	var module = angular.module('movieCat.in_theaters', ['ngRoute']);
    	// 配置模块的路由
    	module.config(['$routeProvider', function($routeProvider) {
    		$routeProvider.when('/in_theaters', {
    			templateUrl: 'in_theaters/view.html',
    			controller: 'InTheatersController'
    		});
    	}]);
    //	控制器
    	module.controller('InTheatersController', 
    	['$scope', function($scope) {
    		
    	}])
    })(angular);
    ```


## 写子模块控制器

控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！

就是列表,对吗: 图片,名称,导演,类型

数据从哪儿来？

## API

Application Programxxx Interface

应用程序编程接口

有哪些常见的API

WebAPI 通过WEB方式提供结构叫做 WEBAPI

Math.random() -- api?

所有有输入有输出的事物都可以是API

都是函数

测试WebAPI的工具： POSTMAN

## step-02 抽象数据成员，以假数据的方式设计控制器和视图

### 正在热映模块 -- 控制器暴露数据$scope

豆瓣API地址：https://developers.douban.com/wiki/?title=guide

https://developers.douban.com/wiki/?title=api_v2

在Chrome插件打开POSTMAN：

chrome://apps/

输入：

https://api.douban.com//v2/movie/in_theaters?count=3

获得假数据

```
var data = {获取的数据}


module.controller('InTheatersController', 
	['$scope', function($scope) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型

		$scope.data = data.subjects;
	}])
```

### view绑定数据

```
<div class="page-header">
  <h1>热映电影<small>北京站</small></h1>
</div>

<ul class="list-group">
  <li ng-repeat="item in data" class="list-group-item">
    <span class="badge">{{item.rating.average}}</span>
    <div class="media">
  		<div class="media-left">
	    <a href="#">
	      <img class="media-object" src="{{item.images.small}}" alt="...">
	    </a>
	  	</div>
		  <div class="media-body">
		    <h3 class="media-heading">{{item.title}}</h4>
		    <p>
		    	<span>类型：{{item.genres.join('、')}}</span>
		    	&nbsp;&nbsp;&nbsp;&nbsp;
		    	<span>上映年份：{{item.year}}</span>
		    </p>
		    <p>
		    	导演：
		    	<span ng-repeat="director in item.directors">
		    		{{director.name}}
		    		<i ng-if="!$last">、</i>
		    	</span>
		    	
		    </p>
		    <p>
		    	主演：
		    	<span ng-repeat="cast in item.casts">
		    		{{cast.name}}
		    		<i ng-if="!$last">、</i>
		    	</span>
		    </p>
		  </div>
		</div>
  </li>
</ul>
```

## step-03 图片链接数据绑定BUG -- src vs ng-src

这里会报一个错：

![](http://i2.muimg.com/567571/8e6acfe18f827d44.png)

其实就是在src加载图片时候，浏览器并不认识{{}}...

`<img class="media-object" ng-src="{{item.images.small}}" alt="...">`

## step-04 加入$http服务对象完成AJAX异步请求数据

关于异步请求，几种方式？

两种，angular告诉你了：

![](http://i2.muimg.com/567571/cb6259b08374be6b.png)

前者不支持跨域；后者支持。

- 传统方式

![](http://i1.piimg.com/567571/0fbbe253780e12c0.png)

- 跨域方式 -- jsonp

![](http://i1.piimg.com/567571/7b3e7cfe24182786.png)

### 那么，支持跨域请求的方式有？

为什么最终选择script

- script

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

    但是，点击才会去请求，这个更不用考虑。

> 这里再给自己提个醒，一定要去看官方文档！！！！

### 同源异步请求

实现效果：

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/63957405-file_1491096219925_133a.png)

本地文件夹下面，建立存放postman获取到的数据文件：data.json文件

![](http://i1.piimg.com/567571/dbfc7a4bad1923e5.png)

```
module.controller('InTheatersController', 
	['$scope', "$http", function($scope, $http) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型

//		需要先暴露一下,因为$http异步请求,如果不先声明，view端可能不认识
		$scope.data = [];
		$scope.errorMsg = '';
		
		$http({
		  method: 'GET',
		  // 写项目的绝对路径
		  url: '/moviecat/app/data.json'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(response);
		    if (response.status == 200) {
		    	$scope.data = response.data.subjects;
		    }
//		    else {
//		    	$scope.errorMsg = '发生错误' + response.status;
//		    }
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    $scope.errorMsg = '发生错误' + response.status;
		  });
		}])
```

>  写项目的绝对路径 url: '/moviecat/app/data.json'

### 跨域异步请求 -- 封装好的jsonp方式

angular中将所有的jsonp的callback都挂在angular.callbacks对象上

- 当然，如果这样的请求方式，肯定是不允许跨域请求的：

    ![](http://on9plnnvl.bkt.clouddn.com/17-4-1/64698873-file_1491054208875_ce61.png)

    ```
    $http({
      method: 'GET',
      url: 'https://api.douban.com//v2/movie/in_theaters?'
    }).then()
    ```
- 肯定，也知道了，这样也是不行的

    ![](http://on9plnnvl.bkt.clouddn.com/17-4-1/91537943-file_1491054436882_e5be.png)

    ```
    $http({
      method: 'JSONP',
      url: 'https://api.douban.com//v2/movie/in_theaters?callback=hello'
    }).then()
    ```
- 这样，还是不可以的

    ![](http://on9plnnvl.bkt.clouddn.com/17-4-1/19060847-file_1491054566016_8688.png)

    ```
    $http({
      method: 'JSONP',
      url: 'https://api.douban.com//v2/movie/in_theaters?callback=JSON_CALLBACK'
    }).then
    ```
    结论：上面的都不行。

### angular和豆瓣妥协？ -- 还是自己写吧

> 单纯先手写jsonp一遍，详细可以看这里：问题总结文件夹

http.js

```
// angular提供的异步请求对象不支持自定义回调函数名
// angular随机分配的回调函数名称不被豆瓣支持
// 自己写一个跨域请求的模块

(function(angular) {
//	创建模块
	var http = angular.module('movieCat.services.http', []);
//	模块 设置服务
	http.service("httpService", [
		'$document',
		"$window",
		function ($document, $window) {
//			console.log($document);
//			console.log($window);
			this.jsonp = function(url, data, callback) {
				var jsonpCb = 'luckyJsonpCb' + Math.random().toString().replace('.', '').substr(1, 6);
				$window[jsonpCb] = callback;
				var search = url.indexOf('?') === -1 ? "?" : '';
				for (var key in data) {
					search += key + '=' + data[key] + '&';
				}
				search += 'callback=' + jsonpCb;
				var scriptEle = $document[0].createElement('script');
				scriptEle.src = url + search;
				$document[0].body.appendChild(scriptEle);
			}
		}
	]);
})(angular);
```

控制器：

```
module.controller('InTheatersController', 
	['$scope', "httpService", function($scope, httpService) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型

//		需要先暴露一下,因为$http异步请求,如果不先声明，view端可能不认识
		$scope.subjects = [];
		$scope.errorMsg = '';
		
		var url = 'https://api.douban.com//v2/movie/in_theaters';
		var data = {
//			count: 3,
//			start: 0,
		};
		
		httpService.jsonp(url, data, function(obj) {
//			console.log(data);
			$scope.data = obj.subjects;
			$scope.$apply();
		});
	}]);
```

注意需要apply:

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/34060289-file_1491102009418_3cfd.png)

可以了：

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/28614755-file_1491102806435_1694f.png)


## step-05 加载提示，Loading状态设计

http://tobiasahlin.com/spinkit/

直接把HTML、CSS拿过来了，其实知道如何设计了，自己用C3实现不难。

## step-06 实现分页功能

### 豆瓣电影API支持

`start=0&count=2`

`start=2&count=2`

### window.loacation.hash之后需要更改

为了让分页之后，打开一个链接显示不同的内容，需要一个页码page：

`http://127.0.0.1:8020/moviecat/app/index.html#/in_theaters/1`

综上，start = (page-1) * 2

### 如何实现

1. 在路由设置里面加上分页参数

    $routeProvider.when('/in_theaters/:page', {

2. 在控制器中获取到分页参数

    ```
    module.controller('InTheatersController', [
    '$scope', 
    '$routeParams'
    "httpService", 
    function($scope, $routeParams, httpService) {
    ```
3. 所有3个module都一样，只是将module和controller名字改一下，所有，之后就可以抽象。

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/23886122-file_1491118750070_161dc.png)

```
(function(angular) {
	'use strict';
//	假数据
//	var data = {};
	
	// 创建正在热映模块
	var module = angular.module('movieCat.in_theaters', [
	'ngRoute',
	'movieCat.services.http'
	]);
	// 配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/in_theaters/:page', {
//			view
			templateUrl: 'in_theaters/view.html',
//			controller
			controller: 'InTheatersController'
		});
	}]);
//	控制器
	module.controller('InTheatersController', [
	'$scope', 
	'$route',
	'$routeParams',
	"httpService", 
	function($scope, $route, $routeParams, httpService) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型
		var count = 4;
		var page = parseInt($routeParams.page);
		var start = (page - 1) * count;
//		console.log(page)
//		需要先暴露一下,因为$http异步请求,如果不先声明，view端可能不认识
		$scope.loading = true;
		$scope.data = [];
		$scope.title = '';
		$scope.total = 0;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		
		var url = 'https://api.douban.com/v2/movie/in_theaters';
		var data = {
			count: count,
			start: start
		};
		
		httpService.jsonp(url, data, function(obj) {
//			console.log(obj);
			$scope.data = obj.subjects;
			$scope.title = obj.title;
			$scope.total = obj.total;
			$scope.loading = false;
			$scope.totalPages = Math.ceil($scope.total / count);
//			重新apply一下数据
			$scope.$apply();
		});
		
//		暴露行为
		$scope.goPage = function(page) {
			if (page < 1 || page > $scope.totalPages) {
				return ;
			}
			$route.updateParams({page: page});
		}
	}]);
})(angular);


/*
	$http({
		  method: 'GET',
		  url: '/moviecat/app/data.json'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log(response);
		    if (response.status == 200) {
		    	$scope.subjects = response.data.subjects;
		    }
//		    else {
//		    	$scope.errorMsg = '发生错误' + response.status;
//		    }
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log(response);
		    $scope.errorMsg = '发生错误' + response.status;
		  });
 */
```


## step-07 抽象公共的列表页

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/93727773-file_1491119096747_182ae.png)

提取公共列表，单独建一个文件夹，存放controller.js和view.html；

修改controller.js中的模块名字+controller名字+URL地址为动态（路由:category）+index.html引入js文件+主app.js引入模块


## step-08 左侧class="active"单击自动焦点问题

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/87908489-file_1491131420983_7559.png)

### 解决方案1 -- 使用公共controller暴露给view数据type

因为index.html中并没有使用controller，可以为公共区域（除显示电影部分）设置一个公共controller

在公共controller里面给view暴露一个type（显示当前location里面是哪个模块）`$scope.type = 'in_theaters';`

由于location随单击变化，所以要时刻watch`$scope.type `值得变化: `$scope.$watch('$location.$$path', function(now) {`

以下：

```
.controller('NavController', [
	'$scope',
	'$location',
	function($scope, $location) {
		console.log($location.$$path)
//		console.log($location.path())
//		/top250/1
		$scope.$location = $location;
//		这里watch的是scope下面的对象$location.$$path -- $scope.$location.$$path
		$scope.$watch('$location.$$path', function(now) {
			if (now.startsWith('/in_theaters')) {
				$scope.type = 'in_theaters';
			}
			else if (now.startsWith('/coming_soon')) {
				$scope.type = 'coming_soon';
			}
			else {
				$scope.type = 'top250';
			}
			console.log(now);
		})
	}
])
```

之后在view端设置controller区域和ng-class;

```
<ul ng-controller="NavController" class="nav nav-sidebar">
  <li ng-class="{active: type==='in_theaters'}">
    <a href="#/in_theaters/1">正在热映</a>
  </li>
  <li ng-class="{active: type==='coming_soon'}">
    <a href="#/coming_soon/1">即将上映</a>
  </li>
  <li ng-class="{active: type==='top250'}">
    <a href="#/top250/1">TOP250</a>
  </li>
</ul>
```

### 解决方案2 -- 使用指令方式实现 auto-focus

小模块中**指令directive名字驼峰命名**，但是**在view端使用时候需要用-连接**。

另外，所有的DOM操作，都放在指令的link中

创建一个文件：auto_focus.js

```
(function(angular) {
	angular.module('movieCat.directives.auto_focus', [])
	.directive('autoFocus', [
	'$location',
	function($location) {
		var path = $location.path();
		return {
			restrict : 'A',
//			与添加auto-focus的DOM对象建立link的时候
			link : function($scope, element, attrs) {
				
				var currentAHref = element.children().attr('href')
				console.log(currentAHref) // #/in_theaters/1
				var type = currentAHref.replace(/#(.+?)\/\d+/, '$1')
				console.log(type)
//				根据当前URL设置class
				if (path.startsWith(type)) {
					element.addClass('active')
				}
				
	            element.on('click', function() {
//	            	console.log(this)
					angular.element(this).parent().children().removeClass('active');
	            	angular.element(this).addClass('active');
	            	
	            })
	        }
		}
    }
	]
)
})(angular);


```

在app.js主模块中引用`movieCat.directives.auto_focus`这个模块即可；

```
angular.module('movieCat', [
  'ngRoute',
  'movieCat.movie_list',
  'movieCat.directives.auto_focus'
])
```

在index.html中设置auto-focus~~autoFocus~~这个属性即可:

```
<li auto-focus>
<a href="#/in_theaters/1">正在热映</a>
</li>
```

### 指令解决方式有个初始化问题

当输入`http://127.0.0.1:8020/moviecat/app/index.html`时，

自动跳转至`http://127.0.0.1:8020/moviecat/app/index.html#/in_theaters/1`

但是刚开始的时候，没有点击任何左侧的选项或者URL只是index.html时，所以并不能给`正在热映`加上`class='active'`

因为：路由跳转是在公共模块之后，所以刚开始，输入`index.html`，URL并没有路由到`index.html#/in_theaters/1`

解决就是见识`location.hash` -- `$location.path()` -- `$location.$$path`:


```
(function(angular) {
	angular.module('movieCat.directives.auto_focus', [])
	.directive('autoFocus', [
	'$location',
	function($location) {
//		var path = $location.path();
		return {
			restrict : 'A',
//			与添加auto-focus的DOM对象建立link的时候
			link : function($scope, element, attrs) {
				
//				$watch只能watch$scope的元素
				$scope.$location = $location;
//				实时监测url的path -- (location.hash)
				$scope.$watch('$location.path()', function(now) {
					var currentAHref = element.children().attr('href')
//					console.log(currentAHref) // #/in_theaters/1
					var type = currentAHref.replace(/#(.+?)\/\d+/, '$1')
//					console.log(type)
					if (now.startsWith(type)) {
						element.parent().children().removeClass('active');
						element.addClass('active');
					}
				})
//				下面就不需要了，因为单击时候会出发URL改变
//	            element.on('click', function() {
////	            	console.log(this)
//					angular.element(this).parent().children().removeClass('active');
//	            	angular.element(this).addClass('active');
//	            	
//	            })
//	        }
			}
    	}
		}
	]
)
})(angular);

```

### 继续解决 -- 下面加了搜索以后

![](http://on9plnnvl.bkt.clouddn.com/17-4-3/82213259-file_1491198227672_78e4.png)

当进行电影搜索的时候，左侧背景色应该是没有的，比较简单：

`$scope.$location = $location;`已经写死，

当$watch auto-focus的li时，用之前$location.path()和当前now值比较即可，相同就加active；不同，删除active

```
if (now.startsWith(type)) {
//element.parent().children().removeClass('active');
	element.addClass('active');
}
else {
	element.removeClass('active');
}
```

## step-09 load.js/sea.js等等异步加载js库和jsonp手写问题

### load.js异步加载

```
functino $script (loads, callback) {
    var scriptEle = document.createElement('script');
    scriptEle.src = loads;
    document.head.appendChild[scriptEle];
    
    // 脚本加载完成之后才能执行callback
    scriptElement.addEventListener('load', callback);
}
```

### jsonp手写问题

![](http://on9plnnvl.bkt.clouddn.com/17-4-2/45754422-file_1491137438392_e20a.png)

每次下一页，都会加载一个script，会产生很多很多

所以，需要remove操作 -- 什么时候？

只要callback执行完毕之后，也就是取回数据并执行完成后callback(data)，就可以删除这个script了 -- 动态效果很棒

```
this.jsonp = function(url, data, callback) {
	var jsonpCb = 'luckyJsonpCb' + Math.random().toString().replace('.', '').substr(1, 6);
//	$window[jsonpCb] = callback;
	
	var search = url.indexOf('?') === -1 ? "?" : '';
	for (var key in data) {
		search += key + '=' + data[key] + '&';
	}
	search += 'callback=' + jsonpCb;
	
	var scriptEle = $document[0].createElement('script');
	scriptEle.src = url + search;
//	回调函数必须在append之前
	$window[jsonpCb] = function(data) {
		callback(data);
		$document[0].body.removeChild(scriptEle);
	};
	$document[0].body.appendChild(scriptEle);

};
```



## step-10 搜索功能模块

搜索模块

![](http://on9plnnvl.bkt.clouddn.com/17-4-3/34958282-file_1491185097435_11e78.png)

$routeParams数据来源：

1. 路由匹配 :category -- $routeParams.category
2. ?参数 -- #/***/1?q='周润发' -- $routeParams.q

### 可以单独设置一个controller，然后绑定数据、暴露行为；

因为是在公共区域，所以直接在app.js模块加上controller即可

```
.controller('SearchController', [
	'$scope',
	'$route', // 更新URL参数
	function($scope, $route) {
		$scope.search_name = ''; // 取文本框中数据
		$scope.search = function() {
			console.log($scope.search_name)
			$route.updateParams({category: 'search', page: 1, q: $scope.search_name})
		}
	}
])
```

```
 <form ng-controller='SearchController' ng-submit="search()">
  <div class="input-group">
    <input ng-model="search_name" type="search" class="form-control" placeholder="so">
    <div class="input-group-btn">
      <button ng-click="search()" class="btn btn-default" type="submit">Go!</button>
    </div>
  </div>
  <!-- /input-group -->
</form>
```

### 也可以设置使用指令

![](http://on9plnnvl.bkt.clouddn.com/17-4-3/40365610-file_1491187871075_acaf.png)

指令就是，当指令写在哪里，自动生成DOM，复用比较好。

```
<div search></div>
```

```
(function(angular) {
	angular.module('movieCat.directives.search', [])
	.directive('search', [
	'$route',
	function($route) {
		return {
			scope: {},
			restrict: 'A',
			template: '<form ng-submit="search()">'+
					  '<div class="input-group">'+
					    '<input ng-model="search_name" type="search" class="form-control" placeholder="so">'+
					    '<div class="input-group-btn">'+
					      '<button ng-click="search()" class="btn btn-default" type="submit">Go!</button>'+
					    '</div>'+
					  '</div>'+
					'</form>',
			replace: true,
			link: function($scope, element, attr) {
				$scope.search_name = '';
				
				// 当当前不再是搜索时,搜索框应该清空
				$scope.$location = $location;
				$scope.$watch('$location.path()', function(now) {
                // console.log($routeParams);
					if (!now.startsWith("/search")) {
						$scope.search_name = '';
					}
				})
				
				// 搜索时，判空情况
				$scope.search = function() {
                	if ($scope.search_name){
                		$route.updateParams({category: 'search', page: 1, q: $scope.search_name})
                	}
                }
			}
		}
	}])
})(angular);
```

## step-11 详细页模块设计展示

![](http://on9plnnvl.bkt.clouddn.com/17-4-3/83821776-file_1491193951577_3f6f.png)

豆瓣某部电影的API：

https://api.douban.com/v2/movie/subject/26739886

创建一个新模块movie_detail，模块进行路由config -- $routeProvider

在该模块中，有控制器MovieDetailController和视图view.html，然后进行报录数据、行为；数据绑定。

movie_detail.js

```
(function(angular) {
	'use strict';
//	假数据
//	var data = {};
	
	// 创建正在热映模块
	var module = angular.module('movieCat.movie_detail', [
	'ngRoute',
	'movieCat.services.http'
	]);
	// 配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/subject/:id', {
//			view
			templateUrl: 'movie_detail/view.html',
//			controller
			controller: 'MovieDetailController'
		});
	}]);
//	控制器
	module.controller('MovieDetailController', [
	'$scope', 
	'$route',
	'$routeParams',
	"httpService", 
	function($scope, $route, $routeParams, httpService) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型
		
		$scope.title = 'Loading';

		$scope.loading = true;
		
		var url = 'https://api.douban.com/v2/movie/subject/' + $routeParams.id;
		httpService.jsonp(url, {}, function(data) {
			$scope.title = data.title;
			$scope.img = data.images.large;
			$scope.loading = false;
//			console.log(data.images.large);
			$scope.$apply();
		});
	}]);
})(angular);
```

view.html

```
<div class="jumbotron">
  <h1>{{title}}</h1>
  <img ng-src="{{img}}" ng-show="!loading" alt="" />
  <!--<p>...</p>-->
</div>

<!--loading特效-->
<div ng-show="loading" class="mask">
	<div class="sk-fading-circle">
	  <div class="sk-circle1 sk-circle"></div>
	  <div class="sk-circle2 sk-circle"></div>
	  <div class="sk-circle3 sk-circle"></div>
	  <div class="sk-circle4 sk-circle"></div>
	  <div class="sk-circle5 sk-circle"></div>
	  <div class="sk-circle6 sk-circle"></div>
	  <div class="sk-circle7 sk-circle"></div>
	  <div class="sk-circle8 sk-circle"></div>
	  <div class="sk-circle9 sk-circle"></div>
	  <div class="sk-circle10 sk-circle"></div>
	  <div class="sk-circle11 sk-circle"></div>
	  <div class="sk-circle12 sk-circle"></div>
	</div>
</div>
```

## step-12 抽象配置

凡是有可能发生变化的量--变量，应该做成配置 -- 常量

比如：

count/url

关于**注入**：

依赖某个东西，让系统分配，直接使用。

在公共模块中创建**constant**即可，子模块可以拿到；

注意：

在公共模块创建的组件，子模块拿不到。

app.js

```
.constant('AppConstant', {
	search_url: 'https://api.douban.com/v2/movie/subject/',
	movie_list: 'https://api.douban.com/v2/movie/',
	page_count: 4
})
```
使用时，在子模块module中的controller里面注入后使用即可：

`var url = AppConstant.search_url + $routeParams.id;`

## 总结

### 公共模块 -- 子模块

创建公共模块，然后其余子模块引用。

### 路由

点击某个a按钮，触发路由config，$routeProvider是对$route服务对应的配置，然后便有了新的的controller和view

```
// 配置模块的路由
module.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/subject/:id', {
//			view
	templateUrl: 'movie_detail/view.html',
//			controller
	controller: 'MovieDetailController'
});
}]);
```

### controller注入

```
module.controller('MovieDetailController', [
	'$scope', 
	'$route',
	'$routeParams',
	"httpService", 
	'AppConstant', // 注入
	// 暴露数据、行为
	function($scope, $route, $routeParams, httpService, AppConstant) {}
```