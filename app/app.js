'use strict';

// Declare app level module which depends on views, and components
angular.module('movieCat', [
  'ngRoute',
  'movieCat.movie_detail',
  'movieCat.movie_list',
	'movieCat.directives.search',
  'movieCat.directives.auto_focus'
])
.constant('AppConstant', {
	search_url: 'https://api.douban.com/v2/movie/subject/',
	movie_list: 'https://api.douban.com/v2/movie/',
	page_count: 6
})
.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise(
	  		{
	  			redirectTo: '/in_theaters/1'
	  		}
	  	);
	}])


//搜索控制器 -- 公共区域控制器
//.controller('SearchController', [
//	'$scope',
//	'$route',
//	function($scope, $route) {
//		$scope.search_name = ''; // 取文本框中数据
//		$scope.search = function() {
//			console.log($scope.search_name)
//			$route.updateParams({category: 'search', page: 1, q: $scope.search_name})
//		}
//	}
//])


//.controller('NavController', [
//	'$scope',
//	'$location',
//	function($scope, $location) {
//		console.log($location.$$path)
////		console.log($location.path())
////		/top250/1
//		$scope.$location = $location;
////		这里watch的是scope下面的对象$location.$$path -- $scope.$location.$$path
//		$scope.$watch('$location.$$path', function(now) {
//			if (now.startsWith('/in_theaters')) {
//				$scope.type = 'in_theaters';
//			}
//			else if (now.startsWith('/coming_soon')) {
//				$scope.type = 'coming_soon';
//			}
//			else {
//				$scope.type = 'top250';
//			}
////			console.log(now);
//		})
//	}
//])
