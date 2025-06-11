import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('lesson', {
    description: 'Scaffold a new demo lesson',
    prompts: [
      {
        type: 'input',
        name: 'slug',
        message: 'Lesson slug (kebab-case):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/demos/{{kebabCase slug}}/index.mdx',
        templateFile: 'turbo/generators/templates/index.mdx.hbs',
      },
      {
        type: 'add',
        path: 'packages/demos/src/{{kebabCase slug}}/index.tsx',
        templateFile: 'turbo/generators/templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/demos/src/{{kebabCase slug}}.test.tsx',
        templateFile: 'turbo/generators/templates/test.tsx.hbs',
      },
      {
        type: 'append',
        path: 'packages/demos/src/index.ts',
        template:
          "export { default as {{pascalCase slug}} } from './{{kebabCase slug}}';",
      },
      {
        type: 'append',
        path: 'packages/demos/package.json',
        pattern: /"exports": {(?<insertion>)/g,
        template:
          '    "./{{kebabCase slug}}": { "import": "./dist/{{kebabCase slug}}/index.js", "types": "./dist/{{kebabCase slug}}/index.d.ts" },',
      },
    ],
  });
}
