<?php include "startpage.php"; ?>
<?php if (!isset($_SESSION["userID"])){ ?>
	<div class="content">
		<h2>Αξιολόγηση</h2>
		<p>Δεν μπορείς να μας αξιολογήσεις αν δεν είσαι συνδεδεμένος!</p>
	</div>
<?php }
else{
 ?>
	<div class="content">
		
		<?php if (!isset($_POST["submit"])){ $id=0;?>
			<h2>Αξιολόγηση</h2>
			<p>Θα πρέπει να απαντήσεις σε 10 ερωτήσεις για να μας αξιολογήσεις.</p>
			<p>Οι απαντήσεις είναι σε κλίμακα από 1 ως 5 όπου 1 = Διαφωνώ Απολύτως 5 = Συμφωνώ Απολύτως</p>
			<form action="rating.php" method="post">
			<input type="text" name="id" value="1" style="display:none">
			<input type="submit" value="Έναρξη" name="submit">
		</form>
	<?php }
		else{
			$id = $_POST["id"];
			if ($id<=1){
				;
			}
			else{
				$ans = $_POST["ans"];
				$ansid = $id-1;
				$userID = $_SESSION["userID"];
				$loginID = $_SESSION["loginID"];
				$insertanswersql = "INSERT INTO surveyanswer (qID, answer, userID, loginID)
    					VALUES ('$ansid', '$ans', '$userID', '$loginID')";
		    	$conn->exec($insertanswersql);
			}
			if ($id>10){
				?>
				<script>
					alert("Ευχαριστούμε για την αξιολόγηση. Η γνώμη σας είναι πολύτιμη!");window.location = "index.php";
				</script>
				<?php
			}
			$sql = "SELECT * FROM surveyquestion WHERE qID='$id'";
				foreach ($conn->query($sql) as $row) { ?>
					<h2>Αξιολόγηση - Ερώτηση <?php echo $id; ?></h2>
					<p><?php echo $row["description"] ?></p>
					<form action="rating.php" method="post">
						<span>Διαφωνώ απολύτως</span>
						<?php for($i=1;$i<=5;$i++){ ?>
							<input type=radio name="ans" value="<?php echo $i ?>" style="-webkit-appearance: checkbox;-moz-appearance: checkbox;height:2em;width:2em;" <?php if ($i==3){ echo "checked"; } ?> >
							<?php
						}
						?>
						<span>Συμφωνώ απολύτως</span>
						<input type="text" name="id" value="<?php echo $id+1;?>" style="display:none"><br/>
						<input type="submit" value="Επόμενη" name="submit">
					</form>
					<?php
				}
			} ?>


</div>
<?php } ?>
		
<?php include "endpage.php"; ?>
