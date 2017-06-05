<?php 
session_start();
include 'Person.class.php';
include 'Admin.class.php';
include 'Course.class.php';
include 'Student.class.php';
include 'DB.class.php';


$action = $_POST['action'];

switch ($action) {

	case 'insert_admin':
		$json = json_decode($_POST['data']);
		$ad_name = $json->ad_name;
		$ad_phone = $json->ad_phone;
		$ad_email = $json->ad_email;
		$ad_role_id = $json->ad_role_id;
		$ad_password = $json->ad_password;
		if(!empty($_FILES['ad_image'])){
			$ext = pathinfo($_FILES['ad_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["ad_image"]["tmp_name"], './uploads/'.$image);
		// echo "Image uploaded successfully as ".$image;
		}
		$ad_image = $image;

		$admin = new Admin('', $ad_name, $ad_phone, $ad_email, $ad_image, $ad_role_id, $ad_password);
		$admin->insert();
		
		break;
	
	case 'insert_student':
		$json = json_decode($_POST['data']);
		$st_name = $json->st_name;
		$st_phone = $json->st_phone;
		$st_email = $json->st_email;
		$st_course_id = $json->st_course_id;
		if(!empty($_FILES['st_image'])){
			$ext = pathinfo($_FILES['st_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["st_image"]["tmp_name"], './uploads/'.$image);
		}
		$st_image = $image;

		$student = new student('', $st_name, $st_phone, $st_email, $st_image, $st_course_id);
		$student->insert();
		
		break;

	
	case 'insert_course':
		$json = json_decode($_POST['data']);
		$cr_name = $json->cr_name;
		$cr_description = $json->cr_description;
		if(!empty($_FILES['cr_image'])){
			$ext = pathinfo($_FILES['cr_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["cr_image"]["tmp_name"], './uploads/'.$image);
		}
		$cr_image = $image;

		$course = new course('', $cr_name, $cr_description, $cr_image);
		$course->insert();
		break;	
	


	
	case 'read_admin':
		Admin::read();
		break;

	case 'read_student':	
		Student::read();
		break;

	case 'read_course':
		Course::read();	
		break;

	case 'update_admin':
		$json = json_decode($_POST['data']);
		$ad_old_id = $json->old_id;
		$ad_name = $json->ad_name;
		$ad_phone = $json->ad_phone;
		$ad_email = $json->ad_email;
		$ad_role_id = $json->ad_role_id;
		$ad_password = $json->ad_password;
		if(!empty($_FILES['ad_image'])){
			$ext = pathinfo($_FILES['ad_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["ad_image"]["tmp_name"], './uploads/'.$image);
		// echo "Image uploaded successfully as ".$image;
		}
		$ad_image = $image;

		$admin = new Admin('', $ad_name, $ad_phone, $ad_email, $ad_image, $ad_role_id, $ad_password);
		$admin->update($ad_old_id);
		break;

	case 'update_student':
		$json = json_decode($_POST['data']);
		$st_old_id = $json->old_id;
		$st_name = $json->st_name;
		$st_phone = $json->st_phone;
		$st_email = $json->st_email;
		$st_course_id = $json->st_course_id;
		if(!empty($_FILES['st_image'])){
			$ext = pathinfo($_FILES['st_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["st_image"]["tmp_name"], './uploads/'.$image);
		// echo "Image uploaded successfully as ".$image;
		}
		$st_image = $image;

		$student = new student('', $st_name, $st_phone, $st_email, $st_image, $st_course_id);
		$student->update($st_old_id);
		break;
	
	case 'update_course':
		$json = json_decode($_POST['data']);
		$cr_old_id = $json->old_id;
		$cr_name = $json->cr_name;
		$cr_description = $json->cr_description;
		if(!empty($_FILES['cr_image'])){
			$ext = pathinfo($_FILES['cr_image']['name'],PATHINFO_EXTENSION);
            $image = time() . '.' . $ext;
            move_uploaded_file($_FILES["cr_image"]["tmp_name"], './uploads/'.$image);
		// echo "Image uploaded successfully as ".$image;
		}
		$cr_image = $image;

		$course = new course('', $cr_name, $cr_description, $cr_image);
		$course->update($cr_old_id);
		break;

	case 'delete_admin':
		$json = json_decode($_POST['data']);
		$ad_id = $json->ad_id;
		Admin::delete($ad_id);
		break;
	
	case 'delete_student':
		$json = json_decode($_POST['data']);
		$st_id = $json->st_id;
		Student::delete($st_id);
		break;
	
	case 'delete_course':
		$json = json_decode($_POST['data']);
		$cr_id = $json->cr_id;
		Course::delete($cr_id);
		break;

	case 'get_course_details':
		$json = json_decode($_POST['data']);
		$cr_id = $json->cr_id;
		Course::getCourseDetails($cr_id);
		break;

	case 'get_course_students':
		$json = json_decode($_POST['data']);
		$cr_id = $json->cr_id;
		Course::getCourseStudents($cr_id);
		break;

	case 'get_student_details':
		$json = json_decode($_POST['data']);
		$st_id = $json->st_id;
		Student::getStudentDetails($st_id);
		break;

	case 'get_admin_details':
		$json = json_decode($_POST['data']);
		$ad_id = $json->ad_id;
		Admin::getAdminDetails($ad_id);
		break;
	
	case 'count_admins';
		Admin::count();
		break;

	case 'count_students';
		Student::count();		
		break;

	case 'count_courses';
		Course::count();
		break;

	case 'login';
		$username = $_POST['username'];
		$password = $_POST['password'];
		echo Admin::login($username, $password);
		break;

	case 'logout';
		Admin::logout();
		break;

	default:
		# code...
		break;
}





