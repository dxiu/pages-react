'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const basewebpack = require('./webpack.base')
module.exports = merge(basewebpack, {
    mode: 'development',
    devtool:'source-map',//inline-source-map
    optimization: {
        runtimeChunk: 'single',
      },
    devServer: {
        static: './dist',
        open:true,
        hot: true,
        port:3000,
        // compress:true
        // proxy: {
        //     '/api': {
        //         target: 'http://10.8.145.144:8080', //'http://172.18.0.54:19999/',
        //         rewrite: {},
        //         pathRewrite: {
        //             '^/api': '/api' //需要rewrite重写的,
        //         },
        //     }
        // }
    },
    
})