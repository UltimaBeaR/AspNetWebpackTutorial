"use strict"

// Сам webpack, для доступа к стандартным плагинам webpack-а
var webpack = require('webpack');

// Требуется для формирования полного output пути
let path = require('path');

// Плагин для отслеживания в консоли момента, когда вебпак начинает построение
const watchTimePlugin = require('webpack-watch-time-plugin');

// Плагин для очистки выходной папки (bundle) перед созданием новой
const CleanPlugin = require('clean-webpack-plugin');

// Папка с входными (исходными) файлами скриптов
const scriptsFolderName = "Scripts";

// Путь к выходной папке
const bundleFolder = "wwwroot/bundle/";

module.exports = {
    // Абсолютная папка, относительно которой ищутся точки входа
    context: path.resolve(__dirname, scriptsFolderName),

    // Точки входа в приложение
    entry: {
        main: './main.ts',
    },

    // Выходные файлы
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        // Пишет в консоль время, когда вебпак начинает перестроение (полезно для watch режима)
        watchTimePlugin,

        // Очищение папки bundleFolder каждый раз перед перестроением
        new CleanPlugin([bundleFolder]),

        // Обход ворнингов из ангуляра issue 11580 в github репозитории ангуляра
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            // ToDo: Не уверен что эта строка должна быть именно такой, ворнинг исчезает при любом пути тут
            path.resolve(__dirname, scriptsFolderName),
            {}
        ),
    ],
    // Включаем генерацию отладочной информации внутри выходного файла
    // (Нужно для работы отладки клиентских скриптов)
    devtool: "source-map"
};