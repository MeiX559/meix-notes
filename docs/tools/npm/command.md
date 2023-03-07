# npm 常用命令相关

## 初始化项目

```sh
# 初始化一个项目
npm init

# 使用默认值初始化项目
npm init --yes
npm init -y
```

完成以上操作后，将会生成一个 package.json 文件并将其放置在当前目录中。

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
