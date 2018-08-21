const { run } = require("./cli_runner");
const { username, password } = require("./data/credentials");

const TEST_CONFIG_RAW = {
  id: "tst",
  name: "my test",
  url: "http://bla",
  format: "CSV"
};

const TEST_CONFIG_FILE_JSON = "./test/data/test_config.json";
const TEST_CONFIG_FILE_YAML = "./test/data/test_config.yaml";

test("'config' requires user to be logged in", () => {
  run("logout");
  const result = run("config foo");
  expect(result.code).toBe(1);
  expect(result.stderr).toBe("user is not logged in\n");
});

describe("commands requiring log in", () => {
  beforeAll(() => {
    run(`login --username ${username} --password ${password}`);
  });

  afterAll(() => {
    run("logout");
  });

  test("add raw json configuration", () => {
    const result = run(`config --add '${JSON.stringify(TEST_CONFIG_RAW)}'`); //TODO: no need to stringify?
    expect(result.code).toBe(0);
    expect(result.stdout).toBe("ok\n");
  });

  test("add json configuration file", () => {
    const result = run(
      `config --add "${JSON.stringify(TEST_CONFIG_FILE_JSON)}"`
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toBe("ok\n");
    // TODO: retrieve configs and check it's been added
  });

  test("add yaml configuration file", () => {
    const result = run(
      `config --add "${JSON.stringify(TEST_CONFIG_FILE_YAML)}"`
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toBe("ok\n");
    // TODO: retrieve configs and check it's been added
  });

  test("add non-existing file shoud return an invalid JSON error", () => {
    const result = run(`config --add foo`);
    expect(result.code).toBe(1);
    expect(result.stderr).toEqual(expect.stringContaining("http_status=400"));
    expect(result.stderr).toEqual(
      expect.stringContaining("Error Parsing JSON")
    );
  });

  test("add a non-json, non-yaml file shoud an invalid JSON error", () => {
    const result = run(`config --add index.js`);
    expect(result.code).toBe(1);
    expect(result.stderr).toEqual(expect.stringContaining("http_status=400"));
    expect(result.stderr).toEqual(
      expect.stringContaining("Error Parsing JSON")
    );
  });

  test("get all configs", () => {
    run(`config --add '${JSON.stringify(TEST_CONFIG_RAW)}'`);
    run(`config --add "${JSON.stringify(TEST_CONFIG_FILE_JSON)}"`);

    const response = run("config");
    const result = JSON.parse(response.stdout);
    expect(response.code).toBe(0);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  test("delete config", () => {
    // adding an item
    run(`config --add '${JSON.stringify(TEST_CONFIG_RAW)}'`);

    // checking the item is among configs
    const configs = JSON.parse(run("config").stdout);
    expect(configs.some(x => x.id === TEST_CONFIG_RAW.id)).toBe(true);

    // deleting the item
    const delete_result = run(`config --delete ${TEST_CONFIG_RAW.id}`);
    expect(delete_result.code).toBe(0);
    expect(delete_result.stdout).toBe("ok\n");

    // checking the item is not among configs
    const updated_configs = JSON.parse(run("config").stdout);
    expect(updated_configs.some(x => x.id === TEST_CONFIG_RAW.id)).toBe(false);
  });
});
