(function () {
    "use strict";
    var d=new Date();
    var Week = ['日','一','二','三','四','五','六'];
    var cur= d.getFullYear()+'年'+(d.getMonth()+1)+'月'+ d.getDate()+'日'+' 星期'+Week[d.getDay()];
    document.write(cur);
})();