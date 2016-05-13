<?php
	if(isset($_POST['indice']) && $_POST['adresse'])	{
		exec('casperjs scraptracker.js '. $_POST['indice'] .' --adresse='. $_POST['adresse'], $reponse);
		$pattern = '/^http/i';
		if(preg_match($pattern, $reponse[0])) {
			echo '<a href="'. $reponse[0] .'" class="simple">'. $reponse[0] .'</a>';
		}
		else {
			echo '<a class="simple">Casper n\'a pas répondu, veuillez réessayer plus tard.</a>';
		}
	}
	else {
		echo '<strong>Problème de requête, veuillez réessayer.</strong>';
	}
?>
