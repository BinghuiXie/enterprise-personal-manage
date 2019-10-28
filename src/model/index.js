class baseModel {
  constructor (data, message) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null
    }
    
    if (data) {
      this.data = data
    }
    
    if (message) {
      this.message = message
    }
  }
}

export class SuccessModel extends baseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 1
  }
}

export class ErrorModel extends baseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0
  }
}

