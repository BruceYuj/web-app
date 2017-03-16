var bruce = {};


bruce.h = {};
// page相关
bruce.h.normalStyle = {top: '45px', bottom: 0};

bruce.h.normalPage = function (id, options) {
	var opt = $.extend({}, options, bruce.h.normalStyle);
	return bruce.h.page(id, {styles: opt});
}

bruce.h.page = function(id, options) {
	var url = id + '.html';
	
	options.id = id;
	options.url = url;
	return options;
}

// 提示框相关
bruce.h.modalOptions = {
	title: 'title',
	abtn: '确定',
	cbtn: ['确定', '取消'],
	content: 'content'
}

bruce.h.confirm = function(options, ok, cancel) {
	var opt = $.extend({}, bruce.h.modalOptions);
	
	opt.title = '确认操作';
	if (typeof options === 'string') {
		opt.content = options;
	} else {
		$.extend(opt, options);
	}
	
	plus.nativeUI.confirm(opt.content, function(e) {
		 var i = e.index;
		 if(i == 0 && ok) ok();
		 if(i == 1 && cancel) cancel();
	}, opt.title, opt.cbtn);
};



// 以下为插件封装---------------------------------------------------------
// 本地存储相关
// 获取存储的键值对个数
bruce.h.length = function() {
	return plus.storage.getLength();
};

//获取对应索引的key值
bruce.h.key = function(i) {
	return plus.storage.key(i);
};

// 获取对应key的值
bruce.h.getItem = function(key) {
	if (key) return plus.storage.getItem(key);
};

bruce.h.insertItem = function(key, value) {
	plus.storage.setItem(key, value);
};

bruce.h.delItem = function(key) {
	plus.storage.removeItem(key);
};

bruce.h.clear = function() {
	plus.storage.clear();
};

// web sql
bruce.h.db = function(name, size) {
	var db_name = name ? name : 'db_test';
	var db_size = size ? size : 2;
	
	return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
}

bruce.h.update = function (db, sql) {
	if (db && sql) {
		db.transaction(function(tx) {tx.executeSql(sql);});
	}
};

bruce.h.query = function (db, sql, func) {
	if (db && sql) {
		db.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
}

// 以下为功能封装-------------------------------
// 退出
bruce.h.exit = function () {
	bruce.h.confirm('确定要退出吗？', function() {
		plus.runtime.quit();
	});
}


var db = bruce.h.db();
