import IPN_ERRORS from "./ipnError";
import validate from "./validate";

/**
 * The Options parameter
 * @typedef {Object} Options
 * @property {string} path - The path to your webhook. Must be the same on PayPal
 * @property {boolean} [sandbox] - Are you using the sandbox environment? Default: false
 */

/**
 * This callback will be passed the body of the request if successful
 * @callback Callback
 * @param {string} error
 * @param {object} body
 */

/**
 * This method is the validator for an IPN webhook defined on your server
 * The IPN message authentication protocol consists of four steps:
 *    1. PayPal HTTPS POSTs an IPN message to your listener that notifies
 *        it of an event.
 *    2. Your listener returns an empty HTTP 200 response to PayPal.
 *    3. Your listener HTTPS POSTs the complete, unaltered message back to
 *        PayPal; the message must contain the same fields (in the same order)
 *        as the original message and be encoded in the same way as the original
 *        message.
 *    4. PayPal sends a single word back - either VERIFIED (if the message
 *        matches the original) or INVALID (if the message does not match the
 *        original).
 * @param {Options} options to pass the validator
 * @param {Callback} [cb] A successful callback can be called
 */
export function validator(options, cb) {
  if (!options || options.path === undefined)
    throw new TypeError("options.path must be specified");

  function callCb(err, data) {
    if (typeof cb === "function") cb(err, data);
  }

  return (req, res, next) => {
    // Not our webhook route
    if (req.path !== options.path) {
      next();
      return;
    }

    res.status(200).send("Ok"); // Send 200 status back to PayPal immediately
    res.end();

    validate(!!options.sandbox, req.body, errStr => {
      if (errStr) {
        callCb(errStr);
        next();
        return;
      }

      callCb(null, req.body);
      next();
    });
  };
}

export { IPN_ERRORS };
