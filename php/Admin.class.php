<?php  
/**
* 
*/
// include 'DB.class.php';

class Admin extends Person {
	public $image;
	public $role_id;
	public $password;


	function __construct($id, $name, $phone, $email, $image, $role_id, $password) {
		parent::__construct($id, $name, $phone, $email, $image);
		$this->role_id = $role_id;
		// $this->password = $password;
		$this->password = password_hash(filter_var($password, FILTER_SANITIZE_STRING), PASSWORD_DEFAULT);

	}


	public function insert() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("INSERT INTO admins (name, phone, email, image, role_id, password) VALUES (?, ?, ?, ?, ?, ?)");
		$stmt->bind_param('ssssis', $this->name, $this->phone, $this->email, $this->image, $this->role_id, $this->password);
		$stmt->execute();
		
		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Insert new Admin: ". $this->name ." success";
		}

		
	}


	public function update($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$stmt = $connection->prepare("UPDATE admins SET name = ?, phone = ?, email = ?, image = ?, role_id = ?, password = ? WHERE id = '$id'");
		$stmt->bind_param('ssssis', $this->name, $this->phone, $this->email, $this->image, $this->role_id, $this->password);
		$stmt->execute();
		
		if($stmt->error){
			echo $stmt->error;
		} else {
			echo "Update Admin: ". $this->name ." success";
		}

	}

	public function delete($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("DELETE FROM admins WHERE id = '$id'");

		if($result) {
			echo "delete admin success";
		} else {
			echo "delete admin failed";
		}
	}

	public function read() {
	
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT admins.id as id, admins.name as name, admins.phone as phone, admins.email as email, admins.image as image, roles.name as role FROM admins INNER JOIN roles on roles.id = admins.role_id");

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

	public function getAdminDetails($id) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}

		$result = $connection->query("SELECT admins.id as id, admins.name as name, admins.phone as phone, admins.email as email, admins.image as image, roles.name as role FROM admins INNER JOIN roles on roles.id = admins.role_id WHERE admins.id = '$id'");


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

	public function count() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}
		
		$result = $connection->query("SELECT * FROM admins");
	
		if ($result->num_rows > 0) {
			$count = $result->num_rows;
			echo json_encode($count);
		} else {
			echo "0";
		}	
	}



	public function login($username, $password) {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}
		
		$stmt = $connection->prepare("SELECT password, role_id, image FROM admins WHERE name = ?");
 		$stmt->bind_param('s',$username);
			
		$stmt->execute();
 		$stmt->store_result();
 		$stmt->bind_result($hash, $role_id, $image);
 		$stmt->fetch();
 		$stmt->close();
 		
 		if(password_verify($password, $hash)){
 			$_SESSION['username'] = $username;
    		$_SESSION['image'] = $image;
    		$_SESSION['role_id'] = $role_id;
	
    		$session_data = [$username, $image, $role_id];
  				
  			return json_encode($session_data);
 		}  else {
        	return '';        		
    	}
	}

	public function logout() {
		$connection = DB::getconn();
		if ($connection->errno) {echo $connection->error;die();}
		
		session_destroy();
		
		echo "logout";
	}
}