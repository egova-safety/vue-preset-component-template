module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {},
    devDependencies: {
      "@types/js-cookie": "^2.2.1",
      "@types/lodash.debounce": "^4.0.5",
      "@types/node": "^11.9.4",
      "@vue/cli-plugin-babel": "^3.4.0",
      "@vue/cli-plugin-typescript": "^3.4.0",
      "@vue/cli-service": "^3.4.0",
      "add-asset-html-webpack-plugin": "^3.1.3",
      "compression-webpack-plugin": "^2.0.0",
      "friendly-errors-webpack-plugin": "^1.7.0",
      less: "^3.9.0",
      "less-loader": "^4.1.0",
      "lodash.debounce": "^4.0.8",
      "raw-loader": "^1.0.0",
      sass: "^1.17.0",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.23.1",
      "ts-loader": "^5.3.3",
      tslint: "^5.13.1",
      "tslint-config-flagwind": "^1.0.1",
      "tslint-loader": "^3.5.4",
      typedoc: "^0.14.2",
      typescript: "^3.3.3",
      "webpack-cli": "^3.2.3",
      vue: "^2.6.10",
      "vue-class-component": "^7.0.2",
      "vue-property-decorator": "^8.1.0",
      "vue-template-compiler": "^2.5.21"
    },
    scripts: {
      "dist:build":
        "vue-cli-service build --target lib --name index src/index.ts",
      "dist:types": "tsc -d --emitDeclarationOnly --declarationDir dist/types",
      dist: "npm run dist:build && npm run dist:types",
      "template:deploy":
        "cd .template && git init && git add -A && git commit -m 'deploy' && git push -f https://github.com/egova-safety/vue-preset-component-template.git master:master",
      lint: "vue-cli-service lint"
    }
  })

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith("src/") || path.startsWith("public/"))
      .forEach(path => delete files[path])
  })

  api.render("./template")

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
