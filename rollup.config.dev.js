import fs from "fs"
import path from "path"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import rootImport from "rollup-plugin-root-import"
import livereload from "rollup-plugin-livereload"
import globImport from 'rollup-plugin-glob-import'
import serve from "rollup-plugin-serve"
import configEnv from "@thoughtsunificator/rollup-plugin-config-env"

import config from "./lib/config.js"

export default [
	{
		input: "./src/search/main.js",
		output: {
			sourcemap: true,
			file: "./dist/dev/public/bundle.js",
			format: "iife"
		},
		plugins: [
			postcss({
				sourcemap: true,
				extract: path.resolve("dist/dev/public/bundle.css"),
				plugins: [postcssImport()]
			}),
			copy({
				watch: 'public',
				targets: [
				{ src: "public", dest: "dist/dev" },
				{
					src: "public/manifest.json",
					dest: "dist/dev/public",
					transform: function(content) {
						const data = JSON.parse(content.toString())
						data.permissions.push(`${config.API_URL}/*`)
						return JSON.stringify(data)
					}
				},
				{ src: "LICENSE", dest: "dist/dev/public" },
				{ src: "README.md", dest: "dist/dev/public" }],
				flatten: false
			}),
			nodeResolve(),
			configEnv({ configPath: "data/config.json", envPath: ".env.json" }),
			alias({
				entries: [
					{ find:/^lib\/(.*)/, replacement: "./lib/$1" },
					{ find:/^assets\/(.*)/, replacement: "./assets/$1" },
					{ find:/^data\/(.*)/, replacement: "./data/$1" }
				]
			}),
			rootImport({
				root: `${__dirname}/src`,
				useInput: "prepend",
				extensions: ".js",
			}),
			globImport(),
			serve({
				contentBase: "dist/dev/public",
				port: 3000
			}),
			livereload('dist/dev/public')
		]
	}
]
