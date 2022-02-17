const SCENARIOS_PATH = '../src/scenarios';

type Output = [
  main: () => Promise<void>,
  inputParams: {
    required: string[];
    optional?: string[];
  }
];

export const loadScenario = async (scenarioName: string) => {
  const { main, inputParams } = await import(
    `${SCENARIOS_PATH}/${scenarioName}`
  );

  if (!main) {
    return Promise.reject(
      `No main function exported from ${scenarioName} scenario`
    );
  }

  return Promise.resolve([main, inputParams] as Output);
};
