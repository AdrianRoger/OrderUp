class ValidateUuidV4 {
  static isValidUuidV4({ uuid }) {
    // regex to validate UUID v4
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    // return true or false for the test
    return uuidRegex.test(uuid);
  }
}

module.exports = ValidateUuidV4;
