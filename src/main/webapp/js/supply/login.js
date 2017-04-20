
var login = {};

login.init = function(){
	/*if(!$.support.opacity){
		// IE8-
	}else */
	login.getCookie();
	
	if(/msie/.test(navigator.userAgent.toLowerCase())){
		// IE
		login.placeholder();
	}else{
		$("#account").focus();
	}
	
	$("#loginBtn").click(function(){
		login.submitForm();
	}).mouseover(function(){
		$(this).addClass("login-btn-hover");
	}).mouseout(function(){
		$(this).removeClass("login-btn-hover");		
	});
	
	$("#account, #password, #checkcode").keypress(function(e){
		if(e.which == 13){
			login.submitForm();
		}
	});
};

login.changeCheckcode = function(){
	$("#checkCodeImg").attr("src", "genCheckcode?d=" + new Date().getTime());
};

login.submitForm = function(){
	var account = $("#account").val();
	var password = $("#password").val();
	//var checkcode = $("#checkcode").val();
	var checkcode = '';
	
	if(!account){
		alert("请输入账号");
		return;
	}
	
	if(!password){
		alert("请输入密码");
		return;
	}
	
	//if(!checkcode){
	//	$.messager.alert("提示", "请输入验证码", "warn");
	//	return;
	//}
	
	$.post($.ProjectURL()+"/login.do", {"account" : account, "password" : Crypto.MD5(password), "checkcode" : checkcode}, function(data){
		if(data.appcode == 1){
			alert(data.databuffer);
			return;
		}
		
		var checked = $("#rememberPwd").is(":checked");
		if(checked){
	        $.cookie("account", account, {"expires" : 7});
	        $.cookie("password", $.base64.encode(password), {"expires" : 7});
		}else{   
	        $.cookie("password", null);   
		}
		
		window.location.href = $.ProjectURL()+"/system/main.do";
	}, "json");
};

login.getCookie = function(){
    var account = $.cookie("account");
    var password =  $.cookie("password");
    if(password){
       $("#rememberPwd").attr("checked", true);  
    }  
    if(account){
       $("#account").val(account);  
    }  
    if(password){
       $("#password").val($.base64.decode(password));  
    }  
};

login.placeholder = function(){
	$("#account").before('<input type="text" id="accountForIE" autocomplete="off" style="color: #aaa; display: none;" value="' + $("#account").attr("placeholder") + '"/>');
	$("#password").before('<input type="text" id="passwordForIE" autocomplete="off" style="color: #aaa; display: none;" value="' + $("#password").attr("placeholder") + '"/>');
	$("#checkcode").before('<input type="text" id="checkcodeForIE" autocomplete="off" style="color: #aaa; display: none; width: 75%;" value="' + $("#checkcode").attr("placeholder") + '"/>');
	$("#account, #password, #checkcode").blur(function(){
		if($(this).val() == ""){
			$(this).hide().prev().show();
		}
	});
	$("#accountForIE").focus(function(){
		$(this).hide();
		$("#account").show().focus();
	});

	$("#passwordForIE").focus(function(){
		$(this).hide();
		$("#password").show().focus();
	});

	$("#checkcodeForIE").focus(function(){
		$(this).hide();
		$("#checkcode").show().focus();
	});
	
	if($("#account").val() == ""){
		$("#account").hide();
		$("#accountForIE").show();
	}
	if($("#password").val() == ""){
		$("#password").hide();
		$("#passwordForIE").show();
	}
	if($("#checkcode").val() == ""){
		$("#checkcode").hide();
		$("#checkcodeForIE").show();
	}
};