[toc]



## Git学习

### 版本控制

> ​	版本控制（Reversion control）是一种在开发过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术

- 实现跨区域多人协同开发
- 追踪和记载一个或多个文件的历史记录
- 组织和保护你的源代码和文档
- 统计工作量
- 并行开发、提高开发效率
- 跟踪记录整个软件的开发过程
- 减轻开发人员的负担，节省时间，同时降低人为错误

####  1、本地版本控制  RCS

​		记录文件每次的更新，可以对每一个版本做一个快照，或是记录补丁文件，适合个人用。

#### 2、集中式版本控制	SVN

​		所有的版本数据都保存在服务器上，协同开发者从服务器上同步更新或上传自己的修改

#### 3、分布式版本控制 Git

​		每个人都有全部的代码

​		所有版本信息仓库全部同步到本地的每个人用户。

​		不会因为服务器损坏或者网络问题，造成不能工作的情况。

###  Git环境配置

> 软件下载 git官网

安装成功

Git Bash：Unix和Linux风格的命令行，使用最多，推荐最多

Git CMD：Windows风格命令行

Git GUI：图形界面Git

> 基础Linux命令



```bash
$ git config -l #查看git配置

$ git config --system --list #系统配置
#git/etc/gitconfig
$ git config --global --list#本地配置
#user/.gitconfig

#必须配置用户名密码
$ git config --global user.name ""
$ git config --global user.email ""
```

### Git基本理论（核心）

> **工作区域**

Git本地有三个工作区域 

工作目录(Working Directory)		暂存区(Stage/Index)		资源库(Repository或Git Directory)

如果在加上远程git仓库(Remote Directory)就可以分为四个工作区域

> ​	-->		Remote Directory 
>
> git push									git pull
>
> ​						History				  <--
>
> fit commit                                git reset
>
> ​                   Stage(Index)
>
> git add files 						git checkout
>
> ​					Working Directory

- Workspace:工作区，平时存放代码的地方
- Index/Stage：暂存区,用于临时存放改动，实际上它只是一个文件，保存即将提交到文件列表信息
- Repository：仓库区(或本地仓库),就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中HEAD指向最新放入仓库的版本
- Remote： 远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换。

> 工作流程

1. 在工作目录中添加、修改文件
2. 将需要进行版本管理的文件放入暂存区域
3. 将暂存区文件提交到git仓库

所以，git管理的文件有三种状态：已修改（modified），已暂存（staged），已提交（committed）

### Git项目搭建

> 本地仓库搭建

```bash
git init#创建
```

> 克隆远程仓库

```bash
git clone [url] 
```

### Git文件操作

```bash
#查看指定文件状态
git status [filename] 

#产看所有文件状态
git status

#git add.   添加左右文件到暂存区

#git commit -m "消息内容"  提交暂存区的内容到本地仓库 -m 提交信息
```

忽略文件

主目录下建立“.gitignore”文件

### 使用码云

gitee

1. 注册

2. 设置本机绑定SSH公钥，实现免密登录

   ssh-keygen -t rsa（rsa是一种加密算法）

3. 创建自己的仓库

git clone [url] 

IDEA集成git

- 添加到暂存区
- commit
- push到远程仓库

