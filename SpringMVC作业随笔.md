[TOC]

## SpringMVC作业随笔

环境

MtEclipse springmvc

### 1.配置web.xml

```xml-dtd
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>SpringMVC-work1-wink</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  
<!--配置文件加载监听器-->
<!-- 启动web容器，(加载配置文件)自动装配applicationContext.xml配置信息-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
<!-- 配置applicationContext.xml -->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>
<!-- 配置前端控制器 -->
<!-- 配置DispatchServlet 的核心控制器 -->
  <servlet>
  	<servlet-name>DispatcherServlet</servlet-name>
  	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  	<load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
  	<servlet-name>DispatcherServlet</servlet-name>
  	<url-pattern>*.form</url-pattern>
  </servlet-mapping>
  
  
    <!-- 编码 -->
  <filter>
  	<filter-name>a</filter-name>
  	<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
  	<init-param>
  		<param-name>encoding</param-name>
  		<param-value>UTF-8</param-value>
  	</init-param>
  </filter>
  <filter-mapping>
  	<filter-name>a</filter-name>
  	<url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
```

