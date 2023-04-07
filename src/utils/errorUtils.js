class HttpError {
  constructor(statusText, error) {
    this.description = statusText;
    error && (this.details = error);
  }
}

module.exports = HttpError

