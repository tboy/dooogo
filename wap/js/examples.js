(function($) {

  
    $(function() {
        $("#hide-rest-slider")
            .slider({ max: 3, range: true, values: [0, 3] })
            .slider("pips", {
                rest: false
            });

    });
	
	
	

}(jQuery));