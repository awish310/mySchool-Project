schoolApp.factory('SessionData', function(){
	var data = {
		login: false,
		username: '',
		image: '',
		role_id: ''
	};
	return {
		get: () => data,
		put: newData => {data = newData;console.log(data);},
		patch: (fieldName, fieldValue) => {data[fieldName] = fieldValue},
	}
});

schoolApp.service('SessionManager', function($http, SessionData) {

    this.login = function($username, $password) {
		var requestData = {
			action: 'login',
			username: $username,
			password: $password
		};
		var config = {
			transformRequest: function(data) {
			    return $.param(data);
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		};
		
		return $http
			.post('./php/server.php', requestData, config)
			.then(function(response) {

				if (!response.data) {
					response.status = 400;
				}

				if (response.status === 200) {
					SessionData.put({
						login: true,
						username: response.data[0],
						image: response.data[1],
						role_id: response.data[2]
					});
					return response.data;
				} else {
					swal("Oops...", "Wrong Username or Password", "error");
				}
			}, function(data, status, headers, config){
				console.log(this);
			});
	}

	this.logout = function() {
		var requestData = {
			action: 'logout'
		};
		console.log(requestData);
		var config = {
			transformRequest: function(data) {
			    return $.param(data);
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		};
		return $http
			.post('./php/server.php', requestData, config)
			.then(function(response) {
				if (response.data === 'logout') {
					SessionData.put({
						login: false,
						username: '',
						image: '',
						role_id: ''
					});
					return response.data;
				} else {
					window.alert(response.data);
				}
			}, function(data, status, headers, config){
				console.log(this);
			});
	}
 
});

schoolApp.controller('HeaderCtrl', function($scope, SessionData, SessionManager) {
	$scope.test = 'test';
	$scope.autoLogin = function () {
		if (login) {
			SessionData.put({
				login: login,
				username: username,
				image: image,
				role_id: role_id
			});
		}
	}

	$scope.$watch(() => SessionData.get(), (newVal, oldVal) => {
		$scope.sessionData = newVal;		
	});

	$scope.autoLogin();

	$scope.logout = function() {
		SessionManager.logout();
	}


});

schoolApp.controller('loginCtrl', ['$scope', '$http', '$state', 'SessionManager', 'SessionData', function($scope, $http, $state, SessionManager, SessionData) {
	$scope.login = function() {
		SessionManager.login($scope.username, $scope.password).then(function(data) {
			if (data) {
				$state.go('school.summary-sc');
			}
		});
	}

	$scope.logout = function() {
		var data = {
			action: 'logout'
		};
		$http.post('./php/server.php', data, {headers: {
   	        'Content-Type': 'application/json; charset=utf-8'
   	    	}
		}).then(function(data, status, headers, config) {
			console.log('Admin logout data sent');
		}, function(data, status, headers, config){
			console.log('Admin logout data not send');
		});
	}
}]);
