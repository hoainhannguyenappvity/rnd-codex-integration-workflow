import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.raw({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected ::', socket.id);

  socket.on('message', (message) => {
    console.log(`Message from client ${socket.id} ::`, message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected ::', socket.id);
  });
});

app.post('/workflow/execution', (req, res) => {
  console.log('New execution was created ::', req.body);
  io.emit('message', {
    execution: req.body,
  });
  res.status(201).json(req.body);
});

app.post('/workflow/teams', (req, res) => {
  console.log('Teams ::', req.body);
  io.emit('message', {
    teams: req.body,
  });
  res.status(201).json(req.body);
});

app.post('/workflow/channels', (req, res) => {
  console.log('Channels ::', req.body);
  io.emit('message', {
    channels: req.body,
  });
  res.status(201).json(req.body);
});

app.post('/workflow/repository', (req, res) => {
  console.log('Repository ::', req.body);
  io.emit('message', {
    repository: req.body,
  });
  res.status(201).json(req.body);
});

app.post('/workflow/pull-requests', (req, res) => {
  console.log('Pull Requests ::', req.body);
  io.emit('message', {
    pullRequests: req.body,
  });
  res.status(201).json(req.body);
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
