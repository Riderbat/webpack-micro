import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin, webpack } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
//import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions):Configuration['plugins']{

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        })
    ]

    if(isDev){
        // plugins.push(new webpack.ProgressPlugin()),
        // Выносит проверку типов в отдельный процесс: не нагружает сборку
        // plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if(isProd){
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].contenthash:8].css'
              }
              )
        )
    }

    if(analyzer){
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}