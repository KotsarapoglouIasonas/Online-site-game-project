<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
	if (isset($_POST['city'])){
  		$city = $_POST['city'];
      $education = $_POST["education"];
  		$userID = $_SESSION['userID'];
  		
    			$sql = "UPDATE user set city='$city', education='$education' WHERE userID='$userID'";
				$conn->exec($sql);
					
    				?>
    				<script>
    					alert("Τα δημογραφικά σας στοιχεία έχουν αλλάξει!");window.location = "settings.php";
    				</script>
    				<?php
    				
				
	}

    	?>
