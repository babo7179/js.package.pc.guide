(function( $, window, document){
	$(function(){
				
		var $logo = $('#header_logo'),
			$gnb = $('#nav'),
			$lnb = $('#lnb'),
			$contents = $('#contents'),
			$page = $contents.find('.sub-content');
			
		$.validate.init();
		
		//===================== global initialize ====================
		$logo.on('click', function () {
			location.href = '/';
			return false;
		});
		
		$contents.on('click', '#top', function(){
			location.href = "#";
			contentsScrollTop();
			return false;
		});
		//============================================================
		
		
		//========================== menu ============================
		var url = $.config('root') + 'temp/json/menu.json';
		
		$.ajax({
	        url : url,
	        dataType : 'json'
	    }).done(function (r) {
	        $gnb.navi({lnb : $lnb, page:$page, data : r.menu});
	    });
	    
	    $gnb.on('click', 'a', navigationHandler);
	    $lnb.on('click', 'a', navigationHandler);
	    
	    function navigationHandler () {
	    	
	    	var $this = $(this);
	    	
	    	if($this.hasClass('on')) return false;
	
			if($lnb.has($this).length){
				$this.parent().addClass('on').siblings().removeClass('on');
				contentsScrollTop();	
			}
	    }
		//============================================================
		
		//======================== functions =========================
		function contentsScrollTop() {
			$contents.find('.content-area').scrollTop(0);
		}
		//============================================================
		
	});
})( jQuery, window, document );

(function( $, window, document){
	$.ready(function(){
		$.log('ready?');
	});
})( jQuery, window, document );