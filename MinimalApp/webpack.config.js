"use strict"

// Сам webpack, для доступа к стандартным плагинам webpack-а
var webpack = require('webpack');

// Требуется для формирования полного output пути
let path = require('path');

// Плагин для отслеживания в консоли момента, когда вебпак начинает построение
const watchTimePlugin = require('webpack-watch-time-plugin');

// Плагин для очистки выходной папки (bundle) перед созданием новой
const CleanPlugin = require('clean-webpack-plugin');

// Плагин для вытаскивания .css в виде файлов
const ExtractCSS = require('extract-text-webpack-plugin');

// Папка с входными (исходными) файлами скриптов и другими вещами, связанными с фронтендом
const sourceFolderName = "Frontend";

// Путь к выходной папке
const bundleFolder = "wwwroot/bundle/";

const ngAppAbsPath = path.resolve(__dirname, sourceFolderName + '/ngApp');

module.exports = {
    // Абсолютная папка, относительно которой ищутся точки входа
    context: __dirname,

    // Точки входа в приложение (Нужно указывать относительно рута проекта (context = __dirname), иначе перестает работать отладка по исходникам в visual studio
    entry: {
        main: `./${sourceFolderName}/main.ts`,
    },

    // Выходные файлы
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            // Typescript файлы
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },

            // Глобальные scss стили (Сохраняются в styles.css)
            {
                test: /\.scss$/,
                exclude: [/node_modules/, ngAppAbsPath],
                // Примечание: Если у sass-loader не указать ?sourceMap - то выдает ошибку что не найден node-sass (Хрень какая-то)
                use: ExtractCSS.extract({
                    use: [
                        "css-loader?sourceMap",
                        "sass-loader?sourceMap"
                    ]
                })
            },

            // Локальные стили для angular компонентов. Запрашиваются в виде строки с содержанием .css файла
            {
                test: /\.scss$/,
                include: ngAppAbsPath,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            // Html в виде строки. Используется в template-ах angular
            {
                test: /\.html$/,
                include: ngAppAbsPath,
                use: [
                    'html-loader'
                ]
            }
        ]
    },
    resolve: {
        // Чтобы при импорте не указывать расширения
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
            path.resolve(__dirname, sourceFolderName),
            {}
        ),

        new ExtractCSS({
            filename: 'styles.css',
            allChunks: true
        })
    ],
    // Включаем генерацию отладочной информации внутри выходного файла
    // (Нужно для работы отладки клиентских скриптов)
    devtool: "source-map"
};