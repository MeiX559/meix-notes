# Git

## git 学习

- [官网](https://git-scm.com/)
- [Git 学习教程](https://learngitbranching.js.org/?locale=zh_CN)

## git 常用操作/命令

### commit 常用类型

| type     | 含义                                   |
| :------- | :------------------------------------- |
| feat     | 新功能                                 |
| fix      | 修复 bug                               |
| docs     | 修改文档                               |
| style    | 代码格式修改                           |
| refactor | 重构（即不是新增功能，也不是修复 bug） |
| perf     | 更改代码以提高性能                     |
| test     | 增加测试                               |
| build    | 构建过程或辅助工具的变动               |
| ci       | 修改项目持续集成流程                   |
| chore    | 其他类型的提交                         |
| revert   | 恢复上一次提交                         |

### git clone

```sh

# 克隆一个项目到本地, 默认是下载了所有分支的代码
git clone [url]

# 只克隆最近一次的 commit
git clone [url] --depth 1

```

### git 文件操作

```sh

# 添加文件到缓存区(所有文件)
git add .

```

```sh

# 提交暂存区到仓库区
git commit -m "提交信息"

```

### 分支操作

```sh

# 列出所有本地分支
git branch
            [分支名] # 新建一个分支(停留在当前分支)
            -r # 列出所有远程分支
            -a # 列出所有本地分支和远程分支
            -d [分支名] # 删除本地分支
            -D [分支名] # 强制删除分支
            -r # 列出所有远程分支

# 新建一个分支并切换到这个分支
git checkout -b [分支名]

# 合并指定分支到当前分支
git merge [分支名]

# 删除在本地已经删除的远程分支
git remote prune origin

# 删除远程分支
git push origin --delete [分支名]

```

```sh

# 添加一个远程仓库
git remote add origin [url]

# 删除远程仓库
git remote rm name

```

## Git 命令

![git 图解](../images/git_img.jpg)

::: tip 专用名词解释

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库
  :::

### 1. 新建 git 仓库

```sh
# 在当前目录新建一个 Git 仓库
git init

# 初始化仓库
git init -y

# 新建一个目录，将其初始化为 Git 仓库
git init [project-name]

# 下载一个项目和它的整个代码历史
git clone [url]
```

### 2. 配置

```sh
# 显示当前的Git配置
git config --list

# 设置提交代码时的用户信息
git config [--global] user.name "名称"
git config [--global] user.email "邮箱地址"
```

### 3. 将文件添加至暂存区

```sh

# 添加所有文件到暂存区
git add .

# 添加指定文件到暂存区
git add [文件路径 / 目录路径]

```

### 4. 删除

```sh

# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed]

```

### 5. 代码提交

```sh

# 提交暂存区到仓库区
git commit -m [message]

# 提交暂存区指定文件到仓库区
git commit [file2] [file2] -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
git commit -a

# 替换上一次 commit (如果代码无改动，就重新提交一次上次commit的代码)
git commit --amend -m [message]

```

### 6. 分支

```sh

# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 新建一个分支，指向指定commit
git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
git checkout [branch-name]

# 切换到上一个分支
git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
git merge [branch]

# 选择一个commit，合并进当前分支
git cherry-pick [commit]

# 删除分支
git branch -d [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]

```

### 7. 标签

```sh

# 列出所有tag
git tag

# 新建一个tag在当前commit
git tag [tag]

# 新建一个tag在指定commit
git tag [tag] [commit]

# 删除本地tag
git tag -d [tag]

# 删除远程tag
git push origin :refs/tags/[tagName]

# 查看tag信息
git show [tag]

# 提交指定tag
git push [remote] [tag]

# 提交所有tag
git push [remote] --tags

# 新建一个分支，指向某个tag
git checkout -b [branch] [tag]

```

### 8. 查看信息

```sh

# 显示有变更的文件
git status

# 显示当前分支的版本历史
git log

# 显示commit历史，以及每次commit发生变更的文件
git log --stat

# 搜索提交历史，根据关键词
git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
git log --follow [file]
git whatchanged [file]

# 显示指定文件相关的每一次diff
git log -p [file]

# 显示过去5次提交
git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
git blame [file]

# 显示暂存区和工作区的差异
git diff

# 显示暂存区和上一个commit的差异
git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
git diff HEAD

# 显示两次提交之间的差异
git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
git show [commit]

# 显示某次提交发生变化的文件
git show --name-only [commit]

# 显示某次提交时，某个文件的内容
git show [commit]:[filename]

# 显示当前分支的最近几次提交
git reflog

```

### 9. 远程同步

```sh

# 下载远程仓库的所有变动
git fetch [remote]

# 显示所有远程仓库
git remote -v

# 显示某个远程仓库的信息
git remote show [remote]

# 增加一个新的远程仓库，并命名
git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]

# 上传本地指定分支到远程仓库
git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
git push [remote] --force

# 推送所有分支到远程仓库
git push [remote] --all

```

### 10. 撤销

```sh

# 恢复暂存区的指定文件到工作区
git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
git stash
git stash pop

```

### 本地与远程关联

```sh
# 远程创建仓库

# 本地初始化仓库
git init

# 提交本地代码
git add .
git commit -m '初始化'

# 与远程仓库建立关联  地址为GitHub仓库地址（如：https://github.com/MeiX559/daily-notes.git）
git remote add origin https://github.com/xxx.git

# 在本地拉取远程代码
git pull origin master

# 如果直接使用git pull拉取代码可能会报错，使用如下命令设置一个拉取的分支
git branch --set-upstream-to=origin/master master

# 如果出现以下错误  fatal: refusing to merge unrelated histories，使用如下命令解决
git pull origin master --allow-unrelated-histories

# 将本地代码push到远程
git push origin master

```

参考文档：[阮一峰 -- 常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
