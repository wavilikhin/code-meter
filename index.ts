import { readdir, loadScenario } from './utils';
const SCENARIOS_PATH = './src/scenarios';
import * as prompts from 'prompts';

const scenarios = await readdir(SCENARIOS_PATH);

const questions: { scenario: string; questions: prompts.PromptObject[] }[] = [
  //   {
  //     type: 'text',
  //     name: 'about',
  //     message: 'Tell something about yourself',
  //     initial: 'Why should I?',
  //   },
];

for await (const scenario of scenarios) {
  const scenarioName = scenario.split('.')[0];

  const [main, inputParams] = await loadScenario(scenarioName);

  // Создать функцию которпая по объекту будет создавать массив вопросов формата prompts.PromptObject[]
  const questions;

  questions.push({
    scenario: scenarioName,
    questions: [],
  });

  console.log(inputParams);
}
