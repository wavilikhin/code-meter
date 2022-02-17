import { readdir, loadScenario } from './utils';
const SCENARIOS_PATH = './src/scenarios';
const scenarios = await readdir(SCENARIOS_PATH);
console.log('1');
for await (const scenario of scenarios) {
    const scenarioName = scenario.split('.')[0];
    console.log('2');
    const [main, inputParams] = await loadScenario(scenarioName);
    console.log(inputParams);
}
console.log('3');
//# sourceMappingURL=index.js.map