import { loadSocket, UseLoadSocket } from '../../../../src/data/sockets/load';
import { createSocketConnection } from '../../../../src/data/core/api';
import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

jest.mock('../../../../src/data/core/api');

describe('loadSocket', () => {
  let mockSocket: {
    id: string;
    on: jest.Mock;
    disconnect: jest.Mock;
  };
  let socketRef: MutableRefObject<Socket | null>;
  let openingRef: MutableRefObject<boolean>;
  let handleData: jest.Mock;
  let handleError: jest.Mock;

  beforeEach(() => {
    mockSocket = {
      id: 'test-socket-id',
      on: jest.fn(),
      disconnect: jest.fn(),
    };

    socketRef = { current: null };
    openingRef = { current: false };
    handleData = jest.fn();
    handleError = jest.fn();

    (createSocketConnection as jest.Mock).mockReturnValue(mockSocket);

    jest.clearAllMocks();
  });

  it('should not create socket if openingRef is true', () => {
    openingRef.current = true;

    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(createSocketConnection).not.toHaveBeenCalled();
  });

  it('should not create socket if socketRef already has a socket', () => {
    socketRef.current = { id: 'existing-socket' } as Socket;

    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(createSocketConnection).not.toHaveBeenCalled();
  });

  it('should create a socket connection when refs are clear', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(createSocketConnection).toHaveBeenCalled();
    expect(openingRef.current).toBe(true);
    expect(socketRef.current).toBe(mockSocket);
  });

  it('should register connect event handler', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
  });

  it('should set openingRef to false on connect', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    const connectHandler = mockSocket.on.mock.calls.find(
      (call: [string, ...unknown[]]) => call[0] === 'connect',
    )[1];
    connectHandler();

    expect(openingRef.current).toBe(false);
  });

  it('should register game:update event handler', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(mockSocket.on).toHaveBeenCalledWith(
      'game:update',
      expect.any(Function),
    );
  });

  it('should handle game:update events with parsed data', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 2,
    };

    loadSocket(params);

    const gameUpdateHandler = mockSocket.on.mock.calls.find(
      (call: [string, ...unknown[]]) => call[0] === 'game:update',
    )[1];

    const mockDataService = {
      tables: [
        {
          players: [],
          expert: false,
          saved: false,
          ironPatriotDamage: 0,
          darkAvengersThreat: 0,
          exposed: 0,
          minions: 0,
          exposedThreat: 0,
        },
      ],
      end: '2024-01-01T00:00:00.000Z',
      phase: 'PLAYING',
      elcalaMal: false,
      minionsMax: 10,
      darkAvengersThreatIni: 0,
      darkAvengersThreatMax: 10,
      ironPatriotLife: 10,
      ironPatriotMaxLife: 10,
      exposedThreatIni: 0,
      exposedThreatMax: 10,
    };

    gameUpdateHandler(mockDataService);

    expect(handleData).toHaveBeenCalledTimes(1);
    const parsedData = handleData.mock.calls[0][0];

    expect(parsedData.end).toBeInstanceOf(Date);
    expect(parsedData.phase).toBe('PLAYING');
    expect(parsedData.superLife).toBe(100);
    expect(parsedData.superPlan).toBe(0);
    expect(parsedData.exposed).toBe(0);
  });

  it('should register disconnect event handler', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(mockSocket.on).toHaveBeenCalledWith(
      'disconnect',
      expect.any(Function),
    );
  });

  it('should clean up on disconnect', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    const disconnectHandler = mockSocket.on.mock.calls.find(
      (call: [string, ...unknown[]]) => call[0] === 'disconnect',
    )[1];
    disconnectHandler('transport close');

    expect(socketRef.current).toBeNull();
    expect(openingRef.current).toBe(false);
  });

  it('should register connect_error event handler', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    expect(mockSocket.on).toHaveBeenCalledWith(
      'connect_error',
      expect.any(Function),
    );
  });

  it('should handle connect errors', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    const connectErrorHandler = mockSocket.on.mock.calls.find(
      (call: [string, ...unknown[]]) => call[0] === 'connect_error',
    )[1];

    const error = new Error('Connection failed');
    connectErrorHandler(error);

    expect(handleError).toHaveBeenCalledWith(error);
    expect(mockSocket.disconnect).toHaveBeenCalled();
    expect(socketRef.current).toBeNull();
    expect(openingRef.current).toBe(false);
  });

  it('should return cleanup function', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    const cleanup = loadSocket(params);

    expect(cleanup).toBeInstanceOf(Function);
  });

  it('should disconnect socket on cleanup', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    const cleanup = loadSocket(params);
    cleanup!();

    expect(mockSocket.disconnect).toHaveBeenCalled();
    expect(socketRef.current).toBeNull();
    expect(openingRef.current).toBe(false);
  });

  it('should not disconnect if socket is different on disconnect event', () => {
    const params: UseLoadSocket = {
      socketRef,
      openingRef,
      handleData,
      handleError,
      currentTable: 1,
    };

    loadSocket(params);

    // Simulate a different socket in the ref
    socketRef.current = { id: 'different-socket' } as Socket;

    const disconnectHandler = mockSocket.on.mock.calls.find(
      (call: [string, ...unknown[]]) => call[0] === 'disconnect',
    )[1];
    disconnectHandler('transport close');

    // Should not nullify the ref since it's a different socket
    expect(socketRef.current).toEqual({ id: 'different-socket' });
  });
});
