<div id="sidebar">
		
			<div class="sidebar_item">
				<h3>Menu 
				<?php if (isset($_SESSION["username"])){ 
					echo "( ".$_SESSION["username"]." )";
				}
				else{
					echo "(Επισκέπτης)";
				}
				?> 
				</h3>
				<ul>
					<li><a href="index.php">Αρχική <?php if (!isset($_SESSION["username"])){ echo "Σύνδεση - Εγγραφή"; } ?></a></li>
					<?php if (isset($_SESSION["username"])){ ?>
						<li><a href="games.php">Παιχνίδια</a></li>
						<li><a href="settings.php">Ρυθμίσεις</a></li>
						<li><a href="logout.php">Αποσύνδεση</a></li>
						<?php }
					?> 
					<li><a href="aboutus.php">Δημιουργοί</a></li>
					<li><a href="links.php">Σύνδεσμοι</a></li>

				</ul>
			</div>

			
		
		</div>