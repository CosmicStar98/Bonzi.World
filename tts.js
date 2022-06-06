// ========================================================================
// Server init
// ========================================================================

// Filesystem reading functions
const fs = require('fs-extra');

// Setup basic express server
var express = require('express');
var app = express();  
var cors = require("cors")
var http = require("http");
const url = require('url');
var server = require('http').createServer(app, console.log());
app.use(express.static('./', {
    extensions: ['html']
}));
console.log = function() {};
server.listenerCount(1);
// Start actually listening
server.listen(2095);
const { exec } = require("child_process");
app.get('/api/v1/sapi', function(req, res){
	if (req.query) {
		if (req.query.text && req.query.pitch && req.query.speed && req.query.guid) {
			if (req.query.char && req.query.char == "Paul") {
				var eura = `balcon.exe -n "Adult Male #1, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "paul") {
				var eura = `balcon.exe -n "Adult Male #1, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "Mike") {
				var eura = `balcon.exe -n "Mike" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "mike") {
				var eura = `balcon.exe -n "Mike" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "robosoft2") {
				var eura = `balcon.exe -n "Robosoft Two" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "Robosoft2") {
				var eura = `balcon.exe -n "Robosoft Two" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "Robby") {
				var eura = `balcon.exe -n "Adult Male #7, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "robby") {
				var eura = `balcon.exe -n "Adult Male #7, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "Genius") {
				var eura = `balcon.exe -n "Adult Male #8, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "genius") {
				var eura = `balcon.exe -n "Adult Male #8, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "Merlin") {
				var eura = `balcon.exe -n "Adult Male #3, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else if (req.query.char && req.query.char == "merlin") {
				var eura = `balcon.exe -n "Adult Male #3, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			} else {
				var eura = `balcon.exe -n "Adult Male #2, American English (TruVoice)" -w "./speech/` + req.query.guid + `_speech.wav" -s `+ Number(req.query.speed) + ` -p `+ Number(req.query.pitch) +` -t "`+ req.query.text + `" `;
				exec(eura, (err, stdout, stderr) => {
					if (err) {
						console.log("Error occurred: ", err);
						
						return;
					}
				});
			}
			setTimeout(function(){
				var stream = fs.createReadStream("./speech/"+req.query.guid+"_speech.wav")
				stream.on('open', function () {
					stream.pipe(res) 
					setTimeout(function(){
						fs.unlink("./speech/"+req.query.guid+"_speech.wav", (err) => {
							if (err) throw err;	
						});
						setTimeout(function(){
							process.exit();
						},1500)
					},1000)
				});	
				stream.on('error', function (err) {
					setTimeout(function(){
						if (err) {
							console.log("FATAL ERROR: " + err)
							process.exit();
						}
					},1000)
				});	
			},500)
		}
	}
	return res.writeHead(200, {
		'Content-Type': 'audio/wav'
	});
})