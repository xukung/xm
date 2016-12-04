function LoadMoreData(params) {
    "use strict";

    //加载ajax数据的url地址
    var dataUrl = params.dataUrl ? params.dataUrl : './data.json';
    //numOffset 为请求数据卷滚的条数，即已经加载的条数
    var numOffset = 0;
    // 当滚动到最底部以上指定像素数时， 加载新内容
    var distance = params.distance ? params.distance :500;

    angular.module('loadMoreApp', []).controller('loadMoreCtrl', function ($scope, $http) {
        //延迟触发
        var debounced = _.debounce(loadMore, 300, true);
        $(window).scroll(function () {
            if ($(document).height() - $(window).scrollTop() - $(window).height() < distance) {
                debounced();
            }
        });

        //加载初始数据
        $http({
            method: 'GET',
            url: dataUrl,
            params: {
                offset: numOffset
            }
        }).success(function (data, status, headers, config) {
            $scope.rdatas = data
        }).error(function (data, status, headers, config) {
        });

        $('#btnLoadMore').on('click', loadMore);


        function loadMore() {
            //numOffset 为请求数据卷滚的条数，即已经加载的条数
            numOffset = $('ul#loadMoreList > li').length;
            $('#ajaxTips').html('正在加载...');
            $('#ajaxTips').show();

            $http({
                method: 'GET',
                url: dataUrl,
                params: {
                    offset: numOffset
                }
            }).success(function (data, status, headers, config) {
                $('#ajaxTips').html('加载成功');
                $('#ajaxTips').hide();
                $scope.rdatas = $scope.rdatas.concat(data);
            }).error(function (data, status, headers, config) {
            });
        }

    });
}

