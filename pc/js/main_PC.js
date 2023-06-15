$(document).ready(function(){

	// 탭		 
	$('.tab_contents').find('.bill').hide(); //가리는거 hide
	$('.tab_contents').find('.bill#tab_event-1').fadeIn(1000);


	$('.tab_btn').find('a').eq(0).addClass('active');

	$('section#con1').find('.tab_btn').on('click','a',function(event){

		event.preventDefault();

		if($(this).hasClass('active')){

		  return;
		}

		var $index = $(this).parent('div').index(); //this를 누를때 몇번값을 인지하는지 알고싶을때 index 사용

		//콘텐츠가 바뀌어야 한다
		$('.tab_contents').find('.bill').hide();
		$($(this).attr('href')).show();

		$('.tab_btn').find('a').removeClass('active');
		$(this).addClass('active');

	});


	//퀴즈
	$('section#con4').find('.click_btn').on('click','a',function(event){
		$('.bg_blind_1').show();
	});
	
	$('.bg_blind_1').find('.close_btn').on('click',function(event){
		$('.bg_blind_1').hide();
		$('#quiz01').addClass('active');
	});

	$(function(){

		$('.quiz_box > .qb_contents > #quiz01 > .answer').on('click',function(){
			$('#quiz01').css('display','none');
			$('#quiz02').addClass('active');
		  });

		$('.quiz_box > .qb_contents > #quiz02 > .answer').on('click',function(){
			$('#quiz02').removeClass('active');
			$('#quiz03').addClass('active');
		 });

		$('.quiz_box > .qb_contents > #quiz03 > .answer').on('click',function(){

			$('#quiz03').removeClass('active');
			$('#quiz04').addClass('active');
		 });

		$('.quiz_box > .qb_contents > #quiz04 > .answer').on('click',function(){

			$('#quiz04').removeClass('active');
			$('#quiz05').addClass('active');
		 });

		$('.quiz_box > .qb_contents > #quiz05 > .answer').on('click',function(){

			$('#quiz05').removeClass('active');
			$('#quiz_answer').addClass('active');
		 });
		
	});


});