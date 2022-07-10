[TOC]



## hibernate课堂随笔

### 环境配置

​	MyEclipse   mysql-connector-java-5.0.7-bin .jar

### 1.连接数据库

db browser

> jdbc:mysql://localhost:3306/< name>?useUnicode=true&characterEncoding=UTF-8



```java
//手写 util包
<!DOCTYPE hibernate-configuration PUBLIC
          "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
          "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
	
	<session-factory>
    	//数据库配置
		<property name="dialect">
			org.hibernate.dialect.MySQLDialect
		</property>
		<property name="connection.url">
			<![CDATA[jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8]]>
		</property>
		<property name="connection.username">root</property>
		<property name="connection.driver_class">
			com.mysql.jdbc.Driver
		</property>
		<property name="myeclipse.connection.profile">wnikdb</property>
            //之后提添加的实体类映射
		<mapping resource="com/wink/util/Products.hbm.xml" />
       
	</session-factory>

</hibernate-configuration>
```



### 2.orm映射

1. 创建domain空包
2. 选择项目文件  与POJO创建映射  创建实体类

3. id Generator 选择native 自动适配

   

```java
//手写
//自己写实体类 参数类型和数据库类型保持一致
//实体类xml 
<hibernate-mapping>
    
    <class name="com.wink.util.Products"//类路径 table="products"//表名 catalog="test">//数据库名
        //id设置主键  generator class 后为自增策略 assigned为不自增
        <id name="pno" type="java.lang.Integer">
            <column name="pno" />
            <generator class="assigned" />
        </id>
                
        <property name="pname" type="java.lang.String">
            <column name="pname" length="20" />
        </property>
        <property name="price" type="java.lang.Integer">
            <column name="price" />
        </property>
        <property name="psize" type="java.lang.Integer">
            <column name="psize" />
        </property>
        <property name="pversion" type="java.lang.String">
            <column name="pversion" length="20" />
        </property>
    </class>
        
</hibernate-mapping>

```





### 3.应用

```java
		Configuration c=new Configuration().configure();//加载主配置文件
		SessionFactory sf=c.buildSessionFactory(); 
		Session session=sf.openSession();
		Users u=(Users) session.get(Users.class, 1);
		System.out.println(u);
```

优化后

```java 
		Session session=HibernateSessionFactory.getSession();
		Users u=(Users) session.get(Users.class, 1); 
		System.out.println(u);  //查
		Users u1=new Users("wink","wij");//增 注意主键设置自增
		session.save(u1);
		
```

## 作业 		创建两个表 多对一关系

实现基本数据库操作  不自动生成

### 1.建表

student（从表）    classes（主表）

### 2.连接数据库配置hibernate

myeclipse

```java
<!DOCTYPE hibernate-configuration PUBLIC
          "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
          "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

<session-factory>
	<property name="dialect">
		org.hibernate.dialect.MySQLDialect
	</property>
	<property name="connection.url">
		<![CDATA[jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8]]>
	</property>
	<property name="connection.username">root</property>
	<property name="connection.driver_class">
		com.mysql.jdbc.Driver
	</property>
	<property name="show_sql">true</property>
	<property name="format_sql">true</property>


</session-factory>

</hibernate-configuration>
```

### 3.创建实体类

对应表Student Classes

### 4.创建实体类映射xml

```java
<!DOCTYPE hibernate-mapping PUBLIC
          "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
          "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
	<class	name="类路径" catalog="数据库名" table="表名">
        //主键
		<id	name="cno" type="int">
			<column name="cno" length="10"></column>
        //主键增长类型
			<generator class="native"></generator>
		</id>
		<property name="cname" type="java.lang.String">
			<column name="cname" length="10"></column>
		</property>
          //多对一关系 外键
         <many-to-one name="类引用" class="类路径" column="外键" cascade="save-update"></many-to-one>
	</class>
</hibernate-mapping>  
        
        
        
        
        
```

### 5.在hibernate中添加实体类映射路径

```java
<mapping resource="路径"/>
```

### 6.测试

```java
		//查
		Session session=HibernateSessionFactory.getSession();
		Student stu=(Student) session.get(Student.class, 1);
		System.out.println(stu);
		//增 两个表都增 
		Session session=HibernateSessionFactory.getSession();
		Transaction t=session.beginTransaction();
		Classes c=new Classes("哈哈哈");
		Student stu=new Student("tym", 14, "女");
		stu.setCla(c);
		session.save(stu);
		t.commit();
		session.close();



```

##  作业二 一对多

注意的地方

### 1.主表实体类

创建set集合存储从表内容

### 2.映射

```java
<set name="to" cascade="save-update" inverse="true">
			<key column="news_id"></key>
			<one-to-many class="com.wink.domain.Tcomment"/>
</set>
```

