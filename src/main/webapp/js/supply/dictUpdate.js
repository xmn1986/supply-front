/**
 * Created by Tony-Li on 2016/3/15.
 */
(function($){
    $.dictUpdateApp = {
        _isValid : "",
        init:function(id){

            $.dictUpdateApp.fileForm(id);
            $.dictUpdateApp.queryDictTypeList();

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
	                       $.dictUpdateApp.save(formData);
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
            aContent.url = $.ProjectURL()+"/config/dictDetail.do";
            aContent.data = {"id":id};
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert("查询字典类型明细失败."+result.databuffer)
                }else{
                    var dictDtl = result.result;
                    $("#id").val(dictDtl.id);
                    $("#name").val(dictDtl.name);
                    $("#value").val(dictDtl.value);
                    $.dictUpdateApp._isValid = dictDtl.isValid;
                    $.setSelectItem("typeNo",dictDtl.typeNo);//自动加载
                }
            };
            $.ajax(aContent);
        },
        /***
         *查询字典类型列表
         */
        queryDictTypeList : function () {
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictTypeSelectList.do";
            aContent.data = {};
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert(result.databuffer);
                }else{
                    $.AddItem('typeNo', result.result,'code','name',true);
                }
            };
            $.ajax(aContent);
        },
        /***
         * 保存字典
         * @param fromData
         */
        save:function(fromData){
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictUpdate.do";
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
