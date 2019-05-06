/**
    Builds and returns payloads for both Setup and Charge API's
    https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html#workflow1

    Parameter types and descriptions can be found here:
    https://developer.amazon.com/docs/amazon-pay/amazon-pay-apis-for-alexa.html 
**/

const utilities    = require( 'utilities' );
const config       = require( 'config' );
const initConfig   = config.INIT;
const globalConfig = config.GLOBAL;    

function setupPayload( language ) {
    const regionalConfig = config.REGIONAL[ language ];

    let payload = {
        '@type':                                                globalConfig.payloadSetupType,
        '@version':                                             globalConfig.version,
        'sellerId':                                             initConfig.sellerId,
        'countryOfEstablishment':                               regionalConfig.countryOfEstablishment,
        'ledgerCurrency':                                       regionalConfig.ledgerCurrency,
        'checkoutLanguage':                                     language,
        'sandboxCustomerEmailId':                               initConfig.sandboxCustomerEmailId,
        'sandboxMode':                                          globalConfig.sandboxMode,
        'needAmazonShippingAddress':                            globalConfig.needAmazonShippingAddress,
        'billingAgreementAttributes': {
            '@type':                                            'BillingAgreementAttributes',
            '@version':                                         globalConfig.version,
            'sellerNote':                                       regionalConfig.sellerNote,
            'platformId':                                       globalConfig.platformId,
            'sellerBillingAgreementAttributes': {
                '@type':                                        'SellerBillingAgreementAttributes',
                '@version':                                     globalConfig.version,
                'sellerBillingAgreementId':                     utilities.generateRandomString( 6 ),
                'storeName':                                    globalConfig.sellerStoreName,
                'customInformation':                            regionalConfig.customInformation
            }
        }
    };

    return payload;
}

function chargePayload ( billingAgreementId, authorizationReferenceId, sellerOrderId, amount, language ) {
    const regionalConfig = config.REGIONAL[ language ];

    let payload = {
        '@type':                                                globalConfig.payloadChargeType,
        '@version':                                             globalConfig.version,
        'sellerId':                                             initConfig.sellerId,
        'billingAgreementId':                                   billingAgreementId,
        'paymentAction':                                        globalConfig.paymentAction,
        'authorizeAttributes': {
            '@type': 'AuthorizeAttributes',
            '@version':                                         globalConfig.version,
            'authorizationReferenceId':                         authorizationReferenceId,
            'authorizationAmount': {
                '@type':                                        'Price',
                '@version':                                     globalConfig.version,
                'amount':                                       amount.toString(),
                'currencyCode':                                 regionalConfig.ledgerCurrency
            },
            'transactionTimeout':                               globalConfig.transactionTimeout,
            'sellerAuthorizationNote':                          regionalConfig.sellerAuthorizationNote,
            'softDescriptor':                                   regionalConfig.softDescriptor
        },
        'sellerOrderAttributes': {
            '@type':                                            'SellerOrderAttributes',
            '@version':                                         globalConfig.version,
            'sellerOrderId':                                    sellerOrderId,
            'storeName':                                        regionalConfig.sellerStoreName,
            'customInformation':                                regionalConfig.customInformation,
            'sellerNote':                                       regionalConfig.sellerNote
        }
    };

    return payload;
}

module.exports = {
    'setupPayload':  setupPayload,
    'chargePayload': chargePayload
};