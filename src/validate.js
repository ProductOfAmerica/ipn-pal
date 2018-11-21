import request from "request";
import IPN_ERRORS from "./ipnError";

export default function validate(sandbox, body = {}, cb) {
  // Prepend 'cmd=_notify-validate' flag to the post string
  let postreq = "cmd=_notify-validate";

  // Iterate the original request payload object
  // and prepend its keys and values to the post string
  Object.keys(body).map(key => {
    postreq = `${postreq}&${key}=${body[key]}`;
    return key;
  });

  const options = {
    url: sandbox
      ? "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr"
      : "https://ipnpb.paypal.com/cgi-bin/webscr",
    method: "POST",
    headers: {
      "Content-Length": postreq.length,
      "User-Agent": "NODE-ipn-pal/1.0"
    },
    encoding: "utf-8",
    body: postreq
  };

  // Make a post request to PayPal
  request(options, (error, response, resBody) => {
    if (error || response.statusCode !== 200) {
      cb(IPN_ERRORS.BAD_STATUS);
      return;
    }

    // Validate the response from PayPal
    if (resBody.substring(0, 8) === "VERIFIED") {
      cb(null);
    } else if (resBody.substring(0, 7) === "INVALID") {
      cb(IPN_ERRORS.INVALID_IPN);
    } else {
      cb(IPN_ERRORS.UNKNOWN_RESPONSE);
    }
  });
}
