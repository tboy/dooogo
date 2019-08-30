var app; //主应用数据
var myCard; //优惠券选择
var ykj; //优惠券修改
$(function() {
	var obj = {};
	obj.myTools = [];
	obj.name = '';
	app = new Vue({
		el: '#content',
		data: obj
	});
	myCard = new Vue({
		el: '#card',
		data: {arrs:[]}
	});

	ykj = new Vue({
		el: "#editYkj",
		data: function(){
			var d=new Date();
		 	var dy=  new Date(d);
		   dy.setDate(d.getDate() + 29);
		  obj.pickerOptions= {};
// 			obj.pickerOptions= {
// 				onPick: ({ maxDate, minDate }) => {
// 			
// 					this.pickerMinDate = minDate.getTime()
// 					if (maxDate) {
// 						this.pickerMinDate = ''
// 					}
// 				},
// 				disabledDate: (time) => {
// 					  let nowData = new Date()
// 		              nowData = new Date(nowData.setDate(nowData.getDate() - 1))
// 					  if(time < nowData){
// 						  
// 		                return true;
// 					  }
// 					
// 					
// 					return false;
// 				}
// 			}
			obj.time="";
			obj.id='',
			obj.isSel='',
			obj.type=1,
			obj.type1='',
			obj.type2='',
			obj.type3='',
			obj.title='',
			obj.startMoney= '12',
			obj.devMoney = "",
			obj.discount='',
			obj.selTime1 = "checked",
			obj.timeType = '1',
			
			
			obj.liveDay = "当天",
			obj.day = '',
			
			obj.goodsType = "1",
			obj.good1 = "checked",
			obj.txt='',
			obj.selTime2='',
			
			obj.good2='',
			obj.good3=''
		    return obj;
		}
		
	})
    setTimeout(function(){
		gotoPage(1);
	},10)
	
	initFile();
})
//添加控件
function addItem() {


	var item = {};
	item.type = $('.addSelect').val();
	if (item.type == '0') return;
	$('.addSelect').val(0);
	if (item.type == '1') {
		item.val = '';
		item.sel = '2'
	}
	if (item.type == '2') {
		item.src = '';
	}

	if (item.type == '3') {
		item.vo = null;
	}

	if (item.type == '4') {
		item.val = '';
	}

	sortItem();
	app.$data.myTools.push(item);
	setTimeout(function() {

		var arr = [];
		$(".item").each(function() {
			arr[parseInt($(this).attr("idx"))] = $(this);
			$(this).remove();
		});
		for (var j = 0; j < arr.length; j++) {
			$("#gab").append(arr[j]);
		}
		$('.item').arrangeable();
	}, 10);
}

//控件排列
function sortItem() {
	var arr = [];
	$(".item").each(function() {
		arr.push(app.$data.myTools[parseInt($(this).attr("idx"))]);
	});
	app.$data.myTools.splice(0, app.$data.myTools.length);

	for (var i = 0; i < arr.length; i++) {
		app.$data.myTools.push(arr[i]);
	}

}
//初始化文件上传
function initFile() {
	u = new UploadBase64();
	u.isMatch800_800 = false;

	u.isMatch750_1536 = true;

	u.init({

		input: document.querySelector('#file'),

		callback: function(base64) {
			//console.log("bb:"+base64);
			if (toolImgIdx != -1) {
				if (toolImgIdx == 888) {
					app.$data.outImg = base64;
				} else {
					app.$data.myTools[toolImgIdx].src = base64;
				}

			} else {

				$("#upload-box").html("重新上传");
				var obj = {};
				obj.src = base64;
				app.$data.imgs.unshift(obj);
				$("#uploadImg").attr("src", base64);
				$("#uploadImg").attr("style", "width:100%;height:100%;");
				$("#uploadImg").show();
				$("#imgShow").show();
				$("#imgDel").show();
			}

			$("#file").val(null);
			$("#file").val('');
		},

		loading: function() {



		}

	});
}
//上传文件
var toolImgIdx = -1;

function upFile(val) {
	if (val != undefined) {
		toolImgIdx = val;
		if (val == 888) {
			u.isMatch800_800 = true;

			u.isMatch750_1536 = false;
		} else {
			u.isMatch800_800 = false;

			u.isMatch750_1536 = true;
		}
	} else if (app.$data.imgs.length == 5) {
		alert("只能上传5张");
		return;
	} else {
		u.isMatch800_800 = false;

		u.isMatch750_1536 = true;
	}
	$('#file').trigger('click');
}

//选择优惠券
var nowIdx = -1;

function showCard(idx) {
	nowIdx = idx;
	layer.open({
		type: 1,
		title: '选择优惠券',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		area: ['auto'],
		content: $('#voice-layer-content-a2')
	});
}
//新建优惠券
function newCard(idx) {
	nowIdx = idx;
	layer.open({
		type: 1,
		title: '新建优惠卷',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		area: ['auto'],
		content: $('#ykj')
	});
	updateData(clone(getQbData(1)));
}
//编辑优惠券
function editCard(idx) {
	layer.open({
		type: 1,
		title: '修改优惠券',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		area: ['auto'],
		content: $('#ykj')
	});

	updateData(clone(app.$data.myTools[idx].vo));
}

//优惠券选择列表数据构建
function gb(arr, max) {
	for (var j = 0; j < 3; j++) {
		var item = getQbData(j+1);
		item.id=j+max;
		item.title=(j+max)+"优惠券"
		if(j==0){
			item.discount='9'
		}
		if(j==1){
			item.startMoney='30.3';
			item.devMoney = '2.5'
		}
		if(j==2){
			item.txt='兑换一个牛'
		}
		if(Math.random()>0.5){
			item.timeType = '1';
			item.selTime1 = "checked";
			item.selTime2='';
			item.time="2019-01-02"
		}else{
			item.timeType = '2';
			item.selTime2 = "checked";
			item.selTime1='';
			item.liveDay="当天";
			item.day="1";
		}
		
		arr.push(item);
	}
}
var g1 = [];
var g2 = [];
var g3 = [];
gb(g1, 0);
gb(g2, 3);
gb(g3, 6)
//优惠券列表页面跳转
function gotoPage(val) {

   //后台接口对接数据优惠券获取
	var card = {};
	card.arrs = clone(window["g" + val]);
	
	while (myCard.$data.arrs.length > 0) {
		myCard.$data.arrs.splice(0, 1);
	}
	for (var i = 0; i < card.arrs.length; i++) {
		card.arrs[i].isSel = "";
		for (var j = 0; j < app.$data.myTools.length; j++) {
			if (app.$data.myTools[j].vo && app.$data.myTools[j].type == '3' && card.arrs[i].id == app.$data.myTools[j].vo.id) {
				card.arrs[i].isSel = "checked";
			}

		}
		myCard.$data.arrs.push(card.arrs[i])

	}

}



function changeHandel2() {
	var flag = $(event.currentTarget).is(':checked');
	$(".cbs2").prop("checked", false);
	$(event.currentTarget).prop("checked", flag);

}

function addCard() {

	var id = parseInt($(event.currentTarget).attr("id"));
	for(var i = 0;i<app.$data.myTools.length;i++){
		if(app.$data.myTools[i].type == '3' && app.$data.myTools[i].vo && app.$data.myTools[i].vo.id == id){
			alert("优惠券已选择，请选择其它");
			return;
		}
	}
	
	for (var i = 0; i < myCard.$data.arrs.length; i++) {
	    if(myCard.$data.arrs[i].id == id){
			app.$data.myTools[nowIdx].vo = {};
			updateTools(app.$data.myTools[nowIdx].vo,clone(myCard.$data.arrs[i]));
			break;
		}	
	}
	
	//刷新界面
	$(".cbs2").each(function() {
		for (var i = 0; i < myCard.$data.arrs.length; i++) {
			for (var j = 0; j < app.$data.myTools.length; j++) {
				if (app.$data.myTools[j].type == '3' && myCard.$data.arrs[i].id == app.$data.myTools[j].vo.id) {
						myCard.$data.arrs[i].isSel = 'checked';
					}else {
						myCard.$data.arrs[i].isSel = '';
					}

			}

		}
	});



}

function delCard(id) {
	var len = app.$data.card.length;
	for (var i = 0; i < len; i++) {
		if (id == app.$data.card[i].id) {
			app.$data.card.splice(i, 1);
			$(".cbs2").each(function() {
				var id2 = parseInt($(this).attr("id"));
				if (id == id2) {
					$(this).prop("checked", false);
				}
			});
			break;
		}
	}
}

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

//优惠券数据结构
function getQbData(val) {
	//数据一
	var obj1 = {};
	obj1.type = "1"; //1-折扣券，2-代金券，3-兑换券
	obj1.type1 = "checked"; //显示选中折扣券 type1 type2 type3
	obj1.title = "";
	obj1.discount = '';
	obj1.selTime1 = "checked";
	obj1.timeType = '1';
	obj1.time = "";

	obj1.liveDay = "当天";
	obj1.day = '1';

	obj1.goodsType = "1";
	obj1.good1 = "checked";
	if (val == 1) {
		return obj1;
	}
	//数据二
	var obj1 = {};
	obj1.type = "2"; //1-折扣券，2-代金券，3-兑换券
	obj1.type2 = "checked"; //显示选中折扣券 type1 type2 type3
	obj1.title = "";
	obj1.startMoney = '';
	obj1.devMoney = "";

	obj1.selTime1 = "checked";
	obj1.timeType = '1';
	obj1.time = "";

	obj1.liveDay = "当天";
	obj1.day = '1';

	obj1.goodsType = "1";
	obj1.good1 = "checked";
	if (val == 2) {
		return obj1;
	}
	//数据三
	var obj1 = {};
	obj1.type = "3"; //1-折扣券，2-代金券，3-兑换券
	obj1.type3 = "checked"; //显示选中折扣券 type1 type2 type3
	obj1.title = "";
	obj1.txt = '';

	obj1.selTime1 = "checked";
	obj1.timeType = '1';
	obj1.time = "";

	obj1.liveDay = "当天";
	obj1.day = '1';

	obj1.goodsType = "1";
	obj1.good1 = "checked";
	if (val == 3) {
		return obj1;
	}
}

//切换优惠券类型
function typeHandel(val) {
	var obj = getQbData(val);
	updateData(clone(obj));
	ykj.$data["type1"]="";
	ykj.$data["type2"]="";
	ykj.$data["type3"]="";
	ykj.$data["type"+val]="checked";
	timeHandel(1)
	goodsHandel(1);
}

//切换选择时间
function timeHandel(val) {
	ykj.$data.timeType = val;
	if (val == 1) {
		ykj.$data.selTime1 = "checked";
		ykj.$data.selTime2 = "";
	} else {
		ykj.$data.selTime1 = "";
		ykj.$data.selTime2 = "checked";
	}
}
//切换选择商品类型
function goodsHandel(val) {
	ykj.$data.goodsType = val;
	ykj.$data.good1 = "";
	ykj.$data.good2 = "";
	ykj.$data.good3 = "";
	ykj.$data['good' + val] = "checked";


}

//刷新优惠券
function updateData(item){
	ykj.$data.type1 = '';
	ykj.$data.type2 = '';
	ykj.$data.type3 = '';
	ykj.$data.good1 = '';
	ykj.$data.good2 = '';
	ykj.$data.good3 = '';
	ykj.$data.selTime1 = "";
	ykj.$data.selTime2 = "";
	for(var key in item){
		ykj.$data[key] = item[key];
	}

}

//刷新控件的优惠卷属性 item1(app.$data.myTools[n].vo),控件上的属性；item2,要添加的优惠卷属性
function updateTools(item1,item2){
	
	for(var key in item2){
		item1[key] = item2[key];
	}
}

//更新优惠券，保存到后台接口
function updateYkj(){
	//更新或保存优惠卷信息
	ykj.$data;
	
	//属性控件上的属性
	updateTools(app.$data.myTools[nowIdx].vo,ykj.$data);
	//保存后关闭窗口
	layer.closeAll();
	
}






