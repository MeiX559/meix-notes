# git 相关原理

git 的所有内容都是存储在.git 这个隐藏目录中，一般默认是被隐藏的，如果想要显示，那么需要在 exclude 中把\*\*/.git 这个配置删除，这样就可以看到啦。

展开.git 目录可以看到很多文件，其中我们主要看 objects 这个目录，这个 objects 到底是什么，接下来让我们一探究竟。

## objects 是什么？

在项目工程中创建一个 README.md 文件

```sh
# 执行下面命令
git hash-object -w README.md
# 返回值如下，该值是一个hash值
# 9bc338447792f3d7546dbdaa0ba8ecab22f7125c
```

执行完成之后，在 objects 目录下可以看到新生成了一个 9b 的文件夹，c338447792f3d7546dbdaa0ba8ecab22f7125c 是文件名。

即 hash 前两位是目录名，后面的是文件名。

## 生成的文件存储的是什么？

```sh
# 执行cat-file命令
git cat-file -p 9bc338447792f3d7546dbdaa0ba8ecab22f7125c
# 打印的内容为：# valtio demo，即文件的内容
```

git 存储的文件内容就是放在这里的。

## 文件名信息以及目录信息存储在哪里？

上面存储文件内容的 object 叫做 blob，我们可以使用命令打印一下这个信息

```sh
git cat-file -t  9bc338447792f3d7546dbdaa0ba8ecab22f7125c
# blob
```

存储文件名信息和目录信息的 object 叫做 tree

## tree 和 blob 是怎么关联的？

找一个本地有提交的仓库，在 master 分支上执行以下命令：

```sh
git cat-file -p master^{tree}
```

打印的内容如下所示：

```sh
100644 blob bfb841d3f8674689f915758786ed966492df2b01    .editorconfig
100644 blob a3298a49ba21ef5457d02b1de3aa61ce528ab3ac    .gitignore
100644 blob 7f1d3f3d6c46125330f3d086b1c9ac019b3807eb    .npmrc
100644 blob 7e0f3ab65b39cb3dcbf43b3b7a156588013a1ff0    .prettierignore
100644 blob 2499163a66964cf75022f857054442800bf56f59    .prettierrc
100644 blob ba9a5ff9657090f9bf7bb0aab21cf47554184fe4    README.md
040000 tree cb68ff2d707cb17497ae84180134a9d924e01696    docs
100644 blob 20d0251981cc7574bee020dbcb96a7dbe552d45f    env.d.ts
100644 blob e4ad36c716d7dc70d16678c16e3b49bc9bf2b0d3    package.json
100644 blob bb20f7502ad729b45d780239fc5e5ac557c43760    pnpm-lock.yaml
100644 blob 3d38ac30327ffa11f557430f62f07149ac4a50ff    tsconfig.json
```

从上面打印的内容可以看出，目录是 tree 对象，文件内容是 blob 对象。

```sh
git cat-file -p cb68ff2d707cb17497ae84180134a9d924e01696
```

打印的内容如下所示：

```sh
040000 tree 09f690a448c02939776e9cc8af5af8c84b331559    .vitepress
040000 tree 9982c5c883b483b384891553d06107a839de88fb    about
040000 tree 2c7ebb82c91b907831f5c5ee0b057a205269cb30    books
040000 tree 750e7ac7a7214ab08e4785f5560a2c4c443efa01    components
040000 tree b5372d2c47e66938f0d249b899d3a09d343f1284    daily
040000 tree 13062922acaa834582da6f848a45ea54e54406ec    fe
100644 blob 5e380ab825673ecce02297508579dbec981cc4ff    index.md
040000 tree c8b9563e45ba34707fd530d10de00db33ba56ae9    pit
040000 tree 992ef2b55c25f37801aeeddd1a66a281810326d2    public
040000 tree 06977b3efd4436fffe399cad46509f56cd2ba52d    siteLink
040000 tree cbf2bacb06d375f2445ab3e038909f73769f5ebd    sourceCode
040000 tree b2a43bcc0765d14a4343483ff63dd554d90f8a0a    tools
```

从上面打印的内容可以看出，git 存储目录的方式是这样的：
在 blob 对象里存储文件内容，在 tree 对象里存储每个子目录和文件名以及 hash。tree 对象里通过 hash 指向了对应的 blob 对象。

## 更新暂存区 git add 底层原理

```sh
git update-index --add --cacheinfo 100644 9bc338447792f3d7546dbdaa0ba8ecab22f7125c README.md
```

--add --cacheinfo ：往暂存区添加内容
100644 是文件模式：100644 是普通文件，100755 是可执行文件，120000 是符号链接文件

执行完以上命令就将 README.md 文件放进了暂存区。

git add 的底层就是执行了 git update-index

## 提交 git commit 底层原理

```sh
git write-tree
# 返回：86d68826b27d025fefae44e1ba0ff4641ce01980
```

同时在 objects 文件夹下新增了一个名为 86 的目录，文件名为 d68826b27d025fefae44e1ba0ff4641ce01980。

查看这个 objects 的类型

```sh
git cat-file -t  86d68826b27d025fefae44e1ba0ff4641ce01980
# tree
```

这个 objects 的类型为 tree，因此可以知道暂存区的内容是作为 tree 对象保存的。

打印内容

```sh
git cat-file -p  86d68826b27d025fefae44e1ba0ff4641ce01980
# 100644 blob 9bc338447792f3d7546dbdaa0ba8ecab22f7125c    README.md
```

## 命令

```sh
hash-object：创建 blob 对象
cat-file -t: 查看对象类型
cat-file -p: 查看对象内容
update-index: 更新暂存区
commit-tree: 创建 commit 节点
write-tree: 暂存区写入版本库
update-ref：创建和更新 ref
```
