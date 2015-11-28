'use strict';

const mongoose = require('mongoose');
const Category = require('./category');

const productSchema = {
    'name'     : { 'type':String, 'required':true }
  , 'pictures' : [{ 'type':String, 'match':/^http:\/\//i }]
  , 'price'    : {
      'amount'  : { 'type':Number, 'required':true}
    , 'currency': { 'type':String, 'enum':['USD', 'EUR', 'GBP'], 'required':true }
  }
  , 'category' : Category.categorySchema
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
