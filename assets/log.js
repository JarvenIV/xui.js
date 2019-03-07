;(function(w){
	var doc = document;
	var UPLOAD_URL = 'https://xumeng.site/';

	function isFunction(fn){
		return typeof fn === 'function';
	};

	function jsonS(data){
		return typeof json === 'string' ? JSON.parse(data) : JSON.stringify(data);
	};

	// w.onerror = function(message, source, lineNo, colNo, error){
	//     const errorInfo = {
	//     	message: message,
	//     	source: source,
	//     	lineNumber: lineNo,
	//     	colNumber: colNo,
	//     	error: error,
	//     	type: 'Uncaught'
	// 	};
	// 	console.log(error);
	//     sendError(errorInfo);
	// };

	w.addEventListener('error', function(event){
		var e = event;
		console.log(e.target);
		const tar = {
			id: e.target.id,
			class: e.target.classList && [...e.target.classList].join(),
			text: e.target.innerHTML,
			node: e.target.nodeName
		};
		const errorInfo = {
	    	message: e.message,
	    	fileName: e.filename,
	    	lineNumber: e.colno,
	    	colNumber: e.lineno,
			stack: e.error && e.error.stack,
			target: tar,
	    	type: e.type
		};
	    sendError(errorInfo);
	    // e.preventDefault();
	},true);

	w.addEventListener('unhandledrejection', function(event){
		var e = event;
		const errorInfo = {
	    	type: e.type,
	    	reason: e.reason.toString()
	    };
	    sendError(errorInfo);
	    // e.preventDefault();
	});

	w.addEventListener('rejectionhandled', function(event){
		console.log(event);
	});

	Promise.prototype['catch'] = function(onRejected){
		const reject = function (error) {
	        var errorInfo = {
	            message: 'Promise Catch',
	            error: error
	        };
	        sendError(errorInfo);
	        if (isFunction(onRejected)) {
	            return onRejected(error);
	        };
	    };
	    return this.then(null, reject);
	};

	function getUserInfo(){
		var n = navigator;
		const userInfo = {
			cookieEnabled: n.cookieEnabled,
			data: new Date(),
			language: n.language || n.userLanguage,
			location: location.href,
			platform: n.platform,
			product: n.product,
			referrer: doc.referrer,
			screen: w.screen.width + 'px',
			userAgent: n.userAgent
		};
		return userInfo;
	};

	function sendError(info){
		var mes = new Image();
		var isQuesMark = UPLOAD_URL.indexOf('?') > -1 ? '&data=' : '?data=';
		var useInfo = getUserInfo();

		var sendObj = {
			errorInfo: info,
			useInfo: useInfo
		};
		//考虑到IE浏览器对url的长度限制大概为2000，所以这里对超长字符作一下截取
		if(jsonS(sendObj).length > 2000){
			delete sendObj.errorInfo;
			sendObj.maxError = 'The error message has been intercepted due to the maximum limit of url';
		};
		sendObj = jsonS(sendObj);
		mes.src = isQuesMark + sendObj;
	};
})(window);