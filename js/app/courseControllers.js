schoolApp.controller('courseListCtrl', ['$scope', 'HttpService', '$rootScope', function($scope, HttpService, $rootScope){
	$scope.getCourseData = function() {
		HttpService.getRequest('read_course', 'course').then(function (data) {
			$scope.courseData = data;
		});
	}
	$scope.getCourseData();	

	$rootScope.$on('updateList', function () {
		$scope.getCourseData();
	});	
}]);

schoolApp.controller('courseInsertCtrl', ['$scope', '$state', 'HttpService', function($scope, $state, HttpService) {
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

	$scope.postCourseData = function (){

		var courseData = JSON.stringify({
			cr_name: $scope.crName,
			cr_description: $scope.crDescription,
			cr_image: $scope.crImage
		});

		HttpService.postRequest(courseData, $scope.files[0], 'insert_course', 'cr_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Create Course Success", "success");
				$state.go('school.summary-sc');
			} else {
				swal("Oops..","Create Course failed", "error");
			}
		});

	}

}]);

schoolApp.controller('courseReadCtrl', ['$scope', '$stateParams', '$state', 'HttpService', function($scope, $stateParams, $state, HttpService){
	
	$scope.id = $stateParams.id;

	$scope.getCourseDetails = function () {
		var courseId = JSON.stringify({
				cr_id: $scope.id
		});

		HttpService.getWithParamRequest(courseId, 'get_course_details').then(function(data){
			if (data.status == 200) {
					console.log(data.data[0]);
					var responseData = data.data[0];
					$scope.name = responseData.name;
					$scope.description = responseData.description;
					$scope.image = responseData.image;
				} else {
					console.log(data.data);
				}
		});

		HttpService.getWithParamRequest(courseId, 'get_course_students').then(function(data){
			if (data.status == 200) {
					console.log(data.data);
					var responseData = data.data;
					$scope.courseStudents = responseData;
				} else {
					console.log(data.data);
				}
		});						
	}
	$scope.getCourseDetails();
	
	$scope.deleteData = function() {
		var courseId = JSON.stringify({
			cr_id: $scope.id
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
			HttpService.getWithParamRequest(courseId, 'delete_course').then(function(data){
				if (data.status == 200) {		
					swal("Good!","Delete Course Success", "success");
					$state.go('school.summary-sc');
				} else {
					swal("Oops..","Delete Course Failed", "error");
				}
			});
		});

			
	}
}]);

schoolApp.controller('courseUpdateCtrl', ['$scope', '$stateParams', '$state', 'HttpService', function($scope, $stateParams, $state, HttpService){
	$scope.old_id = $stateParams.id;

	$scope.getCourseDetails = function () {
		var courseId = JSON.stringify({
				cr_id: $scope.old_id
		});

		HttpService.getWithParamRequest(courseId, 'get_course_details').then(function(data){
			if (data.status == 200) {
					console.log(data.data[0]);
					var responseData = data.data[0];
					$scope.old_name = responseData.name;
					$scope.old_description = responseData.description;
					$scope.old_image = responseData.image;
				} else {
					console.log(data.data);
				}
		});			
	}
	$scope.getCourseDetails();

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

	$scope.postCourseData = function (){
		var courseData = JSON.stringify({
			old_id: $scope.old_id,
			cr_name: $scope.crName,
			cr_description: $scope.crDescription,
			cr_image: $scope.crImage
		});

		HttpService.postRequest(courseData, $scope.files[0], 'update_course', 'cr_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Update Course Success", "success");
				$state.go('school.summary-sc');
			} else {
				swal("Oop..","Update Course Failed", "error");
			}
		});
	}			
}]);