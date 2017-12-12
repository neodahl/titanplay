/*
js가 동기화가 되어 있지 않으므로 수정한 부분은 기록하여 확인하고 푸시후 삭제한다.

2017/10/11
* 셀렉트 박스 슬라이드 토글 속도 조정 (250, 200) 추가.

2017/10/11
* 탑버튼 추가 (goto_top 으로 검색 ) - 10/31 완료

2017/11/06
* 팝업 내부에서 팝업을 여는 data-call-child-pop 추가 - 11/08완료
* scroll_wrapper 스크롤 추가 - 11/08완료

*/



// $(document).ready(function(){
$(window).on("load",function(){
    /*custom scroll bar*/
    $('.hide_scrollbar').mCustomScrollbar({
        axis: 'yx',
        // autoDraggerLength: true,
        mouseWheel:{
            scrollAmount: 500
        },
        scrollInertia: 600, //스크롤 속도
        scrollEasing: "easeInOut", // linear, easeOut, easeInOut
        // autoExpandScrollbar: true,
        callbacks:{
            whileScrolling:function(){
                if( this.mcs.draggerTop > 150 ) {
                    $('.goto_top').addClass('on');
                } else {
                    $('.goto_top').removeClass('on');
                }
            }
        }

    });

    /*Go to Top button*/
    $('.goto_top').on('click', function(){
        $('#mCSB_1_container').animate({top: '0'});
        $('#mCSB_1_dragger_vertical').animate({top: '0'});
        $(this).removeClass('on');
    });


    /*Select Box - birthday option*/
    $('.list_birth').mCustomScrollbar({
        //해당 엘리먼트에 max-height를 적용하면 플리커 현상이 있다.
        axis: 'y'
    });

    /*정보 팝업 내 아코디언 아이템 정보*/
    $('.accd_container_info').mCustomScrollbar({
        axis: 'y'
    });


    /*Secret Request, Secret Follwer, Add Secret Follower 팝업*/
    $('.scroll_wrapper').mCustomScrollbar({
        axis: 'y'
    });


});


/*Header - 검색버튼*/
$('.input_search').on('click', function(){
    $(this).parent().parent().addClass('on');
    $(this).on('blur', function(){
        if( $(this).val().length == 0 ) {
            $(this).parent().parent().removeClass('on');
        }
    });
});


/*입력 내용 삭제 - 공통*/
$('.btn_del_txt').on('click', function(){
    $(this).siblings('input').val('');
    $(this).siblings('input').focus();
    $(this).siblings('.bg_wrapper').children().children().val('') //textarea 내용 삭제
});


/*Header - 사용자 메뉴 팝업*/
$('.btn_user').on('click', function(){
    $('.user_pop').toggleClass('on'); /*사용자 이미지 재클릭시 on 사라지지 않음. 다시 확인해야함.*/
});

/*사용자 메뉴 팝업 외 클릭시*/
$(document).mouseup(function(e){
    var targetLayer = $('.user_pop');

    if( !targetLayer.is(e.target) && targetLayer.has(e.target).length === 0 ) {
        targetLayer.removeClass('on');
    }
});







/*탭 - 공통*/
$('[class^="tab_menu"] li').on('click', function(){
    $(this).siblings('li').removeClass('on');
    $(this).addClass('on');

    if( $(this).hasClass('unbind_cont') ) {
        // 메뉴 li에 unbind_cont 클래스를 추가하여 작동을 하지 않게 한다.
        return false;
    } else {
        $(this).parent().siblings('[class^="tab_container"]').children('[class^="tab_content"]').removeClass('on');
        $(this).parent().siblings('[class^="tab_container"]').children('[class^="tab_content"]').eq( $(this).index() ).addClass('on');
    }

});


/*테스트용 - 마이 월렛에서 사용됨*/
$('#testButton').on('click', function(){
    $('#test tr:not(.no_history)').remove();
});







/*팝업 - 공통*/
// 팝업을 호출할 엘리먼트에 data-call-pop 속성을 추가하고 해당 속성값과 동일한 값을 불러올 팝업의 최상단(div.pop_dim)에 추가한다.
//팝업 호출
$('[data-call-pop]').on('click', function(){
    var data_name = $(this).data('callPop');
    var popup_class_name = '.' +data_name; // class로 호출할 경우
    var popup_id_name = '#' +data_name; // id로 호출할 경우

    $('.pop_dim').hide();
    $(popup_class_name).show();
    $(popup_id_name).show();
});
$('[data-call-child-pop]').on('click', function(){
    var data_name = $(this).data('callChildPop');
    var popup_class_name = '.' +data_name; // class로 호출할 경우
    var popup_id_name = '#' +data_name; // id로 호출할 경우

    $(popup_class_name).show();
    $(popup_id_name).show();
});

// 팝업 닫기 - 팝업을 닫을 엘리면트에 data-close-pop 속성을 추가해준다.
$('[data-close-pop]').on('click', function(){
    $(this).parents('.pop_dim').hide();
});


/*Select Box*/
$('.selectbox_top').on('click', function(){
    $(this).toggleClass('on');
    $(this).siblings('.selectbox_options').slideToggle(250);
});
$('.selectbox_options li').on('click', function(){
    $(this).parents('.selectbox_options').siblings('.selectbox_top').children('.seleted_value').text( $(this).text() );
    $('.selectbox_options').slideUp(200);
    $('.selectbox_top').removeClass('on');
});



/*정보 팝업*/
// 상단 SelectBox
$('.tab_content_tpInfo .selectbox_options li').on('click', function(){
    $('.tab_content_tpInfo.on .accd_container_info').hide();
    $('.tab_content_tpInfo.on .accd_container_info').eq($(this).index()).show();
});
// Accordion
$('.accd_item_info em').on('click', function(){
    $(this).parents('.accd_item_info').siblings('.accd_item_info').children('.accd_view_area_info').slideUp();
    $(this).siblings().slideToggle();
});










// Drag and Drop
var dndObj = $('.dropzone'); // 대상 엘리먼트에 해당 클래스를 넣어서 사용함.

dndObj.on('dragenter', function(e){
    // console.log('drag enter event');
    e.stopPropagation();
    e.preventDefault();
});
dndObj.on('dragover', function(e){
    // console.log('drag over event');
    e.stopPropagation();
    e.preventDefault();
});
dndObj.on('drop', function(e){
    alert('drop event!');

    e.preventDefault();
});

/*우클릭 방지*/
// $('body').contextmenu( function() {
//     return false;
// });





