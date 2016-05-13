<?php
	function recherche($article) {
		exec('rm trackers.json; casperjs twengalist.js '. $article .' --nombre='. $_POST['nombre'], $reponse);
		if(sizeOf($reponse)/6) {
			$max = sizeOf($reponse)/6;
			for($i=0;$i<$max;$i++) {
				echo '<div class="row">';
					echo '<div class="col-lg-12 centre">';
						echo '<div class="row">';
							echo '<div class="col-lg-8 col-lg-offset-2">';
								echo '<div class="row">';
									echo '<div class="col-lg-6">';
										echo '<img src="'. $reponse[$i+($max*2)] .'"/>';
									echo '</div>';
									echo '<div class="col-lg-6 hauteur3">';
										echo '<div id="envoi'. $i .'" class="pointer" title="Adresse de la page"><img src="'. $reponse[$i+($max*5)] .'"/></div>';
									echo '</div>';
									echo '<div class="col-lg-6 hauteur2">';
										echo '<span>'. $reponse[$i+($max*4)] .'</span><br/>(cliquer sur le logo pour obtenir l\'adresse de la page)';
										echo '<br/>';
										echo '<span><strong>'. $reponse[$i+($max*3)] .'</strong></span>';
									echo '</div>';
									echo '<div class="col-lg-6 hauteur1 lienbas">';
										echo '<a class="bouton" href="'. $reponse[$i+($max)] .'" target="_blank">Voir l\'offre</a>';
									echo '</div>';
								echo '</div>';
							echo '</div>';
						echo '</div>';
						echo '<div class="row">';
							echo '<div class="col-lg-12" id="resultat'. $i .'">';
							echo '</div>';
						echo '</div>';
						echo '<div class="row">';
							echo '<div class="col-lg-12">';
								echo '<span><h5>'. $reponse[$i] .'</h5></span>';
							echo '</div>';
						echo '</div>';
					echo '</div>';
				echo '</div>';
				echo '<br/><br/><br/><br/><br/>';
			}
		}
		else {
			echo '<strong>Connexion refusée car le robot est repéré.</strong>';
		}
	}
	if(isset($_POST['article']) && isset($_POST['nombre']))	{
		recherche($_POST['article']);
	}
	else {
		echo '<strong>Problème de requête, veuillez réessayer.</strong>';
	}
?>
