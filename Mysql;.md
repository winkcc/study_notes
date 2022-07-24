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