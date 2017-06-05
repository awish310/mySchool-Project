schoolApp.controller('adminListCtrl', ['$scope', 'HttpService', '$rootScope', 'SessionData', function($scope, HttpService, $rootScope, SessionData){
	$scope.getAdminData = function() {

		$scope.$watch(() => SessionData.get(), (newVal, oldVal) => {
		$scope.sessionData = newVal;
		});

		HttpService.getRequest('read_admin', 'admin').then(function (data) {
			$scope.adminData = data;
		});
	}	
	$scope.getAdminData();

	$rootScope.$on('updateList', function () {
		$scope.getAdminData();
	});	
}]);

schoolApp.controller('adminInsertCtrl', ['$scope', '$state', 'HttpService', 'SessionData', function($scope, $state, HttpService, SessionData) {

	$scope.$watch(() => SessionData.get(), (newVal, oldVal) => {
		$scope.sessionData = newVal;
	});

	$scope.uploadedFile = function(element) {
		$scope.currentFile = element.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
		  $scope.image_source = event.target.result
		  $scope.$apply(function($scope) {
		    $scope.files = element.files;
		  });
		}
        reader.readAsDataURL(element.files[0]);
	}

	$scope.postAdminData = function (){
		var adminData = JSON.stringify({
			ad_name: $scope.adName,
			ad_phone: $scope.adPhone,
			ad_email: $scope.adEmail,
			ad_role_id: $scope.adRole_id,
			ad_password: $scope.adPassword
		});

		HttpService.postRequest(adminData, $scope.files[0], 'insert_admin', 'ad_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Create Admin Success", "success");
				$state.go('admin.summary-ad');
			} else {
				swal("Oop..","Create Admin Failed", "error");
			}
		});
	}

}]);

schoolApp.controller('summary-adCtrl', ['$scope', 'HttpService', function($scope, HttpService){
	$scope.getAdSummary = function() {
		HttpService.getRequest('count_admins', 'admin count').then(function (data) {
			$scope.adSummary = data;
		});
	}
	$scope.getAdSummary()
}]);

schoolApp.controller('adminReadCtrl', ['$scope', '$stateParams', '$state', 'HttpService', function($scope, $stateParams, $state, HttpService){
	$scope.id = $stateParams.id

	$scope.getAdminDetails = function () {
		var adminId = JSON.stringify({
				ad_id: $scope.id
		});

		HttpService.getWithParamRequest(adminId, 'get_admin_details').then(function(data){
			if (data.status == 200) {
				console.log('Admin Details: ' + data.data[0]);
				var responseData = data.data[0];
				$scope.name = responseData.name;
				$scope.phone = responseData.phone;
				$scope.email =  responseData.email;
				$scope.role = responseData.role;
				$scope.image = responseData.image;
			} else {
				console.log(data.data);
			}
		});			
	}
	$scope.getAdminDetails();

	$scope.deleteData = function() {

		var adminId = JSON.stringify({
				ad_id: $scope.id
		});

		swal({
		  title: "Are you sure?",
		  text: "You will not be able to recover this file!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, delete it!",
		  closeOnConfirm: false
		},
		function(){
			HttpService.getWithParamRequest(adminId, 'delete_admin').then(function(data){
				if (data.status == 200) {
					swal("Good!","Delete Admin Success", "success");
					$state.go('admin.summary-ad');
				} else {
					swal("Oops..","Delete Admin Failed", "error");
				}
			});			
		});
	}
}]);

schoolApp.controller('adminUpdateCtrl', ['$scope', '$stateParams', '$state', 'HttpService', 'SessionData', function($scope, $stateParams, $state, HttpService, SessionData){
	
	$scope.$watch(() => SessionData.get(), (newVal, oldVal) => {
		$scope.sessionData = newVal;
	});

	$scope.old_id = $stateParams.id
	$scope.getAdminDetails = function () {
		var adminId = JSON.stringify({
				ad_id: $scope.old_id
		});

		HttpService.getWithParamRequest(adminId, 'get_admin_details').then(function(data){
			if (data.status == 200) {
				console.log('Admin Details: ' + data.data[0]);
				var responseData = data.data[0];
				$scope.old_name = responseData.name;
				$scope.old_phone = responseData.phone;
				$scope.old_email =  responseData.email;
				$scope.old_role = responseData.role;
				$scope.old_image = responseData.image;
			} else {
				console.log(data.data);
			}
		});			
	}
	$scope.getAdminDetails();

	$scope.uploadedFile = function(element) {
		$scope.currentFile = element.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
		  $scope.image_source = event.target.result
		  $scope.$apply(function($scope) {
		    $scope.files = element.files;
		  });
		}
        reader.readAsDataURL(element.files[0]);
	}

	$scope.postAdminData = function (){
		var adminData = JSON.stringify({
			old_id: $scope.old_id,
			ad_name: $scope.adName,
			ad_phone: $scope.adPhone,
			ad_email: $scope.adEmail,
			ad_role_id: $scope.adRole_id,
			ad_password: $scope.adPassword
		});

		HttpService.postRequest(adminData, $scope.files[0], 'update_admin', 'ad_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Update Admin Success", "success");
				$state.go('admin.summary-ad');
			} else {
				swal("Oop..","Update Admin Failed", "error");
			}
		});
	}		
}]);
