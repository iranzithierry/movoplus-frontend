'use client';
import { toast } from 'sonner';
import { useAuth } from './auth-context';
import useWebSocket from 'react-use-websocket';
import React, { createContext, ReactNode, useContext, useState, useCallback } from 'react';

export interface GameProps {
  message: string | null;
  sendMessage?: (message: string) => void;
}

const initialGameState: GameProps = {
  message: null,
};

export const ChannelContext = createContext<GameProps>(initialGameState);

export const ChannelContextProvider: React.FC<{ children: ReactNode; channelId: string }> = ({ children, channelId }) => {
  const { user, accessToken } = useAuth();

  const [message, setMessage] = useState<string | null>(null);

  const handleWebSocketMessage = useCallback((e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'receive_message':
          setMessage(data.message);
          break;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const { sendJsonMessage } = useWebSocket(`${protocol}://127.0.0.1:8000/ws/channel/${channelId}/`, {
    queryParams: { token: accessToken ?? '' },
    onMessage: handleWebSocketMessage,
  });

  const sendMessage = (message: string) => {
    if (user) sendJsonMessage({ type: 'send_message', message });
    setMessage(message);
  };

  return <ChannelContext.Provider value={{ message, sendMessage }}>{children}</ChannelContext.Provider>;
};

export const useChannel = () => useContext(ChannelContext);
