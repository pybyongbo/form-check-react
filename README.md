# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

### 提交代码

本地代码提交的时候,取消代理.然后进行提交.

```
git config --global --unset http.proxy
```

如果代理开着的.提交代码,可能会报错.需要配置http代理

```
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

```

建议提交的时候.关闭代理,进行提交.


### 注意事项:

在使用 vite 构建的时候,我们写的页面引入的 jsx 文件,浏览器无法解析.要在 vite.config.js 中进行配置.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/form-check-react/',
});
```

注意配置`base`目录,参考文章:

[Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html)

### 前端自动化部署测试

- 本地项目在命令行中执行`git init`,然后进行提交.
- 在`github.com`上面新建一个项目.
- 创建一个`main`分支,然后将本地项目与远程项目进行关联.
- 推送到远程仓库.

```shell

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/pybyongbo/form-check-vue.git
git push -u origin main

```

### 创建.yml 文件

在 main 分支中,创建一个`.github/workflows/main.yml`的文件,进行提交.具体内容可以参考文件.

在 Secrets and variables 中找到 Actions,配置 Repository secrets,部署文件中使用到的变量.

目的是使 github 有权限可以对项目进行操作.

### 新建`gh-pages`分支

在`github.com`网站上面,找到自己的项目,基于`main`新建一个`gh-pages`分支,然后点击 setting 选项,找到侧边栏 pages,在 `deploy from a branch` 中选择 `gh-pages`分支.

### 自动部署流程

以上都设置好后,只要我们提交了更改,并且推送到远程对应的分支,就会触发自动部署.部署完成后,刷新网页即可看到网页的更新.
