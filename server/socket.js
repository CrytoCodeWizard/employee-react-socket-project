const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 4000
},
console.log("socket server is on 4000 port!"));

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(data) {
        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                console.log(JSON.parse(data));
                client.send(data);
            }
        });
    })
});