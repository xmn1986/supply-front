/**
 * Created by Tony-Li on 2016/3/15.
 */
(function($){
    $.dictTypeUpdateApp = {
        _isValid : "",
        init:function(id){

            $.dictTypeUpdateApp.fileForm(id);

        	BUI.use('bui/form',function(Form){
                var form = new Form.HForm({
                    srcNode : '#J_Form',
                    defaultChildCfg : {
                        validEvent : 'blur' //移除时进行验证
                    }
                });
                form.render();
                
                $("#save_btn").on("click",function(){
                	var formData = form.serializeToObject();
                	if(form.isValid()){
	                       $.dictTypeUpdateApp.save(formData);
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
        /***
         * 填充表单
         * @param id zhujianID
         */
        fileForm:function (id) {
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictTypeDetail.do";
            aContent.data = {"id":id};
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert("查询字典类型明细失败."+result.databuffer)
                }else{
                    var dictTypeDtl = result.result;
                    $("#id").val(dictTypeDtl.id);
                    $("#code").val(dictTypeDtl.code);
                    $("#name").val(dictTypeDtl.name);
                    $("#description").val(dictTypeDtl.description);
                    $.dictTypeUpdateApp._isValid = dictTypeDtl.isValid;
                    /*setTimeout(function() {
                        $.setValid(dictTypeDtl.isValid);
                    }, 1000);*/

                }
            };
            $.ajax(aContent);
        },
        /***
         * 保存字典类型
         * @param fromData
         */
        save:function(fromData){
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictTypeUpdate.do";
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
