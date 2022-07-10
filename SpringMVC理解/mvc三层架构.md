## mvc三层架构：

1. m指model：

   一般指数据库中的表对应java的实体类

   比如：表叫student，那么在java的domain包中就是Student

   实体类中的属性对应表中的列（因此先建表再写实体类，属性一一对应列名）

   比如：student表的列stu_name,那么domain包的Student类中属性就叫stuName（java中需要使用驼峰命名法）

2. v指view：

   一般指前端页面，可以是jsp、也可以是html或thymeleaf等模板

   只用于显示springmvc传递到前端的数据，比如springmvc查询出学生信息，view的作用就是在页面上显示这些学生信息

3. c指control：

   指控制层，目前阶段指springmvc，专门用于接收浏览器发送而来的请求，比如浏览器想做登录请求，那么springmvc就需要准备登录方法





包名解释：

![Snipaste_2022-04-18_20-52-00](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_20-52-00.png)

domain：撰写所有的实体类，其实就是spring中的javaBean

dao：撰写所有实体对应的增删改查方法

​		比如当前有Student类，那么就需要准备接口StudentDao，包含student表对应的所有增删改查方法

​	![Snipaste_2022-04-18_20-57-22](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_20-57-22.png)

​		当前有User类，那么就需要准备接口UserDao，包含user表对应的所有增删改查方法

​		以此类推，如果大家有People类，相应的就需要准备接口PeopleDao，包含people表对应的所有增删改查方法

daoImpl：实现dao中接口的所有抽象方法

​       上面dao包都是抽象方法，抽象方法只有方法名称，但是看不到方法的内容，因此这种方法无法执行，只有方法内容补齐了，才能运行，而daoimpl就是这个功能

​		比如：上面有studentDao这个接口，里面有四个抽象方法，那么就需要准备StudentDaoImpl来实现接口重写里面所有的抽象方法

​     ![Snipaste_2022-04-18_21-02-59](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_21-02-59.png)

service：撰写所有实体对应的业务方法

​		什么叫业务方法，什么叫增删改查方法，举个例子：我们要为游戏充值点券，那么游戏就需要有一个充值的业务，而这个业务其实只需要在数据库中为你的账号修改一下余额即可。因此业务是我们常说的功能名称（转账、办卡、注册、登录、下单、更换头像等等），而增删改查方法只是简单的对表数据做操作，看不出来具体要做什么事情，但是业务却是要由增删改查方法构成的。上面提到的充值就是一个业务方法，这个业务需要我们对账户余额做修改操作（这里的修改就属于增删改查方法），而麻烦一点的转账业务却需要分解为（首先查询A的账户余额够不够，不够则转账失败；够的话就对账户余额做修改操作：减少钱，然后再对B的账户余额做修改操作：增加钱，一个转账的业务才算完成），由此可见，一个业务方法将会由多个增删改查方法构成

​        那么student这张表相关的业务方法就需要写在一个业务的接口当中，名为StudentService，该接口只需要描述业务方法的大致内容即可

![Snipaste_2022-04-18_21-16-28](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_21-16-28.png)

serviceImpl：和daoimpl类似，用于实现service层并重写抽象方法而写

![Snipaste_2022-04-18_21-20-38](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_21-20-38.png)

controller：撰写供浏览器访问的服务路径，一般浏览器上写的路径就是由这一层来声明

![Snipaste_2022-04-18_21-31-38](G:\Desktop\学习笔记\SpringMVC理解\Snipaste_2022-04-18_21-31-38.png)