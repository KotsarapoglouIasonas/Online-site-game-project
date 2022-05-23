<?php include "startpage.php"; ?>
<?php if (isset($_SESSION["userID"])){ ?>
	<div class="content">
		<h2>Καλωσήλθες</h2>
		<p>Ως εγγεγραμμένος χρήστης μπορείς να απολαύσεις τα παιχνίδια μας!</p>
	</div>
<?php }
else{
 ?>
<div class="content">
		<h2>Καλωσήλθες</h2>
		<p>Στον ιστότοπό μας μπορείς να παίξεις παιχνίδια σοβαρού σκοπού. Παρακαλώ συνδέσου ή εγγράψου και καλή διασκέδαση!!</p>
	</div>

<?php } ?>
	<?php if (!isset($_SESSION["username"])){ ?>
	<div class="content">
		<h2>Σύνδεση <button onclick="hideshow('login','login_b')" ><img src="images/right_icon.png" id="login_b"></button></h2>
		<form action="login.php" method="post" id="login" style="display:none;">
			<p>Όνομα χρήστη:<input type="text" name = "username"></p>
			<p>Κωδικός:<input type="password" name = "password"></p>
			<input type="submit" value="Σύνδεση">
		</form>
	</div>
	<div class="content">
		<h2>Εγγραφή <button onclick="hideshow('register','register_b')" ><img src="images/right_icon.png" id="register_b"></button></h2>
		<form action="register.php" method="post" id="register" style="display:none;">
			<p>Όνομα χρήστη:<input type="text" name = "username"></p>
			<p>Κωδικός:<input type="password" name = "password"></p>
			<p>Ημερομηνία γέννησης:<input type="date" name="bday"></p>
			<p>Φύλο:<select name="gender" class="selection">
							<option value="1">Άρεν</option>
							<option value="2">Θήλυ</option>
						</select></p>
			<p>Πόλη:<input type="input" name="city"></p>
			<p>Εκπαίδευση:<select name="education" class="selection">
							<option value="1">Καμία</option>
							<option value="2">Δημοτικό</option>
							<option value="3">Γυμνάσιο</option>
							<option value="4">Λύκειο</option>
							<option value="5">Πανεπιστήμιο</option>
						</select></p>
			<input type="submit" value="Εγγραφή">
		</form>
	</div>
		<?php } ?>

		
<?php include "endpage.php"; ?>
