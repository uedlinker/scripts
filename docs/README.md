## 快速开始

`@uedlinker/scripts` 可以作为全局依赖，也可作为本地依赖。如果你只是想试用此工具，建议安装为全局依赖，相反地，如果是正式开发，建议安装为本地依赖。

### 试用

```powershell
npm i -g @uedlinker/scripts
```

仅此而已。`@uedlinker/scripts` 会自动安装开发构建和测试所需要的大多数依赖，包括但不限于 `react`、`react-dom`、`babel`、`webpack`、`jest`、`enzyme`，所以你并不需要安装这些为本地依赖或全局依赖。

此工具默认以工作目录下的 `src/index.jsx` 文件作为入口文件（文件后缀名也可以是 `.js`）。所以你需要新建此文件：

```jsx
// src/index.jsx
import React from 'react'
import { render } from 'react-dom'

const HelloWorld = () => (
  <h1>Hello World!</h1>
)

// `@uedlinker/scripts` 提供的挂载点固定为 `root`
render(<HelloWorld />, document.getElementById('root'))
```

注意：你并不需要安装 `react` 和 `react-dom`，如果你非要在本地安装依赖，`@uedlinker/scripts` 会优先使用你安装的本地依赖。

最后，执行命令：

```powershell
uedlinker-scripts dev
```

如果运行顺利，会自动启动浏览器打开你的页面。更多命令请查看[命令](#命令)章节。

### 正式开发

在正式开发时，建议将 `@uedlinker/scripts` 作为你的本地依赖。开始之前，你需要像[试用](#试用)章节一样建立入口文件 `src/index.jsx`。

在工作目录下建立 `package.json` 文件，你可以手动建立，这里使用 npm 的 `init` 命令：

```powershell
npm init --yes
```

安装 `@uedlinker/scripts` 作为开发依赖：

```powershell
npm i -D @uedlinker/scripts
```

在 `package.json` 文件中配置 `scripts`：

```json
{
  "scripts": {
    "dev": "uedlinker-scripts dev",
    "build": "uedlinker-scripts build",
    "test": "uedlinker-scripts test"
  }
}
```

执行上面配置的脚本命令：

```powershell
# 开发
npm run dev

# 打包
npm run build

# 测试
npm run test
```

## 功能介绍

此脚本使用 [Webpack](https://webpack.js.org/) 作为构建工具，使用 [Babel](https://babeljs.io/) 作为编译工具，使用 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 作为开发服务器，使用 [Jest](https://jestjs.io/) 作为测试工具。

### Babel 相关

- 默认支持到 Stage 3 的 ES 语法，可通过 `stage` 选项配置。
- 默认支持 JSX 语法。
- 可通过开启 `enableFlow` 支持 Flow 语法。
- 可通过开启 `enableTypescript` 支持 TypeScript 语法。
- 能够识别工作目录(CWD)的的 Browserslist 配置来自动按需导入 `@babel/polyfill`。
- 生产环境下自动移除 React 的 PropTypes。

### Webpack 相关

- 默认添加 [whatwg-fetch](https://github.com/github/fetch) 作为 Fetch Polyfill。
- 能够识别工作目录(CWD)的的 Browserslist 配置自动添加 CSS 前缀。
- 自动生成 HTML 模板。
- 自动检测并定义环境变量中以 `UEDLINKER_` 为前缀的变量。
- 默认支持热更新。
- 默认支持动态加载和代码分离。
- 默认支持在生产环境下压缩和混淆代码。
- 默认支持解析 `.sass` 和 `.scss` 文件。
- 默认支持解析图片文件：`.bmp`、`.webp`、`.png`、`.jpg`、`.jpeg`、`.gif`、`.svg`。
- 默认支持解析字体文件：`.eot`、`.ttf`、`.woff`、`.woff2`。
- 默认支持解析视音频文件：`.mp4`、`.webm`、`.ogg`、`.mp3`、`.wav`、`.flac`、`.aac`。
- 可通过开启 `enableTypescript` 支持 `.ts` 和 `.tsx` 文件的解析。
- 可通过开启 `enableLess` 支持 `.less` 文件的解析。
- 可通过开启 `enableStylus` 支持 `.styl` 和 `.stylus` 文件的解析。
- 可通过开启 `enableProductionAnalysis` 支持打包分析。
- 可通过开启 `enableProductionSourceMap` 支持生产环境下的 SourceMap。
- 可通过开启 `enableProductionPWA` 支持离线缓存。

### Jest 相关

- 默认添加 [whatwg-fetch](https://github.com/github/fetch) 作为 Fetch Polyfill。
- 默认添加 [raf](https://www.npmjs.com/package/raf) 作为 `window.requestAnimationFrame` 的 Polyfill。
- 默认配置 [Enzyme](https://github.com/airbnb/enzyme) 的 Adapter，适配 React v16.0.0 以上的版本。
- 默认支持解析除了 JS 代码的其他文件。
- 可通过开启 `enableTypescript` 支持 `.ts` 和 `.tsx` 文件的解析。

## 使用

### 目录结构

你必须遵守以下目录约定才能实现此脚本的功能。

```
your-project-root
├── dist                  // Webpack 构建目标目录，`build` 时自动生成，可通过 `outputPath` 配置
├── src
│   └── index.js         // 入口文件，必须，可通过 `entryPath` 配置
├── static                // 静态文件目录，可选，可通过 `staticPath` 配置
├── babel.config.js       // 自定义 Babel 配置，可选
├── package.json
├── jest.config.js        // 自定义 Jest 配置，可选
├── uedlinker.config.js   // Uedlinker 配置文件，可选
└── webpack.config.js     // 自定义 Webpack 配置，可选
```

应该把所有的源文件（需要通过 Webpack 和 Babel 处理的文件）放在 src 目录中，把静态文件（需要被直接复制到目标目录 dist 的文件）放到 static 目录中。

### 开启 HMR

虽然脚本默认支持 HMR，但也需要编写一些额外的代码。在入口文件中，你需要编写类似下面的代码：

```jsx
// src/index.jsx
import React from 'react'
import { render } from 'react-dom'

// 你需要新建一个 `src/App.jsx` 文件，并导出一个可用的 React 组件
import App from './App'

const renderApp = Component => {
  render(
    <Component />,
    document.getElementById('root')
  )
}

renderApp(App)

// 开启 HMR
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept(['./App'], () => {
    const App = require('./App').default
    renderApp(App)
  })
}
```

### 开启离线缓存

除了设置 Uedlinker 选项 `enableProductionPWA` 为 `true` 外，你还需要在入口文件中编写下面的代码：

```jsx
// src/index.jsx
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
```

### 导入文件的额外选项

在导入图片、字体和视音频时，在文件大小不超过 4kb 时，使用 url-loader 内联到 JS 代码中，超过 4kb 时，使用 file-loader 复制此文件到输出目标目录（默认是 `dist` 目录）中。但你也可以通过导入选项强制导入方式：

```js
// 强制使用 url-loader 内联到 JS 代码中，注意后面的 `?inline` 选项
import myImg1 from './assets/images/example1.png?inline'

// 强制使用 file-loader 复制文件到 `dist` 目录中，注意后面的 `?external` 选项
import myImg2 from './assets/images/example2.png?external'
```

## 命令

- `uedlinker-scripts dev`

  使用 webpack-dev-server 启动开发环境。支持 webpack-dev-server 自身的命令行选项。

- `uedlinker-scripts build`

  使用 Webpack 构建生产环境代码。支持 [Webpack 自身的命令行选项](https://webpack.js.org/api/cli/)。

- `uedlinker-scripts test`

  使用 Jest 进行测试。支持 [Jest 自身的命令行选项](https://jestjs.io/docs/en/cli)。例如在测试时生成覆盖报告，可以使用下面的命令：

  ```
  uedlinker-scripts test --coverage
  ```

## 配置

`@uedlinker/scripts` 的配置方式有两种。第一种方式通过工作目录下的 `uedlinker.config.js` 文件配置，它可能会同时影响 `babel`、`webpack`、`jest` 的配置，称之为 Uedlinker 配置。第二种方式通过工作目录下的 `babel.config.js`、`webpack.config.js` 和 `jest.config.js` 文件来配置，它们分别影响 `babel`、`webpack` 和 `jest` 的配置，称之为自定义配置。`@uedlinker/scripts` 先使用 Uedlinker 配置生成这三种工具的配置，再使用自定义配置生成最终配置。**自定义配置的优先级高于 Uedlinker 配置。**具体流程如下：

```
                                                       babel.config.js
                      +---> Temporary Babel Config   +-------------------> Final Babel Config
                      |
  uedlinker.config.js |                                webpack.config.js
+---------------------+---> Temporary Webpack Config +-------------------> Final Webpack Config
                      |
                      |                                jest.config.js
                      +---> Temporary Jest config    +-------------------> Final Jest Config
```

### 使用配置

无论是全局依赖还是本地依赖，`@uedlinker/scripts` 都能找到你的配置文件。

在你的工作目录下新建 `uedlinker.config.js` 文件，导出一个纯对象或一个函数。导出对象时，`@uedlinker/scripts` 会把你导出的配置与默认配置合并；导出函数时，则会将默认配置作为第一个参数注入到你的函数中，你的函数需要返回一个配置对象。我们以开启 Flow 语法（默认未启用）为例来说明。

导出对象的方式：

```js
// uedlinker.config.js
module.exports = {
  enableFlow: true
}
```

导出函数的方式：

```js
// uedlinker.config.js
module.exports = defaults => {
  defaults.enableFlow = true
  return defaults
}
```

更多配置项请查看下面的[Uedlinker 配置项](#uedlinker-配置项)章节。`@uedlinker/scripts` 的配置项可能会同时影响 `babel`、`webpack` 和 `jest` 的配置，在绝大多数情况下是满足需求的。同时此工具也给了用户完全控制 `babel`、`webpack` 和 `jest` 配置的机会，详情请查看[自定义配置](#自定义配置)章节。

### Uedlinker 配置项

Uedlinker 配置项只是结合了 `babel`、`webpack` 和 `jest` 三种工具的配置项，提供一种便利。具体的使用方法请查看[使用配置](#使用配置)章节。

#### 语法相关

- `stage`

  **可选值：**null、"none"、0、1、2、3、4

  **默认值：**3

  使用哪个阶段的 ES 实验性语法。值为 null 或 "none" 时，代表关闭实验性语法；值为 4 时，暂时不支持任何实验性语法，因为规范已经把最后一个阶段的语法作为了标准语法。这个值预留到后面使用。

- `enableFlow`

  **类型：**Boolean

  **默认值：**false

  是否支持 Flow 语法。

- `enableTypescript`

  **类型：**Boolean

  **默认值：**false

  是否支持 TypeScript 语法。

#### 文件解析相关

- `enableSass`

  **类型：**Boolean

  **默认值：**true

  是否支持 `.scss` 和 `.sass` 文件的解析。

- `enableLess`

  **类型：**Boolean

  **默认值：**false

  是否支持 `.less` 文件的解析。

- `enableStylus`

  **类型：**Boolean

  **默认值：**false

  是否支持 `.styl` 和 `.stylus` 文件的解析。

- `enableImages`

  **类型：**Boolean

  **默认值：**true

  是否支持解析图片文件：`.bmp`、`.webp`、`.png`、`.jpg`、`.jpeg`、`.gif`、`.svg`。

- `enableFonts`

  **类型：**Boolean

  **默认值：**true

  是否支持解析字体文件：`.eot`、`.ttf`、`.woff`、`.woff2`。

- `enableMedia`

  **类型：**Boolean

  **默认值：**true

  是否支持解析视音频文件：`.mp4`、`.webm`、`.ogg`、`.mp3`、`.wav`、`.flac`、`.aac`。

#### 路径相关

- `rootPath`

  **类型：**绝对路径字符串

  **默认值：**当前工作目录 `process.cwd()`

  项目根目录。

- `srcPath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**"src"

  源代码置放目录。你所有需要通过 Webpack 或 Babel 打包或编译的文件都应该置放在这个文件夹下。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件夹。

- `entryPath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**"src/index"

  项目入口文件。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件。

- `outputPath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**"dist"

  打包文件输出目录。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件夹。

- `staticPath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**"static"

  静态文件置放目录。在这个目录下的文件在生产环境构建时会全部复制到 `outputPath` 中。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件夹。

- `templatePath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**无

  自定义模板文件。在没有值的情况下，会使用 `@uedlinker/scripts` 的默认 HTML 模板文件；在有值的情况下，会代替默认的模板文件。在生产环境打包构建时，会在 `outputPath` 目录中自动生成一个 `index.html` 文件。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件。

- `polyfillsPath`

  **类型：**绝对路径或相对路径字符串

  **默认值：**无

  自定义 Polyfills 文件。默认情况下，`@uedlinker/scripts` 会根据根目录下的 Browserslist 配置按需加载 `@babel/polyfill`，且会引入 `whatwg-fetch` 作为 `fetch` 的 polyfill。如果配置了这个选项，会在引入 `whatwg-fetch` 之前引入自定义 Polyfills。如果值为相对路径，则相对于 `rootPath` 目录。它应该是 `rootPath` 的一个子文件。

#### Polyfill 相关

- `enableBabelPolyfill`

  **类型：**Boolean

  **默认值：**true

  是否根据工作目录下的 Browserslist 配置按需加载 `@babel/polyfill`。

- `enableFetchPolyfill`

  **类型：**Boolean

  **默认值：**true

  是否引入 `whatwg-fetch` 作为 `fetch` 的 Polyfill。

#### 针对开发环境的配置

- `enableDevelopmentHMR`

  **类型：**Boolean

  **默认值：**true

  是否在开发环境下启用热更新（HMR）。详情请查看[开启 HMR](#开启-hmr) 章节。

#### 针对生产环境的配置

- `productionPublicPath`

  **类型：**路径

  **默认值：**"/"

  生产环境下的公共资源路径。例如，你如果想要把你的代码部署到 CDN 上，可以设置其值为 "//cdn.your-domain.com/"。[查看详情](https://webpack.js.org/configuration/output/#output-publicpath)。

  在开发环境中，这个值是 "/"，且不能通过这个选项修改。

- `enableProductionAnalysis`

  **类型：**Boolean

  **默认值：**false

  是否在生产环境下启用打包分析功能。

- `enableProductionSourceMap`

  **类型：**Boolean

  **默认值：**false

  是否在生产环境下生成 SourceMap。

- `enableProductionPWA`

  **类型：**Boolean

  **默认值：**false

  是否在生产环境下开启离线缓存。详情请查看[开启离线缓存](#开启离线缓存)章节。

#### 针对测试环境的配置

- `enableTestRaf`

  **类型：**Boolean

  **默认值：**true

  是否在测试环境下添加 `raf` 包作为 `window.requestAnimationFrame()` 的 polyfill。

- `enableTestEnzyme`

  **类型：**Boolean

  **默认值：**true

  是否在测试环境下使用 Enzyme。如果设置为 true，则不需要手动设置 Enzyme 的 Adapter，且不需要再安装 Enzyme 作为本地依赖。

### 自定义配置

在大多数情况下，你不需要自定义配置。你的需求可能通过 [Uedlinker 配置](#uedlinker-配置项)就能够满足。

#### 自定义 Babel 配置

在工作目录下新建文件 `babel.config.js` 便可自定义 Babel 配置。与[使用 Uedlinker 配置](#使用配置)一样，可导出一个对象或函数。无论是对象还是函数返回的对象，都应该是 [Babel 能够接受的选项](http://babeljs.io/docs/en/options)。导出对象时，会与默认 Babel 配置合并；导出函数时，会将默认配置作为第一个参数注入到函数中，然后将函数返回的配置对象与默认的配置合并。

#### 自定义 Jest 配置

在工作目录下新建文件 `jest.config.js` 便可自定义 Jest 配置。与[使用 Uedlinker 配置](#使用配置)一样，可导出一个对象或函数。无论是对象还是函数返回的对象，都应该是 [Jest 能够接受的选项](https://jestjs.io/docs/en/configuration)。导出对象时，会与默认 Jest 配置合并；导出函数时，会将默认配置作为第一个参数注入到函数中，然后将函数返回的配置对象与默认的配置合并。

#### 自定义 Webapck 配置

在工作目录下新建文件 `webpack.config.js` 便可自定义 Webpack 配置。与[使用 Uedlinker 配置](#使用配置)一样，可导出一个对象或函数。不一样的是，导出函数时，会被注入两个参数，第一个参数是一个 Webpack 配置对象，第二个参数是通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 处理过的对象，函数可以返回对象或 `webpack-chain` 实例。返回对象时，会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到默认的 Webpack 配置中，返回 `webpack-chain` 实例时，会直接调用实例的 `.toConfig()` 方法返回的对象作为 Webpack 的配置，不会与默认配置合并。

#### 自定义环境变量

在执行 `@uedlinker/scripts` 的三个命令 `dev`、`build` 和 `test` 时，会自动设置环境变量 `NODE_ENV` 和 `BABEL_ENV` 的值，分别对应 "development"、"production" 和 "test"。这两个环境变量会直接影响开发构建和测试，它们的作用也只应该如此。不建议用户自己设置它们（反正设置了也没用）。如果这两个环境变量的值不够使用，用户可以自定义环境变量。自定义环境变量需要以 `UEDLINKER_` 为前缀。如下所示：

```js
// pacakge.json
{
  "scripts": {
    "dev": "cross-env UEDLINKER_MY_ENV=someValue uedlinker-scripts dev"
  }
}
```

这里使用了 [cross-env](https://github.com/kentcdodds/cross-env) 作为跨平台设置环境变量的工具。如此，你便能够在你的代码中使用这个环境变量的值：

```jsx
// src/index.jsx
console.log(process.env.UEDLINKER_MY_ENV) // ==> 'someValue'
```

## 问题

当你遇到问题时，可以在[这里](https://github.com/uedlinker/scripts/issues/new)提出你的问题，我会尽量解决。如果你能够提供解决方案或 PR，那就最好不过了。
