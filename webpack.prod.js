'use strict'
const path = require('path')
const basewebpack = require('./webpack.base')
const { merge } = require('webpack-merge')
module.exports = merge(basewebpack, {
    mode: 'production',

})