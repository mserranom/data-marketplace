const { run } = require("./cli_runner");
const { username, password } = require("./data/credentials");

const TEST_FEED_1 = "./test/data/test_config.json";
const TEST_FEED_1_KEY = `${username}/datafile`;
const TEST_FEED_1_NAME = "my data file";

const TEST_FEED_2 = "./test/data/test_config.yaml";
const TEST_FEED_2_KEY = `${username}/yaml_config`;
const TEST_FEED_2_NAME = "my yaml config";

test("'subscriptions' requires user to be logged in", () => {
  run("logout");
  const result = run("subscriptions");
  expect(result.code).toBe(1);
  expect(result.stderr).toBe("user is not logged in\n");
});

describe("commands requiring log in", () => {
  beforeAll(() => {
    run(`login --username ${username} --password ${password}`);

    // making sure the configs are present
    run(`config --add "${TEST_FEED_1}"`);
    run(`config --add "${TEST_FEED_2}"`);

    // we delete the subscriptions for a clean test
    run(`subscriptions --delete "${TEST_FEED_1_KEY}"`);
    run(`subscriptions --delete "${TEST_FEED_2_KEY}"`);
  });

  afterAll(() => {
    run("logout");
  });

  test("add subscriptions", () => {
    run(`subscriptions --add "${TEST_FEED_1_KEY}"`);
    run(`subscriptions --add "${TEST_FEED_2_KEY}"`);
    const result = JSON.parse(run("subscriptions").stdout);

    expect(result).toEqual(expect.arrayContaining([TEST_FEED_1_NAME]));
    expect(result).toEqual(expect.arrayContaining([TEST_FEED_2_NAME]));
  });

  test("delete subscriptions", () => {
    // add subscription and check was added
    run(`subscriptions --add "${TEST_FEED_1_KEY}"`);
    const result = JSON.parse(run("subscriptions").stdout);
    expect(result).toEqual(expect.arrayContaining([TEST_FEED_1_NAME]));

    // delete and check it was successfully deleted
    run(`subscriptions --delete "${TEST_FEED_1_KEY}"`);
    const result2 = JSON.parse(run("subscriptions").stdout);
    expect(result2).not.toEqual(expect.arrayContaining([TEST_FEED_1_NAME]));
  });
});
