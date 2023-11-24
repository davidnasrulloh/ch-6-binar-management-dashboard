class Randomize {
  static randomID(): number {
    return parseInt(Math.random().toPrecision(9).toString().substring(2));
  }

  static randomPassword(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default Randomize;
