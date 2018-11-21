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
