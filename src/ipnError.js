/**
 * IPN_ERRORS
 * @type {{AWAIT_ERROR: string, VALIDATION_ERROR: string, BAD_STATUS: string, INVALID_IPN: string, UNKNOWN_RESPONSE: string}}
 */
const IPN_ERRORS = {
  AWAIT_ERROR: "Failed to wait for IPN validation.",
  VALIDATION_ERROR: "Error validating IPN message.",
  BAD_STATUS: "Status not OK",
  INVALID_IPN: "IPN Message is invalid.",
  UNKNOWN_RESPONSE: "Unexpected response body."
};

export default IPN_ERRORS;
