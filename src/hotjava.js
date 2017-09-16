(function(exports){
'use strict';
const weather_url='http://weather.livedoor.com/forecast/webservice/json/v1?city=270000';
const twitter_credentials={
	'consumer_key':'',
	'consumer_secret':'',
	'access_token_key':'',
	'access_token_secret':''
};
var request=require('request');
function KiongaHotJava(callback){
	this.callback=callback;
}
KiongaHotJava.prototype.run=function(){
	request(weather_url,this.gotWeather.bind(this));
};
KiongaHotJava.prototype.gotWeather=function(error,response,body){
	if(!response||response.statusCode!==200){return;}
	var weather_json=JSON.parse(body);
	var link_url=weather_json['link'];
	var forecast=weather_json['forecasts'][0];
	var today_max=Number(forecast['temperature']['max']['celsius']);
	var date_label=forecast['dateLabel'];
	var date_num=forecast['date'];
	var java_msg=this.selectJavaMessage(today_max);
	if(!java_msg){
		this.callback({'temp':today_max});
		return;
	}
	var post_message=date_label+java_msg+' '+link_url+' '+date_num;
	this.postResult(post_message);
};
KiongaHotJava.prototype.selectJavaMessage=function(forTemperatureCelsius){
	const java_tbl=[
		[28,'の気温がHotJava'],
		[35,'の気温はモットジャバ'],
		[37,'も気温がモットジャバ']];
	var res;
	java_tbl.forEach((tpl)=>{res=(tpl[0]<=forTemperatureCelsius)?tpl[1]:res;});
	return res;
};
KiongaHotJava.prototype.postResult=function(msg){
	var Twitter=require('twitter');
	var client=new Twitter(twitter_credentials);
	client.post('statuses/update',{'status':msg},(error,tweet,response)=>{
		if(this.callback){
			this.callback({'msg':'posted a message'});
		}
	});
};
function main(args){
	return new Promise((resolve,reject)=>{
		var khj=new KiongaHotJava((res)=>{resolve(res)});
		khj.run();
	});
}
exports.main=main;
})(exports);

