<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
    	if (isset($_POST['username'])){
    		$username = $_POST['username'];
      		$password = $_POST['password'];
      		$sql = "SELECT COUNT(*) FROM user WHERE username='$username' AND password='$password'";
			if ($res = $conn->query($sql)) {

	    		if ($res->fetchColumn() > 0) {
	    			$sql = "SELECT userID,username FROM user WHERE username='$username' AND password='$password'";
					foreach ($conn->query($sql) as $row) {
						startSession($conn,$row['username'], $row['userID']);
	    				?>
	    				<script>
	    					alert("Είσαι πλέον συνδεδεμένος. Καλωσήλθες!");window.location = "index.php";
	    				</script>
	    				<?php
	    				
					}
				}
				else{
					?><script>
	    					alert("Αποτυχία σύνδεσης. Δοκιμάστε ξανά!");window.location = "index.php";
	    				</script>
	    				<?php
				}
			}
			else{
					?>
					<script>
	    					alert("Αποτυχία σύνδεσης. Δοκιμάστε ξανά!");window.location = "index.php";
	    				</script>
	    				<?php
					
				}
    	}
    	?>
