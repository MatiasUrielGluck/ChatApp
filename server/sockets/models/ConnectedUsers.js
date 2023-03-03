class ConnectedUsers {
  constructor() {
    this.list = [];
  }

  connectUser = (user) => {
    for (const connectedUser of this.list) {
      if (connectedUser.databaseId === user.databaseId) {
        return;
      }
    }
    this.list.push(user);
  };

  disconnectUserBySocketId = (socketId) => {
    this.list = this.list.filter(
      (connectedUser) => connectedUser.socketId !== socketId
    );
  };

  getConnectedUsers = () => {
    return this.list;
  };

  getUserByDatabaseId = (databaseId) => {
    // TODO:
    for (const user of this.list) {
      if (user.databaseId === databaseId) {
        return user;
      }
    }
    return undefined;
  };
}

module.exports = {
  ConnectedUsers,
};
