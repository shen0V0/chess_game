/*! 一叶孤舟 | qq:28701884 | 欢迎指教 */

var AI = AI||{};
var red=0;
var black=0;
AI.historyTable	=	{};		


//init AI
AI.init = function(pace){
	var initTime = new Date().getTime();
	AI.treeDepth=play.depth;
	
	AI.number=0;

	var val=AI.getAlphaBeta(-99999 ,99999, AI.treeDepth, com.arr2Clone(play.map),play.my);
	if (!val||val.value==-8888) {
		AI.treeDepth=2;
		val=AI.getAlphaBeta(-99999 ,99999, AI.treeDepth, com.arr2Clone(play.map),play.my);
	}
	if (val&&val.value!=-8888) {
		var man = play.mans[val.key];
		var nowTime= new Date().getTime();
		console.log('Best Move：'+
										com.createMove(com.arr2Clone(play.map),man.x,man.y,val.x,val.y)+
										' Search Depth：'+AI.treeDepth+' Search Branch：'+
										AI.number+'  Score：'+
										val.value+
										' Search Time：'+
										(nowTime-initTime)+'ms')
		return [man.x,man.y,val.x,val.y]
	}else {
		return false;
	}
}



//get all pieces
AI.getMapAllMan = function (map, my){
	var mans=[];
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key && play.mans[key].my == my){
				play.mans[key].x = n;
				play.mans[key].y = i;
				mans.push(play.mans[key])
			}
		}
	}
	return mans;
}

AI.getMoves = function (map, my){
	var manArr = AI.getMapAllMan (map, my);
	var moves = [];
	var foul=play.isFoul;
	for (var i=0; i<manArr.length; i++){
		var man = manArr[i];
		var val=man.bl(map);
		
		for (var n=0; n<val.length; n++){
			var x=man.x;
			var y=man.y;
			var newX=val[n][0];
			var newY=val[n][1];
			if (foul[0]!=x || foul[1]!=y || foul[2]!=newX || foul[3]!=newY ){
				moves.push([x,y,newX,newY,man.key])
			}
		}
	}
	return moves;
}
AI.getAlphaBeta = function (A, B, depth, map ,my) {
	if (depth == 0) {
		return {"value":AI.evaluate(map , my)}; 
　	}
　	var moves = AI.getMoves(map , my ); 
	for (var i=0; i < moves.length; i++) {
	
		var move= moves[i];
		var key = move[4];
		var oldX= move[0];
		var oldY= move[1];
		var newX= move[2];
		var newY= move[3];
		var clearKey = map[ newY ][ newX ]||"";

		map[ newY ][ newX ] = key;
		delete map[ oldY ][ oldX ];
		play.mans[key].x = newX;
		play.mans[key].y = newY;
		
	　　if (clearKey=="j0"||clearKey=="J0") {//checkmated
			play.mans[key]	.x = oldX;
			play.mans[key]	.y = oldY;
			map[ oldY ][ oldX ] = key;
			delete map[ newY ][ newX ];
			if (clearKey){
				 map[ newY ][ newX ] = clearKey;
			}
			return {"key":key,"x":newX,"y":newY,"value":8888};
	　　}else {
	　　	var val = -AI.getAlphaBeta(-B, -A, depth - 1, map , -my).value;
			//val = val || val.value;

			play.mans[key]	.x = oldX;
			play.mans[key]	.y = oldY;
			map[ oldY ][ oldX ] = key;
			delete map[ newY ][ newX ];
			if (clearKey){
				 map[ newY ][ newX ] = clearKey;
			}
	　　	if (val >= B) {
				return {"key":key,"x":newX,"y":newY,"value":B};
			}
			if (val > A) {
	　　　　	A = val; //Best Move;
				if (AI.treeDepth == depth) var rootKey={"key":key,"x":newX,"y":newY,"value":A};
			}
		}
　	}
	if (AI.treeDepth == depth) {//back to root
		if (!rootKey){
			//Checkmate can't be aviod
			return false;
		}else{
			//Best Move;
			return rootKey;
		}
	}

　return {"key":key,"x":newX,"y":newY,"value":A};
}



//calculate score
AI.evaluate = function (map,my){
	var val=0;
	red=0;
	black=0;
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				if(play.mans[key].my==1){
					red+=play.mans[key].value[i][n];
				}else{
					black+=play.mans[key].value[i][n];

				}
			}
		}
	}val = red-black;
	AI.number++;
	return val*my;
}


