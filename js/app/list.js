mui.init({	
	keyEventBind: {
		backbutton: false,
		menubutton: false
	},
	gestureConfig: {
		longtap: true
	}
});



mui.plusReady(function() {
	//initialize the list
	initHelp();
	
	// 右滑菜单
	window.addEventListener('swiperight', function () {
		plus.webview.getLaunchWebview().evalJS('opMenu();');
	})
});

function initHelp() {
	var help = bruce.h.getItem('help');
	if (help == 'first') {
		bruce.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
		bruce.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
		var content = '1.右上角添加事项<br/>2.点击事项查看详情<br/>3.长按事项删除<br/>4.右滑事项完成<br/>5.左滑显示完成事项';
		var sql = 'insert into t_plan_day_todo (id, plan_title, plan_content) values (1, "功能介绍", "' + content + '")';
		bruce.h.update(db, sql);
		
		bruce.h.insertItem('help', 'notfirst');
	}
	
	initList();
}

// 初始化待办事项
function initList() {
	var $ul = $('#todolist').empty();
	bruce.h.query(db, 'select * from t_plan_day_todo order by id desc', function(res) {
		for (var i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}
		
		showList($ul);
	});
}

function genLi(data) {
	var id = data.id;
	var title = data.plan_title;
	var content = data.plan_content;
	
	var li = '<li class="mui-table-view-cell" id="todoli_' + id + '" data-id="' + id + '">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-red doneBtn">完成</a>' +
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				'<div class="mui-media-body">' + 
					title + 
					'<p class="mui-ellipsis">'+content+'</p>' + 
				'</div>' + 
			'</div>' +
		'</li>';
	
	return li;
}

function showList(ul) {
	if (ul.find('li'.size > 0 && ul.is(':hidden'))) ul.show();
}
