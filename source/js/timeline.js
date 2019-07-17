fanfou = new Object();
fanfou.Timeline = function() {
	this.server = 'https://api.fanfou.com';
	if (typeof fanfou_name == 'undefined') {
		this.name = '';
	} else {
		this.name = fanfou_name;
	}
	if (typeof fanfou_count == 'undefined' || isNaN(fanfou_count)) {
		this.count = 20;
	} else {
		this.count = parseInt(fanfou_count);
	}
	if (this.name == '') {
		this.timeline = 'public';
	} else {
		if (typeof fanfou_timeline != 'undefined' && (fanfou_timeline == 'friends' || fanfou_timeline == 'public')) {
			this.timeline = fanfou_timeline;
		} else {
			this.timeline = 'user';
		}
	}
};
fanfou.Timeline.prototype = {
	getDate: function(str) {
		var arr = str.split(' ');
		var str = arr[1] + ' ' + arr[2] + ', ' + arr[5] + ' ' + arr[3];
		var current_date = new Date();
		var parsed_date = Date.parse(str) - current_date.getTimezoneOffset() * 60 * 1000;
		return new Date(parsed_date);
	},
	fullDate: function(date) {
		return date.getFullYear() + '-' + (date.getMonth() >= 9 ? '' : '0') + (date.getMonth() + 1) + '-' + (date.getDate() > 9 ? '' : '0') + date.getDate() + ' ' + (date.getHours() > 9 ? '' : '0') + date.getHours() + ':' + (date.getMinutes() > 9 ? '' : '0') + date.getMinutes();
	},
	readableDate: function(date) {
		var parsed_date = date.valueOf();
		var current_date = new Date();
		var past_seconds = parseInt((current_date.getTime() - parsed_date) / 1000);
		if (past_seconds < 60) {
			return past_seconds + ' 秒前';
		} else if (past_seconds < 60 * 60) {
			return (parseInt(past_seconds / 60)).toString() + ' 分钟前';
		} else if (past_seconds < 60 * 60 * 24) {
			return '约 ' + (parseInt(past_seconds / 3600)).toString() + ' 小时前';
		} else {
			return this.fullDate(date);
		}
	},
	createName: function(obj) {
		var name = document.createElement('a');
		name.href = obj.user.url;
		name.title = obj.user.name;
		name.target = '_blank';
		name.appendChild(document.createTextNode(obj.user.screen_name));
		return name;
	},
	createText: function(obj) {
		return document.createTextNode(obj.text);
	},
	createStamp: function(obj) {
		var stamp = document.createElement('a');
		var date = this.getDate(obj.created_at);
		stamp.appendChild(document.createTextNode(this.readableDate(date)));
		stamp.href = 'https://fanfou.com/statuses/' + obj.id;
		stamp.className = 'stamp index post-time';
		stamp.title = this.fullDate(date);
		stamp.target = '_blank';
		return stamp;
	},
	createLink: function() {
		var item = document.createElement('li');
		var link = document.createElement('a');
		link.appendChild(document.createTextNode('更多消息'));
		switch (this.timeline) {
			case 'user':
				link.href = 'https://fanfou.com/' + this.name;
				break;
			case 'friends':
				link.href = 'https://fanfou.com/message/' + this.name;
				break;
			case 'public':
				link.href = 'https://fanfou.com/browse';
        break;
			default:break;
		}
		link.title = '饭否';
		link.target = '_blank';
		item.appendChild(link);
		item.className = 'fanfou_statuses_more';
		return item;
	},
	createBrand: function() {
		var brand = document.createElement('p');
		var link = document.createElement('a');
		link.href = 'https://fanfou.com/';
		link.title = '饭否';
		link.target = '_blank';
		var img = document.createElement('img');
		img.src = 'https://static.fanfou.com/img/brand.gif';
		img.alt = '饭否';
		link.appendChild(img);
		brand.appendChild(link);
		return brand;
	},
	statuses: function(obj) {
		if (obj.length == 0) return false;
		switch (this.timeline) {
			case 'user':
				var container_name = 'fanfou_statuses_user' + obj[0].user.id;
				if (!document.getElementById(container_name)) {
					document.write('<div id="' + container_name +'" class="fanfou_statuses hidden-fanfou"></div>');
				}
				var statuses = document.createElement('ul');
				for (var i=0; i<obj.length; i++){
					var status = document.createElement('li');
					status.appendChild(this.createText(obj[i]));
					status.appendChild(document.createTextNode(' '));
					status.appendChild(this.createStamp(obj[i]));
					statuses.appendChild(status);
				}
				break;
			case 'friends':
				var container_name = 'fanfou_statuses_friends';
				if (!document.getElementById(container_name)) {
					document.write('<div id="' + container_name +'" class="fanfou_statuses"></div>');
				}
				var statuses = document.createElement('ul');
				for (var i=0; i<obj.length; i++){
					var status = document.createElement('li');
					status.appendChild(this.createName(obj[i]));
					status.appendChild(document.createTextNode('：'));
					status.appendChild(this.createText(obj[i]));
					status.appendChild(document.createTextNode(' '));
					status.appendChild(this.createStamp(obj[i]));
					statuses.appendChild(status);
				}
				break;
			case 'public':
				var container_name = 'fanfou_statuses_public';
				if (!document.getElementById(container_name)) {
					document.write('<div id="' + container_name +'" class="fanfou_statuses"></div>');
				}
				var statuses = document.createElement('ul');
				for (var i=0; i<obj.length; i++){
					var status = document.createElement('li');
					status.appendChild(this.createName(obj[i]));
					status.appendChild(document.createTextNode('：'));
					status.appendChild(this.createText(obj[i]));
					status.appendChild(document.createTextNode(' '));
					status.appendChild(this.createStamp(obj[i]));
					statuses.appendChild(status);
				}
				break;
			default:break;
		}
		statuses.appendChild(this.createLink());
		var _this = this;
		setTimeout(function(){
			var container = document.getElementById(container_name);
			container.appendChild(statuses);
			//container.appendChild(_this.createBrand());
			var list = container.firstChild;
			var content = list.firstChild.innerHTML;
			//alert(content);
			var fb = document.getElementById('fanfouButton').innerHTML += content;
			list.removeChild(list.firstChild);
		}, 0);
	},
	createStatuses: function(sObjName) {
		switch (this.timeline) {
			case 'user':
				document.write('<script type="text/javascript" charset="utf-8" src="' + this.server + '/statuses/user_timeline/' + this.name + '.json?cb=' + sObjName + '.statuses&amp;count=' + this.count + '"></' + 'script>');
				break;
			case 'friends':
				document.write('<script type="text/javascript" charset="utf-8" src="' + this.server + '/statuses/friends_timeline/' + this.name + '.json?cb=' + sObjName + '.statuses&amp;count=' + this.count + '"></' + 'script>');
				break;
			case 'public':
				document.write('<script type="text/javascript" charset="utf-8" src="' + this.server + '/statuses/public_timeline.json?cb=' + sObjName + '.statuses&amp;count=' + this.count + '"></' + 'script>');
				break;
			default:break;
		}
	}
};
ffstatuses = new fanfou.Timeline();
ffstatuses.createStatuses('ffstatuses');