/**
 * Created by Tony-Li on 2016/3/15.
 */
(function($){
    $.dictTypeAddApp = {
        init:function(){

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
	                       $.dictTypeAddApp.save(formData);
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
         * 保存字典类型
         * @param fromData
         */
        save:function(fromData){
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictTypeAdd.do";
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
