[TOC]



### Mybatis 随笔

环境：myeclipse、Mybatis包、mysql包

#### 1.导入Mybatis、mysql包

导入的包放在lib文件夹下

接着build path为包添加路径

#### 2.配置Mybatis-config文件

引入文头文件 定义文档规则

```java
<!DOCTYPE configuration  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"  
  "http://mybatis.org/dtd/mybatis-3-config.dtd"> 

<configuration>
    //数据库连接配置
  	<environments default="default">
  		<environment id="default">
  			<transactionManager type="JDBC"></transactionManager>
  			<dataSource type="POOLED">
  				<property name="driver" value="com.mysql.jdbc.Driver"/>
  				<property name="url"
    			 value="jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=utf8"/>
  				<property name="username" value="root"/>
  				<property name="password" value=""/>
  			</dataSource>
  		</environment>
  	</environments>
    
    //Mabatis框架下 sql语句都存储在mappers配置文件中
  	<mappers>
  		<mapper resource="com/wink/mapper/ProductsMapper.xml"/>
  	</mappers>
  	
</configuration>
```

#### 3.创建实体类

domain包里定义一个javaBean

#### 4.mapper映射

```java 
//创建一个接口类
public interface ProductsMapper {
	public List<Products> selectAll();
}
//创建接口类xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="com.wink.mapper.ProductsMapper">
  	<select id="selectAll" resultType="com.wink.domain.Products">
  		select * from products
  	</select>
  </mapper>
```



#### 5.test类

```java
public class Test {
	public static void main(String[] args) throws Exception   {
		Reader r=Resources.getResourceAsReader("Mybatis-config.xml");
		
		SqlSessionFactory ssf=new SqlSessionFactoryBuilder().build(r);
		SqlSession session=ssf.openSession();
		
		ProductsMapper pm=session.getMapper(ProductsMapper.class);
		//遍历获取
		List<Products> list=pm.selectAll();
		for(Products p:list){
			System.out.println(p);
		}
	}
}
```

总结：总共有三个包 

domain(实体类)  例如：Student

mapper(Mybatis映射)例如StudentMapper  StudentMapper.xml

test(测试类) 

### 作业： 	创建含有外键的表 实现级联查询

两张表对应两个实体类

两个Mapper映射



```xml
//两张表 主表为Classes 从表为 Student
//实体类中外键应改为主表的类
//例如 Student  中 应有 private Classes cs;

//Mapper中应该有association对应外键的类
//处理实体类属性和对应表的列名不相同
  <resultMap type="com.wink.domain.Student" id="a">
  	<id property="sno" column="sno"/>
  	<result property="sname" column="sname"/>
  	<result property="sage" column="sage"/>
  	<result property="gender" column="gender"/>
  	
	<association property="cl" javaType="com.wink.domain.Classes" >
		<id property="cno" column="cno"/>
		<result property="cname" column="cname"/>
	</association>
	
  </resultMap>
//具体查询方法
	<select   id="selectAll"  resultMap="a">
  		select s.sno,s.sname,s.sage,c.cno,c.cname
      from student s,classes c where s.cno=c.cno
  	</select>
```

