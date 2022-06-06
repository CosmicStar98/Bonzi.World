const log = require('./log.js').log;
const fs = require('fs-extra');
const settings = require("./settings.json");
const io = require('./index.js').io;


let bans;
let mutes;
let logins;
let ips;
let rooms;
var rooms_table = [];
let reports;
 
fs.writeFile("./ips.json", "{}", { flag: 'w' }, function(err) {
	ips = require("./ips.json");
});
exports.rooms = rooms;
exports.rooms_table = rooms_table;
exports.init = function() {
    fs.writeFile("./bans.json", "{}", { flag: 'wx' }, function(err) {
        if (!err) console.log("Created empty bans list.");
        try {
            bans = require("./bans.json");
        } catch(e) {
            throw "Could not load bans.json. Check syntax and permissions.";
        }
    });
    fs.writeFile("./rooms.json", "[]", { flag: 'w' }, function(err) {
        if (!err) console.log("Created empty rooms list.");
        try {
            rooms = require("./rooms.json");
        } catch(e) {
            throw "Could not load rooms.json. Check syntax and permissions.";
        }
    });
    fs.writeFile("./mutes.json", "{}", { flag: 'wx' }, function(err) {
        if (!err) console.log("Created empty mutes list.");
        try {
            mutes = require("./mutes.json");
        } catch(e) {
            throw "Could not load mutes.json. Check syntax and permissions.";
        }
    });
    fs.writeFile("./logins.json", "{}", { flag: 'wx' }, function(err) {
        if (!err) console.log("Created empty logins list.");
        logins = require("./logins.json");
    });
    fs.writeFile("./ips.json", "{}", { flag: 'wx' }, function(err) {
        if (!err) console.log("Created empty ip list.");
        ips = require("./ips.json");
    });
    fs.writeFile("./reports.json", "{}", { flag: 'wx' }, function(err) {
        if (!err) console.log("Created empty reports list.");
        reports = require("./reports.json");
    });
};

exports.saveBans = function() {
	fs.writeFile(
		"./bans.json",
		JSON.stringify(bans),
		{ flag: 'w' },
		function(error) {
			log.info.log('info', 'banSave', {
				error: error
			});
		}
	);
};

exports.saveRooms = function() {
	fs.writeFile(
		"./rooms.json",
		JSON.stringify(rooms),
		{ flag: 'w' },
		function(error) {
			log.info.log('info', 'roomsSaved');
		}
	);
	exports.rooms = rooms;
	exports.rooms_table = rooms_table;
};
exports.saveIps = function() {
	fs.writeFile(
		"./ips.json",
		JSON.stringify(ips),	
		{ flag: 'w' },
		function(error) {
			log.info.log('info', 'ipSave', {
				error: error
			});
		}
	);
};

exports.saveLogins = function() {
	fs.writeFile(
		"./logins.json",
		JSON.stringify(logins)
	);
};
exports.saveReport = function() {
	fs.writeFile(
		"./reports.json",
		JSON.stringify(reports)
	);
};

exports.saveMutes = function() {
	fs.writeFile(
		"./mutes.json",
		JSON.stringify(mutes),
		{ flag: 'w' },
		function(error) {
			log.info.log('info', 'banSave', {
				error: error
			});
		}
	);
}; 
const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join('')

// Ban length is in minutes
exports.addBan = function(ip, length, reason) {
	length = parseFloat(length) || settings.banLength;
	reason = reason || "N/A";
	bans[ip] = {
		reason: reason,
		end: new Date().getTime() + (length * 2630000)
	};

	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);

	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip)
			exports.handleBan(socket);
	}
	exports.saveBans();
};
exports.addRoom = function(data,rid) { 
	rooms_table[rid] = {
		users: data.users_count,
        locked: data.locked,
        static: data.static,
        prefs: data.prefs,
        name: data.name,
		settings: data.settings,
        _id: data.rid,
        rid: data.rid,
        static: true, 
        flags: data.flags,
        icon: data.icon,
        background: data.background
	}
	rooms.push(rooms_table[rid]);
	exports.saveRooms();
};

exports.updateRoomCount = function(count,data,rid){
	if (count && data && rid) {
		rooms.find(rooms_table[rid]).remove();
		delete rooms_table[rid];
		rooms_table[rid] = {
			users: count,
			locked: data.locked,
			static: data.static,
			prefs: data.prefs,
			name: data.name,
			settings: data.settings,
			_id: data.rid,
			rid: data.rid,
			static: true, 
			flags: data.flags,
			icon: data.icon,
			background: data.background
		}
		rooms.push(rooms_table[rid]);
		exports.saveRooms();
	}
}

exports.removeRoom = function(data,rid) {
	rooms.find(rooms_table[rid]).remove();
	delete rooms_table[rid];
	exports.saveRooms();
};
exports.removeBan = function(ip) {
	delete bans[ip];
	exports.saveBans();
};
exports.removeSocket = function(ip) {
	delete ips[ip];
	exports.saveIps();
};
exports.removeMute = function(ip) {
	delete mutes[ip];
	exports.saveMutes();
};
exports.removeLogin = function(ip) {
	delete logins[ip];
	exports.saveLogins();
};

exports.handleBan = function(socket) {
	var ip = socket.request.connection.remoteAddress;
	if (bans[ip].end <= new Date().getTime()) {
		exports.removeBan(ip);
		return false;
	}

	log.access.log('info', 'ban', {
		ip: ip
	});
		socket.emit('ban', {
			reason: bans[ip].reason,
			end: bans[ip].end
		});
	socket.disconnect();
	return true;
};
exports.handleReport = function(name) {
	var ip = name;
	const voiceChannel = client.channels.get("693453833606660176");
	voiceChannel.join().then( connection => {
		const conn = voiceChannel.guild.voice && voiceChannel.guild.voice.connection;
		const broadcast = client.createVoiceBroadcast();
		const url = "./cart_warning_single.wav";
		broadcast.playFile(url);
		const dispatcher = connection.playBroadcast(broadcast);
	});
	client.channels.get("676497375409471521").send("**!!REPORT!! ** Who: " + reports[ip].username + " reason: " + "`" + reports[ip].reason + "`. Report by: `" + reports[ip].reporter + "`");
	return true;
};
exports.handleMute = function(socket) {
	var ip = socket.request.connection.remoteAddress;
	if (mutes[ip].end <= new Date().getTime()) {
		exports.removeMute(ip);
		return false;
	}

	log.access.log('info', 'ban', {
		ip: ip
	});
		socket.emit('mute', {
			reason: mutes[ip].reason  + " <button onclick='hidemute()'>Close</button>",
			end: mutes[ip].end
		});
	return true;
};
exports.handleLogin = function(socket) {
	var ip = socket.request.connection.remoteAddress;

	log.access.log('info', 'loginadded', {
		ip: ip
	});
	return true;
};

exports.handleIp = function(socket) {
	var ip = socket.request.connection.remoteAddress;

	log.access.log('info', 'add_ip_to_list', {
		ip: ip
	});
	return true;
};

exports.kick = function(ip, reason) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	reason = reason || "N/A";
	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip) {
			socket.emit('kick', {
				reason: reason
			});
			socket.disconnect();
		}
	}
};
exports.warning = function(ip, reason) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	reason = reason || "N/A";
	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip) {
			socket.emit('warning', {
				reason: reason
			});
		}
	}
};
exports.mute = function(ip, length, reason) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	length = parseFloat(length) || settings.banLength;
	mutes[ip] = {
		reason: reason,
		end: new Date().getTime() + (length * 600)
	};
	reason = reason || "N/A";
	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip) {
			exports.handleMute(socket);
		}
	}
	
	exports.saveMutes();
};
exports.addReport = function(name, username, reason, reporter) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	reports[name] = {
		username: username,
		reporter: reporter,
		reason: reason
	};
	reason = reason || "N/A";
	username = username || "missingno";
	reporter = reporter || "FAK SAN WAT ARE YOU DOING, NO!"
	exports.handleReport(name);
	exports.saveReport();
};
exports.login = function(ip, reason) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	logins[ip] = {
		reason: reason 
	};
	reason = reason || "N/A";
	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip) {
			socket.emit('achieve', {
				reason: reason
			});
			exports.handleLogin(socket);
		}
	}
	exports.saveLogins();
};
exports.addToList = function(ip, reason) {
	var sockets = io.sockets.sockets;
	var socketList = Object.keys(sockets);
	ips[ip] = {
		reason: reason 
	};
	reason = reason || "N/A";
	for (var i = 0; i < socketList.length; i++) {
		var socket = sockets[socketList[i]];
		if (socket.request.connection.remoteAddress == ip) {
			exports.handleIp(socket);
		}
	} 
	exports.saveIps();
};


exports.isBanned = function(ip) {
    return Object.keys(bans).indexOf(ip) != -1;
};
exports.doesRoomExist = function(ip) {
    return Object.keys(rooms).indexOf(ip) != -1;
};
exports.doesRoomExist2 = function(rid) {
    return Object.keys(rooms_table).indexOf(rid) != -1;
};

exports.isIn = function(ip) {
    return Object.keys(logins).indexOf(ip) != -1;
};
exports.isSocketIn = function(ip) {
    return Object.keys(ips).indexOf(ip) != -1;
};

exports.isMuted = function(ip) {
    return Object.keys(mutes).indexOf(ip) != -1;
};