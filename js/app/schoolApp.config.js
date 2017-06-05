schoolApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("login", {
			url: "/login",
			templateUrl: "./templates/login.html",
			controller: "loginCtrl"
		})
		.state("school", {
			url: "/school",
			templateUrl: "./templates/school.html"
		})
			.state("school.summary-sc", {
				url: "/summary-sc",
				templateUrl:"./templates/summary-sc.html",
				controller:"summary-scCtrl"
			})
			.state("school.insert-st", {
				url: "/insert-st",
				templateUrl:"./templates/student-form.html",
				controller:"studentInsertCtrl"
			})
			.state("school.insert-cr", {
				url: "/insert-cr",
				templateUrl:"./templates/course-form.html",
				controller:"courseInsertCtrl"
			})
			.state("school.read-st", {
				url: "/read-st/:id",
				templateUrl:"./templates/student-read.html",
				controller: "studentReadCtrl"
			})
			.state("school.read-cr", {
				url: "/read-cr/:id",
				templateUrl:"./templates/course-read.html",
				controller: "courseReadCtrl"
			})
			.state("school.update-st", {
				url: "/update-st/:id",
				templateUrl:"./templates/student-form.html",
				controller:"studentUpdateCtrl"
			})
			.state("school.update-cr", {
				url: "/update-cr/:id",
				templateUrl:"./templates/course-form.html",
				controller:"courseUpdateCtrl"
			})
		.state("admin", {
			url: "/admin",
			templateUrl: "./templates/admin.html",
			controller: "adminListCtrl"
		})
			.state("admin.summary-ad", {
				url: "/summary-ad",
				templateUrl: "./templates/summary-ad.html",
				controller:"summary-adCtrl"
			})
			.state("admin.insert-ad", {
				url: "/insert-ad",
				templateUrl: "./templates/admin-form.html",
				controller:"adminInsertCtrl"
			})
			.state("admin.read-ad", {
				url: "/read-ad/:id",
				templateUrl: "./templates/admin-read.html",
				controller: 'adminReadCtrl' 
			})
			.state("admin.update-ad", {
				url: "/update-ad/:id",
				templateUrl: "./templates/admin-form.html",
				controller:"adminUpdateCtrl"
			});

		$urlRouterProvider.otherwise("/login");

});