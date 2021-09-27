// const imgContainer = document.getElementById('imgs');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
// const imgs = document.querySelectorAll('#imgs img')

// let idx = 0
// let interval = setInterval(run, 2000);

// function run() {
//     idx++;
//     changeImage();
// }

// function changeImage() {
//     if(idx > imgs.length - 1) {
//         idx = 0;
//     } else if(idx < 0) {
//         idx = imgs.length - 1;
//     }

//     imgContainer.style.transform = `translateX(${-idx * 500}px)`
// }

// function resetInterval() {
//     clearInterval(interval);
//     interval = setInterval(run, 2000);
// }

// leftBtn.addEventListener('click', () => {
//     idx--;
//     changeImage();
//     resetInterval();
// });
// rightBtn.addEventListener('click', () => {
//     idx++;
//     changeImage();
//     resetInterval();
// });

var CircularCarousel = {   
	start_time : 0,
	list_obj : {},
	position : "Right",
	delay: 500,
	width: 20,
	margin_left: -3,
	computed_width: 23,
	init : function(position,ul_selector,delay){
		CircularCarousel.position = position;
		CircularCarousel.delay = delay;
		var li_array = document.querySelectorAll(ul_selector + ' li');
		CircularCarousel.width = li_array[0].offsetWidth;
		CircularCarousel.computed_width = CircularCarousel.width-CircularCarousel.margin_left;
		CircularCarousel.list_obj = {li_array: li_array,selector:ul_selector};
	},
	animateCarousel : function(timestamp){
		if(!CircularCarousel.start_time){CircularCarousel.start_time = timestamp;}
		var li_array = CircularCarousel.list_obj.li_array;
		var selector = CircularCarousel.list_obj.selector;
		var progress = timestamp - CircularCarousel.start_time;
		if(CircularCarousel.position == 'Left'){
			var margin_left = Math.max(CircularCarousel.computed_width-((progress*CircularCarousel.computed_width)/CircularCarousel.delay),CircularCarousel.margin_left);
			document.querySelector(selector + ' li:first-child').style.marginLeft = (margin_left*-1).toString()+'px';
			if(margin_left == CircularCarousel.margin_left){
				f_child = document.querySelector(selector + ' li:last-child');
				f_child.parentNode.removeChild(f_child);
				CircularCarousel.start_time = 0;
				return;
			}
		}else if(CircularCarousel.position == 'Right'){
			var margin_left = Math.min(((progress*CircularCarousel.computed_width)/CircularCarousel.delay),CircularCarousel.computed_width);
			document.querySelector(selector + ' li:first-child').style.marginLeft = (margin_left*-1).toString()+'px';
			if(margin_left == CircularCarousel.computed_width){
				f_child = document.querySelector(selector + ' li:first-child');
				f_child.parentNode.removeChild(f_child);
				CircularCarousel.start_time = 0;
				return;
			}
		}
		if(progress<=(CircularCarousel.delay+20)){
			requestAnimationFrame(CircularCarousel.animateCarousel);
		}else{
			CircularCarousel.start_time = 0;
		}
	},
	cloneListNode: function(li_node){
		var li = document.createElement('li');
		li.innerHTML = li_node.innerHTML;
		li.classList = li_node.classList;
		return li;
	},
	shiftCarousel : function(position,ul_selector,delay){	
        console.log("shiftCarousel")
		if(!CircularCarousel.start_time){
			CircularCarousel.init(position,ul_selector,delay);
			var frag = document.createDocumentFragment();
			var li_array = CircularCarousel.list_obj.li_array;
			var selector = CircularCarousel.list_obj.selector;
			if(position == 'Left'){
				var arr_len = li_array.length;
				frag.appendChild(li_array[arr_len-1]);
				for(var i=0;i<arr_len-1;i++){
					frag.appendChild(li_array[i]);
				}
				var li = CircularCarousel.cloneListNode(li_array[arr_len-1]);
				frag.appendChild(li);
			}
			if(position == 'Right'){
				var li = CircularCarousel.cloneListNode(li_array[0]);
				frag.appendChild(li);
				for(var i=1;i<li_array.length;i++){
					frag.appendChild(li_array[i]);
				}
				frag.appendChild(li_array[0]);
			}
			document.querySelector(selector).innerHTML = "";
			document.querySelector(selector).appendChild(frag);
			if(position == 'Left'){
				document.querySelector(selector + ' li:first-child').style.marginLeft = (CircularCarousel.computed_width*-1).toString() + "px";
			}
			requestAnimationFrame(CircularCarousel.animateCarousel);
		}	
	}	
}

leftBtn.addEventListener("click",function(){
    var delay = 500;  //Animation slide time in milliseconds
    var ul_selector = '#imgs ul';  //Pass the ul selector as input 
    var position = 'Left';
    CircularCarousel.shiftCarousel(position,ul_selector,delay);
});
  
rightBtn.addEventListener("click",function(){
    var delay = 500;  //Animation slide time in milliseconds
    var ul_selector = '#imgs ul';  //Pass the ul selector as input 
    var position = 'Right';
    CircularCarousel.shiftCarousel(position,ul_selector,delay);
});