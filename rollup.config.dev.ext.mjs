import { fileURLToPath } from 'url'
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
import config from "@thoughtsunificator/config-env"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
	{
		input: "./src/search/main.js",
		output: {
			sourcemap: true,
			file: "./dist/dev-ext/public/bundle.js",
			format: "iife"
		},
		plugins: [
			postcss({
				sourcemap: true,
				extract: path.resolve("dist/dev-ext/public/bundle.css"),
				plugins: [postcssImport()]
			}),
			copy({
				watch: 'public',
				targets: [
				{ src: "public", dest: "dist/dev-ext" },
				{
					src: "public/manifest.json",
					dest: "dist/dev-ext/public",
					transform: function(content) {
						const data = JSON.parse(content.toString())
						data.permissions.push(`${config.API_URL}/*`)
						return JSON.stringify(data)
					}
				},
				{ src: "LICENSE", dest: "dist/dev-ext/public" },
				{ src: "README.md", dest: "dist/dev-ext/public" }],
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
			globImport()
		]
	},
	{
		input: "./src/background/main.js",
		output: {
			file: "./dist/dev-ext/public/background.js",
			format: "iife"
		},
		plugins: [
			nodeResolve(),
			configEnv({ confPath: "data/config.json", envPath: ".env.json" }),
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
		]
	},
	{
		input: "./src/content-script/1688/main.js",
		output: {
			file: "./dist/dev-ext/public/1688.js",
			format: "iife"
		},
		plugins: [
			postcss({
				extract: path.resolve("dist/dev-ext/public/1688.css"),
				plugins: [postcssImport()]
			}),
			nodeResolve(),
			configEnv({ confPath: "data/config.json", envPath: ".env.json" }),
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
		]
	},
	{
		input: "./src/content-script/taobao/main.js",
		output: {
			file: "./dist/dev-ext/public/taobao.js",
			format: "iife"
		},
		plugins: [
			postcss({
				extract: path.resolve("dist/dev-ext/public/taobao.css"),
				plugins: [postcssImport()]
			}),
			nodeResolve(),
			configEnv({ confPath: "data/config.json", envPath: ".env.json" }),
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
		]
	},
]
