schoolApp.service('HttpService', ['$http', '$rootScope', function($http, $rootScope){
	
	var self = this;

	self.emit = function () {
		$rootScope.$emit('updateList');
	}

	self.getRequest = function(action, type) {	
		var action = {action: action};
		return $http.post('./php/server.php',action, {
			transformRequest: function(data) {
			    return $.param(data);
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}	
		}).then(function(data, status, headers, config) {
			return data.data;
		}, function(data, status, headers, config){
			return data;
		});	  
	}

	self.postRequest = function(requestData, ImgFile, action, type_image) {

		return $http.post('./php/server.php', requestData, {
			processData: false,
			transformRequest: function () {
				var formData = new FormData();
				formData.append(type_image, ImgFile); 
				formData.append('data', requestData);
				formData.append('action', action);
				return formData;  
			}, 
			headers: {
			 'Content-Type': undefined
			}	
		}).then(function(data, status, headers, config) {
			self.emit();
			return data.status;
		}, function(data, status, headers, config){
			self.emit();
			return data.status;
		});
	}

	self.getWithParamRequest = function(requestData, action) {

	return $http.post('./php/server.php', requestData, {
			processData: false,
			transformRequest: function () {
				var formData = new FormData();
				formData.append('data', requestData);
				formData.append('action', action);
				return formData;  
			}, 
			headers: {
			 'Content-Type': undefined
			}	
		}).then(function(data, status, headers, config) {
			self.emit();
			return data;
		}, function(data, status, headers, config){
			self.emit();
			return data;
		});
	}
	
}]);
