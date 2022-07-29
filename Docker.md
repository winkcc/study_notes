# Docker

## 概述

> Docker 是一个开源的应用容器引擎，基于Go 语言并遵从 Apache2.0 协议开源。
>
> Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

Docker官网：http://www.docker.com
Docker Hub官网：https://hub.docker.com （仓库）

## Docker安装

### 基本组成

​				客户端							服务器							仓库

![1658634078276](G:\Desktop\Study_notes\Docker.assets\1658634078276.png)

**镜像（image）：**

```txt
Docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。 就好似 Java 中的 类和对象，类就是镜像，容器就是对象！
```

**容器（container）：**

```txt
Docker 利用容器（Container）独立运行的一个或一组应用。容器是用镜像创建的运行实例。

它可以被启动、开始、停止、删除。每个容器都是相互隔离的，保证安全的平台。

可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

容器的定义和镜像几乎一模一样，也是一堆层的统一视角，唯一区别在于容器的最上面那一层是可读可写的。
```

**仓库（repository）：**

```txt
仓库（Repository）是集中存放镜像文件的场所。

仓库(Repository)和仓库注册服务器（Registry）是有区别的。仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签（tag）。

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。

最大的公开仓库是 Docker Hub(https://hub.docker.com/)，存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云 等

```

### 安装



1.确定你是CentOS7及以上版本

```bash
# 查看自己的内核：
uname -r # 打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。
# 查看版本信息：
cat /etc/os-release
```

2.根据帮助文档安装 https://docs.docker.com/engine/install/centos/

```bash
# 1、卸载原来的版本
yum remove docker \
            docker-client \
            docker-client-latest \
            docker-common \
            docker-latest \
            docker-latest-logrotate \
            docker-logrotate \
            docker-engine
# 2、下载安装包
yum -y install gcc
yum -y install gcc-c++
yum install -y yum-utils
# 3、配置镜像地址

									# 默认是国外的 不用
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

									# 使用国内阿里云的
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 4、更新下yum索引 
yum makecache fast
# 5、安装docker-ce docker-ce 社区版 ee企业版
yum install docker-ce docker-ce-cli containerd.io
# 6、启动docker
systemctl start docker
# 7、测试
docker version
docker run hello-world

# 8、卸载
systemctl stop docker
yum -y remove docker-ce docker-ce-cli containerd.io
rm -rf /var/lib/docker
```

### 阿里云镜像加速

1、进入控制台

![1658639342125](G:\Desktop\Study_notes\Docker.assets\1658639342125.png)

2、选择镜像加速

![1658639404606](G:\Desktop\Study_notes\Docker.assets\1658639404606.png)

3、配置使用

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://87nnzchl.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



## Docker常用命令

> 官网 [Docker run reference | Docker Documentation](https://docs.docker.com/engine/reference/run/)

### 帮助命令

```bash
docker version 	# 显示 Docker 版本信息。
docker info     # 显示 Docker 系统信息，包括镜像和容器数。
docker --help   # 帮助
```

### 镜像命令

**docker images**

```bash
[root@192 /]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   10 months ago   13.3kB

# 解释
REPOSITORY  镜像的仓库源
TAG 		镜像的标签
IMAGE ID    镜像的ID
CREATED     镜像创建时间
SIZE        镜像大小
# 可选项
-a 			列出本地所有镜像
-q 			只显示镜像id
```

**docker search 搜索镜像**

```bash
[root@192 /]# docker search mysql
NAME                           DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                          MySQL is a widely used, open-source relation…   12908     [OK]       
mariadb                        MariaDB Server is a high performing open sou…   4952      [OK] 
# 可选项
--filter=stars=500   #列出收藏数不小于指定500的镜像。
```

**docker pull 下载镜像**

```bash
# docker pull 镜像名[:tag]
[root@192 /]# docker pull mysql
Using default tag: latest 	# 不写tag，默认是latest
latest: Pulling from library/mysql
e54b73e95ef3: Pull complete  # 分层下载 docker image核心 联合文件系统
327840d38cb2: Pull complete 
642077275f5f: Pull complete 
e077469d560d: Pull complete 
cbf214d981a6: Pull complete 
7d1cc1ea1b3d: Pull complete 
d48f3c15cb80: Pull complete 
94c3d7b2c9ae: Pull complete 
f6cfbf240ed7: Pull complete 
e12b159b2a12: Pull complete 
4e93c6fd777f: Pull complete 
Digest: sha256:152cf187a3efc56afb0b3877b4d21e231d1d6eb828ca9221056590b0ac834c75# 签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest #真实地址

[root@192 /]# docker pull mysql:5.7
5.7: Pulling from library/mysql
72a69066d2fe: Already exists   #体现分层下载
93619dbc5b36: Already exists 
99da31dd6142: Already exists 
626033c43d70: Already exists 
37d5d7efb64e: Already exists 
ac563158d721: Already exists 
d2ba16033dad: Already exists 
688ba7d5c01a: Pull complete 
00e060b6d11d: Pull complete 
1c04857f594f: Pull complete 
4d7cfa90e6ea: Pull complete 
e0431212d27d: Pull complete 
Digest: sha256:e9027fe4d91c0153429607251656806cc784e914937271037f7738bd5b8e7709
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7

```

![1658644219757](G:\Desktop\Study_notes\Docker.assets\1658644219757.png)

**docker rmi** 删除镜像

```bash
docker rmi -f 镜像id #一般通过id删除
docker rmi -f $(docker images -qa) # 删除全部
```

### 容器命令

> 有了镜像才能创建容器

下载启动镜像

```bash
docker pull centos
docker run [可选参数] --name 01 镜像名  # 启动容器 

# 常用参数说明
--name="Name" # 给容器指定一个名字
-d # 后台方式运行容器，并返回容器的id！
-i # 以交互模式运行容器，通过和 -t 一起使用
-t # 给容器重新分配一个终端，通常和 -i 一起使用
-P # 随机端口映射（大写）
-p # 指定端口映射（小结），一般可以有四种写法
        ip:hostPort:containerPort
        ip::containerPort
        hostPort:containerPort (常用)
        containerPort
# 测试
docker run -it centos /bin/bash

[root@winklinux /]# docker run -it centos /bin/bash
[root@9bce4d32e8bd /]# ls    # 容器内的centos 基础版本 很多命令不完善
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@9bce4d32e8bd /]# exit   # 退出


```

 **docker ps  列出所有运行的容器**

```bash
[root@winklinux /]# docker ps     #正在运行
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@winklinux /]# docker ps -a  #正在运行和过去运行
CONTAINER ID   IMAGE         COMMAND       CREATED         STATUS                          PORTS     NAMES
9bce4d32e8bd   centos        "/bin/bash"   2 minutes ago   Exited (0) About a minute ago             competent_spence
706a9a7891b0   hello-world   "/hello"      2 hours ago     Exited (0) 2 hours ago                    objective_dijkstra

# 命令
docker ps [OPTIONS]
# 常用参数说明
-a # 正在运行和过去运行
-l # 显示最近创建的容器
-n=? # 显示最近n个创建的容器
-q # 静默模式，只显示容器编号
```

**退出容器**

```bash
exit # 容器停止退出
ctrl+P+Q # 容器不停止退出
```

**启动停止容器**

```bash
docker start (容器id or 容器名) # 启动容器
docker restart (容器id or 容器名) # 重启容器
docker stop (容器id or 容器名) # 停止容器
docker kill (容器id or 容器名) # 强制停止容器
```

**删除容器**

```bash
docker rm 容器id # 删除指定容器
docker rm -f $(docker ps -a -q) # 删除所有容器
```



### 其它常用命令

**后台启动容器**

```bash
# 命令
docker run -d 容器名

docker run -d centos # 启动centos，使用后台方式启动
# 问题：使用docker ps 查看，发现容器已经退出了！
# 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命令，就会自动退出。
# 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。

```

**查看日志**

```bash
[root@winklinux /]# docker logs -tf 0bd439828f1f  #容器id
# 常用参数说明
# -t 显示时间戳
# -f 打印最新的日志
# --tail 数字 显示多少条！
```

**查看容器中运行的进程信息**

```bash
# 命令
docker top 容器id
```

![1658651045580](G:\Desktop\Study_notes\Docker.assets\1658651045580.png)

**查看容器的元数据**

```bash
# 命令
docker inspect 容器id

```

**进入正在运行的容器**

```bash
# 通常容器都是使用后台方式运行的
# 方法一
docker exec -it 容器id bashShell #docker exec -it 0bd439828f1f /bin/bash
# 方式二
docker attach 容器id

#区别 
exec 进入容器后开启一个新的终端（常用）
attach 进入容器正在执行的终端，不会启动新的进程

```

**从容器内拷贝文件到主机**

```bash
docker cp
# 容器内执行，创建一个文件测试
[root@c8530dbbe3b4 /]# cd /home
[root@c8530dbbe3b4 home]# touch f1

# linux复制查看，是否复制成功
[root@winklinux ~]# docker cp c8530dbbe3b4:/home/f1 /home  #复制操作

```

![1658657821192](G:\Desktop\Study_notes\Docker.assets\1658657821192.png)

## 练习使用

### 部署nginx

```bash
# 1、搜索镜像
docker search nginx
# 2、下载镜像
docker pull nginx
# 3、启动
docker run -d --name nginx01 -p 3344:80 nginx # -d后台启动 --name给容器起名字 -p宿主机端口：容器内端口
# 4、测试
docker ps
[root@winklinux /]# curl localhost:3344 #本机自测
公网: 47.114.97.199:3344 可以访问nginx

```

引出：每次改动nginx配置文件 都需要进入容器内部 非常麻烦，如果可以在容器外部提供一个映射路径，在容器外修改文件，容器内部自动修改

-v 数据卷

### **部署tomcat**

```bash
# 官方的使用
docker run -it --rm tomcat:9.0
--rm # 用完即删除


# 1、可以在dockerhub上搜索tomcat
# 2、安装tomcat9
docker pull tomcat:9.0
# 3、启动运行 
docker run -d -p 3355:8080 --name tomcat9 tomcat:9.0 #如果不加：9.0则默认为latest
# 4、外网访问无内容 
# 因为tomcat被阉割！ webapps为空
# 保证最小可运行环境

root@a28ee75ed24d:/usr/local/tomcat# cp -r webapps.dist/* webapps  #webapps.dist输出目录有内容 复制到webapps
root@a28ee75ed24d:/usr/local/tomcat# cd webapps
root@a28ee75ed24d:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manager
# 再从外网访问
47.114.97.199：3355 可以访问tomcat

```

### 部署es+kibana

```bash
# es 暴露端口很多
# es 十分耗内存
# es 的数据要放置在安全目录 挂载
# --net somenetwork 网络配置 暂时不用

# 下载启动elasticserch
docker run -d --name elasticsearch  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2    #非常卡！！！！！！！！！！！！

#查看docker
docker stats
# 增加内存限制 -e ES_JAVA_OPTS="-Xms64m -Xmx512m"
docker run -d --name elasticsearch02  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2
```

![1658669999810](G:\Desktop\Study_notes\Docker.assets\1658669999810.png)

降了很多

```bash
# 本机测试成功
[root@winklinux /]# curl localhost:9200
{
  "name" : "d44e762a0d8a",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "0XG7jlziQD6WoCwjN00JZA",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

```

如果用kebana 需要网络配置

![1658670248847](G:\Desktop\Study_notes\Docker.assets\1658670248847.png)

## 可视化操作

- Portainer（先用这个）

```bash
docker run -d -p 8088:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
-p # 端口
-v # 挂载

```

- Rancher（CI/CD再用这个）

### Portainer

```bash
docker run -d -p 8088:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer

# 测试
47.114.97.199:8088
# 本地
```

![1658671059683](G:\Desktop\Study_notes\Docker.assets\1658671059683.png)



## Docker镜像

**镜像**
镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

**UnionFS （联合文件系统）**

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

**Docker镜像加载原理**

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

`bootfs(boot file system)`主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

`rootfs (root file system)` ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。

![1658672534912](G:\Desktop\Study_notes\Docker.assets\1658672534912.png)

为什么docker里的centos 才200mb

对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直接用Host的**kernel**，自己只需要提供rootfs就可以了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

**分层作用**

资源共享！比如有多个镜像都从相同的Base镜像构建而来，那么宿主机只需在磁盘上保留一份base镜像，同时内存中也只需要加载一份base镜像，这样就可以为所有的容器服务了，而且镜像的每一层都可以被共享。

查看镜像分层的方式可以通过 docker image inspect 命令！

```bash
[root@winklinux ~]# docker image inspect redis:latest
…………
"RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:2edcec3590a4ec7f40cf0743c15d78fb39d8326bc029073b41ef9727da6c851f",
                "sha256:9b24afeb7c2f21e50a686ead025823cd2c6e9730c013ca77ad5f115c079b57cb",
                "sha256:4b8e2801e0f956a4220c32e2c8b0a590e6f9bd2420ec65453685246b82766ea1",
                "sha256:529cdb636f61e95ab91a62a51526a84fd7314d6aab0d414040796150b4522372",
                "sha256:9975392591f2777d6bf4d9919ad1b2c9afa12f9a9b4d260f45025ec3cc9b18ed",
                "sha256:8e5669d8329116b8444b9bbb1663dda568ede12d3dbcce950199b582f6e94952"
            ]
        },
        …………
```

所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层。

举一个简单的例子，假如基于 Ubuntu Linux 16.04 创建一个新的镜像，这就是新镜像的第一层；如果在该镜像中添加 Python包，就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就会创建第三个镜像层。

该镜像当前已经包含 3 个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。

![1658673175496](G:\Desktop\Study_notes\Docker.assets\1658673175496.png)

在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。下图中举了一个简单的例子，每个镜像层包含 3 个文件，而镜像包含了来自两个镜像层的 6 个文件。

![1658673184714](G:\Desktop\Study_notes\Docker.assets\1658673184714.png)



### Commit镜像

```bash
docker commit 提交容器为一个新副本
# 语法
docker commit -m="提交的描述信息" -a="作者" 容器id 要创建的目标镜像名:[标签名]

docker commit -a="wink" -m="no tomcat docs"  1e98a2f815b0 tomcat02:1.1
											# 容器id        镜像名称：版本

```

## 容器数据卷

数据不应该放在容器里面，for example Mysql 容器删除数据也无了。

容器之间应该有一个数据共享技术 Docker容器产生数据，同步到本地。

所以需要容器数据卷

### 使用数据卷

> 方式一：直接用命令挂载

```bash
docker run -it -v 主机目录：容器目录 镜像名


docker inspect 容器id 查看容器信息
```



![1658736470285](G:\Desktop\Study_notes\Docker.assets\1658736470285.png)

### DockerFile挂载

用来构建docker镜像的构建文件  命令脚本

> 方式二：用dockerfile脚本命令挂载

```bash
# 创建dockerfile文件
mkdir docker-test-volume
cd docker-test-volume
vim dockerfile1

# 脚本
FROM centos

VOLUME ["volume01","volume02"]


CMD echo "======end========"
CMD /bin/bash

# 执行
docker build -f dockerfile1 -t wink/centos:1.0 .

```



### 实战 Mysql

```bash
docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d \
-v /home/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

-d 后台运行
-p 端口映射
-v 卷挂载
-e 环境配置
--name 容器名称

# navicat测试连接

```

![1658741432605](G:\Desktop\Study_notes\Docker.assets\1658741432605.png)

### 具名挂载 匿名挂载

```BASH
# ==================================匿名挂载==========================
-v 容器内路径
docker run -d -P --name nginx01 -v /etc/nginx nginx
# 匿名挂载的缺点，就是不好维护，通常使用命令 docker volume维护
docker volume ls

#[root@winklinux /]# docker run -d -P --name nginx01 -v /etc/nginx nginx
#7649d0505c8eb0f819dca3f64645ffc069c288c8ef660d56a099870b2686eca6
#[root@winklinux /]# docker volume ls
#DRIVER    VOLUME NAME
#local     08fb1be8560006f3d05c3a52a47e43f4e3897354e0da6d1a12cf365d237efb58

# ==================================具名挂载==========================
-v 卷名:/容器内路径
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx nginx
# 查看挂载的路径
[root@winklinux /]# docker volume inspect nginxconfig
[
    {
        "CreatedAt": "2022-07-25T17:46:45+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/nginxconfig/_data",
        "Name": "nginxconfig",
        "Options": null,
        "Scope": "local"
    }
]

# 判断挂载的是卷名而不是本机目录名？
不是/开始就是卷名，是/开始就是目录名
# 改变文件的读写权限
# ro: readonly
# rw: readwrite
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:rw nginx
# ro只能通过宿主机操作 容器内无法操作

```

### 数据卷容器



多个容器同步数据

```bash
# 创建centos01
docker run -it --name centos01 c5f41dd1998b
```

![1658747028262](G:\Desktop\Study_notes\Docker.assets\1658747028262.png)

```bash
 # 创建centos02并同步01的挂载
 docker run -it --name centos02 --volumes-from centos01 c5f41dd1998b
 --volumes-from 容器 
```

![1658747182470](G:\Desktop\Study_notes\Docker.assets\1658747182470.png)



测试

```bash

# centos02 创建文件
[root@93ee2680fc0a /]# cd volume01
[root@93ee2680fc0a volume01]# touch vol02
[root@93ee2680fc0a volume01]# ls
vol02
# centos01 查看存在
[root@winklinux data]# docker attach centos01   #进入cetos01容器
[root@e18017f01bb3 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var  volume01	volume02
[root@e18017f01bb3 /]# cd volume01
[root@e18017f01bb3 volume01]# ls
vol02

```

## DockerFile

### 介绍

用来构建docker镜像

构建步骤

1. 编写一个dockerfile文件
2. docker build构建成为一个镜像
3. docker run运行镜像
4. docker push 发布镜像（DockerHub、阿里云镜像仓库）



官方做法

![1658764176497](G:\Desktop\Study_notes\Docker.assets\1658764176497.png)



### 构建过程

**基础知识**

1、每条保留字指令尽量为大写字母且后面要跟随至少一个参数
2、指令按照从上到下，顺序执行
3、每条指令都会创建一个新的镜像层，并对镜像进行提交

### DockerFile命令

```bash
FROM		# 基础镜像，一切从这里构建
MAINTAINER	# 镜像是谁写的，姓名+邮箱
RUN			# 镜像构建时需要运行的命令
ADD			# 步骤: 比如创建的是centos镜像 在添加一个tomcat
WORKDIR		# 镜像工作目录
VOLUME		# 挂载的目录
EXPOST		# 声明端口
CMD			# 指定容器启动时运行的命令，只有最后一个生效，替换
ENTRYPOINT	# 指定容器启动时运行的命令，追加
ONBUILD		# 当构建一个被继承DockerFile 这时候就会运行ONBUILD指令 触发指令
COPY		# 类似ADD 将文件拷贝到镜像中
ENV			# 构建时设置环境变量
```

![1658766507137](G:\Desktop\Study_notes\Docker.assets\1658766507137.png)

### 实战 创建自己的centos



```bash
# 1、编写DockerFile文件 
mkdir dockerfile

[root@winklinux dockerfile]# vim mydockerfile-centos
[root@winklinux dockerfile]# cat mydockerfile-centos 
FROM centos:7
MAINTAINER winkcc<2440729891@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80
CMD echo $MYPATH
CMD echo "---end---"
CMD /bin/bash
# 2、通过docker build 镜像
docker build -f mydockerfile-centos -t winkcentos:0.1 .

Successfully built f142e68e5697
Successfully tagged winkcentos:0.1
# 3、测试运行
docker run -it winkcentos:0.1

# 查看构建信息
docker history f142e68e5697


```



![1658768973208](G:\Desktop\Study_notes\Docker.assets\1658768973208.png)

> CMD 和 ENTRYPOINT 的区别

`CMD`：Dockerfile 中可以有多个CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数
替换
`ENTRYPOINT`： docker run 之后的参数会被当做参数传递给 ENTRYPOINT，之后形成新的命令组合！
测试

```
docker run mycentos -??

cmd 的-？？是替换
entrypoint的 -？？ 是追加
```

### 发布镜像

> 发布到Dockerhub  https://hub.docker.com/   首先注册一个账号

```bash
# 登录
docker login -u winkcc
Password: 

# 发布 
docker tag feb5d9fea6a5 winkcc/hello-world:1.0  # 添加tag
docker push winkcc/hello-world:1.0				# push

```

发布成功

![1658822239144](G:\Desktop\Study_notes\Docker.assets\1658822239144.png)



> 发布到阿里云镜像

登录阿里云

容器镜像服务

创建镜像仓库

![1658823781928](G:\Desktop\Study_notes\Docker.assets\1658823781928.png)

本地仓库

```bash
# 登录阿里云
docker login --username=winkicc registry.cn-hangzhou.aliyuncs.com

# 拉取
docker pull registry.cn-hangzhou.aliyuncs.com/winkcc/winkcc:[镜像版本号]
# 推送
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/winkcc/winkcc:[镜像版本号]
docker push registry.cn-hangzhou.aliyuncs.com/winkcc/winkcc:[镜像版本号]
```

![1658824136569](G:\Desktop\Study_notes\Docker.assets\1658824136569.png)

### 小结

![1658824413482](G:\Desktop\Study_notes\Docker.assets\1658824413482.png)

## Docker 网络

### 理解Docker0

```bash
#测试 
ip addr
```

![1658825324568](G:\Desktop\Study_notes\Docker.assets\1658825324568.png)

```bash
# tomcat
docker run -d -P --name tomcat01 tomcat:9

docker exec -it tomcat01 ip addr   	#如果不存在指令则需要进入容器执行 apt update&&apt install -y iproute2
可以ping通
```

![1658826941799](G:\Desktop\Study_notes\Docker.assets\1658826941799.png)

> 原理

每一个安装了Docker的linux主机都有一个docker0的虚拟网卡。这是个桥接网卡，使用了veth-pair技术！

再次ip addr  多了一个网卡 

![1658827146381](G:\Desktop\Study_notes\Docker.assets\1658827146381.png)

![1658828540181](G:\Desktop\Study_notes\Docker.assets\1658828540181.png)

### --link 弃用

修改host文件

### 自定义网络

```bash
docker network ls
```



![1658831206292](G:\Desktop\Study_notes\Docker.assets\1658831206292.png)



```bash
# 正常启动
docker run -d -P --name tomcat01 tomcat  # 默认 --net
docker run -d -P --name tomcat01 --net bridge tomcat

# 自定义网络
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet

# 使用自定义网络
docker run -d -P --name tomcat-net-01 --net mynet tomcat
docker run -d -P --name tomcat-net-02 --net mynet tomcat
# 进入tomcat-net-01后可以直接用name ping通tomcat-net-02
```

### 网络联通

不同网卡

![1658834467533](G:\Desktop\Study_notes\Docker.assets\1658834467533.png)



```bash
docker network connect mynet tomcat01
			       #自己的网卡  连接docker0的容器
```

### 实战 部署Redis集群

```bash
# 创建网卡
docker network create redis --subnet 172.38.0.0/16
# 通过脚本创建六个redis配置
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done
# 结果
[root@winklinux mydata]# cd redis/
[root@winklinux redis]# ls
node-1  node-2  node-3  node-4  node-5  node-6

# 运行容器
# 示例
docker run -p 637${port}:6379 -p 1637${port}:16379 --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server
/etc/redis/redis.conf; \


# 1-6
docker run -p 6371:6379 -p 1637${port}:16379 --name redis-1 \
-v /mydata/redis/node-1/data:/data \
-v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server
/etc/redis/redis.conf; \

# 进入一个redis，注意这里是 sh命令
docker exec -it redis-1 /bin/sh
# 创建集群
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379
172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --
cluster-replicas 1
# 连接集群
redis-cli -c
# 查看集群信息
cluster info
# 查看节点
cluster nodes
# set a b
# 停止到存值的容器
# 然后再次get a，发现依旧可以获取值
# 查看节点，发现高可用完全没问题
```





## SpringBoot微服务打包Docker镜像

1、构建SpringBoot项目

2、打包应用

3、编写dockerfile

```bash
FROM java:8
# 服务器只有dockerfile和jar在同级目录
COPY *.jar /app.jar
CMD ["--server.port=8080"]
# 指定容器内要暴露的端口
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

4、构建镜像

```bash
# 相同目录下
-rw-r--r-- 1 root root 17634294 May 14 12:33 demo-0.0.1-SNAPSHOT.jar
-rw-r--r-- 1 root root 207 May 14 12:32 Dockerfile
# 构建镜像
docker build -t myjar .

```

5、发布运行

```bash
# 运行
docker run -d -P --name myjar myjar
```

## Docker Compose

### 简介

DockerFile build run 手动操作，单个容器！
微服务。100个微服务！依赖关系。
Docker Compose 来轻松高效的管理容器i。定义运行多个容器。

> 定义和运行多个容器

**三步骤：**

Using Compose is basically a three-step process:
1. Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.

  - Dockerfile 保证我们的项目在任何地方可以运行。
2. Define the services that make up your app in `docker-compose.yml` so they can be runtogether in an isolated environment.

  - services 什么是服务。

  - docker-compose.yml 这个文件怎么写！
3. Run `docker-compose up` and Compose starts and runs your entire app.

  - 启动项目

**作用：批量容器编排。**

Compose

```yaml
# 官方文档
version: '2.0'
services:
	web:
		build: .
		ports:
		- "5000:5000"
		volumes:
		- .:/code
		- logvolume01:/var/log
		links:
		- redis
	redis:
		image: redis
volumes:
	logvolume01: {}
```

Compose ：重要的概念。

- 服务services， 容器。应用。（web、redis、mysql....）
- 项目project。 一组关联的容器。 博客。web、mysql。

### 安装

最新已集成

![1658848377800](G:\Desktop\Study_notes\Docker.assets\1658848377800.png)

### 使用



```bash
# 第一步
mkdir composetest
cd composetest

vim app.py
#########################app.py#############################
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
#########################app.py#############################
vim requirements.txt

flask
redis
# 第二步
vim Dockerfile
#########################Dockerfile#############################
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
#########################Dockerfile#############################

# 第三步
vim docker-compose.yml
#########################docker-compose.yml#############################
version: "2.4.1"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
#########################docker-compose.yml#############################

# 第四步
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/dockercompose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

![1658850994665](G:\Desktop\Study_notes\Docker.assets\1658850994665.png)





## Docker Swarm

> 集群

简单学习

![1658901762880](G:\Desktop\Study_notes\Docker.assets\1658901762880.png)

```bash
# 初始化节点
docker swarm init --advertise9addr 自己的ip

# 获取令牌
docker swarm join-token manager
docker swarm join-token worker
# 其余的节点输入令牌

```

动态扩缩容

```bash
# 主节点 
docker service create -p 8888:80 --name mynginx nginx
# 扩容
docker service update --replicas 3 mynginx # 集群多了三个mynginx容器
docker service scale mynginx=5 #也是扩容

# 移除服务 
docker  service rm mynginx

```

**概念总结**

`swarm`
集群的管理和编号。 docker可以初始化一个 swarm 集群，其他节点可以加入。（管理、工作者）
`Node`
就是一个docker节点。多个节点就组成了一个网络集群。（管理、工作者）
`Service`
任务，可以在管理节点或者工作节点来运行。核心。！用户访问！
`Task`
容器内的命令，细节任务！

![1658904025810](G:\Desktop\Study_notes\Docker.assets\1658904025810.png)





## CI/CD之Jenkins

































