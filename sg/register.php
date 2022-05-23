<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
    	if (isset($_POST['username'])){
    		$username = $_POST['username'];
      		
      		$sql = "SELECT COUNT(*) FROM user WHERE username='$username'";
			if ($res = $conn->query($sql)) {

	    		if ($res->fetchColumn() > 0) {
				?>
	    				<script>
	    					alert("Το όνομα χρήστη υπάρχει ήδη, παρακαλώ δοκιμάστε ξανά!");window.location = "index.php";
	    				</script>
	    				<?php
	    		}
	    		else{
	    			$password = $_POST['password'];
	    			$birthdate = $_POST['bday'];
	    			$gender = $_POST['gender'];
	    			$city = $_POST['city'];
	    			$education = $_POST['education'];
	    			$difficulty_level = '1';
	    			$insertusersql = "INSERT INTO user (username, password, gender, city, birthdate, education, difficulty_level)
    					VALUES ('$username', '$password', '$gender', '$city', '$birthdate', '$education', '$difficulty_level')";
		    		$conn->exec($insertusersql);
		    		startSession($conn,$username,$conn->lastInsertId());
	    			?>
	    				<script>

	    					alert("Είσαι πλέον συνδεδεμένος. Καλωσήλθες!");window.location = "index.php";
	    				</script>
	    				<?php
	    				
					}
				}
				
    		}
    	
    	?>
