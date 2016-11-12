angular.module("blog", ["customFilters", "ngRoute", "ngResource"])
    // .constant("dataUrl", "http://localhost:5000/products")
    // .constant("orderUrl", "http://localhost:5000/orders")
    .constant("baseUrl", "http://localhost:5000/blog/")
    .constant("productListPageCount", 3)
    .factory("blogResource", function ($resource, baseUrl) {
        return $resource(baseUrl + ":id", { id: "@id" },
            { create: { method: "POST" }, save: { method: "PUT" } });
    })
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        });


        $routeProvider.when("/blog/:id", {
            templateUrl: "/views/blogDetail.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/blogList.html",
            controller: "blogListCtrl",
            resolve: {
                data: function (blogResource) {
                    return blogResource.query();
                }
            }
        });
    })
    .controller("blogCtrl", function ($scope) {

        $scope.data = {};


    })
    .controller("blogListCtrl", function ($scope, $location, $route, data, productListPageCount) {

        $scope.data.blogs = data;

        $scope.pageSize = productListPageCount;
        $scope.selectedPage = 1;
        $scope.totalPage = data.length;

        $scope.blogListPrevPage = function(){
            if($scope.selectedPage-1 > 0){
                $scope.selectedPage -= 1;
            }
            else{
                return ;
            }
        }

        $scope.blogListNextPage = function(){

            $scope.selectedPage += 1;

        }

        $scope.checkFn = function () {
            return true;
        }

    })


