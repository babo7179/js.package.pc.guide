;
/*
 *	jQuery number adjust 0.0.1
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : nAdjust
	 */
	$.fn.nAdjust = function(options) {
		
		var defaults = {
				number : 1,
				readonly : false
			},
            config = $.extend(true, defaults, options),     // extend default config form options.
        	btnInfo = [
    			{name : 'Plus', cls : 'ui-icon ui-icon-carat-1-n'},
    			{name : 'Minus', cls : 'ui-icon ui-icon-carat-1-s'}
    		];
        
        function getButtonSet () {
        	
        	var $btnSet = $('<div class="btn_set" style="float:left;"></div>');
        	
        	$.each(btnInfo, function (i, v){
        		$btnSet.append('<button class="' + v.cls + '">' + v.name + '</button>');
        	});
        	
        	return $btnSet;
        }
        
        return this.each(function (i, v) {
        	
        	var $input = $(v), 
        		$wrap = $input.parent(),
        		defaultNumber = $input.data('number') || config.number;
        	
        	$wrap.append(getButtonSet()).on('click', 'button', adjustHandler);
        	
        	$input.val(defaultNumber);
        	
        	if(config.readonly){
        		
        		$input.attr('readonly', true);
        		
        	} else {
        		
        		$input.on('keyup keydown', function(e){
        			
        			if(!$.isNumberKey(e)){
        				return false;
        			}
        		});
        	}
        	
        	function adjustHandler (e) {
        		
        		var $btn = $(this),
        			val = parseInt($input.val(), 10);
        		
        		if($btn.hasClass(btnInfo[0].cls)){
        			$input.val(val + 1);
        		} else {
        			if(val > config.number) {
        				$input.val(val - 1);
        			}
        		}
     	   	}
        });
	};
	

})( jQuery, window, document );