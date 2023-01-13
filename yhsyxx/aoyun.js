$(document).ready(function(){
	//初始化动画
	if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	    new WOW().init();
	};
	
	//在线客服
	$('.scroll-top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
	
	$('.online dl').on("mouseover",function(){
		$(this).find("dt").show();
		$(this).siblings().find("dt").hide();
	});
	
	$('.online dl').find('.remove').on("click",function(){
		$(this).parents("dt").hide();
	});
	//导航栏吸顶
	window.addEventListener('scroll', handleScroll);
	function handleScroll(){
		var offsetTop = document.getElementById("navbar-replacement").getBoundingClientRect().top;
		if(offsetTop<=0){
			$(".navbar").addClass("active");
			$('.online .scroll-top').show();
			//$(".navbar").css("position","fixed");
			//$(".navbar").css("top","0");
		}else{
			$(".navbar").removeClass("active");
			$('.online .scroll-top').hide();
		}
	}

	var toggler = document.getElementById('navbar-toggler');
	var navbarmd = document.getElementById('navbar-md');
	toggler.addEventListener('click',function(){
		var isClicked = this.classList.contains('clicked');
		if(isClicked){
			//navbarmd.style.display = 'none';
			this.classList.remove('clicked');
			scrolling();
		}else{
			this.classList.add('clicked');
			//navbarmd.style.display = 'block';
			stopScroll();
		}
		
	});
	
	function stopScroll(){
		//定义一个函数来给body添加fixed属性
		fixedBody();
		//为了兼容移动端，还需要做一下判断，并且给body添加modal-open类
		var bodyWidth = $('body').width();
		$('body').addClass('modal-open');
		//判断如果是移动端
		if(bodyWidth > 768){
			//移动端padding-right设置为17px
			document.body.paddingRight = '17px';
		}
	}
	
	function scrolling(){
		//定义一个函数来还原页面滚动
		looseBody();
		var bodyWidth = $('body').width();
		$('body').removeClass('modal-open');
		if(bodyWidth > 768){
			document.body.paddingRight = '0';
		}
	}
	
	//弹框出现的时候禁止滚动
	function fixedBody(){
		//在有的浏览器上有多次以上点击的时候（这时主要是因为弹框与弹框之间做切换时scrollTop会为0）
		var nowTop = Math.abs(document.body.style.top.split('p')[0]);
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		//只有在弹框出现的时候才有body的top值，弹框关闭的时候是没有的，第一次点击的时候会获取到
		if(nowTop !== "" && nowTop !== 0){
			scrollTop = nowTop;
		}
		document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;left:0;right:0;';
	}
	
	//弹框消失的时候取消禁止滚动效果
	function looseBody(){
		var body = document.body;
		body.style.position = '';
		var top = body.style.top;
		document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
		body.style.top = '';
	}

});
