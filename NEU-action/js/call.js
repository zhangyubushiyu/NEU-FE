//基础保障设置
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function addClass() {
	if(!element.className) {
		element.className == value;
	} else {
		newClassName = element.className;
		newClassName += "";
		element.newClassName = newClassName;
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function moveElement(elementID, final_x, final_y, interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement) {
		clearTimeout(elem.movement);
	}
	if(!elem.style.left) {
		elem.style.left = "0";
	}
	if(!elem.style.top) {
		elem.style.top = "0";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y) {
		return true;
	}
	if(xpos < final_x) {
		var dist = Math.ceil((final_x - xpos) / 10);
		xpos = xpos + dist;
	}
	if(xpos > final_x) {
		var dist = Math.ceil((xpos - final_x) / 10);
		xpos = xpos - dist;
	}
	if(ypos < final_y) {
		var dist = Math.ceil((final_x - ypos) / 10);
		xpos = xpos + dist;
	}
	if(ypos > final_y) {
		var dist = Math.ceil((ypos - final_x) / 10);
		xpos = xpos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
	movement = setTimeout(repeat, interval);
}

function getElementsClass(classnames) {
	var classobj = new Array(); //定义数组 

	var classint = 0; //定义数组的下标 

	var tags = document.getElementsByTagName("*"); //获取HTML的所有标签 

	for(var i in tags) { //对标签进行遍历 

		if(tags[i].nodeType == 1) { //判断节点类型 

			if(tags[i].getAttribute("class") == classnames) //判断和需要CLASS名字相同的，并组成一个数组 

			{
				classobj[classint] = tags[i];
				classint++;
			}
		}
	}
	return classobj; //返回组成的数组 
}