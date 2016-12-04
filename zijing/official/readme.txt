20160114
修正了右下角图标的显隐问题，滚动高度超过300才显示
official.js
official.css

20160112
更新official.css
更新official/images/*
更新index.html
修正首页分割条的文字和图片
二级导航加入.cur类，区别当前和非当前,二级导航如果显示，增加 style="display: block;"，默认隐藏
示例：
<div class="master"><a class="cur" href="#">关于我们</a></div>
<div class="slave" style="display: block;">
    <a class="cur" href="#">公司简介</a>
    <a class="" href="#">企业大事记</a>
    <a class="" href="#">团队介绍</a>
</div>