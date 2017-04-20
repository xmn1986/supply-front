/**
 * Created by Tony-Li on 2016/3/15.
 */
(function($){
    $.outerSysPorcessDefAddApp = {
    		_outerSystems : '',//外部系统信息列表
    		_procDefIds : "",//流程定义列表
    		init:function(outerSystems, procDefIds){
    			this._outerSystems = outerSystems;
    			this._procDefIds = procDefIds;
	        	//初始化数据字典
	            $.outerSysPorcessDefAddApp.queryDict();
	            
	        	BUI.use(['bui/form', 'bui/calendar'], function(Form,Calendar) {
	        		// 手机号验证
					Form.Rules.add({
						name : 'mobile', // 规则名称
						validator : function(value) { // 验证函数，验证值、基准值、格式化后的错误信息
							var regexp = new RegExp(/^(((1[3-7][0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
							if (!regexp.test(value)) {
								return '手机号码格式错误';
							}
						}
					});
	                var form = new Form.HForm({
	                    srcNode : '#J_Form',
	                    defaultChildCfg : {
	                        validEvent : 'blur' //移除时进行验证
	                    }
	                });
	                form.render();
	                
	                var datepicker1 = new Calendar.DatePicker({
						trigger : '#birthday',
						maxDate : $.dateToString(new Date),//医生生日最大不能超过当天
						autoRender : true
					});
	                
	                $("#outerSysNo").on("change",function(){
	                	var aContent = $.AjaxContent();
	                    aContent.data = {"outerSysNo":$("#outerSysNo").val()};
	                    aContent.url = $.ProjectURL()+"/system/selectProcessType.do";
	                    aContent.success = function(result,textStatus){
	                        if(result.appcode != 0){
	                            alert(result.databuffer);
	                        }else{
	                            var re = result.result;
	                            $.AddItem('processTypeId', re , 'id', 'value',true);
	                            $("#processTypeId").removeAttr("disabled");
	                        }
	                    };
	                    $.ajax(aContent);
	                });
	                
	                $("#save_btn").on("click",function(){
	                    var formData = form.serializeToObject();
	                	if(form.isValid() && $.doctorAddApp.checkFrom()){
	                       $.doctorAddApp.save(formData);
	                   } 
	                });
	                
	                $("#btn_list").on("click",function(){
	                	window.history.go(-1);
	                });
	                $("#reset_btn").on("click",function(){
	                    var currentUrl = window.location.href;
	                    window.location.href = currentUrl;
	                });
            	});
        },
        queryDict:function(){
        	$.AddItem('outerSysNo', this._outerSystems,'outerSysNo','outerSysName',true);
        	$.AddItem('procDefId', this._procDefIds,'id','processName',true);
        },
        queryDepart:function(businessType){
        	var hospitalId =  $("#hospitalId").val();
            var aContent = $.AjaxContent();
            aContent.data = {"hospitalId":hospitalId,"businessType":businessType};
            aContent.url = $.ProjectURL()+"/hospital/depList.do";
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert(result.databuffer);
                }else{
                    var re = result.result;
                    $.AddItem('deptId', re , 'innerDeptId', 'name',true);
                    $("#deptId").removeAttr("disabled");
                }
            };
            $.ajax(aContent);
        },
        save:function(fromData){
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/hospital/doctorAdd.do";
            aContent.data = fromData;
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert(result.databuffer);
                }else{
                	window.history.go(-1);
                }
            };
            $.ajax(aContent);
        }
    };
})(jQuery);
