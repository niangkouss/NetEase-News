/**
 * Created by sole l on 2017/4/16.
 */

~function (desW) {
    var winW = document.documentElement.clientWidth;
    var ratio = winW/desW;
    document.documentElement.style.fontSize = ratio*100+'px';
}(750);

/*header ad begin*/
$.ajax({
    url:'http://g.163.com/ur?site=netease&affiliate=3g&cat=homepage&type=wap_column&location=1&_=1492354854431&callback=ad_info_2609',
    type:'get',
    dataType:'jsonp',
    jsonp:'callback',
    success:ad_info_2609
});
function ad_info_2609(data) {
    /*  console.log(data.pic_info[length].url);*/
    var headerAdhtml = $('#headerAd').html();
    var result = ejs.render(headerAdhtml,{
        headerAdData:data
    });
    $('.ad-column').html(result);
}
/*header ad end*/
var num=0;
function urlProvide() {
    var ary = ['http://3g.163.com/touch/jsonp/sy/recommend/0-10.html?hasad=1&offset=0&size=10&callback=syrec0'];
   /* return ary[num++];*/
    return ary[num];
}


function loadNews() {//瀑布流调用调用ajax就可以了,异步函数无法在进入,要么用回调函数,要么直接放在外面

    /*banner begin*/

    $.ajax({
        url:urlProvide(),
        type:'get',
        dataType:'jsonp',
        jsonp:'callback',
        success:syrec0
    });

    /*banner end*/

    /*adModule begin*/
    $.ajax({
        url:'http://g.163.com/ur?site=netease&affiliate=3g&cat=news&type=wap_stream&location=1&_=1492493771477&callback=ad_info_2673',
        type:'get',
        dataType:'jsonp',
        jsonp:'callback',
        success:ad_info_2673
    });

    /*adModule end*/

    /*single-text begin*/
}
function syrec0(data) {
    if(data){

        $.each(data,function (index,item) {
            if(index == 'focus'){
                var bannerHtml = $('#bannerSwiper').html();
                var result = ejs.render(bannerHtml,{
                    bannerData:item
                });
                $('.swiper-wrapper').html(result);

            }else if(index == 'news'){
                $.each(item,function (index,item) {
                    if(item.imgsrc3gtype =='1'){
                        /*picText begin*/
                        var picTexttHtml = $('#picText').html();

                        var picTextResult = ejs.render(picTexttHtml,{
                            picTextData:item
                        });

                        var $picText = $(' <section class="picText"></section>');
                        $picText.html(picTextResult);
                        $('.newsModule').append($picText);
                        /*picText begin*/
                    }else if(item.imgsrc3gtype =='2'){
                        /*threePics begin*/
                        var threePicsHtml = $('#threePics').html();

                        var threePicsResult = ejs.render(threePicsHtml,{
                            threePicsData:item
                        });
                        var $threePics = $('<section class="therePics"></section>');
                        $threePics.html(threePicsResult);
                        $('.newsModule').append($threePics);
                        /*threePics end*/
                    }
                });
            }else if(index =='list'){
                $.each(item,function (index,item) {
                    if(index =='1'){
                        console.log(index);
                        /*singleText begin*/
                        var singleTextHtml = $('#singleText').html();

                        var singleTxtResult = ejs.render(singleTextHtml,{
                            singleTextData:item
                        });

                        $('.single-text').append(singleTxtResult);
                        /*singleText begin*/
                    }else{
                        if(item.imgsrc3gtype =='1'){
                            /*picText begin*/
                            var picTexttHtml = $('#picText').html();

                            var picTextResult = ejs.render(picTexttHtml,{
                                picTextData:item

                            });
                            var $picText = $(' <section class="picText"></section>');
                            $picText.html(picTextResult);
                            $('.newsModule').append($picText);
                            /*picText begin*/
                        }else if(item.imgsrc3gtype =='2'){
                            /*threePics begin*/
                            var threePicsHtml = $('#threePics').html();

                            var threePicsResult = ejs.render(threePicsHtml,{
                                threePicsData:item
                            });

                            var $threePics = $('<section class="therePics"></section>');
                            $threePics.html(threePicsResult);
                            $('.newsModule').append($threePics);
                            /*threePics end*/
                        }
                    }
                });
            }



        });
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay : 2500,
            speed:900,
            pagination: '.swiper-pagination',
            paginationType : 'fraction',
            paginationElement : 'span'

        });
    }

}
function ad_info_2673(data) {
    var adModuleHtml = $('#adModule').html();
    var adModuleResult = ejs.render(adModuleHtml,{
        adModuleData:data
    });
    $('.adModule').html(adModuleResult);
}
loadNews();

/*
(function () {

    $(window).scroll(function () {
        var winH = $(window).height();
        var scrollT = $(this).scrollTop();
        var docH = $(document).height();
       /!* console.log(docH-(winH+scrollT)>400);*!/
       /!* console.log('s'+docH);*!/
         /!*if(docH-(winH+scrollT)>400){
            loadNews();
        };*!/
    });
    /!*if(){
        loadNews(); 
    }*!/
})();//一大堆回调,这里原生不好写,应该要插件*/
