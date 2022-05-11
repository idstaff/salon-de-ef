//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){
	var width = $(window).width();
	if(width <= 768) {//横幅が768px以下の場合
		$(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
		$(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
			var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
			$(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
			$(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
			return false;//リンクの無効化
		});
	}else{//横幅が768px以上の場合
		$(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
		$(".has-child>a").removeClass('active');//activeクラスを削除
		$('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
	}
}

// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
	mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){
	mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
});

//開閉ボタンについて
$(".openbtn1").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $(".header-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$(".has-child>ul a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
    $(".header-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});


//slickのデモ
$('.slider').slick({
	arrows: false,//左右の矢印はなし
	autoplay: true,//自動的に動き出すか。初期値はfalse。
	autoplaySpeed: 0,//自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
	speed: 6900,//スライドのスピード。初期値は300。
	infinite: true,//スライドをループさせるかどうか。初期値はtrue。
	pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
	pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
	cssEase: 'linear',//動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
	slidesToShow: 4,//スライドを画面に4枚見せる
	slidesToScroll: 1,//1回のスライドで動かす要素数
	responsive: [
		{
		breakpoint: 769,//モニターの横幅が769px以下の見せ方
		settings: {
			slidesToShow: 2,//スライドを画面に2枚見せる
		}
	},
	{
		breakpoint: 426,//モニターの横幅が426px以下の見せ方
		settings: {
			slidesToShow: 1.5,//スライドを画面に1.5枚見せる
		}
	}
]
});

$(function(){
	var pagetop = $('#pagetop-sp');

	$(window).scroll(function () {
	   if ($(this).scrollTop() > 100) {
			pagetop.fadeIn();
	   } else {
			pagetop.fadeOut();
	   }
	});
	pagetop.click(function () {
	   $('body, html').animate({ scrollTop: 0 }, 500);
	   return false;
	});
  });

//下は旧トップへ戻るボタン（PC）  

//   $(function(){
// 	var pagetop = $('#pagetop-pc');

// 	$(window).scroll(function () {
// 	   if ($(this).scrollTop() > 100) {
// 			pagetop.fadeIn();
// 	   } else {
// 			pagetop.fadeOut();
// 	   }
// 	});
// 	pagetop.click(function () {
// 	   $('body, html').animate({ scrollTop: 0 }, 500);
// 	   return false;
// 	});
//   });




//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

	var scroll = $(window).scrollTop(); //スクロール値を取得
	if (scroll >= 200){//200pxスクロールしたら
		$('#pagetop-pc').removeClass('DownMove');		// DownMoveというクラス名を除去して
		$('#pagetop-pc').addClass('UpMove');			// UpMoveというクラス名を追加して出現
	}else{//それ以外は
		if($('#pagetop-pc').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
			$('#pagetop-pc').removeClass('UpMove');	//  UpMoveというクラス名を除去し
			$('#pagetop-pc').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
		}
	}
	
	var wH = window.innerHeight; //画面の高さを取得
	var footerPos =  $('#footer').offset().top; //footerの位置を取得
	if(scroll+wH >= (footerPos+10)) {
		var pos = (scroll+wH) - footerPos+10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
		$('#pagetop-pc').css('bottom',-200);
		
	}else{//それ以外は
		if($('#pagetop-pc').hasClass('UpMove')){//UpMoveというクラス名がついていたら
			$('#pagetop-pc').css('bottom','40px');// 下から10pxの位置にページリンクを指定
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #pagetop-pcをクリックした際の設定
$('#pagetop-pc').click(function () {
$('body,html').animate({
	scrollTop: 0//ページトップまでスクロール
}, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
return false;//リンク自体の無効化
});


  //アコーディオンをクリックした時の動作
$('.school-question-accordion-area-title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".school-question-accordion-area-box");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
	  
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
	  $(this).removeClass('close');//クラス名を除去し
	}else{//それ以外は
	  $(this).addClass('close');//クラス名closeを付与
	}
  });
  
  //ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
  $(window).on('load', function(){
	$('.school-question-accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
	$(".open").each(function(index, element){ //openクラスを取得
	  var Title =$(element).children('.school-question-accordion-area-title'); //openクラスの子要素のtitleクラスを取得
	  $(Title).addClass('close');       //タイトルにクラス名closeを付与し
	  var Box =$(element).children('.school-question-accordion-area-box'); //openクラスの子要素boxクラスを取得
	  $(Box).slideDown(500);          //アコーディオンを開く
	});
  });