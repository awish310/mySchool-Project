<?php 
/**
* 
*/
// include 'DB.class.php';

class Student extends Person {
	
	public $id;
	public $name;
	public $phone;
	public $email;
	public $image;
	public $course_id;

	function __construct($id, $name, $phone, $email, $image, $course_id) {
		parent::__construct($id, $name, $phone, $email, $image);
		$this->course_id = $course_id;
	}

	public function insert() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("INSERT INTO students (name, phone, email, image, course_id) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param('ssssi', $this->name, $this->phone, $this->email, $this->image, $this->course_id);
		$stmt->execute();
		
		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Insert new Student: ". $this->name ." success";
		}
	}


	public function read() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT students.id as id, students.name as name, students.phone as phone, students.email as email, students.image as image, courses.name as course FROM students INNER JOIN courses on students.course_id = courses.id");

		$row = array();

		if ($result->num_rows > 0) {
			while ($r = $result->fetch_assoc()) {
				$rows[] = $r;
			}
			echo json_encode($rows);
		} else {
			echo "0 results";
		}
	}

	public function getStudentDetails($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT students.name as name, students.phone as phone, students.email as email, students.image as image, courses.name as course FROM students INNER JOIN courses on students.course_id = courses.id WHERE students.id = '$id'");

		$row = array();
	
		if ($result->num_rows > 0) {
			while ($r = $result->fetch_assoc()) {
				$rows[] = $r;
			}
			echo json_encode($rows);
		} else {
			echo "0 results";
		}
	}

	public function update($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("UPDATE students SET name = ?, phone = ?, email = ?, image = ?, course_id = ? WHERE id = '$id'");
		$stmt->bind_param('ssssi', $this->name, $this->phone, $this->email, $this->image, $this->course_id);
		$stmt->execute();
		
		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Update Student: " . $this->name . " success";
		}

	}

	public function delete($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("DELETE FROM students WHERE id = '$id'");
		
		if($result) {
			echo "delete student success";
		} else {
			echo "delete student failed";
		}
	}


	public function count() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}
		
		$result = $connection->query("SELECT * FROM students");
	
		if ($result->num_rows > 0) {
			$count = $result->num_rows;
			echo json_encode($count);
		} else {
			echo "0";
		}	
	}

}