import { readdir, loadScenario, generateQuestions } from './utils';
const SCENARIOS_PATH = './src/scenarios';
import prompt from 'prompts';
const scenarios = await readdir(SCENARIOS_PATH);
const { selectedScenarios } = await prompt({
    type: 'multiselect',
    message: 'Select any scenario',
    instructions: false,
    hint: 'Space - to toggle, Enter - to confirm',
    name: 'selectedScenarios',
    choices: scenarios.map((s) => ({
        title: s,
        value: s,
    })),
});
const scenariosRunData = [];
const commons = ['searchPaths'];
const commonDataQuestions = commons.map((c) => ({
    type: 'list',
    name: c,
    message: `Provide ${c} to run any scenario`,
    validate: (v) => (!v ? `${c} is required` : true),
}));
const commonData = await prompt(commonDataQuestions);
for await (const scenario of selectedScenarios) {
    const scenarioName = scenario.split('.')[0];
    const [main, inputParams] = await loadScenario(scenarioName);
    const questions = generateQuestions(scenarioName, inputParams);
    const filtredQuestions = questions.filter((q) => !commons.some((d) => d === q.name));
    const response = await prompt(filtredQuestions);
    scenariosRunData.push({
        scenarioName,
        inputData: { ...response, ...commonData },
        main,
    });
}
let promises = [];
for (const scenario of scenariosRunData) {
    promises.push(scenario.main(scenario.inputData));
}
const res = await Promise.allSettled(promises);
console.log(res);
//# sourceMappingURL=index.js.map