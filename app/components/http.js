

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
//				if (typeof data == "function") {
//					callback = data;
//				}
				
				var jsonpCb = 'luckyJsonpCb' + Math.random().toString().replace('.', '').substr(1, 6);
//				$window[jsonpCb] = callback;
				
				var search = url.indexOf('?') === -1 ? "?" : '';
				for (var key in data) {
					search += key + '=' + data[key] + '&';
				}
				search += 'callback=' + jsonpCb;
				
				var scriptEle = $document[0].createElement('script');
				scriptEle.src = url + search;
//				回调函数必须在append之前
				$window[jsonpCb] = function(data) {
					callback(data);
					$document[0].body.removeChild(scriptEle);
				};
				$document[0].body.appendChild(scriptEle);

			};
		}
	]);
})(angular);
