<!DOCTYPE html>
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<link rel="stylesheet" href="bootstrap-3.3.6-dist/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="bootstrap-3.3.6-dist/css/twenga.css"/>
		<title>Twenga scrap</title>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-lg-6 col-lg-offset-3">
					<h1>Sélections Twenga</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6 col-lg-offset-3">
					<form id="formulaire">
						<ul class="form-style-1">
							<li>
								<label>Choisir un article <span class="required">*</span></label>
								<select id="article" name="article" class="field-long">
								  <option value="http://www.twenga.fr/theiere.html">Théières</option> 
								  <option value="http://www.twenga.fr/cafetiere.html">Cafetières</option>
								  <option value="http://www.twenga.fr/percolateur.html">Percolateurs</option>
								  <option value="http://www.twenga.fr/blender.html">Blenders</option>
								  <option value="http://www.twenga.fr/mixeur-plongeant.html">Mixeurs plongeants</option>
								  <option value="http://www.twenga.fr/batteur.html">Batteurs</option>
								</select>
							</li>
							<li>
								<label>Nombre d'offres <span class="required">*</span></label>
								<select id="nombre" name="nombre" class="field-long">
									<?php
										for($i=0; $i<10; $i++) {
											echo '<option value="'. ($i+1) .'">'. ($i+1) .'</option>';
										}
									?>
								</select>
							</li>
							<li>
								<input type="button" id="envoi" value="Voir"/>
							</li>
						</ul>
					</form>
					<br/><br/>
				</div>
			</div>
			<div id="resultat"><div>
		</div>
		<script src="bootstrap-3.3.6-dist/js/jquery-2.1.4/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="bootstrap-3.3.6-dist/js/requetes.js"></script>
	</body>
</html>
