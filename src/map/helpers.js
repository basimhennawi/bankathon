/**
 * Map account type to equivalent in number
 * @method getAcctType
 * @return {Number}
 */
const getAcctType = (type) => {
  switch (type) {
    case 'fiat':
      return 200;
    case 'wallet':
      return 201;
    default:
      return 200;
  }
};

module.exports = {
  getAcctType,
};
