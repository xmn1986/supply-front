/**
 * Created by Administrator on 2016/3/25.
 */
(function(){
    $.dictApp = {
        init : function(){

            $.dictApp.queryValidList();
            $.dictApp.queryDictTypeList();
            var columns = [
                {title : '主键',dataIndex :'id', width:'1%', visible : false},
                {title : '类型编码',dataIndex :'typeNo', visible : false},
                {title : '类型名称',dataIndex :'typeNo', width:'15%',elCls : 'center'},
                {title : '字典名称',dataIndex :'name', width:'20%',elCls : 'center'},
                {title : '字典值',dataIndex :'value', width:'20%',elCls : 'center'},
                {title : '状态',dataIndex :'isValid', width:'6%',elCls : 'center'},
                {title : '创建人',dataIndex :'createOperator', width:'10%',elCls : 'center'},
                {title : '更新时间',dataIndex :'updateTime', width:'15%',elCls : 'center'}
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
                    $.dictApp.add();
                });
            });
            
            var props = {
                formRender:"J_Form",//查询条件的所在的form渲染的div的id
                queryBtnRender:"sel_btn",//查询触发按钮的id
                render : "grid", //渲染grid的div的id
                dataUrl: $.ProjectURL()+"/config/dictListJson.do",
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
                        submitUrl: $.ProjectURL()+"/config/deleteDict.do", //提交后台地址, 当 operateType=0时不能为空
                        redictUrl: "" //页面跳转地址, 当 operateType=1时不能为空
                    },
                    {
                        name: "修改", //操作名称
                        operateType: "1", //操作类型: 0-ajax提交后台, 1-页面跳转
                        submitUrl: "", //提交后台地址, 当 operateType=0时不能为空
                        redictUrl: $.ProjectURL()+"/config/dictUpdatePage.do" //页面跳转地址, 当 operateType=1时不能为空
                    }
                ] //操作集合
            } ;
            var myGrid = new GridExt(props);
            myGrid.createGrid();
        },
        /***
         * 查询字典类型列表
         */
        queryDictTypeList : function () {
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/dictTypeList.do";
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
        /**
         * 添加字典
         */
        add:function(){
            window.location.href = $.ProjectURL()+"/config/dictAddPage.do";
        },
        /***
         * 查询启用/停用列表
         */
        queryValidList : function () {
            var aContent = $.AjaxContent();
            aContent.url = $.ProjectURL()+"/config/isValidList.do";
            aContent.data = {};
            aContent.success = function(result,textStatus){
                if(result.appcode != 0){
                    alert(result.databuffer);
                }else{
                    $.AddItem('isValid', result.result,'code','name',true);
                }
            };
            $.ajax(aContent);
        }
    }
})(jQuery);