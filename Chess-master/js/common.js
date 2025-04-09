
var com = com||{};

com.init = function (stype){
	
	com.nowStype= stype || com.getCookie("stype") ||"stype2";
	var stype = com.stype[com.nowStype];
	com.width			=	stype.width;		//width
	com.height			=	stype.height; 		//height
	com.spaceX			=	stype.spaceX;		//points on X-axis
	com.spaceY			=	stype.spaceY;		//points on Y-axis
	com.pointStartX		=	stype.pointStartX;	//First point on X-axis 
	com.pointStartY		=	stype.pointStartY;	//First point on Y-axis
	com.page			=	stype.page;			//图片目录
	
	com.canvas			=	document.getElementById("chess"); 
	com.ct				=	com.canvas.getContext("2d") ;
	com.canvas.width	=	com.width;
	com.canvas.height	=	com.height;
	
	com.childList		=	com.childList||[];


	com.loadImages(com.page);		//载入图片/图片目录
	//z(com.initMap.join())
}

//样式
com.stype = {
	stype1:{
		width:325,		 
		height:402, 		 
		spaceX:35,		
		spaceY:36,		 
		pointStartX:5,		 
		pointStartY:19,		 
		page:"stype_1"	 
	},
	stype2:{
		width:523,		 
		height:580, 		
		spaceX:57,		 
		spaceY:57,		 
		pointStartX:3,		 
		pointStartY:5,		 
		page:"stype_2"	 
	},
	stype3:{
		width:530,		 
		height:567, 		 
		spaceX:57,		 
		spaceY:57,		 
		pointStartX:-2,		 
		pointStartY:0,		 
		page:"stype_3"	 
	}
}
//get ID
com.get = function (id){
	return document.getElementById(id)
}

window.onload = function(){
	com.bg=new com.class.Bg();
	com.dot = new com.class.Dot();
	com.pane=new com.class.Pane();
	com.pane.isShow=false;
	
	com.childList=[com.bg,com.dot,com.pane];
	com.mans	 ={};		//array for pieces
	
	//Start
	com.get("playBtn").addEventListener("click", function(e) {
		play.isPlay=true ;
		var depth = parseInt(getRadioValue("depth"), 10) || 3;

		play.init( depth );
		com.get("chessBox").style.display = "block";
		com.get("menuBox").style.display = "none";
	})
	
	//开始挑战
	com.get("clasliBtn").addEventListener("click", function(e) {
		play.isPlay=true ;
		var clasli = parseInt(getRadioValue("clasli"), 10) || 0;
		play.init( 4, com.clasli[clasli].map );
		com.get("chessBox").style.display = "block";
		com.get("menuBox").style.display = "none";
	})
	
	// regret
	com.get("regretBtn").addEventListener("click", function(e) {
		play.regret();
	})
	
	//Home
	com.get("gohomeBtn").addEventListener("click", function(e) {
		com.get("chessBox").style.display = "none";
		com.get("menuBox").style.display = "block";
		com.get("indexBox").style.display = "block";
		com.get("menuQj").style.display = "none";
		com.get("menuDy").style.display = "none";
	})
	
	//Return
	com.get("menuFh").addEventListener("click", function(e) {
		com.get("indexBox").style.display = "block";
		com.get("menuQj").style.display = "none";
		com.get("menuDy").style.display = "none";
	})
	
	//close
	com.get("menuGb").addEventListener("click", function(e) {
		com.get("indexBox").style.display = "block";
		com.get("menuQj").style.display = "none";
		com.get("menuDy").style.display = "none";
	})
	
	//reset
	com.get("restartBtn").addEventListener("click", function(e) {
		if (confirm("是否确定要重新开始？")){
			play.isPlay=true ;
			play.init( play.depth,play.nowMap );
		}
	})
	
	//AI match
	com.get("indexDy").addEventListener("click", function(e) {
		com.get("indexBox").style.display = "none";
		com.get("menuQj").style.display = "none";
		com.get("menuDy").style.display = "block";
	})
	
	//挑战棋局
	com.get("indexQj").addEventListener("click", function(e) {
		com.get("indexBox").style.display = "none";
		com.get("menuQj").style.display = "block";
		com.get("menuDy").style.display = "none";
	})

	//换肤
	com.get("stypeBtn").addEventListener("click", function(e) {
		var stype =com.nowStype;
		if (stype=="stype3") stype="stype2";
		else if (stype=="stype2") stype="stype1";
		else if (stype=="stype1") stype="stype3";
		com.init(stype);
		com.show();
		//play.depth = 4;
		//play.init();
		document.cookie="stype=" +stype;
		clearInterval(timer);
		var i=0;
		var timer = setInterval(function (){
			com.show();
			if (i++>=5) clearInterval(timer);
		},2000);
	})
	
	//获取单选框选择的值
	function getRadioValue (name){
		var obj = document.getElementsByName(name);
		//var obj = document.getElementsByTagName("input");
		for(var i=0; i<obj.length; i ++){
			if(obj[i].checked){
				return obj[i].value;
			}
		}
	}
	
	com.getData("js/gambit.all.js",
		function(data){
		com.gambit=data.split(" ");
		AI.historyBill = com.gambit;
	})// 等待删除
}

//载入图片
com.loadImages = function(stype){
	
	com.bgImg = new Image();
	com.bgImg.src  = "img/"+stype+"/bg.png";
	
	com.dotImg = new Image();
	com.dotImg.src  = "img/"+stype+"/dot.png";
	
	for (var i in com.args){
		com[i] = {};
		com[i].img = new Image();
		com[i].img.src = "img/"+stype+"/"+ com.args[i].img +".png";
		//com[i].img.src = "img/"+stype+"/r_m.png";
	}
	
	com.paneImg = new Image();
	com.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//show list
com.show = function (){
	com.ct.clearRect(0, 0, com.width, com.height);
	for (var i=0; i<com.childList.length ; i++){
		com.childList[i].show();
	}
}

//pane for selected piece
com.showPane  = function (x,y,newX,newY){
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
}

//generate chesses
com.createMans = function(map){
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				com.mans[key]=new com.class.Man(key);
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.childList.push(com.mans[key])
			}
		}
	}
}


//debug alert
com.alert = function (obj,f,n){
	if (typeof obj !== "object") {
		try{console.log(obj)} catch (e){}
		//return alert(obj);
	}
	var arr = [];
	for (var i in obj) arr.push(i+" = "+obj[i]);
	try{console.log(arr.join(n||"\n"))} catch (e){}
	//return alert(arr.join(n||"\n\r"));
}

var z = com.alert;
var l = console.log;

//获取元素距离页面左侧的距离
com.getDomXY = function (dom){
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var current = dom.offsetParent;
	while (current !== null){
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {x:left,y:top};
}

//get cookie
com.getCookie = function(name){
	if (document.cookie.length>0){
		start=document.cookie.indexOf(name + "=")
		if (start!=-1){
			start=start + name.length+1
			end=document.cookie.indexOf(";",start)
		if (end==-1) end=document.cookie.length
			return unescape(document.cookie.substring(start,end))
		}
	}
	return false;
}
com.arr2Clone = function (arr){
	var newArr=[];
	for (var i=0; i<arr.length ; i++){
		newArr[i] = arr[i].slice();
	}
	return newArr;
}

com.getData = function (url,fun){
	var XMLHttpRequestObject=false;
	if(window.XMLHttpRequest){
		XMLHttpRequestObject=new XMLHttpRequest();
	}else if(window.ActiveXObject){
	XMLHttpRequestObject=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(XMLHttpRequestObject){
		XMLHttpRequestObject.open("GET",url);
		XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		XMLHttpRequestObject.onreadystatechange=function (){
			if(XMLHttpRequestObject.readyState==4 && XMLHttpRequestObject.status==200){
				fun (XMLHttpRequestObject.responseText)
				//return XMLHttpRequestObject.responseText;
			}
		}
	XMLHttpRequestObject.send(null);
	}
}

//把坐标生成着法
com.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = com.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.my===1){
		var mumTo=["一","二","三","四","五","六","七","八","九","十"];
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "退";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "进";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["１","２","３","４","５","６","７","８","９","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "进";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "退";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}
	return h;
}

com.initMap = [
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];

com.keys = {
	"c0":"c","c1":"c",
	"m0":"m","m1":"m",
	"x0":"x","x1":"x",
	"s0":"s","s1":"s",
	"j0":"j",
	"p0":"p","p1":"p",
	"z0":"z","z1":"z","z2":"z","z3":"z","z4":"z","z5":"z",
	
	"C0":"c","C1":"C",
	"M0":"M","M1":"M",
	"X0":"X","X1":"X",
	"S0":"S","S1":"S",
	"J0":"J",
	"P0":"P","P1":"P",
	"Z0":"Z","Z1":"Z","Z2":"Z","Z3":"Z","Z4":"Z","Z5":"Z",
}

//define chess movement
com.bylaw ={}
//che
com.bylaw.c = function (x,y,map,my){
	var d=[];
	//left search
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (com.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])
		}
	}
	//right search
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (com.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])
		}
	}
	//upward search
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])
		}
	}
	//downward search
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])
		}
	}
	return d;
}

//ma
com.bylaw.m = function (x,y,map,my){
	var d=[];
		//1 clock
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].my!=my)) d.push([x+1,y-2]);
		//2 clock
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].my!=my)) d.push([x+2,y-1]);
		//4 clock
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].my!=my)) d.push([x+2,y+1]);
		//5 clock
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].my!=my)) d.push([x+1,y+2]);
		//7 clock
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].my!=my)) d.push([x-1,y+2]);
		//8 clock
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].my!=my)) d.push([x-2,y+1]);
		//10 clock
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].my!=my)) d.push([x-2,y-1]);
		//11 clock
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].my!=my)) d.push([x-1,y-2]);

	return d;
}

//xiang
com.bylaw.x = function (x,y,map,my){
	var d=[];
	if (my===1){ //red side
		//bottom-right
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//bottom-left
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//up-right
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//up-left
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}else{
		//bottom-right
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//bottom-left
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//up-right
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//up-left
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}
	return d;
}

//shi
com.bylaw.s = function (x,y,map,my){
	var d=[];
	if (my===1){ //red
		//bottom-right
		if ( y+1<= 9 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//bottom-left
		if ( y+1<= 9 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//up-right
		if ( y-1>= 7 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//up-left
		if ( y-1>= 7 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}else{
		//bottom-right
		if ( y+1<= 2 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//bottom-left
		if ( y+1<= 2 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//up-right
		if ( y-1>= 0 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//up-left
		if ( y-1>= 0 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}
	return d;
	
}

//jiang
com.bylaw.j = function (x,y,map,my){
	var d=[];
	var isNull=(function (y1,y2){
		var y1=com.mans["j0"].y;
		var x1=com.mans["J0"].x;
		var y2=com.mans["J0"].y;
		for (var i=y1-1; i>y2; i--){
			if (map[i][x1]) return false;
		}
		return true;
	})();
	
	if (my===1){ //red
		//up
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//down
		if ( y-1>= 7 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//when jiang face to another jiang
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["J0"].x,com.mans["J0"].y]);
		
	}else{
		//up
		if ( y+1<= 2  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//down
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//when jiang face to another jiang
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["j0"].x,com.mans["j0"].y]);
	}
	//right
	if ( x+1<= 5  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
	//left
	if ( x-1>= 3 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	return d;
}

//pao
com.bylaw.p = function (x,y,map,my){
	var d=[];
	//left serarch
	var n=0;
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break
			}
		}else{
			if(n==0) d.push([i,y])
		}
	}
	//right search
	var n=0;
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break
			}
		}else{
			if(n==0) d.push([i,y])
		}
	}
	//upward search
	var n=0;
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break
			}
		}else{
			if(n==0) d.push([x,i])
		}
	}
	//downward search
	var n=0;
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break
			}
		}else{
			if(n==0) d.push([x,i])
		}
	}
	return d;
}

//zu
com.bylaw.z = function (x,y,map,my){
	var d=[];
	if (my===1){ //red
		//up
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//right
		if ( x+1<= 8 && y<=4  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//left
		if ( x-1>= 0 && y<=4 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}else{
		//dwon
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//right
		if ( x+1<= 8 && y>=6  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//left
		if ( x-1>= 0 && y>=6 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}
	
	return d;
}
const adjust=[
	[0.93, 0.93, 0.93, 0.95, 0.95, 0.95, 0.93, 0.93, 0.93],
	[0.95, 0.97, 0.99, 1.00, 1.00, 1.00, 0.99, 0.97, 0.95],
	[0.95, 0.97, 0.99, 1.00, 1.00, 1.00, 0.99, 0.97, 0.95],
	[0.94, 0.96, 0.98, 0.99, 1.00, 0.99, 0.98, 0.96, 0.94],
	[0.91, 0.92, 0.93, 0.94, 0.95, 0.94, 0.93, 0.92, 0.91],

	[0.89, 0.90, 0.91, 0.92, 0.93, 0.92, 0.91, 0.90, 0.89],
	[0.88, 0.89, 0.90, 0.91, 0.92, 0.91, 0.90, 0.89, 0.88],
	[0.87, 0.88, 0.89, 0.90, 0.91, 0.90, 0.89, 0.88, 0.87],
	[0.86, 0.87, 0.88, 0.89, 0.90, 0.89, 0.88, 0.87, 0.86],
	[0.85, 0.86, 0.87, 0.88, 0.89, 0.88, 0.87, 0.86, 0.85]
];
com.value = {
	
	//che
	c: (function() {
        var matrix = [];
        for (var row = 0; row < 10; row++) {
            matrix[row] = [];
            for (var col = 0; col < 9; col++) {
                matrix[row][col] =Math.floor(adjust[row][col] * (220-((Math.abs(col-4) * 0.2+0.1) * (Math.abs(row-2) * 0.2+0.1))))
            }
        }
        return matrix;
    })(),
	/* 	[185,219]=34
	[204.18150000000003, 204.27450000000002, 204.3675, 208.8575, 208.9525, 208.8575, 204.3675, 204.27450000000002, 204.18150000000003]
	[208.74349999999998, 213.19629999999998, 217.6515, 219.91, 219.97, 219.91, 217.6515, 213.19629999999998, 208.74349999999998]
	[208.91449999999998, 213.3321, 217.7505, 219.97, 219.99, 219.97, 217.7505, 213.3321, 208.91449999999998]
	[206.54619999999997, 210.99839999999998, 215.453, 217.71089999999998, 219.97, 217.71089999999998, 215.453, 210.99839999999998, 206.54619999999997]
	[199.7905, 202.078, 204.3675, 206.659, 208.9525, 206.659, 204.3675, 202.078, 199.7905]
	[195.23930000000001, 197.559, 199.88150000000002, 202.20680000000002, 204.53490000000002, 202.20680000000002, 199.88150000000002, 197.559, 195.23930000000001]
	[192.8872, 195.23930000000001, 197.59500000000003, 199.9543, 202.3172, 199.9543, 197.59500000000003, 195.23930000000001, 192.8872]
	[190.53869999999998, 192.92239999999998, 195.3105, 197.703, 200.0999, 197.703, 195.3105, 192.92239999999998, 190.53869999999998]
	[188.1938, 190.6083, 193.028, 195.45290000000003, 197.883, 195.45290000000003, 193.028, 190.6083, 188.1938]
	[185.8525, 188.297, 190.7475, 193.204, 195.66649999999998, 193.204, 190.7475, 188.297, 185.8525]*/
	
	/*[194,233]=39	
		c:[
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],
		
		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],*/

	//ma
	m:(function() {
        var matrix = [];
        for (var row = 0; row < 10; row++) {
            matrix[row] = [];
            for (var col = 0; col < 9; col++) {
                matrix[row][col] = adjust[row][col]*100;
				if((col===1&&row===3)||(col===3&&row==3)||(col===5&&row==3)||(col===7&&row===3)){
					matrix[row][col]+=10;
				}if(col===2&&row===7||col===7&&row==7){
					matrix[row][col]+=5;
				}
				
            }
        }
        return matrix;
    })(),

	/*【109，85】=24
	[93, 93, 93, 95, 95, 95, 93, 93, 93]
	[95, 97, 99, 100, 100, 100, 99, 97, 95]
	[95, 97, 99, 100, 100, 100, 99, 97, 95]
	[94, 106, 98, 109, 100, 109, 98, 106, 94]
	[91, 92, 93, 94, 95, 94, 93, 92, 91]
	[89, 90, 91, 92, 93, 92, 91, 90, 89]
	[88, 89, 90, 91, 92, 91, 90, 89, 88]
	[87, 88, 89, 90, 91, 90, 89, 88, 87]
	[86, 87, 88, 89, 90, 89, 88, 87, 86]
	[85, 86, 87, 88, 89, 88, 87, 86, 85]
	 [107,88]=19
	m:[
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96,103, 97, 94, 97,103, 96, 90],
		[92, 98, 99,103, 99,103, 99, 98, 92],
		[93,108,100,107,100,107,100,108, 93],
		[90,100, 99,103,104,103, 99,100, 90],
		
		[90, 98,101,102,103,102,101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],*/
	
	//xiang
	x:(function() {
		var matrix = [];
		for (var row = 0; row < 10; row++) {
			matrix[row] = [];
			for (var col = 0; col < 9; col++) {

			matrix[row][col]=23-Math.abs(col-4);
		}

		}return matrix;
	})(),
		/*[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0,20, 0, 0, 0,20, 0, 0],
		
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18,0, 0, 0,23, 0, 0, 0,18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0,20, 0, 0, 0,20, 0, 0]*/
	
	
	//shi
	s:(function() {
		var matrix = [];
		for (var row = 0; row < 10; row++) {
			matrix[row] = [];
			for (var col = 0; col < 9; col++) {
			if(col===4){
				matrix[row][col]=23;
			}else{matrix[row][col]=20;}

			}
		}return matrix;
	})(),

		/*[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0]*/
	
	
	//jiang
	j:(function() {
		var matrix = [];
		for (var row = 0; row < 10; row++) {
			matrix[row] = [];
			for (var col = 0; col < 9; col++) {
				matrix[row][col]=8888;

			}
		}return matrix;
	})(),
	
	//pao
	p: (function() {
		var matrix = [];
for (var row = 0; row < 10; row++) {
  matrix[row] = [];
  for (var col = 0; col < 9; col++) {
    var base = Math.floor(100 * adjust[row][col]);
    var adj = 0;

    if (row === 0) {
      adj += Math.abs(col - 4) * 2;
    } else if (row === 1 || row === 2) {
      adj += Math.abs(col - 4) * 2 - 7;
      if (col > 2 && col < 6) {
        adj -= 7;
      }
    } else if (row === 7) {
      adj -= Math.abs(col - 4) * 2;
      adj += 2;
    } else if (row === 5) {
      adj += 2;
    }
    if (row > 6) { 
      adj += 7;
    }
    if (col === 4) {
      adj += 5;
    }
    matrix[row][col] = base + adj;
  }
}
return matrix;

	})(),
	
	/*p:[
		
		[100, 100,  96, 91,  90, 91,  96, 100, 100],
		[ 98,  98,  96, 92,  89, 92,  96,  98,  98],
		[ 97,  97,  96, 91,  92, 91,  96,  97,  97],
		[ 96,  99,  99, 98, 100, 98,  99,  99,  96],
		[ 96,  96,  96, 96, 100, 96,  96,  96,  96],
		
		[ 95,  96,  99, 96, 100, 96,  99,  96,  95],
		[ 96,  96,  96, 96,  96, 96,  96,  96,  96],
		[ 97,  96, 100, 99, 101, 99, 100,  96,  97],
		[ 96,  97,  98, 98,  98, 98,  98,  97,  96],
		[ 96,  96,  97, 99,  99, 99,  97,  96,  96]
	],*/
	
	//zu
	z:(function() {
		var matrix = [];
		for (var row = 0; row < 10; row++) {
			matrix[row] = [];
			for (var col = 0; col < 9; col++) {
				
				matrix[row][col]=Math.ceil(45*adjust[row][col]);
				matrix[row][col]-=(Math.abs(col-4)*2.5+Math.abs(row));
				if(row>4){matrix[row][col]-=15;}
				if(row===0){
					matrix[row][col]-=30;
				}
			}
		}
		return matrix;
	})(),
	}
		/*[ 9,  9,  9, 11, 13, 11,  9,  9,  9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],
		
		[ 7,  0, 13,  0, 16,  0, 13,  0,  7],
		[ 7,  0,  7,  0, 15,  0,  7,  0,  7],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0]*/


//black is the flip of red
com.value.C = com.arr2Clone(com.value.c).reverse();
com.value.M = com.arr2Clone(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.arr2Clone(com.value.p).reverse();
com.value.Z = com.arr2Clone(com.value.z).reverse();

//chesses
com.args={
	//name;img;controller;type;value
	'c':{text:"车", img:'r_c', my:1 ,bl:"c", value:com.value.c},
	'm':{text:"马", img:'r_m', my:1 ,bl:"m", value:com.value.m},
	'x':{text:"相", img:'r_x', my:1 ,bl:"x", value:com.value.x},
	's':{text:"仕", img:'r_s', my:1 ,bl:"s", value:com.value.s},
	'j':{text:"将", img:'r_j', my:1 ,bl:"j", value:com.value.j},
	'p':{text:"炮", img:'r_p', my:1 ,bl:"p", value:com.value.p},
	'z':{text:"兵", img:'r_z', my:1 ,bl:"z", value:com.value.z},
	
	'C':{text:"�", img:'b_c', my:-1 ,bl:"c", value:com.value.C},
	'M':{text:"�R", img:'b_m', my:-1 ,bl:"m", value:com.value.M},
	'X':{text:"象", img:'b_x', my:-1 ,bl:"x", value:com.value.X},
	'S':{text:"士", img:'b_s', my:-1 ,bl:"s", value:com.value.S},
	'J':{text:"帅", img:'b_j', my:-1 ,bl:"j", value:com.value.J},
	'P':{text:"炮", img:'b_p', my:-1 ,bl:"p", value:com.value.P},
	'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z", value:com.value.Z}
};

com.class = com.class || {} //type
com.class.Man = function (key, x, y){
	this.pater = key.slice(0,1);
	var o=com.args[this.pater]
	this.x = x||0;
    this.y = y||0;
	this.key = key ;
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = []; //point
	
	this.show = function (){
		if (this.isShow) {
			com.ct.save();
			com.ct.globalAlpha = this.alpha;
			com.ct.drawImage(com[this.pater].img,com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y +com.pointStartY);
			com.ct.restore();
		}
	}
	
	this.bl = function (map){
		var map = map || play.map
		return com.bylaw[o.bl](this.x,this.y,map,this.my)
	}
}

com.class.Bg = function (img, x, y){
	this.x = x||0;
    this.y = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x,com.spaceY *  this.y);
	}
}
com.class.Pane = function (img, x, y){
	this.x = x||0;
    this.y = y||0;
	this.newX = x||0;
    this.newY = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) {
			com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y + com.pointStartY)
			com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX  , com.spaceY *  this.newY + com.pointStartY)
		}
	}
}

com.class.Dot = function (img, x, y){
	this.x = x||0;
    this.y = y||0;
	this.isShow = true;
	this.dots=[]
	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0]+10  + com.pointStartX ,com.spaceY *  this.dots[i][1]+10 + com.pointStartY)
		}
	}
}

com.init();

