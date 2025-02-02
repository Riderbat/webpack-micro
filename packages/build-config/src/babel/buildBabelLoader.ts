import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {

    return {

        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            runtime: "automatic"
                        }
                    ]
                ],
                plugins: [
                    [
                        removeDataTestIdBabelPlugin,
                        {
                            props: ['data-testid']
                        }
                    ]
                ]
            }

        }

    }
}