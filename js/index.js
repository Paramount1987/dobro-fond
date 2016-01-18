 $(document).ready(function() {
		//one page slider
    $('#fullpage').fullpage({
        autoScrolling: false,
        fitToSection: false
      });
//////////////////////////////////
    $( ".swipebox" ).swipebox();

//////////////////////////////////////
    $('.up-arrow').click(function(){ 
      $('html,body').animate({ scrollTop: 0 }, 800);
    });
///////////////////////////////////////
    $('.arrow-down').click(function(){ 
      var height = $(".page1 .fp-tableCell").height();
      $(".baloon").addClass('active');
      setTimeout(function(){
        $('html,body').animate({ scrollTop: height }, 900);
        $(".baloon").removeClass('active');
      },500)
      
    });
///////////////////////////////////////////////btn-app
    $('.btn-app').click(function(){ 
      var offset = $(".page7").offset();

        $('html,body').animate({ scrollTop: offset.top }, 900);
      
    });

/////////////////////////////////////////////nav

    $('.nav-inner span').click(function(){ 

      $('.nav-inner span').removeClass('active');
      $(this).addClass('active');
      
    });

    var navOffset = $('.nav-inner').offset();


      $('.nav-inner').affix({
        offset: {
          top: navOffset.top
          
        , bottom: $('.page6').outerHeight(true) + $('.page7').outerHeight(true)
      
        }
      });


    ///////////////////////////////select option
     $('.selectpicker').selectpicker({
          style: 'btn-info',
          size: 7
      });

    /////////////////////////scroll horizontal for image
     $('.image-scroll').jScrollPane();
     $(window).resize(function(){
     	$('.image-scroll').jScrollPane();
     });

     ////////////////////////////carousel
     $("#reviews").owlCarousel({
      items : 3, //10 items above 1000px browser width
      itemsDesktop : [1400,2], //5 items between 1000px and 901px
      itemsDesktopSmall : false, // betweem 900px and 601px
      itemsTablet: false, //2 items between 600 and 0
      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
     });
     //input file
     $(".letter-file").change(function(){
        var filename = $(this).val().substring($(this).val().lastIndexOf("\\") + 1);
        $(".download-btn").text( filename  || "Загрузить" );
     });

     /////////////////////////////map
          var myMap;

          // Дождёмся загрузки API и готовности DOM.

          if(!$("#map").length == 0){
             ymaps.ready(init);
           }

          function init () {
              // Создание экземпляра карты и его привязка к контейнеру с
              // заданным id ("map").
                          myMap = new ymaps.Map('map', {
                              // При инициализации карты обязательно нужно указать
                              // её центр и коэффициент масштабирования.
                              center: [55.79893027700552,37.5311994999999], // Москва
                              zoom: 16,
                              controls:[]
                          });

                      var myPlacemark = new ymaps.Placemark([55.79893027700552,37.5311994999999],
                         {
                        // Свойства.
                        hintContent: ''
                    },
                        {
                        iconImageHref: 'images/i/mark.png',
                        iconImageSize: [28, 36],
                        iconImageOffset: [0, 0]
                        });

                      myMap.behaviors.disable('scrollZoom');
                      myMap.geoObjects.add(myPlacemark);

          }

///////////////////////////slide hover
  Navsly = {

    init: function(){

      Navsly.widthSly = $(".nav-sly").width();
      Navsly.widthWrap = $(".nav-inner").width(); 
      Navsly.maxValue = $(".nav-sly").width() - $(".nav-inner").width() + 25;

      Navsly.maxRight = $(".nav-sly").width() - $(".nav-inner").width() + 25;

      Navsly.positionSly = 0;
      $(".nav-sly").css("left","-" + Navsly.positionSly  + "px");


      Navsly.direction();
      Navsly.eventHandler();
    },

    positionX: 0,
    positionLeft: 0,
    currentX: 0,
    positionSly: 0,
    left: false,
    right: true,

    direction: function(e){

      $(".nav").on("mouseenter",function(e){
        Navsly.positionX = e.pageX;
        Navsly.currentX = e.pageX;
      });

    },

    eventHandler: function(){

      if(Navsly.isTouchDevice()){

        var startPos = 0;
        var currentE = 0;
        var right = false;
        var left = true;

        $(".nav-inner").on("touchstart",function(event){
          var e = event.originalEvent;
          startPos = e.touches[0].pageX;
          currentE = event.originalEvent;

        });

        $(".nav-inner").on("touchmove",function(event){

          var e = event.originalEvent;


          if( e.touches[0].pageX - startPos < 0){
            
            if(e.touches[0].pageX - currentE.touches[0].pageX > 0) startPos = e.touches[0].pageX;

            Navsly.positionSly += currentE.touches[0].pageX - e.touches[0].pageX;
            right = false;
            left = true;

           }else{

            if(e.touches[0].pageX - currentE.touches[0].pageX < 0) startPos = e.touches[0].pageX;

            Navsly.positionSly -= e.touches[0].pageX - currentE.touches[0].pageX;
            right = true;
            left = false;

           }
          

        if(Navsly.positionSly > Navsly.maxRight) 
            Navsly.positionSly = Navsly.maxRight;
        if(Navsly.positionSly < 0) 
            Navsly.positionSly = 0;


        $(".nav-sly").css("left","-" + Navsly.positionSly  + "px");

        currentE = event.originalEvent;


        });

        

      }


      $(".nav-inner").on("mousemove",function(e){   


        var ratio =1;
 
        var  pos = 1; 
        
        if (e.pageX == Navsly.currentX) return;

        if(e.pageX > Navsly.currentX){
          

          if(Navsly.left) {
            Navsly.positionX = e.pageX;
            ratio = ( Navsly.maxValue  - Navsly.positionSly)/(Navsly.widthWrap - Navsly.positionX);
          }
          ratio = ( Navsly.maxValue)/(Navsly.widthWrap - Navsly.positionX);
          pos = (e.pageX - Navsly.currentX) * ratio; 
          Navsly.positionSly += pos;

          Navsly.right = true;
          Navsly.left = false;
        }else{
          

         if(Navsly.right){
            Navsly.positionX = e.pageX;
            Navsly.positionleft = Navsly.positionSly;
         } 

          ratio = Navsly.positionleft/Navsly.positionX;

          pos = ( Navsly.currentX - e.pageX ) * ratio;
          Navsly.positionSly -= pos;

          Navsly.left = true;
          Navsly.right = false;
        }  

        if(Navsly.positionSly > Navsly.maxRight) 
            Navsly.positionSly = Navsly.maxRight;
        if(Navsly.positionSly < 0) 
            Navsly.positionSly = 0;

        $(".nav-sly").css("left","-" + Navsly.positionSly  + "px");

        Navsly.currentX = e.pageX;
        

      });

    },

    isTouchDevice: function is_touch_device() {
          return !!('ontouchstart' in window);
    },

    reload: function(){
      setTimeout(Navsly.init,250);
    }

 };

  
var widthAllspan = 0;

$(".nav-sly span").each(function(){
  widthAllspan += $(this).width();
});

if( widthAllspan > $(".nav-inner").width() ){

  $(".nav-sly").addClass("on");

  $('.nav-inner').on('affixed.bs.affix affix-top.bs.affix',function(){
       Navsly.reload();
  });

  Navsly.init();

 
  $(window).resize(function(){
    Navsly.reload();
  });

}
//////////////////////

});
		