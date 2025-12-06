import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

let wss: WebSocketServer | null = null;

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  messageId?: string;
}

export function initWebSocketServer(server: any) {
  if (wss) {
    console.log('WebSocket server already initialized');
    return wss;
  }

  wss = new WebSocketServer({ 
    server,
    path: '/api/ws'
  });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Handle ping/pong for connection keep-alive
        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Send initial connection success message
    ws.send(JSON.stringify({ 
      type: 'connected', 
      message: 'WebSocket connection established' 
    }));
  });

  console.log('WebSocket server initialized on path /api/ws');
  return wss;
}

export function broadcastNotification(notification: NotificationData) {
  if (!wss) {
    console.error('WebSocket server not initialized');
    return;
  }

  const message = JSON.stringify({
    type: 'notification',
    data: notification
  });

  let clientCount = 0;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      clientCount++;
    }
  });

  console.log(`Notification broadcasted to ${clientCount} clients`);
}

export function getWebSocketServer() {
  return wss;
}
