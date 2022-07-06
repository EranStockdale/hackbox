import type { Socket } from "socket.io";
import roomManager from "./RoomManager";

const forAllRecipients = (
  recipients: any,
  callback: (recipientId: string) => void
) => {
  return Promise.allSettled([recipients].flat().map(callback));
};

class Host {
  id: string;
  roomCode: string;
  socket: Socket | undefined;

  constructor(id: string, roomCode: string) {
    this.id = id;
    this.roomCode = roomCode;
  }

  connect(socket: Socket) {
    this.socket = socket;

    socket.on("update player", async (payload) => {
      await forAllRecipients(payload.to, (recipientId) => {
        const player = this.room.players[recipientId];
        player.updateState(payload.data);
      });
    });
  }

  send(eventName: string, payload: unknown) {
    this.socket?.emit(eventName, payload);
  }

  get room() {
    return roomManager.findRoom(this.roomCode);
  }
}

export default Host;
