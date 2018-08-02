"use strict";
const meow = require("meow");
const cmd_login = require("./src/cmd_login");
const cmd_logout = require("./src/cmd_logout");
const cmd_info = require("./src/cmd_info");
const cmd_config = require("./src/cmd_config");

global.fetch = require("node-fetch-polyfill"); // polyfill for https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js

const cli = meow(
  `
	Usage
	  $ dmk login        starts the login process 
	  $ dmk logout       logs out 
	  $ dmk config       manage configurations
	  $ dmk info         prints information about the user logged in

	Options
	  --username, -u     username passed to login command
	  --password, -p     username passed to login command
	  --add, -a          the configuration to add
	  --delete, -d       the user id of the configuration to delete
	  --tag, -t          retrieves configs only of an specific tag

	Examples
	  $ dmk login --username conan --password sF£_5F$mY
	  $ dmk config --add config.json
`,
  {
    flags: {
      username: {
        type: "string",
        alias: "u"
      },
      password: {
        type: "string",
        alias: "p"
      },
      add: {
        type: "string",
        alias: "a"
      },
      delete: {
        type: "string",
        alias: "d"
      },
      tag: {
        type: "string",
        alias: "t"
      }
    }
  }
);

async function run() {
  let exitCode = 0;

  switch (cli.input[0]) {
    case "login":
      exitCode = await cmd_login(cli.flags.username, cli.flags.password);
      break;
    case "logout":
      cmd_logout(cli.flags.username, cli.flags.password);
      break;
    case "info":
      exitCode = await cmd_info();
      break;
    case "config":
      if (cli.flags.add) {
        exitCode = await cmd_config.add(cli.flags.add);
      } else if (cli.flags.delete) {
        exitCode = await cmd_config.delete(cli.flags.delete);
      } else {
        exitCode = await cmd_config.getAll(cli.flags.tag);
      }
      break;
    default:
      console.log(cli.showHelp());
      break;
  }
  process.exit(exitCode);
}

run();
