<?php include "startpage.php";
echo '<script src="games.js"></script>';
	if (isset($_SESSION["username"])){
		$userID = $_SESSION["userID"];
		$usersql = "SELECT * FROM user WHERE userID='$userID'";
		$userresult = $conn->query($usersql);
		$userrow = $userresult->fetch();
		$difficulty_level = $userrow["difficulty_level"];
		if (isset($_GET["id"])){
			$gameID = $_GET["id"];
			$sql = "SELECT * FROM game where gameID='$gameID'";
			$result = $conn->query($sql);

    		if ($result->rowCount() > 0) {
    			$row = $result->fetch();
		 	?>

				<div class="content" style="margin: auto;width: 600px;border: 3px solid green;padding: 10px;">
					<h2>Παιχνίδι:<?php echo $row["name"];?></h2>
					<span style="float:left;font-size: 30px;" id="timer"></span>
					<script>setTimer(<?php echo $row["time"];?>,"timer")</script>
					<span style="float:right"><button style="width:60px;height:30px;color:white;background: red;" onclick="startGame(<?php echo $gameID;?>,<?php echo $row["time"];?>,'<?php echo $difficulty_level;?>')" id="nextbutton">Έναρξη</button></span>
					<canvas width="550" height="250" id="canvas" style="border: 2px solid green"></canvas>
					<div style="margin: auto;width: 100px;padding: 10px;">
						<button style="width:60px;height:30px;color:white;background:red;" onclick="check()">Έλεγχος</button></div>
				</div>

				<div class="content">
				<h2>Οδηγίες <button onclick="hideshow('instructions','instructions_b')" ><img src="images/right_icon.png" id="instructions_b"></button></h2>
				<div id="instructions" style="display:none;">
					<?php echo $row["instructions"];?>
				</div>
		</div>
			<?php 
						
				}
				else{
			?>
					<div class="content">
						<h2>Λάθος παιχνίδι</h2>
						<p>Το παιχνίδι που επιλέξετε δεν υπάρχει επιλέξτε άλλο από την αντίστοιχη <a href="games.php">σελίδα</a></p>
					</div>

				<?php 
				}
		}
		else{
			?>
		<div class="content">
			<h2>Επιλογή παιχνιδιού</h2>
			<p>Πρέπει πρώτα να επιλέξετε κάποιο παιχνίδι από την αντίστοιχη <a href="games.php">σελίδα</a></p>
		</div>

		<?php 
		}
	}
	else{ ?>
		<div class="content">
			<h2>Καλωσήλθες</h2>
			<p>Δεν μπορείς να παίξεις το παιχνίδι αν δεν γραφτείς. Παρακαλώ συνδέσου ή εγγράψου και καλή διασκέδαση!!</p>
		</div>

	<?php } 
?>
	


<?php


	include "endpage.php"; 

?>