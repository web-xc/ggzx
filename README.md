# 本项目是硅谷甄选运营平台后台管理系统

# 项目技术栈: Vue3、TypeScript、Vite、Pinia、Element-Plus、Vue-Router、Echarts、Axios、Scss...

## 项目使用

```js
// 1. 安装NPM
npm i -g npm
// 2. 初始化项目
npm install
// 3. 本地运行
npm run dev
npm run serve
// 4. 其他运行指令
npm run build  // 打包项目
build:test     // 测试环境
build:pro      // 生产环境
preview        // 格式化项目 html css js 代码
lint           // 检查语法规范
fix            // 修改不规范的语法
```

##  项目规范

1. 项目使用Eslint+Stylelint+Prettier 来对代码质量做检测与修复
2. 使用 husky 来做 commit 拦截
3. 使用 commitlint 来统一Git提交规范
4. 使用 preinstall 来统一包管理工具

```js
// 项目强制使用NPM管理工具, 使用PNPM、Yarn...会报错
// Git提交规范
'feat',      // 新特性、新功能
'fix',       // 修改bug
'docs',      // 文档修改
'style',     // 代码格式修改, 注意不是css修改
'refactor',  // 代码重构
'perf',      // 优化相关，比如提升性能、体验
'test',      // 测试用例修改
'chore',     // 其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',    // 回滚到上一个版本
'build',     // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动, 必须是git commit -m 'fix: xxx' 符合类型的才可以, 并且冒号后面是需要空一格的, 运行Git提交代码时会自动格式化代码
```

## 项目目录说明

```js
.husky
commit-msg    // 强制 git 提交规范
pre-commit    // git 提交时,执行pnpm run format来自动的格式化我们的代码。
public        // 静态资源
scripts       // 强制使用 pnpm 包管理器工具
src           // 项目文件
api           // 项目接口
assets        // 静态资源
components    // 组件
hooks  // hook
router // 路由
store  // pinia 仓库
styles // 常用的变量，样式
types  // 声明 ts 的规范
ulits  // 工具库
views  // 路由页面
App.vue
main.ts
.env.development // 开发环境
.env.production  // 生产环境
.env.test        // 测试环境
.eslintignore
.eslintrc.cjs
.gitignore
.prettierignore
.stylelintignore
.stylelintrc.cjs
commitlint.config.cjs
index.html
package.json
prettierrc.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

