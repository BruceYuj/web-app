// init
mui.init({
	subpages: [bruce.h.normalPage('list')]
});

var main = null;
var showMenu = false;
var menu = null;
var add = null;
var detail = null;

// 所有方法放在这里,使用h5+方法需要等到plusReady事件产生后才能使用。
mui.plusReady(function() {
    initDb();
});


// 初始化数据库
function initDb(){
    var db = bruce.h.db();
    qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
    qiao.h.update(db, 'create table if not exists t_plan_day_done (id unique, plan_title, plan_content)');
     
    var help = bruce.h.getItem('help');
    if(!help){
        qiao.h.insertItem('help', 'first');
    }
}
