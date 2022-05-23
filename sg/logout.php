<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php session_destroy(); ?>
<script>
	 alert("Έχεις αποσυνδεθεί. Αντίο!");window.location = "index.php";
</script>