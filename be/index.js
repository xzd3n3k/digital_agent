const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
	console.log("Client connected");

	const wavPath = path.join(__dirname, "records", "test.wav");
	const wavBuffer = fs.readFileSync(wavPath);

	ws.send(wavBuffer);

	ws.on("message", (message) => {
		console.log("Received binary of size:", message.length);

		ws.send(message);
	});

	ws.on("close", () => {
		console.log("Client disconnected");
	});
});

server.listen(8080, () => {
	console.log("Server is listening on http://localhost:8080");
});
