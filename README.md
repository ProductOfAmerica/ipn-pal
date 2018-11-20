# IPN-Pal

PayPal Instant Payment Notification SDK for Node.js.

## Install

The easiest way to use **nod** is through the Yeoman Generator.

```sh
$ yarn add ipn-pal
```

## Use

To use this validator

```javascript 1.6
var express = require('express');
var bodyParser = require('body-parser');
var ipn_pal = require('ipn-pal');

var app = express();

var optionalCallback = function(data){
  var transactionType = data.txn_type;
  
};

// Use the ipn validator on a specific route
app.use(ipn_pal.validator({ path: '/your-ipn-webhook', sandbox: true }, optionalCallback));
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Options](#options)
    -   [Properties](#properties)
-   [validCallback](#validcallback)
    -   [Parameters](#parameters)
-   [validator](#validator)
    -   [Parameters](#parameters-1)

### Options

The Options parameter

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The path to your webhook. Must be the same on PayPal
-   `sandbox` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Are you using the sandbox environment? Default: false

### validCallback

This callback will be passed the body if successful

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

#### Parameters

-   `body` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### validator

This method is the validator for an IPN webhook defined on your server
The IPN message authentication protocol consists of four steps:
   1\. PayPal HTTPS POSTs an IPN message to your listener that notifies
       it of an event.
   2\. Your listener returns an empty HTTP 200 response to PayPal.
   3\. Your listener HTTPS POSTs the complete, unaltered message back to
       PayPal; the message must contain the same fields (in the same order)
       as the original message and be encoded in the same way as the original
       message.
   4\. PayPal sends a single word back - either VERIFIED (if the message
       matches the original) or INVALID (if the message does not match the
       original).

#### Parameters

-   `options` **[Options](#options)** to pass the validator
-   `cb` **[validCallback](#validcallback)** A successful callback can be called

## License

MIT © [Diego Haz](https://github.com/diegohaz)
