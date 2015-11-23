angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/templates', {
			templateUrl: 'templates/templates.html',
			controller: 'TemplatesCtrl'
		}).
		when('/templates/:templateId', {
			templateUrl: 'templates/templates-details.html',
			controller: 'TemplatesDetailsCtrl'
		})
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('Json/templates.json').success(function(data){
		$scope.templates = data;
	});

}])

.controller('TemplatesDetailsCtrl', ['$scope','$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var templateId = $routeParams.templateId;
	$http.get('Json/templates.json').success(function(data){
		$scope.templates = $filter('filter')(data, function(d){
			return d.id == templateId;
		})[0];
		$scope.mainImage = $scope.templates.images[0].name;

	});

	$scope.setImage = function(image){
		$scope.mainImage = image.name;
	}
}]);