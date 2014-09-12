;
/*
 * @method : jquery.init
 */
(function( $, window, document){
	'use strict';
	
	
	jrx.define('g', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('p', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('isString', function(obj){
		return $.type(obj) === 'string';
	});
	
	jrx.define('isNumber', function(obj){
		return $.type(obj) === 'number';
	});
	
	jrx.define('isBoolean', function(obj){
		return $.type(obj) === 'boolean';
	});
	
	jrx.define('isObject', function(obj){
		return $.type(obj) === 'object';
	});
	
	/*
	 * @define : validate
	 * @desc : init, extend validate
	 */
	jrx.define('validate.extend', function(){
		/*
        * @name : set jquery.validate extend
        * @depends : {plugin} jquery.validate
        */
       	if($.type($.fn.validate) === 'function'){
   		
            $.extend($.validator.messages, {
                required: "는(은) 필수 입력 항목입니다.",
                remote: "이 항목을 수정해주세요.",
                email: " 올바른 이메일형식으로 입력해주세요.",
                url: "http://을 포함한 올바른 URL 을 입력해주세요.",
                date: "올바른 날짜를 입력해주세요.",
                dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
                number: "올바른 값을 입력해주세요.",
                digits: "숫자만 입력이 가능합니다.",
                creditcard: "올바른 카드번호를 입력해주세요.",
                equalTo: "입력하신 내용이 일치하지 않습니다.",
                length: $.validator.format("{0} 자리로 입력해주세요."),
                maxlength: $.validator.format("{0}자 이하로 입력해주세요."),
                minlength: $.validator.format("{0}자 이상 입력해주세요."),
                rangelength: $.validator.format("{0}자 이상 {1}자 이하로 입력해주세요."),
                range: $.validator.format("{0} ~ {1} 사이의 값만 입력해주세요."),
                max: $.validator.format("{0} 이하의 값을 입력해주세요."),
                min: $.validator.format("{0} 이상의 값을 입력해주세요."),
                engnum : $.validator.format("영문 또는 숫자만 입력해주세요.."),
                count: $.validator.format("{0} 개 이상 등록되어야 합니다.")
            });            

            $.validator.addMethod('engnum', function(value, element, params){
                return this.optional(element) || jrx.regexp('engnum').test(value);
		    });

            $.validator.addMethod('length', function(value, element, params){
			    return this.optional(element) || value.length == element.getAttribute('length');
		    });
            
            // addMethod : count
    		$.validator.addMethod('count', function(value, element, params){
    			return this.optional(element) || value >= params[0];
    		});
       	}
	});
	
	/*
	 * @define : validate
	 * @desc : init, extend validate
	 */
	jrx.define('validate.init', function(){
		/*
        * @name : set jquery.validate extend
        * @depends : {plugin} jquery.validate
        */
       	if($.type($.fn.validate) === 'function'){
   			
   			$.extend($.validator.messages, {
                required: "는(은) 필수 입력 항목입니다.",
                remote: "이 항목을 수정해주세요.",
                email: " 올바른 이메일형식으로 입력해주세요.",
                url: "http://을 포함한 올바른 URL 을 입력해주세요.",
                date: "올바른 날짜를 입력해주세요.",
                dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
                number: "올바른 값을 입력해주세요.",
                digits: "숫자만 입력이 가능합니다.",
                creditcard: "올바른 카드번호를 입력해주세요.",
                equalTo: "입력하신 내용이 일치하지 않습니다.",
                length: $.validator.format("{0} 자리로 입력해주세요."),
                maxlength: $.validator.format("{0}자 이하로 입력해주세요."),
                minlength: $.validator.format("{0}자 이상 입력해주세요."),
                rangelength: $.validator.format("{0}자 이상 {1}자 이하로 입력해주세요."),
                range: $.validator.format("{0} ~ {1} 사이의 값만 입력해주세요."),
                max: $.validator.format("{0} 이하의 값을 입력해주세요."),
                min: $.validator.format("{0} 이상의 값을 입력해주세요."),
                engnum : $.validator.format("영문 또는 숫자만 입력해주세요.."),
                count: $.validator.format("{0} 개 이상 등록되어야 합니다.")
            });            

            $.validator.addMethod('engnum', function(value, element, params){
                return this.optional(element) || jrx.regexp('engnum').test(value);
		    });

            $.validator.addMethod('length', function(value, element, params){
			    return this.optional(element) || value.length == element.getAttribute('length');
		    });
            
            // addMethod : count
    		$.validator.addMethod('count', function(value, element, params){
    			return this.optional(element) || value >= params[0];
    		});
    		
            $.validator.setDefaults({
                ignore: '',
                onkeyup: false,
                onfocusout: false,
                focusInvalid: true,
                showErrors: function (errorMap, errorList) {

                    $.log('showErrors');
                    $.log(errorList);

                    if (errorList.length === 0) return false;

                    var labelWrap = $('<div />').addClass('label-lists'), textLabels = '', textAlert = '';

                    $.each(errorList, function (i, v) {
                        var _$element = $(v.element);
                        if (i != 0) return;
                        textLabels += $('<label />')
						    .attr('for', _$element.attr('id'))
						    .html('<strong>' + getMessage(_$element) + ' : </strong>' + (_$element.data('message') || v.message))
						    .appendTo(labelWrap);
                        if (i == 0) {
                            textAlert += getMessage(_$element) + (_$element.data('message') || v.message);
                        }
                    });

                    function getMessage(_$element) {
                        return _$element.data('title')
						    || $('[for=' + _$element.attr('id') + ']').text()
						    || _$element.parent('label').text()
						    || _$element.attr('placeholder')
						    || _$element.attr('name');
                    };

                    $.stateAlarm(textAlert);
                    return;
                },
                submitHandler: function (form) { form.submit(); }
            });
       	}
	});
	
})( jQuery, window, document );