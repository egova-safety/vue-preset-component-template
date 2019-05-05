const tools = require("./template.tools");

const pkg = require("../package.json");
delete pkg.dependencies["prettier"];
delete pkg.scripts["template:clear"];
delete pkg.scripts["template:build"];
delete pkg.scripts["template:publish"];
delete pkg.scripts["template"];

const generatorTemplateFun = require("./template.generator");
const rootTemplateFun = require("./template.root");

const emptyPluginDir = () => {
    try {
        console.info("清空 .template 目录 开始")
        tools.rimraf('./.template' );
        console.info("清空 .template 目录 结束", )
    } catch (err) {
        console.error(err)
    }
}

emptyPluginDir();
rootTemplateFun(pkg);
generatorTemplateFun(pkg);
