//获取所有节点
var loginWin = document.getElementById("login"),
	videoWin = document.getElementById("video"),
	loginOff = document.getElementById("login-off"),
	videoOff = document.getElementById("video-off"),
	popVideo = document.getElementById("video-Play"),
	popLogin = document.getElementById("gz"),
	popBox = document.getElementById("pop-box"),
	videoPlayBut = document.getElementById("videoPlay"),
	courseHover1=document.getElementsByClassName("kc-list"),
	courseHover2=document.getElementsByClassName("kc-hover");
	

//用户登录

function userLogin() {
	//创建一个函数来检查是否已设置cookie
	function getCookie(name) {
		if(document.cookie.length > 0) {
			c_start = document.cookie.indexOf(name + "=")
			if(c_start != -1) {
				c_start = c_start + name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}
	//创建一个可在 cookie 变量中存储访问者姓名的函数
	function setCookie(name, value, expiredays) {
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		document.cookie = name + "=" + escape(value) +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	}
	//点击关注按钮 开始检查cookie
	popLogin.onclick = function checkCookie() {
		loginSuc = getCookie('loginSuc')
		if(loginSuc != null && loginSuc != "") {
			alert('Welcome again ' + loginSuc + '!')
		} else {
			//username = prompt('Please enter your name:', "")
			//cookie没有设置弹出登录窗口
			popBox.style.display = "block";
			loginWin.style.display = "block";
			
			if(loginSuc != null && loginSuc != "") {
				setCookie('loginSuc', loginSuc, 365)
			}
		}
	}
}

addLoadEvent(userLogin);
//addLoadEvent(checkCookie);


//窗口弹窗函数
//function popOn(a, b, c) {
//	a.onclick = function() {
//		b.style.display = "block";
//		c.style.display = "block";
//	}
//}
//窗口关闭函数
function popOff(a, b, c) {
	a.onclick = function() {
		b.style.display = "none";
		c.style.display = "none";
	}
}
(function videoPlay() {
	popVideo.onclick = function() {
		popBox.style.display = "block";
		videoWin.style.display = "block";
		videoPlayBut.play();
	}
	videoOff.onclick = function() {
		popBox.style.display = "none";
		videoWin.style.display = "none";
		videoPlayBut.pause();
	}
}());

(function courseHover(){
		
	
	courseHover1.onmouseover=(function(){
		courseHover2.style.display="block";
	});	
//	courseHover1.onmouseover=function(){
//
//		courseHover2.style.display="block";
//	}
	courseHover1.onmousemove=function(){
		courseHover2.style.display="none";
	}
}());
//addLoadEvent(courseHover);

//窗口弹窗调用
//popOn(popVideo, popBox, videoWin);
//popOn(popLogin, popBox, loginWin);
//窗口关闭调用
//popOff(videoOff, popBox, videoWin);
popOff(loginOff, popBox, loginWin);