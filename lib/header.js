var en;

// export to nodejs or browser window
if(typeof exports != "undefined"){
    en = exports;
} else {
    en = window.en = {};
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

    define(function() {
      return en;
    });

}
