import { fileURLToPath } from 'url'
import path from "path"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import rootImport from "rollup-plugin-root-import"
import alias from "@rollup/plugin-alias"
import { babel } from '@rollup/plugin-babel'
import globImport from 'rollup-plugin-glob-import'
import configEnv from "@thoughtsunificator/rollup-plugin-config-env"
import { createConfig } from "@thoughtsunificator/config-env"

const config = createConfig(".env.prod.json", "data/config.json")
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
	{
		input: "./src/search/main.js",
		output: {
				file: "./dist/prod/public/bundle.js",
				format: "iife",
		},
		plugins: [
			del({ targets: "dist/prod" }),
			postcss({
				extract: true,
				minimize: true,
				extract: path.resolve("dist/prod/public/bundle.css"),
				plugins: [postcssImport()]
			}),
			copy({
				targets: [
				{ src: "public", dest: "dist/prod" },
				{
					src: "public/manifest.json",
					dest: "dist/prod/public",
					transform: function(content) {
						const data = JSON.parse(content.toString())
						data.permissions.push(`${config.API_URL}/*`)
						return JSON.stringify(data)
					}
				},
				{ src: "LICENSE", dest: "dist/prod/public" },
				{ src: "README.md", dest: "dist/prod/public" }],
				flatten: false
			}),
			nodeResolve(),
			configEnv({ configPath: "data/config.json", envPath: ".env.prod.json" }),
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
			terser(),
			babel({ babelHelpers: 'bundled' }),
		]
	},
	{
		input: "./src/background/main.js",
		output: {
			file: "./dist/prod/public/background.js",
			format: "iife"
		},
		plugins: [
			nodeResolve(),
			configEnv({ configPath: "data/config.json", envPath: ".env.prod.json" }),
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
			terser(),
			babel({ babelHelpers: 'bundled' }),
			obfuscator()
		]
	},
	{
		input: "./src/content-script/1688/main.js",
		output: {
			file: "./dist/prod/public/1688.js",
			format: "iife"
		},
		plugins: [
			postcss({
				extract: true,
				minimize: true,
				extract: path.resolve("dist/prod/public/1688.css"),
				plugins: [postcssImport()]
			}),
			nodeResolve(),
			configEnv({ configPath: "data/config.json", envPath: ".env.prod.json" }),
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
			terser(),
			babel({ babelHelpers: 'bundled' }),
			obfuscator()
		]
	},
	{
		input: "./src/content-script/taobao/main.js",
		output: {
			file: "./dist/prod/public/taobao.js",
			format: "iife"
		},
		plugins: [
			postcss({
				extract: true,
				minimize: true,
				extract: path.resolve("dist/prod/public/taobao.css"),
				plugins: [postcssImport()]
			}),
			nodeResolve(),
			configEnv({ configPath: "data/config.json", envPath: ".env.prod.json" }),
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
			terser(),
			babel({ babelHelpers: 'bundled' }),
			obfuscator()
		]
	},
]
