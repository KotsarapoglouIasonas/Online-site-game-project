<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
    	if (isset($_POST['oldp'])){
      		$oldp = $_POST['oldp'];
      		$newp = $_POST['newp'];
      		$userID = $_SESSION['userID'];
      		$sql = "SELECT COUNT(*) FROM user WHERE userID='$userID' AND password='$oldp'";
			if ($res = $conn->query($sql)) {

	    		if ($res->fetchColumn() > 0) {
	    			$sql = "UPDATE user set password='$newp' WHERE userID='$userID'";
					$conn->exec($sql);
						
	    				?>
	    				<script>
	    					alert("Ο κωδικός σας άλλαξε επιτυχώς!");window.location = "settings.php";
	    				</script>
	    				<?php
	    				
					
				}
				else{
					?><script>
	    					alert("Αποτυχία αλλαγής κωδικού, λάθος παλιός κωδικός. Δοκιμάστε ξανά!");window.location = "settings.php";
	    				</script>
	    				<?php
				}
			}
			else{
					?>
					<script>
	    					alert("Αποτυχία αλλαγής κωδικού. Δοκιμάστε ξανά!");window.location = "settings.php";
	    				</script>
	    				<?php
					
				}
    	}
    	?>
