$(document).ready(function() {
  
  getQuote();
  
  var quoteHere = "";
  var author = "";
  
  function getQuote() {    
    $.ajax( { url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", success: function(a) {
      var post = a.shift();
      quoteHere = post.content;
      author = post.title;
      
      $(".quote").animate({
        opacity: 0
      }, 200,
      function() {
        $(this).animate({
          opacity: 1
        }, 200);
        
        $(".quote").html(quoteHere + "<p>— " + author + "</p>")
      });     
    
    },
      cache: false
    });  
  }; 
  
  $('.clickNewQuote').on('click', function(e) {   
    e.preventDefault();
    getQuote();    
  });
  
  $(".twtShare").on("click", function(e) {
    e.preventDefault();
    
    var twtURL = "http://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
    var twtQuote = "";
    var newTwtQuote = "";
    var fullText = quoteHere + author;
    
    if (fullText.length > 140) {
      newTwtQuote = quoteHere.slice(3, 100) + "...";
    } else {
      twtQuote = quoteHere.slice(3);
      newTwtQuote = twtQuote.slice(0, -5);
    }
    
    newTwtQuote = newTwtQuote.replace(/<br\s*\/?>/gi, "\n");
    newTwtQuote = newTwtQuote.replace(/<p>/gi, "\n");
    newTwtQuote = newTwtQuote.replace(/<\/p>/gi, "\n");
    newTwtQuote = newTwtQuote.replace(/&#8220;/gi, "\"");
    newTwtQuote = newTwtQuote.replace(/&#8221;/gi, "\"");
    newTwtQuote = newTwtQuote.replace(/&#8243;/gi, "\″");
    newTwtQuote = newTwtQuote.replace(/&#8217;/gi, "\'");
    newTwtQuote = newTwtQuote.replace(/&#8211;/gi, "–");   
      
    window.open(twtURL + encodeURIComponent(newTwtQuote) + " —  " + author);
   });
  
});