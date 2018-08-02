const { run } = require("./cli_runner");
const { username, password } = require("./data/credentials");

test("requires user to be logged in", () => {
  run("logout");
  const result = run("info");
  expect(result.code).toBe(1);
  expect(result.stderr).toBe("user is not logged in\n");
});

test("should return user information", () => {
  run(`login --username ${username} --password ${password}`);
  const result = run("info");
  expect(result.code).toBe(0);
  expect(result.stdout).toMatchSnapshot();
});
