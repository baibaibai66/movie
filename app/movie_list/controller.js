(function(angular) {
	'use strict';
//	假数据
//	var data = {};
	
	// 创建正在热映模块
	var module = angular.module('movieCat.movie_list', [
	'ngRoute',
	'movieCat.services.http'
	]);
	// 配置模块的路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
//			view
			templateUrl: 'app/movie_list/view.html',
//			controller
			controller: 'MovieListController'
		});
	}]);
//	控制器
	module.controller('MovieListController', [
	'$scope', 
	'$route',
	'$routeParams',
	"httpService", 
	'AppConstant',
	function($scope, $route, $routeParams, httpService, AppConstant) {
//		控制器 分两步: 1.设计暴露数据; 2.设计暴露行为  去分析！！！！
//		就是列表,对吗: 图片,名称,导演,类型
		var count = AppConstant.page_count;
		var page = parseInt($routeParams.page);
		var start = (page - 1) * count;
//		console.log(page)
//		需要先暴露一下,因为$http异步请求,如果不先声明，view端可能不认识
		$scope.loading = true;
		$scope.data = [];
		$scope.title = 'Loading';
		$scope.total = 0;
		$scope.totalPages = 0;
		$scope.currentPage = page;
		
		var url = AppConstant.movie_list + $routeParams.category;
		var data = {
			count: count,
			start: start,
			q: $routeParams.q
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