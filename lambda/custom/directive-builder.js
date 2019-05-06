/**
    Builds and returns directives that contain either a Setup or Charge payload
    https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html#workflow1
**/

'use strict';

const config = require( 'config' );

function createDirective( name, payload, token ) {
    const directive = {
        type:       config.GLOBAL.directiveType,
        name:       name,
        payload:    payload,
        token:      token      
    };

    return directive;
}

module.exports = {
    'createDirective': createDirective
};