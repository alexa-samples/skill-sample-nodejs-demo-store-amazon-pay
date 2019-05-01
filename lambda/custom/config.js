/**
    To run this skill, the minimum values you need configure are in INIT: bucketName, sandboxCustomerEmailId, and sellerId

    A detailed list of attribute descriptions can be found here:
    https://developer.amazon.com/docs/amazon-pay/amazon-pay-apis-for-alexa.html    
**/

'use strict';

const utilities = require( 'utilities' );

// You must specify these values to run this skill
const INIT = {
    bucketName:                         'no-nicks',                                 // Required; Used for skill state management
    sandboxCustomerEmailId:             'tcordov+pay.sandbox.buyer.2@amazon.com',   // Required*; If sandboxMode equals true;
    sellerId:                           'AVX6ERM5QT1ZB',                            // Required; Amazon Pay seller ID     
};

// These attributes are used globally across US, EU, and JP
const GLOBAL = {
    paymentAction:                      'AuthorizeAndCapture',                      // Required; 'Authorize' or 'AuthorizeAndCapture'
    sandboxMode:                        true,                                       // Required*; Must be true for sandbox testing; Must be false to submit to certification & production
    version:                            '2',                                        // Required;
    setupType:                          'SetupAmazonPayRequest',                    // Required;
    chargeType:                         'ChargeAmazonPayRequest',                   // Required;
    needAmazonShippingAddress:          true,                                       // Optional; Must be boolean
    transactionTimeout:                 0,                                          // Optional; The default and recommended value for Alexa transactions is 0
};

// These attributes will change based on your region ( US, EU, or JP )
const REGIONAL = {
    'en-US': {
        countryOfEstablishment:         'US',                                       // Required;
        currencyCode:                   'USD',                                      // Required;
        ledgerCurrency:                 'USD',                                      // Required;
        checkoutLanguage:               'en_US',                                    // Optional; US must be en_US
        customInformation:              '',                                         // Optional; Max 1024 chars
        sellerAuthorizationNote:        utilities.getSimulationString( '' ),        // Optional; Max 255 chars; In sandbox mode you can pass simulation strings. See utilities.js
        sellerNote:                     'Thanks for shaving with No Nicks',         // Optional; Max 1024 chars, visible on confirmation mails to buyers
        sellerStoreName:                'No Nicks',                                 // Optional; Documentation calls this out as storeName not sellerStoreName
        softDescriptor:                 'No Nicks',                                 // Optional; Max 16 chars; This value is visible on customers credit card statements
    }
};

/** 
    The following strings DO NOT interact with Amazon Pay, they are here to augment the skill

    Order Summary, Order Confirmation, Cancel and Refund Custom Intents are required for certification:
    https://developer.amazon.com/docs/amazon-pay/certify-skill-with-amazon-pay.html
**/

// CARD INFORMATION
    const storeURL                         = 'www.nonicks.com';
    const logoURL                          = 'https://s3-us-west-2.amazonaws.com/tcordov/no-nicks-logo-512.png';

// LAUNCH INTENT
    const launchRequestWelcomeTitle        = 'Welcome to '+ REGIONAL[ 'en-US' ].sellerStoreName +'. '; 
    const launchRequestWelcomeResponse     = launchRequestWelcomeTitle +'We have everything you need for the perfect shave.';
    const launchRequestQuestionResponse    = 'Are you interested in a starter kit, or refills?';

// NO INTENT
    const noIntentResponse                 = 'Okay. Do you want to order something else?';

// CART SUMMARY
    const cartSummaryCheckout              = ' Do you want to check out now?';
    const cartSummarySubscription          = ' Every 2 months, you’ll be charged {subscriptionPrice} dollars for your refill.';
    const cartSummaryResponse              = 'Your total for the '+ REGIONAL[ 'en-US' ].sellerStoreName +' {productType} is {productPrice} dollars and will ship to your address at {shippingAddress}.<break time=".5s"/>';
    
// CANCEL & REFUND CONTACT DETAILS
    const storePhoneNumber                 = '1-234-567-8910';
    const storeEmail                       = 'help@nonicks.com';
    const storeEmailPhonetic               = 'help at no nicks dot com';

// REFUND INTENT - REQUIRED
    const refundOrderTitle                 = 'Refund Order Details';
    const refundOrderIntentResponse        = 'To request a refund, email '+ storeEmailPhonetic +', or call us. I sent contact information to your Alexa app.';
    const refundOrderCardResponse          = 'Not completely happy with your order? We are here to help.\n To request a refund, contact us at '+ storePhoneNumber +' or email '+ storeEmail +'.';

// CANCEL INTENT - REQUIRED    
    const cancelOrderTitle                 = 'Cancel Order Details';
    const cancelOrderIntentResponse        = 'To request a cancellation, email '+ storeEmailPhonetic +', or call us. I sent contact information to your Alexa app.';
    const cancelOrderCardResponse          = 'Want to change or cancel your order? We are here to help.\n Contact us at '+ storePhoneNumber +' or email '+ storeEmail +'.';
    
// ORDER CONFIRMATION - REQUIRED
    const confirmationTitle                = 'Order Confirmation Details';
    const confirmationPlaceOrder           = 'Your order has been placed.';
    const confirmationThanks               = 'Thanks for shaving with '+ REGIONAL[ 'en-US' ].sellerStoreName +'.';
    const confirmationIntentResponse       = REGIONAL[ 'en-US' ].sellerStoreName + ' will email you when your order ships. Thanks for shaving with '+ REGIONAL[ 'en-US' ].sellerStoreName +'.';
    const confirmationItems                = 'Products: 1 {productType}';
    const confirmationTotal                = 'Total amount: ${productPrice}';
    const confirmationTracking             = 'Tracking number: 9400121699000025552416.';
    const confirmationCardResponse         = confirmationPlaceOrder + '\n' +
                                                confirmationItems   + '\n' +
                                                confirmationTotal   + '\n' +
                                                confirmationThanks  + '\n' +
                                                storeURL;
// ORDER TRACKER INTENT
    const orderTrackerTitle                = 'Order Status';
    const orderTrackerIntentResponse       = 'Your order shipped via UPS, and delivery is estimated for this Friday. Check your order email for the tracking number.';
    const orderTrackerCardResponse         = 'Your order #19206 was shipped via UPS and is estimated to arrive on Friday.\n You can check the status at any time using tracking number 9400121699000025552416.';

// HELP INTENT
    const helpCommandsIntentResponse       = 'To check order status, say where is my order. To cancel an order, say cancel order. To ask for a refund, say refund.';

// FALLBACK INTENT
    const fallbackHelpMessage              = 'Hmm, I\'m not sure about that. ' + helpCommandsIntentResponse;

// EXITSKILL INTENT
    const exitSkillResponse                = 'OK, bye for now';


/** 
    The following strings are used to output errors to test the skill
**/

// ERROR RESPONSE STRINGS
    const scope                            = 'payments:autopay_consent';    // Required; Used request permissions for Amazon Pay
    const enablePermission                 = 'To make purchases in this skill, you need to enable Amazon Pay and turn on voice purchasing. To help, I sent a card to your Alexa app.';
    const errorMessage                     = 'Merchant error occurred. ';
    const errorUnknown                     = 'Unknown error occurred. ';
    const errorStatusCode                  = 'Status code: ';
    const errorStatusMessage               = ' Status message: ';
    const errorPayloadMessage              = ' Payload message: ';
    const errorBillingAgreement            = 'Billing agreement state is ';
    const errorBillingAgreementMessage 	   = '. Reach out to the user to resolve this issue.';
    const authorizationDeclineMessage 	   = 'Your order was not placed and you have not been charged.';
    const debug                            = 'debug';


module.exports = {
    // PAYLOAD ATTRIBUTES
    'INIT':                             INIT,
    'GLOBAL':                           GLOBAL,
    'REGIONAL':                         REGIONAL,

    // INTENT RESPONSE STRINGS
    'launchRequestWelcomeTitle':        launchRequestWelcomeTitle,
    'launchRequestWelcomeResponse':    	launchRequestWelcomeResponse,
    'launchRequestQuestionResponse':   	launchRequestQuestionResponse,

    'noIntentResponse':                 noIntentResponse,

    'confirmationTitle':                confirmationTitle,
    'confirmationIntentResponse':       confirmationIntentResponse,
    'confirmationCardResponse':         confirmationCardResponse,

    'storeURL':                         storeURL,
    'logoURL':                          logoURL,
    'storePhoneNumber':                 storePhoneNumber,

    'cancelOrderTitle':                 cancelOrderTitle,    
    'cancelOrderIntentResponse':        cancelOrderIntentResponse,
    'cancelOrderCardResponse':          cancelOrderCardResponse,

    'cartSummaryCheckout':              cartSummaryCheckout,
    'cartSummarySubscription':          cartSummarySubscription,
    'cartSummaryResponse':              cartSummaryResponse,

    'refundOrderTitle':                 refundOrderTitle,
    'refundOrderIntentResponse':        refundOrderIntentResponse,
    'refundOrderCardResponse':          refundOrderCardResponse,   

    'helpCommandsIntentResponse':       helpCommandsIntentResponse,

    'fallbackHelpMessage':              fallbackHelpMessage,

    'orderTrackerTitle':                orderTrackerTitle,
    'orderTrackerIntentResponse':       orderTrackerIntentResponse,
    'orderTrackerCardResponse':         orderTrackerCardResponse,

    'exitSkillResponse':                exitSkillResponse,
    
    // ERROR RESPONSE STRINGS
    'enablePermission':                 enablePermission,
    'scope':                            scope,
    'errorMessage':                     errorMessage,
    'errorUnknown':                     errorUnknown,
    'errorStatusCode':                  errorStatusCode,
    'errorStatusMessage':               errorStatusMessage,
    'errorPayloadMessage':              errorPayloadMessage,
    'errorBillingAgreement':            errorBillingAgreement,
    'errorBillingAgreementMessage': 	errorBillingAgreementMessage,
    'authorizationDeclineMessage':      authorizationDeclineMessage,
    'debug':                            debug
};