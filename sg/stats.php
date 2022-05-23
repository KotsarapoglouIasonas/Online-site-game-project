<?php include "startpage.php";
include "phpfunctions.php";
	if (isset($_SESSION["username"])){
		if (isset($_GET["id"])){
			$gameID = $_GET["id"];
			$userID = $_SESSION["userID"];
			$levels = ["Όλα τα επίπεδα","Εύκολο","Μεσαίο","Προχωρημένο","Εύκολο έως Μεσαίο"];
			$sql = "SELECT * FROM game where gameID='$gameID'";
			if ($row = $conn->query($sql)) {
	    		if ($row->fetchColumn() > 0) {
	    			foreach ($conn->query($sql) as $row) {
			 ?>
						<div class="content">
							<h2>Στατιστικά: <?php echo $row["name"];?></h2>
							
								<?php
									$statisticsql = "SELECT * FROM statistic where gameID='$gameID' and userID='$userID'";
									if ($statisticrow = $conn->query($statisticsql)) {

		    							if ($statisticrow->fetchColumn() > 0) {
		    								foreach ($conn->query($statisticsql) as $statisticrow) {
		    									$playTotalTime = $statisticrow['playTotalTime'];
		    									$score = $statisticrow['playTotalTime'];
		    									$accuracy = $statisticrow['accuracy'];
										?>
											<table border=2>
											<caption>Στατιστικά</caption>
											<tr>
												<th>Συνολικός Χρόνος Παιχνιδιού:</td>
													<td colspan="3">
													<?php 
								// Εμφανίζει δευτερόλεπτα σε μορφή mm:ss, π.χ. 3:07
													echo intdiv($playTotalTime,60).":".($playTotalTime%60<10?"0".$playTotalTime%60:$playTotalTime%60)
													?>
													</td>
											</tr>
											<tr>
												<th>Σύνολο διαφορετικών ημερών:
												</th>
												<td  colspan="3">
													<?php echo getDays($conn,$gameID,$userID);?>
												</td>
											</tr>
											<tr>
												<th>Κερδισμένοι πόντοι:
												</th>
												<td  colspan="3">
													<?php echo $score; ?>
												</td>
											</tr>
											<tr>
												<th>Ποσοστό ευστοχίας:
												</th>
												<td  colspan="3">
													<?php echo $accuracy; ?>
												</td>
											</tr>
											<tr><th>Επίπεδο</th> <th>Επιτυχίες</th>
												<th>Αποτυχίες</th>
												<th>Εγκαταλείψεις</th>
											<?php
											for($i=0;$i<sizeof($levels);$i++){
												echo "<tr>";
												echo "<td>".$levels[$i]."</td>";
												echo "<td>".getColumn($conn,"hit",$gameID,$userID,$levels[$i])."</td>";
												echo "<td>".getColumn($conn,"miss",$gameID,$userID,$levels[$i])."</td>";
												echo "<td>".getColumn($conn,"quit",$gameID,$userID,$levels[$i])."</td>";
												echo "</tr>";
											}


											?>
											</table>
											<?php
										}
										}
										else{
											?>
										<div class="content">
											<h2>Μη παιγμένο παιχνίδι</h2>
											<p>Το παιχνίδι που επιλέξετε δεν έχει παιχτεί ακόμη.</p>
										</div>
										<?php
										}
									}
									?>
						</div>

		<?php 
					}
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
	<?php } ?>



<?php include "endpage.php"; ?>