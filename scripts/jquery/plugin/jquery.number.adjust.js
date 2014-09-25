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
				number : 0
			},
            config = $.extend(true, defaults, options);     // extend default config form options.
        
        var permitNegativeNumber = 1;
        
        
        // TODO :
        // 1. make button (plus, minus) > event handler
        // 2. read defaults number.
        // 3. 음수 허용 여부
        // 4. key event 로 음수 처리.
        
        // key insert 받을 건가?
        
        function getButtonSet () {
        	
        	var $btnSet = $('<div class="btn_set" style="float:left;"></div>');
        	var btnInfo = [
        			{name : 'Plus', cls : 'ui-icon ui-icon-triangle-1-n'},
        			{name : 'Minus', cls : 'ui-icon ui-icon-triangle-1-s'}
        		];
        	
        	$.each(btnInfo, function (i, v){
        		$btnSet.append('<button class="' + v.cls + '">' + v.name + '</button>');
        	});
        	
        	return $btnSet;
        }
        
        return this.each(function (i, v) {
        	
        	var $t = $(v), $wrap = $t.parent();
        	var defaultNumber = $t.data('number') || config.number;
        	
        	$wrap.append(getButtonSet()).on('click', 'button', adjustHandler);
        	
        	$t.val(defaultNumber);
        	
        	function adjustHandler (e) {
        		var $btn = $(this);
        		var val = parseInt($t.val(), 10);
        		
        		if($btn.hasClass('ui-icon-triangle-1-n')){
        			$t.val(val + 1);
        		} else {
        			if(val > 1) {
        				$t.val(val - 1);	
        			}
        		}
     	   	}
        	
        });
	};
	

})( jQuery, window, document );