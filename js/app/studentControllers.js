schoolApp.controller('studentListCtrl', ['$scope', 'HttpService', '$rootScope', function($scope, HttpService ,$rootScope){
	$scope.getStudentData = function() {
		HttpService.getRequest('read_student', 'student').then(function (data) {
			$scope.studentData = data;
		});
	}	
	$scope.getStudentData();	
	
	$rootScope.$on('updateList', function () {
		$scope.getStudentData();
	});	
}]);	

schoolApp.controller('studentInsertCtrl', ['$scope', '$state', 'HttpService', function($scope, $state, HttpService) {
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

	$scope.postStudentData = function (){
		var studentData = JSON.stringify({
			st_name: $scope.stName,
			st_phone: $scope.stPhone,
			st_email: $scope.stEmail,
			st_course_id: $scope.stCourse_id
		});

		HttpService.postRequest(studentData, $scope.files[0], 'insert_student', 'st_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Create Student Success", "success");
				$state.go('school.summary-sc');
			} else {
				swal("Oops..","Create Student failed", "error");
			}
		});
	}

	$scope.getCourseData = function() {
		HttpService.getRequest('read_course', 'course').then(function (data) {
			$scope.courseData = data;
		});
	}
	$scope.getCourseData();
}]);

schoolApp.controller('summary-scCtrl', ['$scope', 'HttpService', function($scope, HttpService){
	$scope.getStSummary = function() {

		HttpService.getRequest('count_students', 'students counts').then(function (data) {
			$scope.stSummary = data;
		});
	}
	$scope.getCrSummary = function() {
		HttpService.getRequest('count_courses', 'courses counts').then(function (data) {
			$scope.crSummary = data;
		});
	}	
	$scope.getStSummary()
	$scope.getCrSummary()
}]);

schoolApp.controller('studentReadCtrl', ['$scope', '$stateParams', '$state', 'HttpService', function($scope, $stateParams, $state, HttpService){
	$scope.id = $stateParams.id;

	$scope.getStudentDetails = function () {
		var studentId = JSON.stringify({
				st_id: $scope.id
		});

		HttpService.getWithParamRequest(studentId, 'get_student_details').then(function(data){
			if (data.status == 200) {

					console.log('Student Details: ' + data.data[0]);
					var responseData = data.data[0];
					$scope.name = responseData.name;
					$scope.phone = responseData.phone;
					$scope.email =  responseData.email;
					$scope.course = responseData.course;
					$scope.image = responseData.image;
				} else {
					console.log(data.data);
				}
		});			
	}
	$scope.getStudentDetails();

	$scope.deleteData = function() {
		
		var studentId = JSON.stringify({
				st_id: $scope.id
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
		  	HttpService.getWithParamRequest(studentId, 'delete_student').then(function(data){
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

schoolApp.controller('studentUpdateCtrl', ['$scope', '$stateParams', '$state', 'HttpService', function($scope, $stateParams, $state, HttpService){
	$scope.old_id = $stateParams.id

	$scope.getStudentDetails = function () {
		var studentId = JSON.stringify({
				st_id: $scope.old_id
		});

		HttpService.getWithParamRequest(studentId, 'get_student_details').then(function(data){
			if (data.status == 200) {

					console.log('Student Details: ' + data.data[0]);
					var responseData = data.data[0];
					$scope.old_name = responseData.name;
					$scope.old_phone = responseData.phone;
					$scope.old_email =  responseData.email;
					$scope.old_course = responseData.course;
					$scope.old_image = responseData.image;
				} else {
					console.log(data.data);
				}
		});			
	}
	$scope.getStudentDetails();

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

	$scope.postStudentData = function (){
		var studentData = JSON.stringify({
			old_id: $scope.old_id,
			st_name: $scope.stName,
			st_phone: $scope.stPhone,
			st_email: $scope.stEmail,
			st_course_id: $scope.stCourse_id
		});

			HttpService.postRequest(studentData, $scope.files[0], 'update_student', 'st_image').then(function (data) {
			var status = data;
			if (status == 200) {
				swal("Good!","Update Student Success", "success");
				$state.go('school.summary-sc');
			} else {
				swal("Oops..","Update Student failed", "error");
			}
		});
	}

	$scope.getCourseData = function() {
		HttpService.getRequest('read_course', 'course').then(function (data) {
			$scope.courseData = data;
		});
	}
	$scope.getCourseData();		
}]);