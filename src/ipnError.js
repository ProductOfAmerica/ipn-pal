/**
 * IPN_ERRORS
 * @type {{BAD_STATUS: string, INVALID_IPN: string, UNKNOWN_RESPONSE: string}}
 */
const IPN_ERRORS = {
  BAD_STATUS: "Status not OK",
  INVALID_IPN: "IPN Message is invalid.",
  UNKNOWN_RESPONSE: "Unexpected response body."
};

export default IPN_ERRORS;
