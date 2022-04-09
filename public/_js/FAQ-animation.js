$(function(){
  var faq_area = $(".faq-area");

  faq_area.each(function(){
    var _faqarea = new GroupBox(this);
  });

  function GroupBox(groupElement){
    var box = $(groupElement).find(".box");
    var question = $(groupElement).find(".question p");

    box.each(function(idx){
      var newBox = new RootBox(this);
      if (idx >= 0){
        newBox.siblingsClose();
      }
    });
  }

  function RootBox(boxElement){
    var _this = this;
    var boxEl = $(boxElement);
    var question = $(boxEl).find(".question p");
    var arrow = $(boxEl).find(".question img");
    var answer = $(boxEl).find(".answer");

    boxEl.on("click", anchorClickEvent);

    function anchorClickEvent(){
      if (answer.is(':hidden')){
        _this.open();
      } else {
        _this.close();
      }
    }

    _this.siblingsClose = function(){
      answer.css('display', 'none');
    };
    _this.open = function() {
      answer.slideDown(); // duration, easing, complete
    };
    _this.close = function() {
      answer.slideUp(); // duration, easing, complete
    }
  }
});