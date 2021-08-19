const color = require("colors-cli");
const { copy } = require("fs-extra");
const { join } = require("path");
const { checkBlockExist, getComponents } = require("./utils");

module.exports = function createBlockFile(type, name) {
  const flag = checkBlockExist(name);

  const copyFolder = (path) => {
    let dName = process.cwd();
    const currentPath = `../../src/components/${path}`;
    const fileList = getComponents(currentPath);
    fileList.forEach((item) => {
      if (item.indexOf(".md") !== -1) return;
      if (item.indexOf(".") !== -1) {
        const targetPath = join(__dirname, `../src/components/${path}`, item);
        const createPath = join(
          dName,
          "src/pages",
          "blockTemplate",
          path,
          item
        );
        console.log(color.green("write:"), createPath);
        copy(targetPath, createPath);
      } else {
        copyFolder(`${path}/${item}`);
      }
    });
  };

  if (flag) {
    copyFolder(name);
    console.log("\n", color.green("区块创建成功！！"), "\n");
  } else {
    console.log(
      color.blue("/src/blockTemplate "),
      color.red(`路径下已经包含${name}文件夹，请重新定义页面名称!`)
    );
  }
};
