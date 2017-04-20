/**
 * Created by Tony-Li on 2016/3/15.
 * 公共基础包
 */
(function($){     
    /**
     * 项目请求路径
     */
	var url = "/supply-front";
    $.ProjectURL = function(){
    	return url;
    };
    /**
     * 异步请求基类
     * @returns {{type: string, url: string, data: string, dataType: string, error: Function, complete: Function, beforeSend: Function, success: Function}}
     */
    $.AjaxContent = function(){
        var content =  {
            type:"GET",
            url: '',
            data:'',
            dataType:"json",
            error:function(XMLHttpRequest,textStatus,errorThrown){
                //alert("error");
                //return initError(textStatus,errorThrown);
            },
            complete:function(){
                //alert("complete");
                //loadingHide();
            },
            beforeSend:function(){
                //alert("beforeSend");
                //return loadingShow(true);
            },
            success:function(result,textStatus){
            }
        };
        return content;
    };
    /**
     * Select列表自动填充基类函数
     * @param selectId
     * @param result
     * @param valueName
     * @param keshiName
     * @param isNoDefault
     * @constructor
     */
    $.AddItem = function(selectId, result, valueName, keshiName, isNoDefault){
       var select = $('#'+selectId);
        	select.html('');
        if(isNoDefault) {
            select.append($('<option value=""' + '>请选择</option' + '>'));
        }
        if(result != undefined && result.length != 0){
            for(var i = 0; i<result.length; i++){
                var option = $('<option value="'+result[i][valueName]+'">'+result[i][keshiName]+'</option'+'>');
                select.append(option);
            }

        }
    };
    /**
     * 判断对象是否为空,返回对应值
     * @param value
     * @returns {boolean}
     */
    $.IsNull = function(value) {
        if (value == undefined || value == null || value == '' || value == '-1') {
            return '';
        }
        return value;
    };
    /**
     * 判断对象是否为空,返回布尔值
     * @param value
     * @returns {boolean}
     */
    $.BooleanValue = function(value) {
        if (value == undefined || value == null || value == '' || value == '-1') {
            return true;
        }
        return false;
    };
    /**
     * 根据身份证判断性别
     * @param psidno
     * @returns {*}
     * @constructor
     */
    $.Getsex = function(psidno){
        var sexno,sex
        if(psidno.length==18){
            sexno=psidno.substring(16,17)
        }else if(psidno.length==15){
            sexno=psidno.substring(14,15)
        }else{
            alert("错误的身份证号码，请核对！")
            return false
        }
        var tempid=sexno%2;
        if(tempid==0){
            sex='2'
        }else{
            sex='1'
        }
        return sex
    };
    /**
     * 验证身份证
     * @param psidno
     * @returns {*}
     * @constructor
     */
    $.checkIdCardNo = function(idCardNo){
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        return check;
    };
    /**
     * 转换星期
     * @param day
     * @returns {*}
     */
    $.getWeek = function(day){
    	if(day == "0"){
            return "星期日";
        }else if(day == "1"){
            return "星期一";
        }else if(day == "2"){
            return "星期二";
        }else if(day == "3"){
            return "星期三";
        }else if(day == "4"){
            return "星期四";
        }else if(day == "5"){
            return "星期五";
        }else if(day == "6"){
            return "星期六";
        }else{
            return "错误数据";
        }
    };
    /**
     * json转str
     * @param obj
     * @returns {string}
     * @constructor
     */
    $.JsonToStr = function(obj){
        var str='{'
        for(var s in obj) {
            str+='"'+s+'":';
            str+='"'+obj[s]+'",';
        }
         str+='"a":"1"}';

        return str;
    };
    /**
     * 判断是否为空,返回"无"
     * @param value
     * @returns {boolean}
     */
    $.keyIsNull = function(value) {
        if (value == undefined || value == null || value == '' || value == "null") {
            return '<span style=\"visibility: hidden">占占</span>';
        }
        return value;
    };
    
    /**
     *日期转字符串
     * @param dateStr Date格式日期
     * @param splitStr 日期分隔符,如 2016-07-09 的分隔符是"-"
     * @return 字符串格式日期,格式yyyy-mm-dd
     */
    $.dateToString = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth()+1;//获取当前月份的日期
        var d = date.getDate();
        return y+"-"+m+"-"+d;
    };
    
    /**
     * 字符串转日期
     * @param dateStr 日期字符串
     * @param splitStr 日期分隔符,如 2016-07-09 的分隔符是"-"
     * @return Date格式日期
     */
    $.strToDate = function(dateStr, splitStr){
    	var array = dateStr.split(splitStr);
		var year = array[0];// 年
		var month = parseInt(array[1]) - 1;// 月
		var day = parseInt(array[2]);// 日
		return new Date(year, month, day)
    };
    /**
     * 日期加减
     * @param dateStr 日期字符串,格式yyyy-mm-dd
     * @param days 整数
     * @returns {Date}
     */
    $.dateDiff = function(dateStr, days) {
        var dd = $.strToDate(dateStr, "-");
        dd.setDate(dd.getDate()+days);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+"-"+m+"-"+d;
    };
    /**
     * json转字符串
     */
    $.JsonToStr = function(obj){
	    var str='{'
	    for(var s in obj) {
	        str+='"'+s+'":';
	        str+='"'+obj[s]+'",';
	    }
	    str+='}';
	    return str;
	};
    //设置radio选中，name:radio表单name，val：默认选中值
    $.setRadioChecked = function(name, val){
        var radios = document.getElementsByName(name);
        for(var i=0;i<radios.length;i++) {//循环
            if(radios[i].value==val){  //比较值
                radios[i].checked=true; //修改选中状态
                break; //停止循环
            }
        }
    };
    /**
     * 设置下拉菜单，name:下拉表单name, val:选中值
     */
    $.setSelectItem = function(name, val){
    	setTimeout(function() {
    		var aa = document.getElementById(name);
			var arryList = document.getElementById(name).options;
			 for (var i=0; i<arryList.length; i++) {//循环
				 if (arryList[i].value == val) {//比较值
					 arryList[i].selected = true;//修改选中状态
					break;//停止循环
				}
			} 
		}, 100); 
    };
    /**
     * 设置关联医院
     */
    $.setHospitalLabel = function(name, val){
    	if(val != ""){
    		setTimeout(function() {
        		$('#destHospitalLabel').val(val);//默认第一个关联医院
        		$("#destHospitalLabel").trigger("change");
        	}, 200);
    	}
    };
    /**
     * 判断数字是否为空
     */
    $.validNum = function(val){
    	if(val == undefined || val == "" || val == "0"){
    		return false;
    	}
    	return true;
    };
    /***
     * 设置是否生效单选框
     * @param val
     */
    $.setValid = function (val) {
        if(val == "1"){
            //$("#isValid").attr("checked", true);
            $("#isValid").prop("checked", "checked");
        }else if(val == "0"){
            //$("#isValid2").attr("checked", false);
            $("#isValid2").prop("checked", "checked");
        }
    };

})(jQuery);