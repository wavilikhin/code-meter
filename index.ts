import { readdir, loadScenario } from './utils';
const SCENARIOS_PATH = './src/scenarios';
import * as prompts from 'prompts';

const scenarios = await readdir(SCENARIOS_PATH);

for await (const scenario of scenarios) {
  const scenarioName = scenario.split('.')[0];

  const [main, inputParams] = await loadScenario(scenarioName);

  console.log(inputParams);
}
