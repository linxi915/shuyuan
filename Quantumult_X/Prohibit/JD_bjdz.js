	function modifyRefundType(orderId){
		var refundtype = $("#skuRefundTypeDiv_"+orderId).val();
		if(refundtype=="2"){
             if (!$("#CouponBack_2").hasClass('selected')) {
               	$("#CouponBack_2").addClass('selected').siblings().removeClass('selected');
             }
		}
		if(refundtype=="1"){
			if (!$("#CashBack_1").hasClass('selected')) {
               $("#CashBack_1").addClass('selected').siblings().removeClass('selected');
             }
		}
    	$('.type-wrapper').show();
		$("#RefundType_Orderid_Repeater_hid").val(orderId);
    }
	
	$(function(){
		$('.close-modfiy-type').click(function () {
            $('.type-wrapper').hide();
        });
		
	    $('.type-wrapper .item').click(function () {
            if (!$(this).hasClass('selected')) {
    			var orderId = $("#RefundType_Orderid_Repeater_hid").val();
    			$("#skuRefundTypeDiv_"+orderId).val($(this).val());
                $(this).addClass('selected').siblings().removeClass('selected');
    			$("#skuRefundResult_"+orderId).html($(this).find("span").html());
            }
   		});
	    
	    $('.filter').bind('click', function () {
	        $('.filter-wrap').show();
	    });
	    
	    $('.filter-wrap').bind('click', function (e) {
	        if (!$(e.target).hasClass('main-area') && $(e.target).parents('.main-area').length == 0) {
	            $('.filter-wrap').hide();
	        }
	    });
	    
	    //记录页，状态条件筛选事件
	    $('.status-item').bind('click', function (e) {
	        $(e.target).addClass('selected').siblings().removeClass('selected');
	        $("#applystatus").val($(e.target).data('status'));
	    });
	    
	    //记录页，时间条件筛选事件
	    $('.time-item').bind('click', function (e) {
	        $(e.target).addClass('selected').siblings().removeClass('selected');
	        $("#applyDateScopeType").val($(e.target).data('status'));
	    });
		$("#applystatus,#applyDateScopeType").click(function() {
			var $this = $(this);
			if ($this.parent().hasClass("show-more")) {
				$this.parent().removeClass("show-more");
				$(".jbfilter-layer").hide();
			} else {
				if ($this.parent().hasClass("is-selected")) {
					$this.parent().removeClass("is-selected");
				}
				$this.parent().addClass("show-more");
				$(".jbfilter-layer").show();
			}
		});
		$(".jbfilter-layer").click(function() {
			$(".show-more").removeClass("show-more");
			$(".jbfilter-layer").hide();
		});
		$(".adropdown-item").click(function() {
			if (!$(this).hasClass('selected')) {
				$(this).addClass('selected').siblings().removeClass('selected');
			}
			var selectVal = $(this).find(".adropdown-value").html();
			$(this).parents(".filter-main").find(".ahd-value").html(selectVal);
			if (selectVal != "全部"||selectVal != "近三个月") {
				$(this).parents(".filter-main").addClass("is-selected");
			}
			$(".show-more").removeClass("show-more");
			$(".jbfilter-layer").hide();
			mescrollArr[1].clearDataList();
			mescrollArr[1].setPageNum(1);
    		mescrollArr[1].triggerUpScroll();
		});
	 });
	 
	// 样式控制，展示哪个
	function viewMescroll(i){
		//清空搜索框
		clearSearchContent();
		if(i == 0){// 展示价保申请
			// 本页面默认是展示价保申请，nothing do
		}else if(i==1){//展示价保记录
			$("#jb-product").removeClass("selected");
			$("#jb-record").addClass("selected");
			$("#select").css("display","none");
			
			$("#mescroll0").css("display","none");
			$("#mescroll1").css("display","block");
		}
	}

	var mescrollArr=new Array(2);//2个菜单所对应的2个mescroll对象
   $(function(){
		//申请页0; 记录页1;
		var curNavIndex = 0;
		if(defaultViewTab != "" && (defaultViewTab=="0" || defaultViewTab=="1")){
			curNavIndex=defaultViewTab;
		}
		
		viewMescroll(curNavIndex);
		//初始化
		mescrollArr[curNavIndex]=initMescroll("mescroll"+curNavIndex, "dataList"+curNavIndex);
		/*初始化菜单*/
		$(".jb-nav a").click(function(){
			var i=Number($(this).attr("i"));
			//搜索按钮隐藏与打开
			//if(i == '1'){
				//$("#select").css("display","none");
			//}else{
				//$("#select").css("display","");
			//}	
			if(curNavIndex!=i) {
				//清空搜索框
				clearSearchContent();
				//更改列表条件
				$(".jb-nav a").removeClass("selected");
				$(this).addClass("selected");
				//隐藏当前列表和回到顶部按钮
				$("#mescroll"+curNavIndex).hide();
				mescrollArr[curNavIndex].hideTopBtn();
				//显示对应的列表
				$("#mescroll"+i).show();
				//取出菜单所对应的mescroll对象,如果未初始化则初始化
				if(mescrollArr[i]==null){
					mescrollArr[i]=initMescroll("mescroll"+i, "dataList"+i);
				}else{
					//检查是否需要显示回到到顶按钮
					var curMescroll=mescrollArr[i];
					var curScrollTop=curMescroll.getScrollTop();
					if(curScrollTop>=curMescroll.optUp.toTop.offset){
						curMescroll.showTopBtn();
					}else{
						curMescroll.hideTopBtn();
					}
				}
				//更新标记
				curNavIndex=i;
			}
		});
		
		/*创建MeScroll对象*/
    	function initMescroll(mescrollId,clearEmptyId){
			var htmlNodata = '<p class="upwarp-nodata">-- END --</p>';
			var emptyTip="抱歉，没有找到价保记录";
			var downUse=false;
			var downIsLock=true;
			if(mescrollId == 'mescroll0' ){
				htmlNodata = '<p class="prompt-words">超过90天的订单不展示哦~</p>';
				emptyTip="抱歉，没有找到相关的商品或订单";
			}
			if(mescrollId == 'mescroll1' ){
				downUse = true;
				downIsLock=false;
			}
			
    		//创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    		var mescroll = new MeScroll(mescrollId, {
				down: {
                    auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
                    isLock: downIsLock,
    				use:downUse
                },
    			//上拉加载的配置项
				up: {
    				callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
    				isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
    				noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
    				empty: {
    					icon: '//misc.360buyimg.com/user/jiabao/0.0.1/css/i/JOY.png', //图标,默认null
    					tip: emptyTip //提示
    					//btntext: "去逛逛 >", //按钮,默认""
    					//btnClick: function(){//点击按钮的回调,默认null
    					//	alert("点击了按钮,具体逻辑自行实现");
    					//} 
    				},
    				clearEmptyId: clearEmptyId, //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
    				toTop:{ //配置回到顶部按钮
    					src : "//static.360buyimg.com/siteppStatic/script/mescroll/res/img/mescroll-totop.png" //默认滚动到1000px显示,可配置offset修改
    				},
					loadFull:{ //页面加载数据少没撑满，无法上拉加载，所以再次加载 
                      use : true , 
                      delay : 500 
                    },
					page : {
                      num : 0 , //回调之前会变成1，所以这里是0就ok
                      size : 5  
                    },
					htmlLoading : '<div id="recordloading" class="cb-loading"><i></i><span>正在加载</span></div>',
					htmlNodata:htmlNodata
    			}
    		});
    		return mescroll;
    	}
    	
    	/*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    	function getListData(page){
    		var dataIndex=curNavIndex; //记录当前联网的nav下标,防止快速切换时,联网回来curNavIndex已经改变的情况;
    		if(dataIndex == 0){//申请页
    			getApplyDatas(page,dataIndex);
    		}else if(dataIndex == 1){//记录页
    			getRecordDatas(page,dataIndex);
    		}
    	}
		
		//获取可价保申请的数据
    	function getApplyDatas(page,dataIndex){
			var applyExceptionArr = $("#dataList"+dataIndex).find(".exception-null");
			$.each(applyExceptionArr, function(i,n) {  
               n.remove();
           });  
    		//查询关键字
    		var keyWords = $("#keyWords").val();
			var feSt = $("#feSt").val();
			var token = "";
			if (null != jab) {
				token = jab.getToken();
			}
    		var paramObj = {};
    		paramObj.page = page.num;
			paramObj.pageSize = page.size;
    		paramObj.keyWords = keyWords;
    		paramObj.sid = $("#sid_hid").val();
    		paramObj.type = $("#type_hid").val();
    		paramObj.forcebot=$("#forcebot").val();
			paramObj.token = token;
			paramObj.feSt = feSt;
    		var urlStr = null;
            var ajaxData = {"body":JSON.stringify(paramObj)};
            if($("#useColorApi").val()=="true"){
            	urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_priceskusPull&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
            }else{
            	urlStr = selfdomain+ "rest/priceprophone/priceskusPull";
            }
            $.ajax({
                    type: "POST",
                    async: true,
                    url: urlStr,
                    data: ajaxData,
                    xhrFields:{
    	            	withCredentials: true
    	            },
                    dataType: "text",
                    success: function(result){
                    	//检查是否为流控返回的json串
                    	var holdResult = result.startsWith("{");
                    	if(holdResult){
                    		mescrollArr[dataIndex].endErr();
                    		var errDenyMsg = $.parseJSON(result);
							//展示异常信息
                    		var errMsg = "抱歉，系统繁忙请您稍后重试";
                    		if(errDenyMsg.errorMessage!=null&&errDenyMsg.errorMessage!=''){
                    			errMsg=errDenyMsg.errorMessage;
                    		}
							var applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">'+errMsg+'</p></section>';
							$("#dataList"+dataIndex).html(applyDatasException);
                    	}else{
                    		var pageErrorId = 'pageError_'+page.num;
    						var pageErrorVal=$(result).find("input[id='"+pageErrorId+"']").val();
    						if(pageErrorVal == 'noexception'){
    							var pageSizeId = 'pageSize_'+page.num;
    							var pageDatasSize=$(result).find("input[id='"+pageSizeId+"']").val();
    							var hasNext = pageDatasSize >= page.size ;
    							mescrollArr[dataIndex].endSuccess(pageDatasSize, hasNext);
    							
    							$("#dataList"+dataIndex).append(result);
    							
    							var resultTDs = $(result).find("div.ajaxFecthState");
    							//根据配置中心决定是否加载最近一次价保数据
    							if($("#isLoadLastPropriceRecord").val()=="true"){
    								HistoryResult(resultTDs);
    							}
    						}else{
    							// 隐藏下拉刷新和上拉加载的状态, 在联网获取数据失败后调用;mescroll内部会自动恢复原来的页码,时间等变量;
    							mescrollArr[dataIndex].endErr();
    							//展示异常信息
    							var applyDatasException = "";
    							var needShowError = $(result).find("input[id='"+pageErrorId+"']").attr("errorData");
    							 if(needShowError!=undefined&&needShowError!=null&&needShowError!=''){
    								 applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">'+needShowError+'</p></section>';
                                 }else{
                                	 if(page.num <= 1){
                                		 applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">抱歉，系统繁忙请您稍后重试</p></section>';
                                	 }else{
                                	 }
                                 }

    							$("#dataList"+dataIndex).html(applyDatasException);
    						}
                    	}
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //异常
						mescrollArr[dataIndex].endErr();
						//展示异常信息
						var applyDatasException = "";
						if(page.num<=0){
							applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">抱歉，系统繁忙请您稍后重试</p></section>';
						}else{
						}
						$("#dataList"+dataIndex).append(applyDatasException);
                    }
            });
    	}
    	
		//获取历史价保申请记录数据
    	function getRecordDatas(page,dataIndex){
			var applyExceptionArr = $("#dataList"+dataIndex).find(".exception-null");
			$.each(applyExceptionArr, function(i,n) {  
               n.remove();
            });  
		   
    		var recordpage = $("#recordpage_hid").val();	
    		//查询关键字
    		var keyW = null;
    		var keyWordsOld = $("#recordKeyWords").val();
    		if(keyWordsOld!='undifend'&&keyWordsOld!=null&&keyWordsOld!=''){
    			keyW = keyWordsOld;
    		}
    		var keyWords = $("#keyWords").val();
    		if(keyWords!='undifend'&&keyWords!=null&&keyWords!=''){
    			keyW = keyWords;
    		}
			var feSt = $("#feSt").val();
			var token = "";
			if (null != jab) {
				token = jab.getToken();
			}
			
			var applystatus = $("#applystatus").val();
			var statusNew = $("#applystatus .ahd-value").text();
			if(statusNew!='undifend'&&statusNew!=null&&statusNew!=''){
				if(statusNew=='成功'){
					applystatus = 4;
				}else if(statusNew=='失败'){
					applystatus = 3;
				}else{
					applystatus = "";
				}
			}
			var applyDateScopeType = $("#applyDateScopeType").val();
			var dataScopeNew = $("#applyDateScopeType .ahd-value").text();
			if(dataScopeNew!='undifend'&&dataScopeNew!=null&&dataScopeNew!=''){
				if(dataScopeNew=='近三个月申请'){
					applyDateScopeType = 1;
				}else if(dataScopeNew=='今年内申请'){
					applyDateScopeType = 2;
				}else if(dataScopeNew=='往年申请'){
					applyDateScopeType = 3;
				}else{
					applyDateScopeType = "";
				}
			}

    		var paramObj = {};
    		paramObj.keyWords=keyW;
    		paramObj.applystatus=applystatus;
    		paramObj.applyDateScopeType=applyDateScopeType;
    		paramObj.page = page.num;
			paramObj.pageSize = page.size;
    		paramObj.sid = $("#sid_hid").val();
    		paramObj.type = $("#type_hid").val();
    		paramObj.forcebot=$("#forcebot").val();
			paramObj.token = token;
			paramObj.feSt = feSt;
    		var urlStr = null;
            var ajaxData = {"body":JSON.stringify(paramObj)};
            if($("#useColorApi").val()=="true"){
            	urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_pricerecordPull&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
            }else{
            	urlStr = selfdomain+ "rest/priceprophone/pricerecordPull";
            }
            $.ajax({
                    type: "POST",
                    async: true,
                    url: urlStr,
                    data: ajaxData,
                    dataType: "text",
                    xhrFields:{
                    	withCredentials: true
                    },
                    success: function(result){
                    	//检查是否为流控返回的json串
                    	var holdResult = result.startsWith("{");
                    	if(holdResult){
                    		mescrollArr[dataIndex].endErr();
                    		var errDenyMsg = $.parseJSON(result);
							//展示异常信息
                    		var errMsg = "抱歉，系统繁忙请您稍后重试";
                    		if(errDenyMsg.errorMessage!=null&&errDenyMsg.errorMessage!=''){
                    			errMsg=errDenyMsg.errorMessage;
                    		}
							var applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">'+errMsg+'</p></section>';
							$("#dataList"+dataIndex).html(applyDatasException);
                    	}else{
                    		var pageErrorId = 'record_pageError_'+page.num;
    						var pageErrorVal=$(result).find("input[id='"+pageErrorId+"']").val();
    						if(pageErrorVal == 'noexception'){
    							var pageSizeId = 'record_pageSize_'+page.num;
    							var pageDatasSize=$(result).find("input[id='"+pageSizeId+"']").val();
    							var hasNext = pageDatasSize >= page.size ;
    							mescrollArr[dataIndex].endSuccess(pageDatasSize, hasNext);
    							$("#dataList"+dataIndex).append(result);
    						}else{//异常
    							// 隐藏下拉刷新和上拉加载的状态, 在联网获取数据失败后调用;mescroll内部会自动恢复原来的页码,时间等变量;
    							mescrollArr[dataIndex].endErr();
    							//展示异常信息
    							var applyDatasException = "";
    							var needShowError = $(result).find("input[id='"+pageErrorId+"']").attr("errorData");
    							 if(needShowError!=undefined&&needShowError!=null&&needShowError!=''){
    								 applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">'+needShowError+'</p></section>';
                                }else{
                                	if(page.num <= 1){
                                		applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">抱歉，系统繁忙请您稍后重试</p></section>';
                                	}else{
                                	}
                                }

    							$("#dataList"+dataIndex).html(applyDatasException);
    						}
                    	}
                    },
                     error: function(XMLHttpRequest, textStatus, errorThrown) {
                        mescrollArr[dataIndex].endErr();
						//展示异常信息
						var applyDatasException = "";
						if(page.num<=0){
							applyDatasException = '<section class="exception-null" id="applyDatasException"><i class="joy"></i><p class="null-info">抱歉，系统繁忙请您稍后重试</p></section>';
						}else{
						}
						$("#dataList"+dataIndex).append(applyDatasException);
                    }
            });
    	}
    	
    	//价保用户订单搜索框
    	$("#keyWords").keyup(function(event){
            var keycode = event.which;
            if(keycode == 13){
              var arrIndex = $(".jb-nav a.selected").attr("i");
    		  //开始搜索
			  mescrollArr[arrIndex].clearDataList();
			  mescrollArr[arrIndex].setPageNum(1);
			  mescrollArr[arrIndex].triggerUpScroll();
			  hideSearch();
            }
        });
    	
    	//价保用户记录搜索框
    	$("#recordKeyWords").keyup(function(event){
            var keycode = event.which;
            if(keycode == 13){
            	//去掉浮层的条件
            	resetQueryApplyRecordCondtion();
        		mescrollArr[1].setPageNum(1);
        		mescrollArr[1].triggerUpScroll();
            }
        });
   });
   
   //弹出搜索框
	function openSearch(){
		var arrIndex = $(".jb-nav a.selected").attr("i");
		if(arrIndex==1){
			$('#applySearch').find("input").attr("placeholder","请输入订单号");
		}else{
			$('#applySearch').find("input").attr("placeholder","请输入订单号、商品名称或商品编号");
		}
        $('#applySearch').show();
        $('.layer').show();
    }

	//取消搜索框
    function cancelSearch(){
        $('#applySearch').hide();
        $('.layer').hide();
        clearSearchContent();
    }
	
	//影响搜索框
	function hideSearch(){
		$('#applySearch').hide();
        $('.layer').hide();
    }
	
	//清除搜索内容
	function clearSearchContent(){
		$("#keyWords").val("");
	}
   	
	//=========== 记录页的一些按钮 ===========
	//记录页清楚搜索内容
	function clearSearchContentForRecord(){
		$("#recordKeyWords").val("");
	}
	
	//申请记录查询
	function submitQueryApplyRecord(){
		mescrollArr[1].clearDataList();
		mescrollArr[1].setPageNum(1);
		mescrollArr[1].triggerUpScroll();
		//隐藏搜索条件
		$('.filter-wrap').hide();
	}
	
	function resetQueryApplyRecordCondtion(){
		$("#statusItemAll").addClass('selected').siblings().removeClass('selected');
		$("#timeItemAll").addClass('selected').siblings().removeClass('selected');
		//去掉浮层的条件
    	$("#applystatus").val("");
    	$("#refundstatus").val("");
    	$("#applyDateScopeType").val("");
	}
	//============= 记录页的一些按钮 end ==============
	
	//历史结果展示
    function HistoryResult(skuStatusTDs){
		$.each(skuStatusTDs,function(i,item){
			var orderId = $(item).attr("orderId");
			var skuId = $(item).attr("skuId");
			var sequence = $(item).attr("sequence");
			if($("#hasClickOnceApply").val()=="1"||$("#hasClickOnceApply").val()==1){
				$("#applyBT_"+orderId+"_"+skuId+"_"+sequence).addClass("disable-apply");
				$("#applyBT_"+orderId+"_"+skuId+"_"+sequence).removeAttr("onclick");
			}
			var deniedState = $(item).attr("deniedState");
			var isfujian = $("#skuprice_"+orderId+"_"+skuId+"_"+sequence).attr("isfujian");
			var isSkuGift = $("#skuprice_"+orderId+"_"+skuId+"_"+sequence).attr("skuGift");
			if(isfujian=="false"&&isSkuGift=="false"&&deniedState!="1"){
				HistoryResultQuery(orderId,skuId,sequence,item);
			}
		});  
    }
	
	//历史结果查询
	function HistoryResultQuery(orderId,skuId,sequence,obj){
		var skuProResultDiv = "skuProResultDiv_"+orderId+"_"+skuId+"_"+sequence;
		var paramObj = {};
		paramObj.orderId = orderId;
		paramObj.skuId = skuId;
		paramObj.sequence = sequence;
		paramObj.sid = $("#sid_hid").val();
		paramObj.type = $("#type_hid").val();
		paramObj.pin = $("#pin").val();
		paramObj.forcebot=$("#forcebot").val();
		var urlStr = null;
		var ajaxData = {"body":JSON.stringify(paramObj)};
		if($("#useColorApi").val()=="true"){
			urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_skuProResultPin&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
		}else{
			urlStr=selfdomain + "rest/priceprophone/skuProResultPin";
		}
		
        $.ajax({
            type: "POST",
            async:true,
            url: urlStr,
            data:ajaxData,
            xhrFields:{
            	withCredentials: true
            },
            dataType: "html",
            success: function(data) {
				$("#"+skuProResultDiv).empty();
				$("#"+skuProResultDiv).append(data);
				var overTimeP = $("#"+skuProResultDiv).find("#overTime").attr("data");
				if(overTimeP!=null&&overTimeP!=''){
					$("#"+skuProResultDiv).parent().find("#applyBT_"+orderId+"_"+skuId+"_"+sequence).addClass("disable-apply");
					// 价保申请灰色按钮的埋点
					$("#"+skuProResultDiv).parent().find("#applyBT_"+orderId+"_"+skuId+"_"+sequence).attr("clstag","pageclick|keycount|M_apply_1603029440994|1");
				}
            },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    	
	}
	
	//展示价保申请记录的mescroll
	function viewRecordMescroll(){
		var aArray = $(".jb-nav a");
		$(aArray[1]).trigger("click");
	}
		
		
	//价保申请map
	var applyMap=new Map(); 
	
	//申请按钮
    function skuApply(orderId,skuId,sequence, orderCategory){
		var objId = "applyBT_"+orderId+"_"+skuId+"_"+sequence;
        var resultObjId = "result_"+orderId+"_"+skuId+"_"+sequence;
		var applyResultObjId = "applyResult_"+orderId+"_"+skuId+"_"+sequence;
		var applyResultObjIdDiv = "applyResultDiv_"+orderId+"_"+skuId+"_"+sequence;

		var feSt = $("#feSt").val();
		var token = "";
		if (null != jab) {
			token = jab.getToken();
		}
		var paramObj = {};
		paramObj.orderId=orderId;
		paramObj.orderCategory=orderCategory;
		paramObj.skuId=skuId;
		paramObj.sid=$("#sid_hid").val();
		paramObj.type=$("#type_hid").val();
		paramObj.refundtype=$("#skuRefundTypeDiv_"+orderId).val();
		paramObj.forcebot=$("#forcebot").val();
		paramObj.token = token;
		paramObj.feSt = feSt;
		
		var urlStr = null;
		var ajaxData = {"body":JSON.stringify(paramObj)};
		if($("#useColorApi").val()=="true"){
			urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_proApply&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
		}else{
			urlStr = selfdomain + "rest/priceprophone/skuProtectApply";
		}
        
		$.ajax({
            type: "POST",
            async:true,
            url: urlStr,
			data: ajaxData,
			xhrFields:{
				withCredentials: true
			},
            dataType: "json",
            success: function(data) {
				if(data.flag){
					if(data.proSkuApplyId != null){
	            		webWorker(applyResultObjId,applyResultObjIdDiv,data.proSkuApplyId[0]);
					}else{
	            		webWorker(applyResultObjId,applyResultObjIdDiv,0);
					}
					$("#"+objId).addClass(" disable-apply");
            		$("#"+objId).removeAttr("onclick");
                    $("#"+resultObjId).show();
				}else{
					if(data.errorCode=="-10200"){
						var inputKey = "#overTime_"+orderId+"_"+skuId+"_"+sequence;
						$("#"+objId).parent().parent().parent().css("position","relative");
						$("#"+objId).parent().parent().parent().find(inputKey).css({"display":"block"});
						$("#"+objId).parent().parent().parent().find(inputKey).html(data.errorMessage);
						webWorkerForOverTime(applyResultObjId,applyResultObjIdDiv,0);
						$("#"+objId).addClass(" disable-apply");
						$("#"+objId).removeAttr("onclick");
					}else{
						if(data.errorMessage!=null&&data.errorMessage!=''&&data.errorMessage.length>0){
							$("#"+applyResultObjId).html(data.errorMessage);
						}else{
							$("#"+applyResultObjId).html("监测到您的账号存在一定风险，请稍后重试");
						}
						$("#"+objId).addClass(" disable-apply");
						$("#"+objId).removeAttr("onclick");
				        $("#"+resultObjId).show();
					}
				}
            },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
            	 $("#"+applyResultObjId).html("系统繁忙,请稍后再试！");
            }
        });
    }

	//页面倒计时关闭弹框
	function webWorkerForOverTime(id,applyResultObjIdDiv,applyid){
		var num = 3;
		var timer = setInterval(function(){
			num--;
		    if(num <=0){
		    	var alertCss = $("#"+applyResultObjIdDiv).parent().parent().find(".product-item").css("position");
				if(alertCss=='relative'){
					$("#"+applyResultObjIdDiv).parent().parent().find(".product-item").find("div[id^='overTime_']").css({"display":"none"}).html("");
					$("#"+applyResultObjIdDiv).parent().parent().find(".product-item").css({"position":""});
				}
		    	clearInterval(timer);
		    }
		},1000);
	}	
	
	//页面倒计时
	function webWorker(id,applyResultObjIdDiv,applyid){
		var num = 30;
		var timer = setInterval(function(){
    		num--;
    	    if(num < 0){
    	    	clearInterval(timer);
				$("#"+id).html("系统小忙，请等待1-3分钟后到价格保护记录中查看结果。");
    	    }else{
				$("#"+id).html("正在审核该商品是否符合价保，预计"+ num +"秒后完成。");
				if(num==27){
					var alertCss = $("#"+applyResultObjIdDiv).parent().parent().find(".product-item").css("position");
					if(alertCss=='relative'){
						$("#"+applyResultObjIdDiv).parent().parent().find(".product-item").find("div[id^='overTime_']").css({"display":"none"}).html("");
						$("#"+applyResultObjIdDiv).parent().parent().find(".product-item").css({"position":""});
					}
				}
			}
    	        
    	},1000);
		var applyObj = {};
		applyObj.applyid = applyid;
		applyObj.currentNum=num;
		applyObj.timer=timer;
		applyObj.applyResultObjId=id;
		
		if(applyid != 0){
			applyMap.put(applyid,applyObj);
		}
    }
	
	//主timer请求价保申请结果
	var mainNum = 0;
	$(function(){
		//main timer
		var applyResultTimer = setInterval(function(){
			
			mainNum ++;
			if(applyMap.size() > 0){
				var valuesArr = applyMap.values();
				for(var i = 0 ; i < valuesArr.length; i ++){
					var applyObj = valuesArr[i];
					var applyid = applyObj.applyid ;//也是key
					var currentNum = applyObj.currentNum ;
					currentNum --;
					applyObj.currentNum = currentNum;
					if(currentNum < 0){
						applyMap.remove(applyid);
					}
				}
				
				if(mainNum % 5 == 0){//5秒一次
					 //console.info(applyMap.keys()); 
					 var proSkuApplyIds = applyMap.keys().join(",");
					 var pin = $("#pin").val();
					 var urlStr = null;
					 var paramObj={};
				 	 paramObj.proSkuApplyIds=proSkuApplyIds;
				 	 paramObj.pin=pin;
				 	 paramObj.type=$("#type_hid").val();
				 	 var ajaxData = {"body":JSON.stringify(paramObj)};
					 if($("#useColorApi").val()=="true"){
					 	urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_moreApplyResult&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
					 }else{
						 urlStr=selfdomain + "rest/priceprophone/moreApplyResult";
					 }
            		 $.ajax({
                        type:"POST",
                        async:true,
                        url: urlStr,
                        data: ajaxData,
                        dataType: "json",
                        xhrFields:{
                        	withCredentials: true
                        },
                        success: function(data) {
                            var resultArray = data.applyResults;
							for(var i = 0 ; i < resultArray.length; i ++){
								var ajaxResultObj = resultArray[i];
								handleApplyResult(ajaxResultObj);
							}
                        }
                     });
				}
				
			}
		},1000);
		
		//处理有申请结果的
		function handleApplyResult(ajaxResultObj){
			if(ajaxResultObj.hasResult != "undefined" && ajaxResultObj.hasResult == true){//有结果了
				var proSkuApplyId = ajaxResultObj.applyResultVo.proSkuApplyId;//申请id，map的key
				var applyObj = applyMap.get(proSkuApplyId);
				//1. 本worker倒计时删除
				clearInterval(applyObj.timer);
				//2. map中删除
				applyMap.remove(proSkuApplyId);
				//3. 将结果显示
				if(ajaxResultObj.applyResultVo.proApplyStatus == 'ApplySuccess'){//价保成功
					var priceProTotalAmount="¥"+formatCurrency(ajaxResultObj.applyResultVo.refundtotalamount);
					var applyResultObjId = applyObj.applyResultObjId;//orderid
					var orderSku=applyResultObjId.match(/\_(\d+)/);
					var orderId=orderSku[1];
					var skuId=orderSku[2];
					if(ajaxResultObj.applyResultVo.refundType == '2'){
						var innerHTML = '<div class="item-jb current-success"><p class="succ-title"><i></i><span>申请成功</span></p><div class="succ-detail"><p>价保金额:'+priceProTotalAmount+'</p><p>返还方式：限生鲜品类京券</p><p>到账周期：1~7个工作日</p></div></div>';
					}else{
						var innerHTML = '<div class="item-jb current-success"><p class="succ-title"><i></i><span>申请成功</span></p><div class="succ-detail"><p>价保金额:'+priceProTotalAmount+'</p><p>返还方式：<a clstag="pageclick|keycount|M_refund_detalis_1603030571797|3" style="color:#0076ff" onclick="queryRefundDetail('+orderId+', '+skuId+', '+ajaxResultObj.applyResultVo.refundType+','+ajaxResultObj.applyResultVo.refundtotalamount+','+1+','+0+','+0+')">查看退款详情</a></p><p>到账周期：1~7个工作日</p></div></div>';
					}	
					$("#"+applyObj.applyResultObjId).html(innerHTML);
                    if($("#isAlertSuccessTip").val() === "true") {
                        $("#successTipDiv").append(getSuccessTipHtml(proSkuApplyId, formatCurrency(ajaxResultObj.applyResultVo.refundtotalamount)));
                    }
				}else if(ajaxResultObj.applyResultVo.proApplyStatus == 'ApplyFail'){//价保失败
					var innerHTML = ajaxResultObj.applyResultVo.failTypeStr + '<a clstag="pageclick|keycount|M_pricerule_1603031709522|3" style="color:#0076ff" href='+selfdomain+'rest/priceprophone/pricerule'+'>查看详细规则</a>'
					$("#"+applyObj.applyResultObjId).html(innerHTML);
				}
			}
		}
	});
    var successTipNums = 0;
    function getSuccessTipHtml(divId, refundAmount) {
        var backgroundHtml = successTipNums === 0 ? "background-color: rgba(0, 0, 0, 0.5)" : "";
        var htmlStr = "<div id='" +
			divId +
			"' class=\"m-success-dialog-wrap\" style=\"position: fixed;width: 100%;height:100%;left:0;top:0;" +
			 backgroundHtml +
			";\n" +
            "    z-index: 20;\">\n" +
            "      <div style=\"text-align: center;position:absolute;left:50%;top:50%;width:5.6rem;height:6.8rem;margin-left:-2.8rem;margin-top:-3.4rem\">\n" +
            "        <div style=\"text-align: center;width:5.6rem;height:5.6rem;background:url(https://img12.360buyimg.com/imagetools/jfs/t1/89620/30/9912/209708/5e15427aE938e2c29/c981226ef60cb4cf.gif) no-repeat;background-size: 5.6rem 5.6rem;\">\n" +
            "          <p style=\"display:inline-block;font-size: .37rem;color: #fff;width:3rem;margin: 0;padding-top: 0.42rem;line-height: .45rem;margin-left: -0.15rem\">\n" +
            "            恭喜您价保成功! 为您节省" +
			refundAmount +
			"元\n" +
            "          </p>\n" +
            "        </div>\n" +
            "        <img onclick=\"closeSuccessTip('" +
			divId +
			"')\" style=\"width:2.25rem;height:.76rem;margin-left: -0.1rem\" src=\"https://img13.360buyimg.com/imagetools/jfs/t1/94247/31/9986/15852/5e153ea6E2f5c09bb/58ae5628c764a659.png\">\n" +
            "      </div>\n" +
            "    </div>";
        successTipNums++;
        return htmlStr;
    }
    function closeSuccessTip(divId) {
        $("#"+divId).remove();
        successTipNums--;
    }
	/**
     * 将数值四舍五入(保留2位小数)后格式化成金额形式
     *
     * @param num 数值(Number或者String)
     * @return 金额格式的字符串,如'1,234,567.45'
     * @type String
     */
    function formatCurrency(num) {
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
                    num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
    }
    
    function queryRefundDetail(orderId,skuId,refundtype,priceproamount,canproskunum,createdate,refundStatus){
		var paramObj = {};
		paramObj.orderId=orderId;
		paramObj.skuId=skuId;
		paramObj.refundtype=refundtype;
		paramObj.priceproamount=priceproamount;
		paramObj.canproskunum=canproskunum;
		paramObj.refundStatus=refundStatus;
		paramObj.type=$("#type_hid").val();
		paramObj.createdate=createdate;
		paramObj.forcebot=$("#forcebot").val();
		var urlStr = null;
		var ajaxData = {"body":JSON.stringify(paramObj)};
		if($("#useColorApi").val()=="true"){
			urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_queryRefundScheduleForM&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
		}else{
			urlStr = selfdomain + "rest/priceprophone/queryRefundScheduleForM";
		}
		$.ajax({
		 	type: "POST",
            async:true,
            url: urlStr,
            data: ajaxData,
            dataType: "text",
            xhrFields:{
            	withCredentials: true
            },
            success: function(data) {
				$("#RefundDetailDiv").empty();
				$("#RefundDetailDiv").append(data);
            },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
                
            }
        });
    }
    
	function emptyRefundDetail(){
		$("#RefundDetailDiv").empty();
    }
	
	function confirmDelPropRecord(id){
	    $('.delete-confirm').show();
	    $('.delete-confirm .btn-sure').attr("value", id);
	}
	
	function hideDelPropRecord(){
	    $('.delete-confirm').hide();
	    $('.delete-confirm .btn-sure').attr("value", "");
	}
	
	function deletePropRecord(){
		var type = $("#type_hid").val();
		var id = $('.delete-confirm .btn-sure').attr("value");
		var urlStr = null;
		var paramObj ={};
		paramObj.applyId=id;
		paramObj.type=type;
		var ajaxData = {"body":JSON.stringify(paramObj)};
		if($("#useColorApi").val()=="true"){
			urlStr = unifiedGatewayName + "api?appid=siteppM&functionId=siteppM_deletePriceRecord&forcebot="+$("#forcebot").val()+"&t="+ new Date().getTime();
		}else{
			urlStr = selfdomain + "rest/priceprophone/deletePriceRecord";
		}
    	$.ajax({
		 	type: "POST",
            async:true,
            url: urlStr,
            xhrFields:{
            	withCredentials: true
            },
            data: ajaxData,
            dataType: "json",
            success: function(data) {
            	hideDelPropRecord();
            	$("#li_"+id).css("display","none");
            	mescrollArr[1].resetUpScroll();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
	
