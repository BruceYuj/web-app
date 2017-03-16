// init

mui.init({
	subpages: [bruce.h.normalPage('list')]
});

var main = null;
var showMenu = false;
var menu = null;


// 所有方法放在这里,使用h5+方法需要等到plusReady事件产生后才能使用。
mui.plusReady(function() {
	// 初始化数据库
    initDb();
    
    // 获取入口页面
    main = plus.webview.getLaunchWebview();
    //预加载menu页面，并绑定tap事件到mui-icon-bars链接上面。
    var menuoptions = bruce.h.page('menu', {
    		styles: {
    			left: 0,
    			width: '70%',
    			zindex: -1
    		}
    });
    menu = mui.preload(menuoptions);
    mui(".mui-bar").on('tap', '.mui-icon-bars', opMenu);
    main.addEventListener('maskClick', opMenu);
    
    mui.back = function() {
 //   	if($('.adda').is(':hidden')) {
 //   		hideAdd();
  //  	} else 
  		if (showMenu) {
  			closeMenu();
    	} else {
    		bruce.h.exit();
   		}
    }
});


// 初始化数据库
function initDb(){
    var db = bruce.h.db();
    bruce.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
    bruce.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
     
    var help = bruce.h.getItem('help');
    if(!help){
        bruce.h.insertItem('help', 'first');
    }
}

function opMenu() {
	// console.log('test button icon bars');
	if (showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}

function closeMenu() {
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 100		
		}
	});
	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}

function openMenu() {
	if ($('.adda').is(':visible')) {
		menu.show('none', 0, function() {
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '70%',
				transition: {
					duration: 150
				}
			});
			showMenu = true;
		})
	}
}

