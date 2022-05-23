<?php include "startpage.php";
	if (!isset($_SESSION["username"])){ ?>
		<div class="content">
		<h2>Καλωσήλθες</h2>
		<p>Δεν μπορείς να αλλάξεις τις ρυθμίσεις σου. Παρακαλώ συνδέσου ή εγγράψου και καλή διασκέδαση!</p>
	</div>


	<?php }
	else{ 
		$userID = $_SESSION["userID"];
		$sql = "SELECT * FROM user WHERE userID='$userID'";
		foreach ($conn->query($sql) as $row) {
			$city = $row["city"];
			$education = $row["education"];
			$level = $row["difficulty_level"];
		}
		?>
		<div class="content">
			<h2>Ενημέρωση Δημογραφικών στοιχείων <button onclick="hideshow('information','information_b')" ><img src="images/right_icon.png" id="information_b"></button></h2>
			<div id="information" style="display:none;">
				<form action="information.php" method="post">
					<p>Πόλη:<input type="input" name="city" value="<?php echo $city; ?>"></p>
					<p>Εκπαίδευση:<select name="education" class="selection">
						<?php 
							$edus = ['Καμία','Δημοτικό','Γυμνάσιο','Λύκειο','Πανεπιστήμιο']; 
							for($i=0;$i<5;$i++){
								if ($education==$edus[$i])
									echo "<option value=".($i+1)." selected>".$edus[$i]."</option>";
								else
									echo "<option value=".($i+1).">".$edus[$i]."</option>";
							}
							?>
								</select></p>
					<input type="submit" value="Ενημέρωση">
				</form>
			</div>
		</div>

		<div class="content">
			<h2>Ρύθμιση επιπέδου δυσκολίας <button onclick="hideshow('level','level_b')" ><img src="images/right_icon.png" id="level_b"></button></h2>
			<div id="level" style="display:none;">
				<form action="level.php" method="post">
					<p>Επίπεδο δυσκολίας:<select name="level" class="selection">
						<?php 
							$levels = ['Όλα τα επίπεδα','Εύκολο','Μεσαίο','Προχωρημένο','Εύκολο έως Μεσαίο']; 
							for($i=0;$i<5;$i++){
								if ($level==$levels[$i])
									echo "<option value=".($i+1)." selected>".$levels[$i]."</option>";
								else
									echo "<option value=".($i+1).">".$levels[$i]."</option>";
							}
						?>
							</select>
					</p>
					<input type="submit" value="Ρύθμιση">
				</form>
			</div>
		</div>

		<div class="content">
			<h2>Αλλαγή Κωδικού Χρήσης <button onclick="hideshow('password','password_b')" ><img src="images/right_icon.png" id="password_b"></button></h2>
			<div id="password" style="display:none;">
				<form action="password.php" method="post">
					<p>Υπάρχον Κωδικός:<input type="password" name = "oldp"></p>
					<p>Νέος Κωδικός:<input type="password" name = "newp"></p>
					<input type="submit" value="Αλλαγή">
				</form>
			</div>
		</div>

		<div class="content">
			<h2>Αξιολόγηση</h2>
			<p><a href="rating.php">Αξιολογήστε<a> την εφαρμογή μας</p>
		</div>
	<?php } ?>

<?php include "endpage.php"; ?>