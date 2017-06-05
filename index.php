<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="en" >
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<title>school</title>
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
	<link rel="stylesheet" href="./css/bootstrap-3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="./css/bootstrap-3.3.7/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="./css/bootstrap-3.3.7/css/bootstrap-horizon.css">
	<link rel="stylesheet" href="./css/style.css">
	<link rel="stylesheet" href="./sweetalert-master/dist/sweetalert.css">	
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script> -->
	<script src="./js/angular.min.js"></script>
	<script src="./js/jquery.min.js"></script>
	<script src="./css/bootstrap-3.3.7/js/bootstrap.min.js"></script>
	<script src="//unpkg.com/angular-ui-router/release/angular-ui-router.min.js"></script>
	<script src="./sweetalert-master/dist/sweetalert.min.js"></script>
	  
	<script src="./js/app/schoolApp.js"></script>
	<script src="./js/app/schoolApp.config.js"></script>
	<script src="./js/app/httpService.js"></script>
	<script src="./js/app/loginHeaderControllers.js"></script>
	<script src="./js/app/adminControllers.js"></script>
	<script src="./js/app/studentControllers.js"></script>
	<script src="./js/app/courseControllers.js"></script>
	<script>
		var login = <?php echo isset($_SESSION['username']) ? 'true' : 'false'; ?>;
		var username = <?php echo isset($_SESSION['username']) ? '\'' . $_SESSION['username'] . '\'' : '\'\''; ?>;
		var image = <?php echo isset($_SESSION['image']) ? '\'' . $_SESSION['image'] . '\'' : '\'\''; ?>;
		var role_id = <?php echo isset($_SESSION['role_id']) ? '\'' . $_SESSION['role_id'] . '\'' : '\'\''; ?>;
	</script>
</head>
<body ng-app="schoolApp">
	<div class="container-fluid">
		<header ng-controller="HeaderCtrl">
			<nav class="navbar navbar-default navbar-fixed-top" ng-show="sessionData.login">
			  	<div class="container-fluid">
			    	<div class="navbar-header">
			      		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        		<span class="icon-bar"></span>
			        		<span class="icon-bar"></span>
			        		<span class="icon-bar"></span>
			      		</button>
			      		<a class="navbar-brand" ui-sref="school.summary-sc">The School</a>
			    	</div>

			    	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    	  	<ul class="nav navbar-nav">
			    	    	<li><a ui-sref="school.summary-sc"><strong>School</strong></a></li>
			    	    	<li><a ui-sref="admin.summary-ad" ng-hide="sessionData.role_id == 3"><strong>Admins</strong></a></li>
			    	  	</ul>
			    	  	<ul class="nav navbar-nav navbar-right">
			    	    	<li class="dropdown">
			    	        	<a class="dropdown-toggle" data-toggle="dropdown">
			    	            	<span class="glyphicon glyphicon-user"></span>
			    	            	<strong>{{sessionData.username}}</strong>
			    	            	<span class="glyphicon glyphicon-chevron-down"></span>
			    	        	</a>
			    	        	<ul class="dropdown-menu">
			    	            	<li>
			    	                	<div class="navbar-login">
			    	                	    <div class="row">
			    	                	        <div class="col-xs-4 col-sm-4 col-md-7">
			                    	            <img class="img-responsive" src="./php/uploads/{{sessionData.image}}" alt="">
			                    	        </div>
			                    	        <div class="col-xs-8 col-sm-8 col-md-5 text-center">
			                    	            <p><strong>{{sessionData.username}}</strong></p>
			                    	            <p>{{sessionData.role_id == 1 ? 'Owner' : sessionData.role_id == 2 ? 'Manager' : 'Sales' }}</p>
			                    	        	</div>
			                    	    	</div>
			                    		</div>
			                		</li>
			                		<li class="divider navbar-login-session-bg"></li>
			                		<li class="navbar-login-session-bg">
			                		    <div class="navbar-login navbar-login-session">
			                		        <div class="row">
			                		            <div class="col-lg-12">           	
			                	                	<p>
			                	                    	<a ui-sref="login" ng-click="logout()" class="btn btn-danger btn-block">Logout</a>
			                                		</p>
			    	                        	</div>
			    	                    	</div>
			    	                	</div>
			    	            	</li>
			    	        	</ul>
			    	    	</li>
			    	  	</ul>
			    	</div>
			  	</div>
			</nav>
		</header>
		<main ui-view></main>
	</div>
</body>
</html>