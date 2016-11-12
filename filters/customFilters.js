/// <reference path="../angular.js" />


angular.module("customFilters", [])
    .filter("unique", function () {
        return function( value){
            if(value && angular.isArray(value)){
                var result = [];

                for(var i=0; i<value.length; i++){
                    var category = value[i].category;
                    if(result.indexOf(category) < 0){
                        result.push(category);
                    }
                }

                return result;

            }
            else{
                return [];
            }

        }


    })
    .filter("range", function($filter){
        return function(data, page, size){
            if(data && angular.isNumber(page) && angular.isNumber(size)){
                var start_index = (page - 1) * size;
                if(data.length < start_index){
                    return [];
                }
                else{
                    return $filter("limitTo")(data.splice(start_index), size);
                }
            }
            else{
                return data;
            }
        }
    })
    .filter("pageCount", function(){
        return function (data, size) {
            if(data){
                console.log(data.length +"   "+ size + "   "+ Math.ceil(data.length / size));
                var result = [];
                for(var i = 0; i< Math.ceil(data.length / size); i++){
                    result.push(i);
                }
                return result;
            }
            else{
                return data;
            }
        }
    });

