import { readdir, loadScenario } from './utils';
const SCENARIOS_PATH = './src/scenarios';

const scenarios = await readdir(SCENARIOS_PATH);

for (const scenario of scenarios) {
  const scenarioName = scenario.split('.')[0];

  const [main, inputParams] = await loadScenario(scenarioName);

  console.log(inputParams);
}
