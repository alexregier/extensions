import * as exportedFunctions from "../src";
import functionsConfig from "../src/config";
import { obfuscatedConfig } from "../src/logs";

const { logger } = require("firebase-functions");

const consoleLogSpy = jest.spyOn(logger, "log").mockImplementation();

describe("extension", () => {
  beforeEach(() => {});

  test("functions configuration detected from environment variables", async () => {
    expect(functionsConfig).toMatchSnapshot();
  });

  test("functions configuration is logged on initialize", async () => {
    expect(consoleLogSpy).toBeCalledWith(
      "Initializing extension with configuration",
      obfuscatedConfig
    );
  });

  test("functions are exported", async () => {
    expect(exportedFunctions.addUserToList).toBeInstanceOf(Function);
    expect(exportedFunctions.removeUserFromList).toBeInstanceOf(Function);
  });
});
