const SCENARIOS_PATH = '../src/scenarios';

interface InputParams {
  required: string[];
  optional?: string[];
}

export type Output = [
  main: (params: Record<string, unknown>) => Promise<void>,
  inputParams: InputParams
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
