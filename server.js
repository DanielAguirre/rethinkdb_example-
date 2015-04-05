
var socketio = require('socket.io');
var express = require("express");
var r = require("rethinkdb");
var swig = require('swig');

var app = express();
var io = socketio.listen(app.listen(3000));
console.log("App is listening on 3000")

app.use(express.static(__dirname +"/public;"))

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/website/views');

app.get("/",function(req,res){
	res.render("index.html")
})

r.connect().then(function(conn){
	return r.table("todo").changes().run(conn)
})
.then(function(cursor){
	cursor.each(function(err, item){
		io.sockets.emit("update",item)
	});
});

io.on("connection", function(socket){
	r.connect().then(function(conn){
		return r.table("todo").run(conn)
			.finally(function(){
				conn.close();
			})
	})
	.then(function(cursor){ return cursor.toArray();})
	.then(function(output){ socket.emit("history",output) })

	socket,on("add", function(text){
		r.connect().then(function(conn){
			return r.table("todo").insert({text:text, done:false})
				.finally(function(){ conn.close();})
		})
	}).on("done",function(id, done){
		r.connect().then(function(conn) {
			return r.table("todo").get(id).update({done:done}).run(conn)
				.finally(function(){ conn.close();})
		})
	})
})

