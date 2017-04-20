/**
 * 参数：paramDict
 * {
        render : "grid", //渲染grid的div的id
        formRender:"form",//查询条件的所在的form渲染的div的id
        queryBtnRender:"query_btn",//查询触发按钮的id
   		dataUrl: "http://localhost:8080/xxx.json",  //store数据地址
  	    columns: [], //列定义数字
  	    plugins: ["RadioSelection", "CheckSelection"], //表格插件: 比如RadioSelection表示单选按钮，对应Grid.Plugins.RadioSelection,  CheckSelection表示多选选按钮，对应Grid.Plugins.CheckSelection, 
        autoLoad: true, //自动加载数据：true/false
        pageSize: 10,	// 配置分页数目
        remoteSort:true, //是否远程排序：true/false
        pagingBar: true, //是否分页：true/false
        storeParams:{"flag":"1"},//分页查询外加参数
        primaryKey: "", //数据主键Id
	     extColums: [//拓展列，主要用来做一些列里面可以操作和跳转页面等操作性功能,每个操作对应一个列
	    	{
	    		title: "列标题", 
	    		column:"name",//对应列字段
	    		confirm:"0", //是否弹出确认窗口:0-否,1-是
	    		operateType: "0", //操作类型: 0-ajax提交后台, 1-页面跳转
	    		submitUrl: "http://localhost:8080/test/test.do", //提交后台地址, 当 operateType=0时不能为空
	    		redictUrl: "", //页面跳转地址, 当 operateType=1时不能为空
	    		params:["name","sex"]//url参数数组。参数名称必须是store中record里包含的。当数据为空时，表示传所有record中的参数
	    	},
        	....
          ],
        handlerColumnTitle:"操作",//操作栏标题
        handlerCollections: [
        	//操作列集合，主要用来做一些列里面可以操作和跳转页面等操作性功能。
        	 //不同用于extColums，extColums每个操作对应一个列，handlerCollections中所有操作都在一个列里面
        	{
        		name: "新增", //操作名称,当nameType=0时是定值,当nameType=1时是列对应的key
        		confirm:"0", //是否弹出确认窗口:0-否,1-是
        		operateType: "0", //操作类型: 0-ajax提交后台, 1-页面跳转
        		submitUrl: "http://localhost:8080/test/test.do", //提交后台地址, 当 operateType=0时不能为空
        		redictUrl: "", //页面跳转地址, 当 operateType=1时不能为空
        		params:["name","sex"]//url参数数组。参数名称必须是store中record里包含的。当数据为空时，表示传所有record中的参数
        	},
        	{
        		name: "name", //操作名称,当nameType=0时是定值,当nameType=1时是列对应的key
        		confirm:"0", //是否弹出确认窗口:0-否,1-是
        		operateType: "1", //操作类型: 0-ajax提交后台, 1-页面跳转
        		submitUrl: "", //提交后台地址, 当 operateType=0时不能为空
        		redictUrl: "http://www.baidu.com", //页面跳转地址, 当 operateType=1时不能为空
        		params:["name","sex"]//url参数数组。参数名称必须是store中record里包含的。当数据为空时，表示传所有record中的参数
        	},
        	....
        ] 
   }
 */
 function GridExt(paramDict){
	this.render = paramDict['render'];
	this.formRender = paramDict['formRender'];
	this.queryBtnRender = paramDict['queryBtnRender'];
	this.dataUrl = paramDict['dataUrl'];
	this.columns = paramDict['columns'];
	this.plugins = paramDict['plugins'];
	this.autoLoad = paramDict['autoLoad'];
	this.pageSize = paramDict['pageSize'];
	this.remoteSort = paramDict['remoteSort'];
	this.pagingBar = paramDict['pagingBar'];
	this.storeParams = paramDict['storeParams'];
	this.primaryKey = paramDict['primaryKey'];
	this.extColums = paramDict['extColums'];
	this.handlerColumnTitle = paramDict['handlerColumnTitle'];
	this.handlerCollections = paramDict['handlerCollections'];
}


/**
 * 创建gird
 */
GridExt.prototype.createGrid = function() {
	var _self = this;
	BUI.use(['bui/grid','bui/data','bui/toolbar','bui/form'],function(Grid,Data,Toolbar,Form){
		var Grid = Grid, Store = Data.Store;
		/**
		 * 创建Data数据源
		 */
		var store = new Store({
			url : _self.dataUrl,
			autoLoad : _self.autoLoad, // 自动加载数据
			pageSize : _self.pageSize, // 配置分页数目
			remoteSort : _self.remoteSort, //配this置远程排序
			params : _self.storeParams //分页查询外加参数
		});
		
		$(store).attr("id","吴东雄");
		
		/**
		 * 生成拓展列方法
		 */
		var extColumsFuncs = [];
		if(_self.extColums){
			var columns = new Array();
			for(var i=0; i< _self.extColums.length; i++){
				var column = _self.extColums[i];
				var funcName = "column" + i;
				var columnTitle = column["title"];
				var columnKey = column["column"];
				var width = column["width"];
				column['funcName'] = funcName;
				extColumsFuncs.push(column);
				var _cls = "grid-command " + funcName;
				var handColumn ={title : columnTitle, dataIndex :columnKey, width:width, elCls : 'left', renderer : function(value, obj){
					return '<span class="'+_cls+'">'+value+'</span>';
	            }};
	         columns.push(handColumn);
			}
			/*
			 * 将_self.columns中列放入新数组中,此操作目的是将添加的扩展列放到前面显示
			 */
			for(var i=0; i< _self.columns.length; i++){
				var column = _self.columns[i];
				columns.push(column);
			}
			_self.columns = columns;
		}
		
		/**
		 * 生成操作栏方法
		 */
		var handlerFuncs = []; //操作方法数组
		var handStr = "";
		for(var i=0; i< _self.handlerCollections.length; i++){
			var handlerItem = _self.handlerCollections[i];
			var funcName = "hander" + i;
			handlerItem['funcName'] = funcName
			handlerFuncs.push(handlerItem);
			var _cls = "grid-command " + funcName;
			handStr += '<span class="'+_cls+'">'+_self.handlerCollections[i].name+'</span>';
		}
		
		if(_self.handlerCollections.length > 0){
			var title =  "操 作";
			if(_self.handlerColumnTitle){
				title = _self.handlerColumnTitle;
			}
			var handColumn ={title : title, dataIndex :'d', width:'15%',elCls : 'center',renderer : function(value, obj){
				return handStr;
            }};
			_self.columns.push(handColumn);
		}
		
		/**
		 * 判断表格是否有插件
		 */
		var plugins = [];
		if(_self.plugins.length > 0){//添加表格插件
			for(var i=0; i<_self.plugins.length; i++){
				if(_self.plugins[0] == "RadioSelection"){ //表格添加单选按钮
					plugins.push(Grid.Plugins.RadioSelection);
				}else if(_self.plugins[0] == "CheckSelection"){ //表格添加多选按钮
					plugins.push(Grid.Plugins.CheckSelection);
				}
			}
		}
		
		/**
		 * 创建grid表格
		 */
		var grid = new Grid.Grid({
			render : '#'+_self.render,
			columns : _self.columns,
			loadMask : true, // 加载数据时显示屏蔽层
			store : store,
			// 底部工具栏
			bbar : {
				pagingBar :  _self.pagingBar
			},
			plugins: plugins
		});
		grid.render();
		//移除空列头
		$(".bui-grid-hd-empty").remove();
		
		//移除空列
		grid.on("aftershow", function(){
			$(".bui-grid-cell-empty").each(function(index,element){
				$(element).remove();
			});
		});
		
		/**
		 * 添加操作触发事件
		 */
		if(handlerFuncs.length > 0){
			grid.on("cellclick",function(ev){
				var css = ev.domTarget.className;
	        	var record = ev.record;
				for(var i=0; i<handlerFuncs.length; i++){
					var handlerFunc = handlerFuncs[i];
					var _cls = "grid-command " + handlerFunc.funcName;
					var operateType =handlerFunc.operateType; //操作类型: 0-ajax提交后台, 1-页面跳转
					var confirm = handlerFunc.confirm; //是否弹出确认窗口:0-否,1-是
					if(ev.domTarget.className == _cls){
						handlerInvoke(handlerFunc, record, store,_self.storeParams);
		        	}
				}
	        });
		}
		
		/**
		 * 添加扩展列触发事件
		 */
		if(extColumsFuncs.length > 0){
			grid.on("cellclick",function(ev){
				var css = ev.domTarget.className;
	        	var record = ev.record;
				for(var i=0; i<extColumsFuncs.length; i++){
					var column = extColumsFuncs[i];
					var _cls = "grid-command " + column.funcName;
					var operateType =column.operateType; //操作类型: 0-ajax提交后台, 1-页面跳转
					var confirm = column.confirm; //是否弹出确认窗口:0-否,1-是
					var curCls = ev.domTarget.className;
					if(!curCls){//如果表格里内容的class为空，那么取父类dom的class
						curCls = $(ev.domTarget).parent().attr("class");
					}
					if(curCls == _cls){
						handlerInvoke(column, record, store,_self.storeParams);
		        	}
				}
	        });
		}
		
		/**
		 * 查询条件Form表单处理
		 */
		if(_self.formRender != ""){
			var form = new Form.HForm({
                    srcNode : '#'+_self.formRender,
                    defaultChildCfg : {
                        validEvent : 'blur' //移除时进行验证
                    }
                });
            form.render();
            
            //点击查询按钮
			$("#"+_self.queryBtnRender).on("click", function(){
				var formData = form.serializeToObject();
				//将store的附加查询参数带上
				for(var key in _self.storeParams){
					formData[key] = _self.storeParams[key]
				}
				store.load(form.serializeToObject());
			});
			
		}
	});	
	
}

function handlerInvoke(handlerFunc, record,store,storeParams){
	var operateType = handlerFunc.operateType;
	var confirm = handlerFunc.confirm; //是否弹出确认窗口:0-否,1-是
	var params = {};
	//组装url参数
	if(handlerFunc.params){
		if(handlerFunc.params.length > 0){
			for(var i=0; i<handlerFunc.params.length; i++){
				params[handlerFunc.params[i]] = record[handlerFunc.params[i]];
			}
		}else{
			params = record;
		}
	}else{
		params = record;
	}
	//将附加查询参数添加到参数params中
	for(var key in storeParams){
		params[key] = storeParams[key]
	}
	if(confirm != undefined && confirm == "1"){
		var msg = "确认要"+handlerFunc.name+"吗?";
		BUI.Message.Confirm(msg,function(){
			excute(operateType, handlerFunc, params,store);
		},'question');
	}else{
		excute(operateType, handlerFunc, params,store);
	}
}

function excute(operateType, handlerFunc, record,store){
	if(operateType == "0"){
		$.ajax({
			   type: "POST",
			   url:  handlerFunc.submitUrl,
			   data: record,
			   success: function(result){
				   result = eval('(' + result + ')');
			   	 if(result.appcode == "0"){
			   	 	BUI.Message.Alert(result.databuffer,'info');
			   	 	store.load();
			   	 }else{
			   	 	BUI.Message.Alert(result.databuffer,'warning');
			   	 }
			   }
			});
	}else if(operateType == "1"){
		var param = jsonToUrlParam(record);
		if(handlerFunc.redictUrl.indexOf("?") > -1){//url是否已经带有参数
			window.location.href = handlerFunc.redictUrl+"&"+encodeURI(param);
		}else{
			window.location.href = handlerFunc.redictUrl+"?"+encodeURI(param);
		}
	}
}


/**
 * json数据转url参数格式
 * @param {} json
 */
function jsonToUrlParam(json){
	var urlParam = "";
	for(var key in json){
		urlParam += key+"="+json[key]+"&"
	}
	return urlParam;
}

/**
 * 创建操作栏列
 * @param {} _self
 * @param {} columnTitle 列标题
 * @return {}
 */
function createHandlerColumns(_self, handlerFuncs, columnVal){
	var handStr = "";
	for(var i=0; i< _self.handlerCollections.length; i++){
		var handlerItem = _self.handlerCollections[i];
		var funcName = "hander" + i;
		handlerItem['funcName'] = funcName
		handlerFuncs.push(handlerItem);
		var _cls = "grid-command " + funcName;
		var nameType = handlerItem["nameType"];
		var text = _self.handlerCollections[i].name;
		if(nameType){
			if(nameType == "1"){
				text = columnVal;
			}
		}
		handStr += '<span class="'+_cls+'">'+text+'</span>';
	}
	return handStr;
}

