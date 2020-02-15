
/*d3.csv('url', function(row, i, headers){
    //row - current CSV row as an object
    // i - row index
    // headers - array of CSV headers
    // which are also keys in the row objects
}, function(error, data){
    // wirte your own code here}

    d3.queue.await(function(error, res1, res2){
        //res1 -  response from fn1
        //res2 - response from fn2
    }

    d3.queue().awaitAlll(function(error, res){
        //res[0] - response from fn1
        // res[1] - response from fn2
    })
     
    )
}); */

d3.queue()
    .defer(d3.json, './countries.json')
    
    .defer(d3.csv, './simplemaps-worldcities-basic.csv',function(row){
        if (+row.pop < 10000) return;
        return {
            cityName:row.city,
            countryCode: row.iso2,
            population: +row.pop
        }
    })
    .await(function(error, countries, cities){
        console.log("countries", countries);
        /* countries = {geonames:Array[250]} //Array包含250个国家信息，一个国家一个object 有"continent",
      "population",countryCode","countryName" 等属性*/
        console.log("cities", cities);
        /*
        cities  =  Array[5970] 包含5970城市的数组，每一个城市对应一个object 形式如下 
        {cityName: "Chaghcharan", countryCode: "AF", population: 15000}
        */
        if (error) throw error;
        var data = countries.geonames.map(country => {
            /* 对countries的每个国家添加一个cities的key值，并将对应的城市对象存进每个国家的cities属性中
            */
            country.cities = cities.filter(city => city.countryCode === country.countryCode);
            return country; // 注意map函数要返回该元素
        });
        console.log("data",data);

        //将国家队列和body联系起来
        var countrySelection = d3.select('body')
                                .selectAll('div')
                                .data(data)
                                .enter()
                                .append('div');
        //添加标题
        countrySelection
            .append('h3')
            .text(d => d.countryName);
        countrySelection
            .append('ul')
            // 遍历cities数组中每个元素，返回百分比的城市数组，然后调用join("")将数组转化成字符串~
            .html( d => d.cities.map(city => {
                var percentage = city.population / d.population * 100;
                return `<li>${city.cityName} - ${percentage.toFixed(2)}%</li>`
            }).join(''));

    });


