<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [project-start](#project-start)
    - [问题](#%E9%97%AE%E9%A2%98)
        - [（一）Node版本管理](#%E4%B8%80node%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86)
        - [（二）Babel7 vs ts-loader](#%E4%BA%8Cbabel7-vs-ts-loader)
        - [（三）ESLint(TSLint)、Prettier](#%E4%B8%89eslinttslintprettier)
        - [（四）TypeScript](#%E5%9B%9Btypescript)
        - [（五）测试](#%E4%BA%94%E6%B5%8B%E8%AF%95)
        - [（六）其他](#%E5%85%AD%E5%85%B6%E4%BB%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# project-start
using React Hook + Webpack5 + React Router6 + Typescript + Jest + React Testing Library

## 问题
### （一）Node版本管理
[工具选择](https://cloud.tencent.com/developer/article/1674774)  
我选用的nvm, 按照github官方命令安装报错：Failed to connect to raw.githubusercontent.com port 443: Connection refused  
解决方法：
1. 查询真实IP：在 [这里](https://www.ipaddress.com/) 查询raw.githubusercontent.com的真实IP。
2. 修改host: sudo vim /etc/hosts
3. 在上边文件中添加查到的IP： 199.232.68.133 raw.githubusercontent.com（多个IP可以都是试试）

以前可以借助avn在切换项目的时候自动化切换node版本，我在项目中试了下不行，可能是avn长时间不维护了命令执行的时候会报错。  
所以只配置了.nvmrc文件，切换项目后需要手动执行 ```nvm use```切换node。


### （二）Babel7 vs ts-loader
+ Typescript、Babel对比

|   | 编译能力        | 类型检查   |  插件  |
|---| :--------:   | :-----:  | :----:  |
|tsc| ts(x),js(x) --> es 3/5/6...      | 有   |   无     |
|Babel| ts(x),js(x) --> es 3/5/6...        |   无   |   丰富   |

+ Babel 7 之前，不支持 TS   
  编译流程是这样的：```TS > TS 编译器 > JS > Babel > JS (再次)```
+ Babel 7 <br />
  实现了“只有一个 Javascript 编译器” 的梦想！通过允许 Babel 作为唯一的编译器来工作，就再也没必要利用一些复杂的 Webpack 魔法来管理、配置或者合并两个编译器。  
  Babel7处理TS实际上是移除了TS， 它将 TypeScript 全部转换为常规 JavaScript，然后再一如既往的操作。
+ Webpack配置好 Babel后只具备编译功能，再安装TS补全类型检查功能。  
  然后我们新开一个 terminal，跑 npm run check-type。
```javascript
npm i typescript -D
tsc --init
```
```javascript
// tsconfig.json
{
  ...
  "compilerOptions":{
    "noEmit":true // 不输出文件，只做类型检查
  }
}
```
```javascript
// package.json
{
  ...
  "script":{
    ...
    "check-type": "tsc --watch"
  }
}
```
+ 性能  
  加入ts-loader的webpack构建速度，肯定比只使用babel-loader慢，因为编译流程变长。  
  可以通过 fork-ts-checker-webpack-plugin 来缓解这种减速，它在单独的进程上运行 TypeScript 类型检查器。
+ 如何选择 TypeScript 编译工具
    + 如果没有使用 Babel，首选 TypeScript 自带编译器（配合 ts-loader 使用）
    + 如果项目中有 Babel，安装 @babel/preset-typescript，配合 tsc 做类型检查。
    + 两种编译器不要混用。

### （三）ESLint(TSLint)、Prettier
使用 Prettier 解决代码格式问题，使用 linter 解决代码质量问题  
2019 年 1 月，TypeScript 官方决定全面采用 ESLint，之后也发布 typescript-eslint 项目，以集中解决 TypeScript 和 ESLint 兼容性问题。  
而之前的两个 lint 解决方案都将弃用：
+ `typescript-eslint-parser` 已停止维护
+ 在完成 `ESLint` 功能后，将弃用 `TSLint` 并帮助用户迁移到 `ESLint`

#### 问题1:  eslint-loader ？
以前的项目中使用 eslint-loader 的问题：  
遇到多次想在本地快速修改一个功能做验证的情况，但稍不留意 书写不规范就会lint不通过热编译出问题，页面加载失败，并且不看终端有时候还不知道问题出在哪，IDE没有提示。  
大多数时候我就是单纯的想赶紧看下效果做验证，或者灵感来了想快点做验证，这个时候我并不关心这时候修改的代码到底规范不规范，或者即便不规范只要没出错，我也不想被迫立即进行调整，然后等待再次编辑，直到lint成功，这种打断很多时候让人极其不爽。

现在lint的执行是通过pre-commit & IDE配置进行的（IDE：Webstorm 配置就不截图了，有意者可以私下交流）：
```javascript
// package.json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{tsx,ts,jsx,js,json,css,less,scss,md}": [
      "eslint --fix",
      "git add"
    ]
  },
```
#### 问题2: eslint-config-prettier、eslint-plugin-prettier ？
关闭所有不必要或可能与 Prettier 冲突的规则。将 Prettier 作为 ESLint 规则运行，并将差异报告为单个 ESLint 问题。  
该规则是可自动修复的——如果您使用 --fix 标志运行 eslint，您的代码将根据prettier的样式进行格式化。

#### 问题2：ESLint: Missing an explicit type attribute for button
按钮 HTML 元素的 type 属性的默认值是“submit”，这通常不是所需的行为，并且可能导致意外的页面重新加载。 此规则为所有按钮元素强制执行显式类型属性，并检查其值是否符合规范（即，是“button”、“submit”和“reset”之一）。  
解决方法：显示的指明button的type

#### 问题3：ESlint：ESLint: Unexpected string concatenation.(prefer-template)
解决方法：建议使用模板字面量而非字符串连接

#### 问题4：ESLint: JSX not allowed in files with extension '.tsx'
解决方法：eslint配置文件.eslintrc.cjs的rules中增加：
```
'react/jsx-filename-extension': ['error', {'extensions': ['.tsx', '.ts', '.jsx', '.js']}],
```
#### 问题5：ESlint：ESLint: Missing file extension for "./App"(import/extensions)
解决方法：在eslint配置文件.eslintrc.cjs顶层加入如下配置：
```javascript
settings: {
  "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  "import/parsers": {
    "@typescript-eslint/parser": [".ts", ".tsx"]
  },
  "import/resolver": {
    "node": {
      "extensions": [".js", ".jsx", ".ts", ".tsx"]
    }
  }
},
env: {
...
```
#### 问题6: ESLint: Dependency cycle via ./xxxSlice:6(import/no-cycle)
redux[文档](https://redux.js.org/tutorials/typescript-quick-start)中是这样说的：  
You can safely import the RootState type from the store file here. It's a circular import, but the TypeScript compiler can correctly handle that for types. This may be needed for use cases like writing selector functions.

### （四）TypeScript
#### 问题1：启用【Named export for CSS Modules】后， ts报错：Cannot find module ‘./index.module.css‘ or its corresponding type declarations
在全局ts -- global-env.d.ts 中增加如下内容：
```javascript
/// <reference types="react-scripts" />

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}
```
### （五）测试
#### 问题1: Jest、testing-library/jest-dom、testing-library/react、testing-library/user-event ？
+ **Jest:** 是一个令人愉快的 JavaScript 测试框架，专注于简单性。
+ **testing-library/jest-dom:** @testing-library/jest-dom 库提供了一组自定义的 jest 匹配器，您可以使用它们来扩展 jest。 这些将使您的测试更具声明性，更易于阅读和维护。
+ **testing-library/react:** React测试库, 是一个用于测试 React 组件的非常轻量级的解决方案。 它在 react-dom 和 react-dom/test-utils 之上提供了轻量级的实用功能，以鼓励更好的测试实践。 **其主要指导原则是：
  您的测试与您的软件使用方式越相似，它们能给您的信心就越大**。
+ **testing-library/user-event:** user-event 试图模拟用户与浏览器交互时会在浏览器中发生的真实事件。 例如 userEvent.click(checkbox) 会改变复选框的状态。

#### 问题2: assertions 的使用
确保添加 expect.assertions 来验证一定数量的断言被调用。 否则一个fulfilled态的Promise 不会让测试失败︰
```javascript
/** exmple */

//用 Promise.catch 测试一个异步的错误
it('tests error with promises', () => {
  expect.assertions(1);
  return user.getUserName(2).catch(e =>
    expect(e).toEqual({
      error: 'User with 2 not found.',
    }),
  );
});

// Or using async/await.
it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.',
    });
  }
});

// 用`.rejects`.来测试一个异步的错误
it('tests error with rejects', () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});

// 或者与async/await 一起使用 `.rejects`.
it('tests error with async/await and rejects', async () => {
  expect.assertions(1);
  await expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});

```
#### 问题3: Jest test fails : TypeError: window.matchMedia is not a function
解决方法：
1. 创建src/__mocks__/matchMedia.ts
```javascript
// src/__mocks__/matchmedia.ts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
```
2. App.spec.tsx中导入
```javascript
import '../__mocks__/matchMedia'
```
### （六）其他
#### 问题1: npm run start 后报错：ReferenceError regeneratorRuntime is not defined
解决方法：
```javascript
/** 1 */
npm install --save-dev @babel/plugin-transform-runtime
``` 
```javascript
/** 2 */
// babel.config.js
plugins: !api.env('production')
      ? ['@babel/plugin-transform-runtime', 'react-refresh/babel']
      : ['@babel/plugin-transform-runtime'],
```

#### 问题2: 使用antd组件库，但是按照官方指引引入antd样式，始终不生效
原因：可能antd就没考虑支持css modules。
```javascript
// 在入口文件中做如下引入
import 'antd/dist/antd.css'
```
解决方法：修改webpack配置
```javascript
{
        test: /\.css$/i,
        exclude: [/\.module\.css$/i], // node_modules文件（其中的antd好像就没考虑支持css modules）、结尾没有.module的样式文件，不开启css modules。这时全局生效
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 直接在development环境写MiniCssExtractPlugin.loader不行。
          // { // 报错，组件的bug
          //   loader: 'thread-loader',
          //   options: cssWorkerPool,
          // },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/i,
        include: [/\.module\.css$/i], // 处理node_modules以外的样式文件
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
          {
            // CSS 模块的命名导出， 被修改为以camelCase的形式
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'postcss-loader',
        ],
      },
```
#### 问题3: Module not found: Error: Can't resolve 'react/jsx-dev-runtime' in '...'
webpack alias中写入react别名后run start时终端报上边的错误。    
解决方法：在alias中的react配置前加上 'react/jsx-runtime' 和 'react/jsx-dev-runtime'的配置
```javascript
alias: {
  'react/jsx-runtime': path.resolve(__dirname, '../node_modules/react/jsx-runtime'),
  'react/jsx-dev-runtime': path.resolve(__dirname, '../node_modules/react/jsx-dev-runtime'),
  react: path.resolve(__dirname, '../node_modules/react/index.js'),
},
```
