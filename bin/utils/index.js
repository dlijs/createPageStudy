const fs = require("fs");
const { readdirSync } = require("fs-extra");
const { join } = require("path");

module.exports = {
  verifyCommand: (command, type) => {
    if (command === "add") {
      if (["page", "pages", "p"].indexOf(type) !== -1) {
        return "page";
      }
    }
    return "";
  },
  getComponents: (path = "../../src/components") => {
    return readdirSync(join(__dirname, path)).filter((pkg) => {
      return pkg.charAt(0) !== ".";
    });
  },
  checkNameExist: (list = [], name) => {
    if (list.indexOf(name) !== -1) {
      return true;
    }
    return false;
  },
  checkBlockExist: (name) => {
    let dirName = process.cwd();
    const filePath = join(dirName, "src/pages", "blockTemplate");
    if (fs.existsSync(filePath)) {
      if (fs.existsSync(join(filePath, name))) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  },
};
