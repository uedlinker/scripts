const babel = require('@babel/core')
const preset = require('../index')

describe('@uedlinker/babel-preset-uedlinker', () => {

  // In test environment, should not transform `import '@babel/polyfill'`.
  test('polyfills', () => {
    ;['development', 'production', 'test'].forEach(env => {
      process.env.BABEL_ENV = env
      let code = babel.transformSync(`
        import '@babel/polyfill'
      `, {
        babelrc: false,
        presets: [preset],
      }).code
      expect(code).toMatchSnapshot()
    })
  })

  test('stages', () => {
    process.env.BABEL_ENV = 'development'
    const codes = [
      // Stage 0
      [
        `obj::func`,
      ],
      // Stage 1
      [
        `export v from 'mod';`,
        `a ||= b;`,
        `const baz = obj?.foo?.bar?.baz();`,
        `var foo = object.foo ?? "default";`,
        `
          let a = do {
            if(x > 10) {
              'big';
            } else {
              'small';
            }
          };
        `,
      ],
      // Stage 2
      [
        `
          @annotation
          class MyClass { }
        `,
        `
          function* generator() {
            console.log("Sent", function.sent);
            console.log("Yield", yield);
          }
        `,
        `export * as ns from 'mod';`,
        `let budget = 1_000_000_000_000;`,
        `
          function test(param = throw new Error('required!')) {
            const test = param === true || throw new Error('Falsey!');
          }
        `,
      ],
      // Stage 3
      [
        `import('./test.js')`,
        `
          class Bork {
            instanceProperty = "bork";
            boundFunction = () => {
              return this.instanceProperty;
            };
            static staticProperty = "babelIsCool";
            static staticFunction = function() {
              return Bork.staticProperty;
            };
          }
        `,
      ],
      // `stage` = 4 or 'none' (ES2018)
      [
        `
          async function* agf() {
            await 1;
            yield 2;
          }
        `,
        `/./s`,
        `let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`,
        `
          try {
            throw 0;
          } catch {
            doSomethingWhichDoesntCareAboutTheValueThrown();
          }
        `,
      ],
    ]

    ;[0, 1, 2, 3, 4, 'none'].forEach(stage => {
      if (stage === 'none') stage = 4

      const options = {
        babelrc: false,
        presets: [[preset, { stage }]],
      }

      codes.forEach((stageCodes, target) => {
        stageCodes.forEach(code => {
          if (stage <= target) {
            let outputCode = babel.transformSync(code, options).code
            expect(outputCode).toMatchSnapshot()
          } else {
            expect(() => {
              babel.transformSync(code, options)
            }).toThrowError()
          }
        })
      })
    })
  })

  test('support React', () => {
    process.env.BABEL_ENV = 'development'
    let code = babel.transformSync(`
        import React, { Component } from 'react'
        class HelloWorld extends Component {
          render () {
            return <h1>Hello World</h1>
          }
        }
      `, {
      babelrc: false,
      presets: [preset],
    }).code
    expect(code).toMatchSnapshot()
  })

  test('enable Flow.js syntax', () => {
    process.env.BABEL_ENV = 'development'
    let code = babel.transformSync(`
        function foo(one: any, two: number, three?): string {}
      `, {
      babelrc: false,
      presets: [[preset, { enableFlow: true }]],
    }).code
    expect(code).toMatchSnapshot()
  })

  test('enable Typescript syntax', () => {
    process.env.BABEL_ENV = 'development'
    let code = babel.transformSync(`
        const x: number = 0;
      `, {
      babelrc: false,
      presets: [[preset, { enableTypescript: true }]],
    }).code
    expect(code).toMatchSnapshot()
  })

  test('transform generator functions to regenerator', () => {
    process.env.BABEL_ENV = 'development'
    let code = babel.transformSync(`
        function* foo() {}
      `, {
      babelrc: false,
      presets: [preset],
    }).code
    expect(code).toMatchSnapshot()
  })

  test('remove React propTypes in production env', () => {
    process.env.BABEL_ENV = 'production'
    let code = babel.transformSync(`
        import PropTypes from 'prop-types'
      `, {
      babelrc: false,
      presets: [preset],
    }).code
    expect(code).not.toMatch(`import PropTypes from 'prop-types';`)
  })
})
