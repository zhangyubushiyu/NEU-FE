//获取所有节点
//获取login窗口
var loginWin = document.getElementById("login"),
	//获取video窗口
	videoWin = document.getElementById("video"),
	//获取login关闭按钮
	loginOff = document.getElementById("login-off"),
	//获取video关闭按钮
	videoOff = document.getElementById("video-off"),
	//获取弹出video按钮
	popVideo = document.getElementById("video-Play"),
	//获取关注按钮
	popLogin = document.getElementById("gz"),
	ygz = document.getElementById("ygz"),
	fs = document.getElementById("fs"),
	//获取弹出窗口遮蔽层
	popBox = document.getElementById("pop-box"),
	//获取video播放
	videoPlayBut = document.getElementById("videoPlay"),
	//获取banner图片list
	bannerList = document.getElementById("banner-list").getElementsByTagName("li"),
	//获取banner按钮
	bannerBtu = document.getElementById("banner-bar").getElementsByTagName("i"),
	//获取banner父级盒子
	oImg = document.getElementById("banner-list"),
	//获取登录用户名
	userName = document.getElementById("userName"),
	//获取登录密码
	Password = document.getElementById("password"),
	//获取登录提交按钮
	loginBut = document.getElementById("submit");
//	Password.value=hex_md5(Password.value);
//窗口关闭函数
function popOff(but, win) {
	popBox.style.display = "none";
	win.style.display = "none";
}
//窗口弹出函数
function popOpen(but, win) {
	popBox.style.display = "block";
	win.style.display = "block";
}

//登录开始

//登录判断loginSuc是否存在
function getLoginSuc() {
	//点击关注按钮
	popLogin.onclick = function() {
		if(getCookie("loginSuc")) {
			//cookie存在调用关注按钮
			console.log("在")
		} else {
			//弹出登录窗口函数调用
			popOpen(popLogin, loginWin);
			//调用登录窗口关闭按钮
			loginOff.onclick = function() {
				//关闭窗口函数调用
				popOff(loginOff, loginWin);
			}

			loginVerify();
		}
	}
}

//登录表单验证函数
function loginVerify() {
	loginBut.onclick = function() {
		var patten = /^[a-zA-Z]\w{3,15}$/ig;
		if(patten.test(userName.value)) {
			var form = document.getElementById("form");
			//验证通过
			//			alert("验证通过1");
			ajax({
				method: "get", //传输方式
				url: "http://study.163.com/webDev/login.htm", //url地址
				data: /*form.serialize(),*/ { //传的参数
					"userName": "studyOnline",
					"password": "study.163.com"
				},
				success: function(text) {
					//成功后进这里
					alert(text);
					setCookie("loginSuc", "login", setCookieDate(10));
					popLogin.style.display = "none";
					ygz.style.display = "block";
					fs.style.display = "block";

				},
				async: true //同步方式，true异步, false不是异步
			});
		} else {
			//验正不通过
			alert("用户名或密码不合法！");
		}

	}
}

getLoginSuc();

//视频播放函数
function videoPlay() {
	popVideo.onclick = function() {
		//弹出窗口
		popOpen(popVideo, videoWin);
		//自动播放视频
		videoPlayBut.play();

	}
	videoOff.onclick = function() {
		//关闭窗口
		popOff(videoOff, videoWin);
		//停止视频
		videoPlayBut.pause();
	}
}
//videoPlay();

//banner轮播图

//初始化banner切换按钮

var iNow = 0,
	dt = null,
	//定时时间
	time = 5000;
//初始化按钮函数
function bannerTab() {
	//遍历按钮
	for(var i = 0; i < bannerBtu.length; i++) {
		bannerBtu[i].index = i;
		//点击按钮切换图片函数
		bannerBtu[i].onclick = function() {
			clearInterval(dt);
			iNow = this.index;
			for(var i = 0; i < bannerBtu.length; i++) {
				bannerBtu[i].className = "";
			}
			this.className = "bbd";
			oImg.style.left = -(bannerList[0].offsetWidth * iNow) + "px";
		}
	}
}
//切换图片函数
function start() {
	clearInterval(dt);
	dt = setInterval(function() {
		if(iNow > bannerBtu.length - 2) {
			iNow = 0;
		} else {
			iNow++;
		}
		for(var i = 0; i < bannerBtu.length; i++) {
			if(iNow == bannerBtu[i].index) {
				bannerBtu[i].className = "bbd";
			} else {
				bannerBtu[i].className = "";
			}
		}
		oImg.style.left = -(bannerList[0].offsetWidth * iNow) + "px";

	}, time);
	bannerTab();
}
start();
//课程数据获取
var kecenJson,
	kencenObj,
	kencenObjList = [];

function kenfun(value) {
	ajax({
		method: "get", //传输方式
		url: "http://study.163.com/webDev/couresByCategory.htm", //url地址
		data: { //传的参数
			"pageNo": 8,
			"psize": 20,
			"type": 10
		},
		success: function(text) {
			kecenJson = text;
			kencenObj = JSON.parse(kecenJson);
			JsonObj = kencenObj.list;
			/*var list="";
			for (var i=0;i<kencenObjList.length;i++) {
				list+='<li class="kc-list">\
								<a href="'+kencenObjList[i].providerLink +'">\
									<div class="kc">\
										<div class="l-img"><img class="middlePhotoUrl" src="'+kencenObjList[i].bigPhotoUrl +'" alt="'+kencenObjList[i].name +'" /></div>\
										<div class="l-txt">\
											<h3 class="">'+kencenObjList[i].name +'</h3>\
											<h4 class="">'+kencenObjList[i].categoryName +'</h4>\
											<span class="span-1"><i class="learnerCount">'+kencenObjList[i].learnerCount +'</i></span>\
											<span class="span-2">￥<i class="Listprice">'+kencenObjList[i].price +'</i></span>\
										</div>\
									</div>\
									<div class="kc-hover" id="kc-hover">\
										<div class="kc-hover-top">\
											<img class="middlePhotoUrl" src="'+kencenObjList[i].bigPhotoUrl +'" alt="'+kencenObjList[i].name +'" />\
											<dl>\
												<h3 class="ListName">'+kencenObjList[i].name +'</h3>\
												<dt><p><span class="Listprice">'+kencenObjList[i].learnerCount +'人学习</span></p></dt>\
												<dd>\
													<p>发布者：<span class="provider">'+kencenObjList[i].provider +'</span></p>\
												</dd>\
												<dd>\
													<p>分类：<span class="">'+kencenObjList[i].categoryName +'</span></p>\
												</dd>\
											</dl>\
										</div>\
										<div class="kc-hover-txt">\
											<p class="description">\
												'+kencenObjList[i].description +'\
											</p>\
										</div>\
									</div>\
								</a>\
							</li>';
			}
			var contenrList=document.getElementById("contenr-l-list");
			contenrList.innerHTML=list;
			*/

			var jsonArr=[];
			for(var i=0;i<JsonObj.length;i++) {
				jsonArr=[[i]];
				for(var o = 0; o < jsonArr.length; o++) {
				 	name=JsonObj[i].name;
					bigPhotoUrl=JsonObj[i].bigPhotoUrl;
					provider=JsonObj[i].provider;
					providerLink=JsonObj[i].providerLink;
					learnerCount=JsonObj[i].learnerCount;
					price=JsonObj[i].price;
					categoryName=JsonObj[i].categoryName;
					description=JsonObj[i].description;
				}
			}
		},
		async: true //同步方式，true异步, false不是异步
	});

}

kenfun();
var kenObj = new Object();
var kenArr = [],
	kenObj1;

			var name,
			//链接
			providerLink,
			//课程大图
			bigPhotoUrl,
			//课程中图
			middlePhotoUrl,
			//课程小图
			smallPhotoUrl ,
			//机构发布者
			provider ,
			//在学人数
			learnerCount,
			//课程价格
			price,
			//课程分类
			categoryName,
			//适用人群
			description;
//	alert(typeof ListNameV);
//var imgSrc=document.getElementsByClassName("l-img").getElementsByTagName("img");