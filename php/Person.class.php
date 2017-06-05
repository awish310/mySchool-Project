<?php  

/**
* 
*/
abstract class Person {
	
	protected $id;
	protected $name;
	protected $phone;
	protected $email;
	protected $image;  //a string which will  be a link to the image file





	function __construct($id, $name, $phone, $email, $image) {

			$this->id = $id;
			$this->name = $name;
			$this->phone = $phone;
			$this->email = $email;
			$this->image = $image;
	}

}