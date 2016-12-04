20151203
hint2.html

20151130
message_index.html
css/style.css
images/*
[
未读：<tr class="not-read">
已读：<tr class="readed">
增加一行：<td><span class="message-status"></span></td>
]

20151117
domain_index.html 增加页尾
替换style.css

20151110
hint.html

20151108
scan.html
css/smacss.css
js/base.js
js/activate.js


20151102 修改、新增页面：
fragment_tags.html
fragment_meeting_list.html
fragment_modify.html
message_detail.html
css/style.css


页面注意事项：
1、一级导航在left-area中，二级导航在second-area中，当前的栏目加上class “cur”.
2、不同的二级导航，会有不同的class名称，如
<ul class="second-nav top-message">
<ul class="second-nav top-user">
3、删除的js控制在common.js中，id给数据库使用，info是弹窗提示信息，redirect是跳转页面地址
4、弹窗使用popwindow插件，data-include="inc1.html"标示弹窗插入的内容， data-title="选择用户" 标示弹窗的标题。
其中include的页面内容只能是DOM元素，而不是完整的html页面,弹窗按钮需赋予"popwin"的class。
5、账务管理-发票管理-申请开具发票，由于缺少设计内容，暂缓执行
6、包含日期选择的页面需要增加jquery-ui.min.css 、jquery-ui.min.js，日期控制写在common.js中。
7、视频会议系列页面是以 fragment_ 打头的8个页面
8、专属云管理页面是以 cloud_ 打头的页面，.second-nav 的当前栏目加上class cur,同时 .second-sub-nav 对应的子栏目也要加上class cur
9、扫描页面以scan_打头。