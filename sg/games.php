<?php include "startpage.php";
	if (!isset($_SESSION["username"])){ ?>
		<div class="content">
		<h2>Καλωσήλθες</h2>
		<p>Δεν μπορείς να παίξεις παιχνίδια ή να δεις στατιστικά. Παρακαλώ συνδέσου ή εγγράψου και καλή διασκέδαση!</p>
		<ol>
		<?php
		$sql = "SELECT * FROM game";
		foreach ($conn->query($sql) as $row) {
    		echo "<li><strong>".$row['name']."</strong>:".$row['description']."(Παιχνίδι, Στατιστικά)</li>";


		}
		?>

		</ol>
	</div>


	<?php }
	else{ 

		?>
		<div class="content">
		<h2>Παιχνίδια</h2>
		<ol>
		<?php
		$sql = "SELECT * FROM game";
		foreach ($conn->query($sql) as $row) {
    		echo "<li><strong>".$row['name']."</strong>:".$row['description']."(<a href='play.php?id=".$row['gameID']."'>Παιχνίδι</a>,<a href='stats.php?id=".$row['gameID']."'> Στατιστικά</a>)</li>";


		}
		?>

		</ol>
	</div>

	<?php } ?>



<?php include "endpage.php"; ?>