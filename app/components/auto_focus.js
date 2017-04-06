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
//						element.parent().children().removeClass('active');
						element.addClass('active');
					}
					else {
						element.removeClass('active');
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
