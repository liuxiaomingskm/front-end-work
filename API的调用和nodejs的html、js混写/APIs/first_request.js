var request = require('request');
request('https://jsonplaceholder.typicode.com/users/1', (error,response, body)=>{

	if (!error && response.statusCode == 200){
		var parseData = JSON.parse(body);
		console.log(`${parseData.name} lives in ${parseData.address.city}`);// show the HTML for the Google homepage.
	}
})
