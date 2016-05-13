function delegation(max, adresse) {
	for(var i=0; i<max; i++) {
		$('#envoi'+ i).on('click', {nbr : i}, function(evt) {
			var numero = evt.data.nbr;
			$.ajax({
				type: 'POST',
				data: { 
					'indice': numero,
					'adresse': adresse
				},
				url: 'adresse.php',
				mimeType: 'text/html; charset=utf-8',
				dataType: 'html',
				beforeSend: function() {
					$('#resultat'+ numero).html('<img src="bootstrap-3.3.6-dist/images/loader.gif"/>');
				},
				success: function(content, status, xhr){
					$('#resultat'+ numero).html(content);
				},
				error: function(xhr, status, error) {
					//$('#resultat'+ numero).html(xhr.status +' : '+ error);
					$('#resultat'+ numero).html('Pas de réponse, veuillez réessayer plus tard.');
				}
			});
		});
	}
}

$(document).ready(function(event) {
	$('#envoi').on('click', function() {
		var form = $('#formulaire');
		var adresse = $('#article option:selected').val();
		var nombre = $('#nombre option:selected').val();
		$.ajax({
			type: 'POST',
			url: 'recherche.php',
			mimeType: 'text/html; charset=utf-8',
			data: form.serialize(),
			dataType: 'html',
			beforeSend: function() {
				$('#resultat').html('<img src="bootstrap-3.3.6-dist/images/loader.gif"/>');
			},
			success: function(content, status, xhr){
				$('#resultat').html(content);
				delegation(nombre, adresse);
			},
			error: function(xhr, status, error) {
				$('#resultat').html(xhr.status +' : '+ error);
			}
		});
	});
});
