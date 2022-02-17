import { Output } from './loadScenario';
import { PromptObject } from 'prompts';

export const generateQuestions = (scenario: string, data: Output['1']) => {
  const questions: PromptObject[] = [];

  for (const required of data.required) {
    questions.push({
      type: 'list',
      name: required,
      message: `Provide ${required} for ${scenario} scenario`,
      validate: (val) => (!val ? `${required} is required` : true),
    });
  }

  for (const opt of data.optional) {
    questions.push({
      type: opt === 'reportName' ? 'text' : 'list',
      name: opt,
      message: `Provide ${opt} for ${scenario} scenario (this is optional)`,
    });
  }

  return questions;
};
