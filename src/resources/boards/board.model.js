const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v1(),
    title = 'Board',
    columns  = '1',
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns  = columns ;
  }
}

module.exports = Board;
