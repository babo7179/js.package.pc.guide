;
/*	
 *	jQuery extends
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : starScore
	 */
	$.fn.starScore = function( options ) {
		var defaults = {
				target : ''
			},                                  			// default config info.
        	config = $.extend(true, defaults, options),     // extend default config form options.
			clsName = 'active';
		
		return this.each(function (i, v) {
    		
    		var $score = $(v),
    			$input = $($score.data('target'));
    		
    		$score.find('button').on('click mouseover', eventHandler);
    		
    		$score.on('mouseleave', function() {
    			
    			var val = $score.data('score') || 0;
    			
    			if(val == 0) {
    				$score.find('button').removeClass(clsName);
    			} else {
    				$score.find('button').each(function (i, v) {
        				var $btn = $(this);
        				
        				if(val == $btn.val()){
        					btnActive($btn);
        					return;
        				}
        			});
    			}
    		});
    		
    		function eventHandler(e) {
    			
    			var $btn = $(this);
    			
    			btnActive($btn);
    			
    			if(e.type == 'click'){
    				setValue($btn.val());
    			}
    			
    			return false;
    		}
    		
    		function btnActive ($b) {
    			$b.addClass(clsName).nextAll().addClass(clsName);
				$b.prevAll().removeClass(clsName);
    		}
    		
    		function setValue (val) {
    			$score.data('score', val);
    			$input.val(val);
    		}
    	});
	};
	
	/** 
	 * @name : itemListControl
	 * @desc : 
	 * mouseover, focusin : add active class
	 * mouseout, focusout : remove active class
	 * check box checked : add selected class
	 * click cart : open cart layer
	 * quantity minus/plus.
	 */
	$.fn.itemListControl = function( options ) {
		var defaults = {
				item : '.item',
				layer : '.layer-option',
				clsActive : 'active',
				clsSelected : 'selected',
				duration : 150
			},                                  			// default config info.
        	config = $.extend(true, defaults, options),     // extend default config form options.
			$list = this,
			$items = this.find(config.item),
			$layers = $items.find(config.layer);
		
		function closeAllCart () {
			// $.log('closeAllCart');
			$list.find(config.layer).hide();
		}
		
		$items.on('click', ' a.cart', function (e) {
    			    		
    		var $btnCart = $(this),
    			$item = $btnCart.closest(config.item);
			
			if($item.find('>.layer-option').css('display') == 'none') {
				closeAllCart();
			}
			
			$item.find('>.layer-option').fadeToggle(config.duration);
			
			return false;	    	
		});
		
		$items.find('>.layer-option a.close').on('click', outHandler);
		
		function outHandler(e) {
			
			$(this).closest(config.item).find('>.layer-option').hide();
			return false;
		}
		
		$items.on('click', 'div.prd-select > input', function (e) {
    			    		
    		var $chk = $(this),
    			$item = $chk.closest(config.item);
    		
    		if($chk.is(':checked')){
    			$item.addClass(config.clsSelected);
    		} else {
    			$item.removeClass(config.clsSelected);
    		}	
		});
		
		$items.on('mouseover focusin', function (e) {
			
    		$(this).addClass(config.clsActive);
    		return false;
		});
		
		$items.on('mouseleave focusout', function (e) {
			
    		$(this).removeClass(config.clsActive);
			
			$(this).closest(config.item).find('>.layer-option').fadeOut(config.duration);
			return false;
		});
		
		// quantity minus/plus.
		if($.isFunction($.fn.nAdjust)){
			$items.find('input[name=goods_quantity]').nAdjust({
				readonly:false
			});
		}
	};
	
})(jQuery, window, document);
