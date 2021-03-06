# Java-设计模式

## 一、设计模式六大原则

### 1.开闭原则

 对扩展开放，对修改关闭（尽可能对代码少修改）

### 2.里氏替换原则

 面向对象基本原则之一，任何父类出现的地方，子类都可以出现，也就是子类可以替换父类的任何功能（体现了父类的可扩展性）

### 3.依赖倒转原则

 尽可能面向接口编程，依赖接口而不依赖类

### 4.接口隔离原则

 一个类如果能实现多个接口，尽可能实现多个，为了降低依赖，降低耦合

### 5.最少知道原则

 一个实体尽可能少的与其他实体产生相互关联关系，将实体的功能独立

### 6.合成复用原则

 尽量使用合成，聚合的方式，而不使用继承

## 二、设计模式的分类

**Java设计模式分为三大类**

- 创建型模式：共5种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式
- 结构型模式：共7种：适配器模式、装饰器模式、代理模式、桥接模式、外观模式、组合模式、享元模式
- 行为型模式：共11种：策略模式、模板方法模式、观察者模式、责任链模式、访问者模式、中介者模式、迭代器模式、命令模式、状态模式、备忘录模式、解释器模式

## 三、设计模式具体实现

### 1.单例模式



### 2.工厂模式

> 实例化对象不适用new，用工厂代替
>
> 将选择实现类，创建对象统一管理和控制。从而将调用者跟我们的实现类解耦

- 简单工厂模式	用来生产同一等级结构中的任意产品
- 工厂方法模式        用来生产同一等级结构中的固定产品

```java

```

### 3.抽象工厂模式        

> 围绕一个超级工厂创建其他工厂



### 4.建造者模式

> 一种对象构建的设计模式，它可以将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。





4、观察者模式；5、适配器(Adapter)模式；6、代理模式；7、装饰模式。

