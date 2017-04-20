/**
 * Created by Administrator on 2016/3/25.
 */
(function(){
    $.processDefListApp = {
		/*_businessTypeArray:'',//业务类型列表,0:门诊转诊;1:检查转诊; 2:住院转诊;3:急诊转诊;4:手术转诊
		_doctorTypeArray:'',//医生级别
		_hospitalArray:'',//医院列表*/
        init : function(){
        	/*this._businessTypeArray = businessTypeArray;
   			this._doctorTypeArray = doctorTypeArray;
    		this._hospitalArray = hospitalArray;       	
        	//初始化数据字典
            $.doctorListApp.queryDict();
            
            $("#hospitalId").on("change",function(){
                var hospitalId = $("#hospitalId").val();
                //$("#hospitalName").val($("#hospitalId option:selected").text()+"");
                if(hospitalId == ""){
                	$("#businessType").attr("disabled","disabled");
                	$("#deptId").attr("disabled","disabled");
                }else{
                	$("#businessType").removeAttr("disabled");
                }
            });
            $("#businessType").on("change",function(){
                var businessType = $("#businessType").val();
                var hospitalId = $("#hospitalId").val();
                if(businessType == ""){
                	$("#deptId").attr("disabled","disabled");
                	return;
                }else{
                	$("#deptId").removeAttr("disabled");
                }
                $.doctorListApp.queryDepart(hospitalId,businessType);
            });*/
            
            var columns = [
                {title : '流程ID',dataIndex :'id', width:'15%',elCls : 'center'},  
                {title : '流程名称',dataIndex :'name', width:'15%',elCls : 'center'}, 
                {title : '流程类别',dataIndex :'category', width:'10%',elCls : 'center'},
                {title : 'bpmn文件',dataIndex :'resourceName', width:'25%',elCls : 'center'},
                {title : '描述',dataIndex :'description', width:'20%',elCls : 'center'},
                {title : '是否挂起',dataIndex :'suspensionState', width:'5%',elCls : 'center'}
            ];

            BUI.use('bui/form',function(Form){
                var form = new Form.HForm({
                    srcNode : '#J_Form',
                    defaultChildCfg : {
                        validEvent : 'blur' //移除时进行验证
                    }
                });
                form.render();
                
                $("#add_btn").on("click",function(){
                    $.doctorListApp.add();
                });
            });
            
            var props = {
                formRender:"J_Form",//查询条件的所在的form渲染的div的id
                queryBtnRender:"sel_btn",//查询触发按钮的id
                render : "grid", //渲染grid的div的id
                dataUrl: $.ProjectURL()+"/process/processDefListJson.do",
                columns: columns, //列定义数字
                plugins: [], //表格插件
                autoLoad: true, //自动加载数据：true/false
                pageSize: 10,	// 配置分页数目
                remoteSort:true, //是否远程排序：true/false
                pagingBar: true, //是否分页：true/false
                storeParams:{},
                primaryKey: "id", //数据主键Id
                handlerCollections: [
                    {
                        name: "删除", //操作名称
                        confirm:"1", //是否弹出确认窗口:0-否,1-是
                        operateType: "0", //操作类型: 0-ajax提交后台, 1-页面跳转
                        submitUrl: $.ProjectURL()+"/hospital/doctorDelPage.do", //提交后台地址, 当 operateType=0时不能为空
                        redictUrl: "" //页面跳转地址, 当 operateType=1时不能为空
                    },
                    {
                        name: "修改", //操作名称
                        operateType: "1", //操作类型: 0-ajax提交后台, 1-页面跳转
                        submitUrl: "", //提交后台地址, 当 operateType=0时不能为空
                        redictUrl: $.ProjectURL()+"/hospital/doctorUpdatePage.do" //页面跳转地址, 当 operateType=1时不能为空
                    }
                ] //操作集合
            } ;
            var myGrid = new GridExt(props);
            myGrid.createGrid();
        },
        queryDict:function(){
        	$.AddItem('hospitalId', this._hospitalArray,'code','name',true);
        	$.AddItem('doctorType', this._doctorTypeArray,'code','name',true);        	
        	$.AddItem('businessType', this._businessTypeArray,'code','name',true);
        	$.AddItem('deptId', "",'code','name',true);
        	$("#businessType").attr({"disabled":"true"});
        	$("#deptId").attr({"disabled":"true"});
        }
        /*,
        queryDepart:function(hospitalId,businessType){
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
        add:function(){
        	window.location.href = $.ProjectURL()+"/hospital/doctorAddPage.do";
        } */
    }
})(jQuery);