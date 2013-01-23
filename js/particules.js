window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(/* function */ callback, /* DOMElement */ element){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();

			var b = document.body;
			var canvas = document.getElementsByTagName('canvas')[0];
			var context = canvas.getContext('2d');
	
	var _gravity = 0.5;
	
function Ptcl(obj){
	this.x = 0;
	this.y = 0;
	this.originX = 0;
	this.originY = 0;
	this.vx = 0;
	this.vy = 0;
	this.dt = 0;
	this.radius =  Math.random() * 3 + 3;
	this.size = 0;
	this.bound = 0;
	this.init = function(){//SET INITIAL POSITION / SIZE /VELOCITY
		this.x  = obj.originX;
		this.y  = obj.originY;
		this.gravity = _gravity;
		this.vx = getRandom(true) * 10;
		this.vy = - getRandom(false) * 10;
		this.size = 2 + getRandom(false) * 10;
		this.size = 2 + getRandom(false) * 10;
		//this.dt = .05;
		this.color = RGB2HTML(Math.round(Math.random() * 256),Math.round(Math.random() * 256),Math.round(Math.random() * 256));
		this.bound = 10 + getRandom(false) * 10;
	}	
	this.draw = function(){//DRAW HEART SHAPE
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y,this.radius,0,Math.PI * 2,false);
		context.closePath();
		context.fill();		
	}

	this.update = function(){//UPDATE POSITION		
		this.vy +=this.gravity;
		this.x += this.vx //* this.dt;
		this.y += this.vy //* this.dt;	
	}	
}	
function kill(){
	var i = 0;
	while(i<_p_array.length){		
		if(_p_array[i].y > 1000){
			_p_array.splice(i,1);
		}else{
			i++;
		}
	}
}
	//
	function enterFrame(){// DO EVERY FRAME
		createParticule();
		context.fillStyle = "rgba(0, 0, 0,1)";		
   	context.fillRect(0, 0, 800, 500); //CLEAN CANVAS
	
		for(i=0;i<_p_array.length;i++){//UPDATE AND DRAW EACH PARTICULE
			var p = _p_array[i];
			p.update();
			p.draw();
		}	
		kill();	
  	requestAnimFrame(enterFrame);
	}

	var _p_array = [],_isMouseDown = false;
	function createParticule(){
		if(!_isMouseDown)return;
		p = new Ptcl({originX:(canvas.width*0.5),originY:(canvas.height*0.5)});
		p.init();
		p.draw();
		//
		_p_array.push(p);
	}
	//
	function getRandom(bool){ 
	var rand = Math.random()
	if(bool){
		rand =  rand * 2 - 1
	}
	return rand;
	}
	function startApp(){
	var interval;
	canvas.width=800;
	canvas.height=500;
	//context.globalAlpha= 0.5;	
	document.addEventListener('mousedown',function (){_isMouseDown =true;},true);
	document.addEventListener('mouseup',function (){_isMouseDown =false;},true);
	enterFrame();
	}

	
	//
	function RGB2HTML(red, green, blue)
	{
		var decColor = red + 256 * green + 65536 * blue;
		return decColor.toString(16);
	}

