angular.module('application')
	.controller('NewsController', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http) {
		$scope.newsTime = 'Not retrieved yet.';
		$scope.getTime = function () {

			var responsePromise = $http.get("/api/info");

			responsePromise.success(function (data, status, headers, config) {
				$scope.newsTime = data;
			});

			responsePromise.error(function (data, status, headers, config) {
				$scope.newsTime = 'Failed to get time: ' + data;
			});
		};
	}
	]);