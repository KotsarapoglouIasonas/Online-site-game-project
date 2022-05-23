<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
	if (isset($_POST['level'])){
  		$level = $_POST['level'];
  		$userID = $_SESSION['userID'];
  		
    			$sql = "UPDATE user set difficulty_level='$level' WHERE userID='$userID'";
				$conn->exec($sql);
					
				?>
				<script>
					alert("Το επίπεδο δυσκολίας έχει αλλάξει!");window.location = "settings.php";
				</script>
				<?php
    				
				
	}

    	?>
