#! /usr/bin/env node
// 标识在node环境下执行代码
const path = require('path')
console.log('链接成功');

const Compilar = require('../lib/Compilar.js')
let webpackConfig = require(path.resolve('./webpack.config.js')) // 获取webpack.config.js 配置文件
let compilar = new Compilar(webpackConfig)
compilar.run()
