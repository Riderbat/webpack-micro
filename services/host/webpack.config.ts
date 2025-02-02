import webpack from 'webpack'
import path from 'path';
import {BuildMode, BuildOptions, BuildPaths, BuildPlatform, buildWebpack} from '@packages/build-config'
import packageJson from './package.json'

interface EnvVariables {
  mode?: BuildMode,
  port?: number,
  analyzer?: boolean,
  platform?: BuildPlatform,
  SHOP_REMOTE_URL?: string,
  ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src')
  }
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  })

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host', // название самого микрофронтенда
    filename: 'remoteEntry.js', // название файла, который будет удаленно подключаться в host контейнер
    remotes: {
      shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
      admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom']
      },
      'react-dom': {
        eager: true, // свойство говорит о моментальной подгрузке библиотеки
        requiredVersion: packageJson.dependencies['react-dom']
      }
    }
  }))

  return config

};

// {
//   mode: env.mode ?? 'development',
//   // "build:dev": "webpack --env mode=development"
//   entry: path.resolve(__dirname, 'src', 'index.tsx'),
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: '[name].[contenthash].js',
//     clean: true
//   },
//   plugins: [
//     new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
//     //new HtmlWebpackPlugin()
//     isDev && new webpack.ProgressPlugin(),
//     !isDev && new MiniCssExtractPlugin({
//       filename: 'css/[name].[contenthash:8].css',
//       chunkFilename: 'css/[name].contenthash:8].css'
//     }
//     )
//   ].filter(Boolean),
//   module: {
//     rules: [
//       // {
//       //   test: /\.css$/i,
//       //   use: ["style-loader", "css-loader"],
//       // },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           // "style-loader",
//           isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
//           // Translates CSS into CommonJS
//           "css-loader",
//           // Compiles Sass to CSS
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   devtool: isDev && 'inline-source-map',
//   devServer: isDev ? {
//     port: env.port ?? 3000,
//     open: true
//   } : undefined
// }
