# Build An Alexa Skill with Amazon Pay - Demo Store
Do you currently sell goods or services on other channels but want to expand to Alexa to reach new and existing customers? Good news, with [Amazon Pay](https://developer.amazon.com/alexa-skills-kit/make-money/amazon-pay), you can offer a seamless voice purchasing experience to your customers, allowing them to purchase real-world goods and services via Alexa - without having to leave the voice experience.

This custom skill is a demo store that showcases how to use Amazon Pay with your shopping experiences on Alexa.

## What You Will Need
Before you start working on this skill, you will need to create the following accounts:
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [Amazon Pay Merchant Account](https://pay.amazon.com/us)
*  [Amazon Pay Sandbox Test Account](https://www.youtube.com/watch?v=m5teEFRZB8A)

## Setting Up the Demo
This repository contains the interaction model and skill code. It is structured to make it easy to deploy if you have the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) already setup. If you would like to use the Alexa Developer Console, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for. In addition, you will need to configure the additional supporting javascript files found in the custom folder.

1. Clone repository and navigate the demo's root folder ( lambda/custom ).
1. Open [config.js](./lambda/custom/config.js) and update values `bucketName`, `sellerId`, and `sandboxCustomerEmailId`
   * the `bucketName` is the name of your [S3](https://aws.amazon.com/s3/) bucket.
   * the `sellerId` is your Amazon Pay Seller Id. You can find that [here](https://youtu.be/oHp4Hv5_MBA?t=38)
   * the `sandboxCustomerEmailId` is the email address of the Amazon Pay sandbox test account you created in Seller Central. Instructions [here](https://www.youtube.com/watch?v=m5teEFRZB8A).
1. Give your skill permission to use your Amazon Pay account. You can do that [here](https://sellercentral.amazon.com/external-payments/integration/alexa/). The documentation is [here](https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html).
1. Enable the skill using the Alexa app. Be sure to click Settings to show the permissions page if you do not see it. Provide permission to use Amazon Pay.

## Running the Demo
Launch the demo by saying, 'Alexa, open No Nicks'. If you receive an error, proceed to the [troubleshooting section](#troubleshooting).

## Troubleshooting

If you are encountering issues with your skill, double check that you have completed the following:

1. Confirm that your Seller Central account is in good standing by selecting the Production environment and verify there are no errors on your account.
1. Check the correct skill was linked in Sandbox using in Seller Central.
1. Verify your sandbox test user was created in Seller Central.
1. Verify Amazon Pay permissions are enabled for your skill under Build > Permissions > Amazon Pay.
1. Verify the config.js contains the appropriate values for `bucketName`, `sellerId`, and `sandboxCustomerEmailId`.
1. Verify the correct skill Id is used in your Lambda function.
1. Enable your skill in your Alexa App
1. Consent and give permissions to Amazon Pay in your Alexa App
1. Enable Voice Purchasing in your Alexa App ( with or without the voice code ).

All other errors and decline handling can be found here: https://developer.amazon.com/docs/amazon-pay/payment-declines-and-processing-errors.html

## Resources
* [Amazon Pay Alexa Documentation](https://developer.amazon.com/docs/amazon-pay/amazon-pay-overview.html)
* [Amazon Pay Certification Requirements](https://developer.amazon.com/docs/amazon-pay/certify-skill-with-amazon-pay.html)
* [Official Alexa Skills Kit SDK for Node.js](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/) - The Official Node.js SDK Documentation
* [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/423/index.html) - Join the conversation!
* [Amazon Pay Help Guide](https://pay.amazon.com/us/help)


## License

This library is licensed under the Amazon Software License.