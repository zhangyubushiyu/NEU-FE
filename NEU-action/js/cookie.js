//设置cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieName = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires instanceof Date) {
		cookieName += ";expires=" + expires;
	}
	if(path) {
		cookieName += ";path=" + path;
	}
	if(domain) {
		cookieName += ";domain=" + domain;
	}
	if(secure) {
		cookieName += ";secure";
	}

	document.cookie = cookieName;
}
//过期时间
function setCookieDate(day) { //传递一个天数
	var date = null;
	if(typeof day == "number" && day > 0) {
		date = new Date();
		date.setDate((date.getDate() + day));
	} else {
		throw new Error("传递的时间不合法！必须是数字且大于0");
	}
	return date;
}

//读取cookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + "=";
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if(cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(";", cookieStart);
		if(cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}
//创建方法
//setCookie("user","章鱼哥",setCookieDate(7));
//读取方法
//getCookie("user");

//获取顶部信息节点
var msg = document.getElementById("msg"),
	//获取关闭提示信息按钮
	msgOff = document.getElementById("msg-off");
//关闭顶部提示信息函数
function msgFun() {
	//检测看cookie是否存在
	function getMsgCookie() {
		if(getCookie("msg") == "off") {
			//存在隐藏提示信息
			msg.style.display = "none";
		} else {
			//不存在显示提示信息
			msg.style.display = "block";
		}
	}
	getMsgCookie();
	msgOff.onclick = function() {
		//生成cookie
		setCookie("msg", "off", setCookieDate(365));
		//隐藏提示信息
		msg.style.display = "none";
	}
}
msgFun();


