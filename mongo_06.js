'use strict';

const mongoose = require('mongoose');
const Category = require('./category');
const fx       = require('./fx');

const productSchema = {
    'name'     : { 'type':String, 'required':true }
  , 'pictures' : [{ 'type':String, 'match':/^http:\/\//i }]
  , 'price'    : {
      'amount'  : {
          'type'     : Number
        , 'required' : true
        , 'set'      : function priceAmountSet(v){
          this.internal.approximatePriceUSD = v/(fx()[this.price.currency] || 1);
          return v;
        }
      }
    , 'currency': {
        'type'     : String
      , 'enum'     : ['USD', 'EUR', 'GBP']
      , 'required' : true
      , 'set'      : function priceCurrencySet(v){
        this.internal.approximatePriceUSD = this.price.amount/(fx()[v] || 1);
        return v;
      }
    }
  }
  , 'category' : Category.categorySchema
  , 'internal' : {
    'approximatePriceUSD': Number
  }
};

const schema = new mongoose.Schema(productSchema);
const currencySymbol = {
    'USD':'$'
  , 'GBP':'£'
  , 'EUR': '€'
};

// Standard human readable string form of price.
// We want $25 instead of 25 USD.
schema.virtual('displayPrice').get(function virtualDisplayPrice(){
  return ''+currencySymbol[this.price.currency]+this.price.amount;
});
schema.set('toObject', { 'virtuals':true });
schema.set('toJSON', { 'virtuals':true });

module.exports = schema;
module.exports.productSchema = productSchema;
