# MYSQL

## 基础操作

### 创建一张用户表

```mysql
CREATE TABLE `tb_user` (
	`user_id` INT NOT NULL auto_increment,
	`user_name` VARCHAR ( 10 ) NOT NULL,
	`user_age` INT,
	`user_email` VARCHAR ( 20 ),
	PRIMARY KEY ( `user_id` ) 
) ENGINE = INNODB DEFAULT CHARSET = utf8;
```

### 向表中插入一条数据

```mysql
INSERT INTO tb_user
VALUES
	( 1, 'wink', 18, '244072@qq.com' );
```

### 向表中插入一百万条数据

```mysql
delimiter $$   -- 存储过程中结束符 $$
CREATE FUNCTION mock_data () RETURNS INT
BEGIN
	DECLARE num int DEFAULT 1000000;
	DECLARE i int DEFAULT 0;
	WHILE i < num DO
		INSERT INTO tb_user(`user_name`,`user_age`,`user_email`) VALUES(CONCAT('用户',i),FLOOR(CONCAT('18',RAND()*((100-1)+1))),UUID());
		SET i=i+1;
	END WHILE;
	RETURN i;
END
-- 执行函数
SELECT mock_data();
```

### 分析索引

```mysql
-- 不加索引
select * from tb_user where user_name='用户99999'; -- 0.302s
```

![1658566857696](G:\Desktop\Study_notes\Mysql;.assets\1658566857696.png)

```mysql
-- 加索引
-- create 索引类型  索引名称 on 表名(字段名);
create index id_user_name on tb_user(`user_name`); -- 0.018s
```

![1658568480998](G:\Desktop\Study_notes\Mysql;.assets\1658568480998.png)



## tips

> 对于索引列来最好使用union all，因复杂的查询【包含运算等】将使or、in放弃索引而全表扫描，除非你能确定or、in会使用索引
>
> 对于只有非索引字段来说你就老老实实的用or 或者in，因为 非索引字段本来要全表扫描而union all 只成倍增加表扫描的次数
>
> 对于既有索引字段【索引字段有效】又包含非索引字段来时，按理你也使用or 、in或者union all 都可以，推荐使用or、in。

```mysql
-- 条件查询时
-- 方法一
SELECT 
	name,population,area
FROM
	World
WHERE
	area>=3000000 OR population>=25000000
-- 方法二
SELECT
    name, population, area
FROM
    world
WHERE
    area >= 3000000

UNION

SELECT
    name, population, area
FROM
    world
WHERE
    population >= 25000000
;

```

## 事务

>  https://javaguide.cn/database/mysql/mysql-questions-01.html#mysql-%E4%BA%8B%E5%8A%A1

### ACID

1. **原子性**（`Atomicity`） ： 事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；
2. **一致性**（`Consistency`）： 执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
3. **隔离性**（`Isolation`）： 并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的；
4. **持久性**（`Durabilily`）： 一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。

> **只有保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。也就是说 A、I、D 是手段，C 是目的！**

### 并发事务出现的问题

在典型的应用程序中，多个事务并发运行，经常会操作相同的数据来完成各自的任务（多个用户对同一数据进行操作）。并发虽然是必须的，但可能会导致以下的问题。

- **脏读（Dirty read）:** 当一个事务正在访问数据并且对数据进行了修改，而这种修改还没有提交到数据库中，这时另外一个事务也访问了这个数据，然后使用了这个数据。因为这个数据是还没有提交的数据，那么另外一个事务读到的这个数据是“脏数据”，依据“脏数据”所做的操作可能是不正确的。
- **丢失修改（Lost to modify）:** 指在一个事务读取一个数据时，另外一个事务也访问了该数据，那么在第一个事务中修改了这个数据后，第二个事务也修改了这个数据。这样第一个事务内的修改结果就被丢失，因此称为丢失修改。 例如：事务 1 读取某表中的数据 A=20，事务 2 也读取 A=20，事务 1 修改 A=A-1，事务 2 也修改 A=A-1，最终结果 A=19，事务 1 的修改被丢失。
- **不可重复读（Unrepeatable read）:** 指在一个事务内多次读同一数据。在这个事务还没有结束时，另一个事务也访问该数据。那么，在第一个事务中的两次读数据之间，由于第二个事务的修改导致第一个事务两次读取的数据可能不太一样。这就发生了在一个事务内两次读到的数据是不一样的情况，因此称为不可重复读。
- **幻读（Phantom read）:** 幻读与不可重复读类似。它发生在一个事务（T1）读取了几行数据，接着另一个并发事务（T2）插入了一些数据时。在随后的查询中，第一个事务（T1）就会发现多了一些原本不存在的记录，就好像发生了幻觉一样，所以称为幻读。

**不可重复读和幻读有什么区别呢？**

- 不可重复读的重点是内容修改或者记录减少比如多次读取一条记录发现其中某些记录的值被修改；
- 幻读的重点在于记录新增比如多次执行同一条查询语句（DQL）时，发现查到的记录增加了。

幻读其实可以看作是不可重复读的一种特殊情况，单独把区分幻读的原因主要是解决幻读和不可重复读的方案不一样。

举个例子：执行 `delete` 和 `update` 操作的时候，可以直接对记录加锁，保证事务安全。而执行 `insert` 操作的时候，由于记录锁（Record Lock）只能锁住已经存在的记录，为了避免插入新记录，需要依赖间隙锁（Gap Lock）。也就是说执行 `insert` 操作的时候需要依赖 Next-Key Lock（Record Lock+Gap Lock） 进行加锁来保证不出现幻读。

### 事务隔离级别

SQL 标准定义了四个隔离级别：

- **READ-UNCOMMITTED(读取未提交)** ： 最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读。
- **READ-COMMITTED(读取已提交)** ： 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生。
- **REPEATABLE-READ(可重复读)** ： 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生。
- **SERIALIZABLE(可串行化)** ： 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。

------

| 隔离级别         | 脏读 | 不可重复读 | 幻读 |
| ---------------- | ---- | ---------- | ---- |
| READ-UNCOMMITTED | √    | √          | √    |
| READ-COMMITTED   | ×    | √          | √    |
| REPEATABLE-READ  | ×    | ×          | √    |
| SERIALIZABLE     | ×    | ×          | ×    |

### 

