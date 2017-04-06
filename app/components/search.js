(function(angular) {
	angular.module('movieCat.directives.search', [])
	.directive('search', [
	'$route',
	'$location',
	function($route, $location) {
		return {
			scope: {},
			restrict: 'A',
			template: '<form ng-submit="search()" class="navbar-form">'+
					  '<div class="input-group">'+
					    '<input ng-model="search_name" type="search" class="form-control" placeholder="so">'+
					    '<div class="input-group-btn">'+
					      '<button ng-click="search()" class="btn btn-default" type="submit">搜索影片</button>'+
					    '</div>'+
					  '</div>'+
					'</form>',
//			template: '<form ng-submit="search()">'+
//					  '<div class="input-group">'+
//					    '<input ng-model="search_name" type="search" class="form-control" placeholder="so">'+
//					    '<div class="input-group-btn">'+
//					      '<button ng-click="search()" class="btn btn-default" type="submit">Go!</button>'+
//					    '</div>'+
//					  '</div>'+
//					'</form>',
			replace: true,
			link: function($scope, element, attr) {
				$scope.search_name = '';
				
//				当当前不再是搜索时,搜索框应该清空
				$scope.$location = $location;
				$scope.$watch('$location.path()', function(now) {
//					console.log($routeParams);
					if (!now.startsWith("/search")) {
						$scope.search_name = '';
					}
				})
				
				$scope.search = function() {
					if ($scope.search_name){
//						修改一个bug,当进入详情页detail的时候,不能搜索了...不过下面第一次执行if，第二次执行else了...
						if($location.path().startsWith("/subject")){
//							console.log($location)
							$location.path('/search/1')
//							$route.updateParams({q: $scope.search_name})
						}
						else {
							console.log(11);
							$route.updateParams({category: 'search', page: 1, q: $scope.search_name})
						}
					}
				}
			}
		}
	}])
})(angular);