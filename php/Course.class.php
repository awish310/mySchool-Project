<?php 

/**
* 
*/
class Course {
	public $id;
	public $name;
	public $description;
	public $image;

	function __construct($id, $name, $description, $image) {
		$this->id = $id;
		$this->name = $name;
		$this->description = $description;
		$this->image = $image;
	}

	public function insert() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("INSERT INTO courses (name, description, image) VALUES (?, ?, ?)");
		$stmt->bind_param('sss', $this->name, $this->description, $this->image);
		$stmt->execute();

		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Insert new Course: ". $this->name ." success";
		}
	}

	public function update($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("UPDATE courses SET name = ?, description= ?, image = ? WHERE id = '$id'");
		$stmt->bind_param('sss', $this->name, $this->description, $this->image);
		$stmt->execute();
		
		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Update Course: " . $this->name . " success";
		}

	}

	public function delete($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("DELETE FROM courses WHERE id = '$id'");

		if ($result) {
			echo "delete course success";
		} else {
			echo "delete course failed";
		}
	}

	public function read() {
		$connection = DB::getconn();
			if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT * FROM courses");

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

	public function getCourseDetails($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT * FROM courses WHERE id = '$id'");

		$row = array();
	
		if ($result->num_rows > 0) {
			while ($r = $result->fetch_assoc()) {
				$rows[] = $r;
			}
			echo json_encode($rows);
		} else {
			echo 'No course';
		}
	}

	public function getCourseStudents($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT * FROM students WHERE course_id = '$id'");

		$row = array();
	
		if ($result->num_rows > 0) {
			while ($r = $result->fetch_assoc()) {
				$rows[] = $r;
			}
			echo json_encode($rows);
		} else {
			$no_students = array("name" => "No Students");
			echo json_encode($no_students);	
			
		}
	}



	public function count() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}
		
		$result = $connection->query("SELECT * FROM courses" );
	
		if ($result->num_rows > 0) {
			$count = $result->num_rows;
			echo json_encode($count);
		} else {
			echo "0";
		}	
	}
	
}