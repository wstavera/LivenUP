var displayAjaxLoader = true;
var AjaxCaller = new function () {
	var self = this;
	self.startListeners = new Array();
	self.stopListeners = new Array();
	self.errorListeners = new Array();

	self.callCustom = function (actionUrl, data, headers, callback) {        
		return $.ajax(
				{
					url: actionUrl,
					type: "POST",
					async: true,
					headers: headers,
					dataType: "json",
					data: data,
					timeout: 1000 * 60 * 60

				}).done(function (result, textStatus, jqXHR)
				{
					if (!result) {
						//CommonHelper.displayAlert("Invalid Response", "error");
						//return;
					}

					if (result.status == "Error")
						CommonHelper.displayAlert(result.message, "error");

					if (callback) callback(result);
				}).error(function(httpObj, textStatus) {       
					if (httpObj.status == 401) {
						redirectToUnauthorize();
					} else if (httpObj.status != 200) {
						console.log(httpObj);
						if(httpObj.responseJSON && httpObj.responseJSON.error){
							CommonHelper.displayAlert(httpObj.responseJSON.error_description, "error");
						}else{
							CommonHelper.displayAlert(textStatus, "error");
						}
					}
				});
	};

	self.call = function (actionUrl, data, callback) {
		var headers = {};
		headers['Content-Type'] = 'application/json; charset=UTF-8';

		var token = $.cookie('access-token');
		if (token && token != "null") {
			token = JSON.parse(token);
			headers.Authorization = "Bearer " + token.access_token;
		}

		return self.callCustom(actionUrl, JSON.stringify(data), headers, callback);
	};
};


$(document).ajaxStart(function () {
	if (!displayAjaxLoader)
		return;
	$("#ajax-loader").fadeIn("slow");
	for (var i = 0; i < AjaxCaller.startListeners.length; i++) {
		AjaxCaller.startListeners[0]();
	}
});

$(document).ajaxStop(function () {
	displayAjaxLoader = true;
	$("#ajax-loader").fadeOut("slow");
	for (var i = 0; i < AjaxCaller.stopListeners.length; i++) {
		AjaxCaller.stopListeners[0]();
	}
});

$(document).ajaxError(function (event, request, settings) {
	displayAjaxLoader = true;
	$("#ajax-loader").fadeOut("slow");
	//CommonHelper.displayAlert("Error requesting page " + settings.url, "error");
	for (var i = 0; i < AjaxCaller.errorListeners.length; i++) {
		AjaxCaller.errorListeners[0](event, request, settings);
	}
	//console.log("Error requesting page " + settings.url);
});