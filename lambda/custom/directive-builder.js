/**
    Builds and returns directives that contain either a Setup or Charge payload
    https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html#workflow1
**/

'use strict';

const config            = require( 'config' );

function createDirective( name, payload, token ) {
    let directive       = {};
    
    directive.type      = config.GLOBAL.directiveType;
    directive.name      = name;
    directive.payload   = payload;
    directive.token     = token;

    return directive;
}

module.exports = {
    'createDirective':     createDirective
};