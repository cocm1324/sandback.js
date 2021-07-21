const { SourceMapDevToolPlugin } = require('webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
const { join } = require('path');

module.exports = (env) => {

    // const { NODE_ENV } = env;
    // const mode = NODE_ENV === 'production' ? 'production' : 'development';

    return {
        target: 'node',
        mode: 'production',
        entry: { bundle: join(__dirname, 'src', 'main.ts') },
        output: { path: join(__dirname, 'dist'), filename: '[name].js' },
        optimization: { minimize: false },
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [ new TsconfigPathsPlugin() ]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ]
        },
        devtool: 'inline-source-map',
        plugins: [
            new SourceMapDevToolPlugin({
                filename: '[name].js.map',
                exclude: /^(.*?(vendor)[^$]*)$/
            }),
            // new Dotenv({ 
            //     path: join(__dirname, 'environments', `.env.${NODE_ENV}`),
            //     defaults: false
            // })
        ]
    }
}