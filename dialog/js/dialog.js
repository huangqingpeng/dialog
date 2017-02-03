
//定义一个构造函数，功能自定义弹窗  ，参数obj为传进来的修改弹窗的属性
function Dialog(obj){
	//默认的可以修改的属性
	this.config={
		  class:"a",//弹窗的类名，
	      title:"",//弹窗的标题
	      content:"",//弹窗的内容
	      width:300,//弹窗的宽度
	      height:200,//弹窗的高度
	      top:0,//弹窗的垂直定位
	      left:0,//弹窗的水平定位
	      drag:false,  //drag  值为true时代表可以拖动      为false时代表不能拖动
	      //生命周期，回调函数，当该事件完成之后，需要客户知道该事件已经完成，可以去处理一些事情
	      createCallback:function(){
	      	
	      },
	      deleteCallback:function(){
	      	
	      },
	      showCallback:function(){
	      	
	      }
	}
	//修改this.config里面的对应属性      用for in 循环遍历    i代表的是对象的键名
	for(var i in obj){//传进来的属性有则修改   ，没有则沿用默认的值
		this.config[i]=obj[i];
	}
	this.element=null;//用来保存整个弹窗窗口
	this.titleElememt=null;//用来保存弹窗窗口的标题
}
//把公有方法写在原型上
Dialog.prototype={
	_create:function(){//创建弹窗
		var that=this;
		//创建弹窗窗口的盒子
		var thisDialog=document.createElement("div");
		thisDialog.style.cssText="display: none;width:"+this.config.width+"px;height:"+this.config.height+"px;left:"+this.config.left+"px;top:"+this.config.top+"px";
		thisDialog.className="dialog_box "+this.config.class;//添加class名
		document.querySelector("body").appendChild(thisDialog);
		//创建弹窗窗口title标题
		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=this.config.title;
		thisDialog.appendChild(title);
		//创建关闭按钮
		var closeBtn=document.createElement("div");//关闭按钮
		closeBtn.className="close";
		closeBtn.innerHTML="X";
		thisDialog.appendChild(closeBtn);
		//创建弹窗窗口内容
		var content=document.createElement("div");
		content.className="content";
		content.innerHTML=this.config.content;
		thisDialog.appendChild(content);
		//创建的弹窗窗口赋给构造函数的属性
		this.element=thisDialog;
		//创建的弹窗窗口的标题赋给构造函数的的属性
		this.titleElememt=title;
		//给关闭按钮添加点击属性   点击时  删除弹窗
		
		closeBtn["onclick"]=function(){
			that.hidde();
		}
		//传进来的drag为true，表示可以拖拽
		if(this.config.drag){
			this.addDrag();
		}
	},
	_delete:function(){//删除弹窗
		document.querySelector("body").removeChild(this.element);
	},
	show:function(){//显示弹窗
		this._create();
		this.element.style.display="block";
	},
	hidde:function(){//隐藏弹窗
		this.config.deleteCallback();
		this.element.style.display="none";
		this._delete();
	},
	addDrag:function(){//添加拖拽
		var that=this;
		this.titleElememt["onmousedown"]=function(e1){
			console.log(e1);
			this.style.cursor="move";
			//鼠标摁下时鼠标相对于弹窗窗口坐标为x，y
			var e=e1||window.event;
			var x=e.offsetX;
			var y=e.offsetY;
			document.onmousemove=function(e2){
				var _e=e2||window.event;
				//鼠标在可视区域内移动的坐标
				var left=_e.clientX-x;
				var top=_e.clientY-y;
				var _height=document.documentElement.clientHeight||document.body.clientHeight;
				var _width=document.documentElement.clientWidth||document.body.clientWidth;
				//弹窗窗口可以动的范围
				if(left<0){
					left=0;
				}
				if(top<0){
					top=0;
				}
				if(left>_width-that.element.offsetWidth){
					left=_width-that.element.offsetWidth;
				}
				if(top>_height-that.element.offsetHeight){
					top=_height-that.element.offsetHeight;
				}
				that.element.style.left=left+"px";
				that.element.style.top=top+"px";
			}
			
		};
		this.titleElememt["onmouseup"]=function(){
			this.style.cursor="auto";
			document.onmousemove=null;
		}
	}
}

//重新封装alert  参数text；要弹出的内容
window.alert=function(text){
	var w=300,h=200;
	var _width=document.documentElement.clientWidth||document.body.clientWidth;
	var thisalert=new Dialog({
		  content:text,
		  class:"a",
	      title:"自定义弹窗窗口",
	      width:w,
	      height:h,
	      top:10,
	      left:(_width-w)/2,
	      drag:true
	});
	thisalert.show();
}








































































































