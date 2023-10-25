# npm 常用命令相关

## npm init 初始化项目

npm init 也可以直接初始化一个项目，可以直接看[npm init 文档](https://docs.npmjs.com/cli/v6/commands/npm-init)

### npm 用法

```sh
# 使用默认值初始化项目生成一个 package.json 文件
npm init [--force|-f|--yes|-y|--scope] (example： `npm init --yes` OR `npm init -y`)


# 使用指定的生成器生成文件
npm init <@scope> (same as `npx <@scope>/create`)
npm init [<@scope>/]<name> (same as `npx [<@scope>/]create-<name>`)

# 🌰 使用 create-react-app 初始化项目
npm init react-app my-app
# OR
npm create react-app my-app
```

`npm init <initializer>`可用于设置新的或现有的 npm 包。

init 命令转化为相应的 npx 操作如下：

- `npm init foo -> npx create-foo`
- `npm init @usr/foo -> npx @usr/create-foo`
- `npm init @usr -> npx @usr/create`

```sh
# 运行
npm init vue@next
# 相当于
npx create-vue@next
```

### npx

npm 从 5.2 版开始，增加了 npx 命令，具体可以查看[阮一峰 npx 教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)

避免全局安装模块

```sh
# create-react-app这个模块是全局安装，npx 可以运行它，并且不进行全局安装。
npx create-react-app my-react-app
```

使用不同的 node 版本，某些场景下可以临时切换 node 版本，有时比 nvm 包管理方便些。

```sh
npx node@14 -v
# v14.18.0

npx -p node@14 node -v
# v14.18.0
```

:::warning 注意点
只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装 http-server 模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

```sh
# 启动本地静态服务
npx http-server
```

:::

## 镜像相关

设置淘宝镜像

```sh
npm config set registry https://registry.npmmirror.com
# yarn
yarn config set registry https://registry.npmmirror.com
```

查看镜像源地址

```sh
npm config get registry
# yarn
yarn config get registry
```

## 安装包

```sh
# 安装package.json所有依赖项
npm install
npm i

# 安装指定的依赖项
npm install package_name
npm i package_name

# 安装开发环境依赖
npm install --save-dev package_name
npm i -D package_name
```

## 发布包

发包之前，需要在[npm 官网](https://www.npmjs.com/)注册账号

```sh
# 登录
npm login

# 发布项目
npm publish

# 增加一个修复版本号
npm version patch

# 增加一个小的版本号
npm version minor

# 将更新后的包发布到 npm 中
npm publish
```

## 其他命令

:::details 其他命令

```sh
# 查看npm 版本
npm -v

# 查看当前目录下已安装的依赖项
npm list

# 查看npm帮助命令
npm help

# 更新指定包
npm update

# 卸载指定包
npm uninstall

# 查看配置信息
npm config list

# 查看远程npm上指定包的所有版本信息
npm info package_name

# 查看当前包的安装路径
npm root

# 查看本地安装的指定包及版本信息，没有显示empty
npm ls
```

:::

## npm pkg

```sh
# 检索key 在package.json文件中定义的值
npm pkg get [<field>[.<subfield>]]

# 在package.json文件中设置一个值（key:<field>,value: <value>)
npm pkg set <field> = <value>[.<subfield>=<value>...]

# 在package.json文件中删除一个值(key:<field>)
npm pkg delete <field>[.<subfield>...]
```

示例：

```sh
# 获取当前包名   "meix-notes"
npm pkg get name
# 获取scripts.dev的值   "vitepress dev docs --port=8732"
npm pkg get scripts.dev
```

修改 package.json 中的 scripts：

```sh
# dev 命令  给scripts的dev设置一个值
npm pkg set scripts.dev="vitepress dev docs --port=8732"
# build 命令  给scripts的build设置一个值
npm pkg set scripts.build="vitepress build docs"
```
