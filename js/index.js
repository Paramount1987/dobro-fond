$(document).ready(function() {
		//one page slider
    var baloon = false;
    $('#pages').fullpage({
       navigation: true,
       scrollOverflow: true,
       responsiveWidth: 1000,
       scrollingSpeed: 1500,
       afterRender: function(){
       	$.fn.fullpage.reBuild();
       },
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            //after leaving section 2
            if(index == 1){

                $(".baloon").addClass('active'); 
                
                setTimeout(function(){
                  $(".baloon").removeClass('active');
                  baloon = true;
                  $.fn.fullpage.moveTo(2);
                },800);
                setTimeout(function(){baloon = false;},900);

                if(!baloon) {

                  return false;
                }
            }
        }
    });
      ////.swipebox();
    $( ".swipebox" ).swipebox();
    //go to slide
    $(".up-arrow").click(function(){
 				$.fn.fullpage.moveTo(1);
    });

    $(".arrow-down").click(function(){
        $.fn.fullpage.moveTo(2);
    });
             

    //scroll horizontal for image
     $('.image-scroll').jScrollPane();
     $(window).resize(function(){
     	$('.image-scroll').jScrollPane();
     });

     //carousel
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
                              center: [55.80239628, 49.21062750], // Москва
                              zoom: 15,
                              controls:[]
                          });

                      var myPlacemark = new ymaps.Placemark([55.80239628, 49.21062750],
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


});
		