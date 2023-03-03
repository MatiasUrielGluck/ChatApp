export function asyncEmit(socket, eventName, data) {
  return new Promise(function (resolve, reject) {
    socket.emit(eventName, data, () => {});
    socket.on(eventName, (result) => {
      resolve(result);
    });
    setTimeout(reject, 10000);
  });
}
