#!/usr/bin/env node

const { program } = require("commander");
const color = require("colors-cli");
const { verifyCommand, checkNameExist, getComponents } = require("./utils");
const createBlockFile = require("./createBlockFile");

const exitCommander = () => {
  console.error(color.red("命令号输入有误, 命令号暂时仅仅支持： "));
  console.log(color.red("cblock add page <name>"));
  console.log(color.red("请重新输入～"));
  process.exit();
};

const exitNoExistName = () => {
  console.log(color.red("找不到该区块，请确认区块的名称！"));
  console.log(color.red("请重新输入～"));
  process.exit();
};

/**
 *  命令行解析
 */
const commanderAction = (command, type, name) => {
  if (verifyCommand(command, type) === "page") {
    if (checkNameExist(getComponents(), name)) {
      createBlockFile(type, name);
    } else {
      exitNoExistName();
    }
  } else {
    exitCommander();
  }
};

program
  .version("0.0.2", "-v --version -V")
  .arguments("<command> <type> <name>")
  .action(commanderAction)
  .parse(process.argv);
