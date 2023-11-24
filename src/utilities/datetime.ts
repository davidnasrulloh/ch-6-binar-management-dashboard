const datetime = function (): string {
  let date = new Date();
  return (
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString()
  );
};

export default datetime;
