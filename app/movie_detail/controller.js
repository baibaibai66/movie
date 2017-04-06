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
			templateUrl: 'app/movie_detail/view.html',
//			controller
			controller: 'MovieDetailController'
		});
	}]);
//	控制器
	module.controller('MovieDetailController', [
	'$scope', 
	'$route',
	'$routeParams',
	'$window',
	"httpService", 
	'AppConstant', // 注入
	function($scope, $route, $routeParams, $window, httpService, AppConstant) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型
		
		$scope.title = 'Loading';
		$scope.summary = '';
		$scope.loading = true;
		$scope.alt = '';
		
		var url = AppConstant.search_url + $routeParams.id;
		httpService.jsonp(url, {}, function(data) {
			$scope.title = data.title;
			$scope.img = data.images.large;
			$scope.loading = false;
			$scope.summary = data.summary;
			$scope.alt = data.alt;
//			console.log(data.images.large);
			$scope.$apply();
		});
		
//		返回按钮回退
		$scope.back = function() {
			$window.history.back();
		}
	}]);
})(angular);