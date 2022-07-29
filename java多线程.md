[TOC]



## java多线程

  

> **程序**是指令和数据的有序集合，本身没有任何运行的含义，是一个静态的概念。
>
> **进程**则是执行程序的一次执行过程，是一个动态概念。是系统资源分配的单位。
>
> 一个进程中可以包含多个**线程**，当然一个进程中至少有一个线程，不然没有存在的意义。线程是cpu调度和执行的单位

###  创建一个多线程

**方法一** 继承Thread类

```java
//创建线程方式一：继承Thread类，重写run（）方法，调用start开启线程
public class Test extends Thread{
    //线程入口点
    @Override
    public void run() {
        super.run();
        //线程体
        for (int i = 0; i < 20; i++) {
            System.out.println("run方法"+i);
        }
    }
    public static void main(String[] args) {
        //main线程，主线程
        //创建一个线程对象
        Test t1=new Test();

        //调用start 开启线程
        t1.start();
        
        for (int i = 0; i < 20; i++) {
            System.out.println("主线程"+i);
        }
    }
}
//可以看到在执行start方法的时候 也会继续进行main方法
```

```java
//示例 多线程下载图片
//需要commons包
public class TestThread2 extends  Thread{
    private String url;
    private String name;

    public TestThread2(String url, String name) {
        this.url = url;
        this.name = name;
    }
	//线程体
    @Override
    public void run() {
        WebDownloader webDownloader=new WebDownloader();
        webDownloader.downloader(url,name);
        System.out.println("下载了"+name);
    }

    public static void main(String[] args) {
        TestThread2 t1=new TestThread2("https://img2.baidu.com/it/u=1035908580,4028875110&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1000","1.jpg");
        TestThread2 t2=new TestThread2("https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500","2.jpg");
        TestThread2 t3=new TestThread2("https://img2.baidu.com/it/u=2147843660,3054818539&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313","3.jpg");
        t1.start();
        t2.start();
        t3.start();
    }

}
//下载器类
class WebDownloader{
    public void downloader(String url,String name){
        try {
            FileUtils.copyURLToFile(new URL(url),new File(name));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("io异常");
        }
    }
}

//结果 顺序不同
```

**方法二** 继承Runnable接口

```java
public class TestThread3 implements Runnable{

    @Override
    public void run() {
        //run方法线程体
        for (int i = 0; i < 20; i++) {
            System.out.println("run方法"+i);
        }
    }

    public static void main(String[] args) {
        //创建runnable接口实现类对象
        TestThread3 t=new TestThread3();

        //创建线程对象，通过线程对象来开启我们的线程，代理
        Thread thread =new Thread(t);
        thread.start();

        for (int i = 0; i < 20; i++) {
            System.out.println("主线程"+i);
        }
    }
}

```

```java
//示例
//练习Thread，实现多线程同步下载图片
public class TestThread2 implements Runnable{
    private String url;
    private String name;

    public TestThread2(String url, String name) {
        this.url = url;
        this.name = name;
    }

    @Override
    public void run() {
        WebDownloader webDownloader=new WebDownloader();
        webDownloader.downloader(url,name);
        System.out.println("下载了"+name);
    }

    public static void main(String[] args) {
        TestThread2 t1=new TestThread2("https://img2.baidu.com/it/u=1035908580,4028875110&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1000","1.jpg");
        TestThread2 t2=new TestThread2("https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500","2.jpg");
        TestThread2 t3=new TestThread2("https://img2.baidu.com/it/u=2147843660,3054818539&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313","3.jpg");
        new Thread(t1).start();
        new Thread(t2).start();
        new Thread(t3).start();
    }

}
//下载器
class WebDownloader{
    public void downloader(String url,String name){
        try {
            FileUtils.copyURLToFile(new URL(url),new File(name));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("io异常");
        }
    }
}
```

**方法三 实现Callable接口**

```java
public class MyCallable implements Callable<Boolean> {

    @Override
    public Boolean call() throws Exception {
        for (int i = 0; i < 100; i++) {
            System.out.println("Callale:"+i);
        }
        return false;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable myCallable1 = new MyCallable();
        MyCallable myCallable2 = new MyCallable();
        MyCallable myCallable3 = new MyCallable();

        //创建执行务
        ExecutorService ser= Executors.newFixedThreadPool(3);
        //提交执行
        Future<Boolean> res1=ser.submit(myCallable1);
        Future<Boolean> res2=ser.submit(myCallable2);
        Future<Boolean> res3=ser.submit(myCallable3);
        //获取结果
        boolean r1=res1.get();
        boolean r2=res2.get();
        boolean r3=res3.get();
        //关闭服务
        ser.shutdown();
    }
}
```



### 初识并发

多个线程同时操作一个例子

```java
//多线程同时操作同一个对象
//多线程买票


//问题：会出现多个人买同一张票
public class TestThread4 implements Runnable{


    private int ticketNums=10;


    @Override
    public void run() {
        while(true){
            if (ticketNums<=0){
                break;
            }
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName()+"拿到第"+ticketNums--+"票");
        }
    }

    public static void main(String[] args) {
        TestThread4 t=new TestThread4();

        new Thread(t,"tym").start();
        new Thread(t,"wink").start();
        new Thread(t,"jhn").start();
    }
}
//结果
jhn拿到第10票
tym拿到第8票
wink拿到第9票
jhn拿到第7票
tym拿到第6票
wink拿到第7票
tym拿到第4票
wink拿到第5票
jhn拿到第3票
tym拿到第1票
wink拿到第2票
jhn拿到第0票
```

### 静态代理(线程底部实现原理)

```java
//静态代理模式
//真实对象和代理对象都要实现同一个接口
//代理对象要代理真实角色
//好处:
    //代理对象可以做很多真实对象做不了的事情
    //真实对象可以专注做自己的事情
public class StaticProxy {

    public static void main(String[] args) {

        You you=new You();
        //线程底部原理
//        new Thread( ()-> System.out.println("我爱你")).start();

        new WeddingCompany(you).HappyMarry();
    }

}

interface  Marry{
     void HappyMarry();
}
//真实角色
class You implements Marry{
    @Override
    public void HappyMarry() {
        System.out.println("结婚了");
    }
}

//代理
class WeddingCompany implements Marry{

    private Marry target;

    public  WeddingCompany(Marry target){
        this.target=target;
    }

    @Override
    public void HappyMarry() {
        before();
        this.target.HappyMarry();//真实对象
        after();
    }
    private void after() {
        System.out.println("结婚之后，收尾款");
    }
    private void before() {
        System.out.println("结婚之前，布置婚礼");
    }

}


```

### Lambda表达式

> 任何接口，如果只包含唯一一个抽象方法，那么它就是一个函数式接口。 

```java
//推导Lamda表达式

public class Lamda {

    //2.静态内部类
    static class Like2 implements ILike{
        @Override
        public void lamda() {
            System.out.println("111111Ladma2");
        }
    }

    public static void main(String[] args) {
        //1.类
        ILike like=new Like();
        like.lamda();

        //2.静态内部类
        like=new Like2();
        like.lamda();


        //3.局部内部类
        class Like3 implements ILike{
            @Override
            public void lamda() {
                System.out.println("111111Ladma3");
            }
        }
        like =new Like3();
        like.lamda();

        //4.匿名内部类
        like =new ILike() {
            @Override
            public void lamda() {
                System.out.println("111111Ladma4");
            }
        };
        like.lamda();

        //5.Lamda
        like = () -> {
            System.out.println("111111Ladma5");
        };
        like.lamda();

    }

}


interface ILike{
    void lamda();
}
//1.类
class Like implements ILike{
    @Override
    public void lamda() {
        System.out.println("111111Ladma");
    }
}
```

**简化**

```java
public class TestLamda2 {
    public static void main(String[] args) {
        ILove love=(int a)->{
                System.out.println("a="+a);
        };
        //简化1.去掉参数类型
        love=(a)->{
            System.out.println("a="+a);
        };
        //简化2.去掉括号(只有一个参数)
        love=a->{
            System.out.println("a="+a);
        };
        //简化3.去掉花括号(方法只有一行)
        love=a->System.out.println("a="+a);

        love.love(520);
    }
}

interface ILove{
    void love(int a);
}

```



### 线程state



#### 线程停止

- 不推荐JDK的stop()、destory()
- 推荐线程自己停下来
- 建议使用一个标签位进行中止变量 当flag=false，则中止线程运行





```java
public class ThreadStop implements Runnable{
	//线程停止标志
    private boolean flag=true;
    @Override
    public void run() {
        int i=0;
        while(flag){
            System.out.println("线程运行中。。。"+i++);
        }
    }
    public void stop(){
        this.flag=false;
    }

    public static void main(String[] args) {

        ThreadStop threadStop = new ThreadStop();
        new Thread(threadStop).start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("main"+i);
            if(i==998){
                threadStop.stop();
                System.out.println("线程停止");
            }
        }
    }
}
```

#### 线程睡眠

```java
//计时器 不过cpu调度也会需要时间 不准确
public class ThreadSleep {
	//倒计时
    public static void turnDown() throws InterruptedException {
        int num=10;
        while (true){
            Thread.sleep(1000);
            System.out.println(num--);
            if (num<=0){
                break;
            }
        }
    }
    //打印系统时间
    public static void systemTime() throws InterruptedException {
        Date date=new Date(System.currentTimeMillis());
        while(true){
            Thread.sleep(1000);
            System.out.println(new SimpleDateFormat(" yy-MM hh:mm:ss").format(date));
            date=new Date(System.currentTimeMillis());
        }
    }
    public static void main(String[] args) throws InterruptedException {
        turnDown();
    }
}
```

#### 线程礼让

```java
//不一定会成功 由cpu决定

public class ThreadYield implements Runnable{

    @Override
    public void run() {
        Thread.yield();
        System.out.println(Thread.currentThread().getName()+"礼让");
        System.out.println(Thread.currentThread().getName()+"线程开始");
        System.out.println(Thread.currentThread().getName()+"线程结束");
    }

    public static void main(String[] args) {
        ThreadYield threadYield1 = new ThreadYield();
        ThreadYield2 threadYield2 = new ThreadYield2();
        Thread thread1 = new Thread(threadYield1,"线程1");
        Thread thread2 = new Thread(threadYield2,"线程2");
        thread1.start();
        thread2.start();
    }
}
class ThreadYield2 implements Runnable{

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName()+"线程开始");
        System.out.println(Thread.currentThread().getName()+"线程结束");
    }
}
```

#### 线程插队

```java
public class ThreadJoin implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 300; i++) {
            System.out.println("vip"+i);
        }
    }
    public static void main(String[] args) throws InterruptedException {
        ThreadJoin threadJoin = new ThreadJoin();
        Thread thread = new Thread(threadJoin);


        for (int i = 0; i < 300; i++) {
            if (i==200){
                thread.start();
                thread.join();
            }
            System.out.println("main"+i);
        }
    }
}
```



#### 线程状态

线程可以处于以下状态之一：

- `NEW`
  尚未启动的线程处于此状态。  
- `RUNNABLE`
  在Java虚拟机中执行的线程处于此状态。  
- `BLOCKED`
  被阻塞等待监视器锁定的线程处于此状态。  
- `WAITING`
  正在等待另一个线程执行特定动作的线程处于此状态。  
- `TIMED_WAITING`
  正在等待另一个线程执行动作达到指定等待时间的线程处于此状态。  
- `TERMINATED`
  已退出的线程处于此状态。 

```java
public class ThreadState {
    public static void main(String[] args) throws InterruptedException {
        Thread thread=new Thread(()->{
            for (int i = 0; i < 5; i++) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("//////////");
        });
        //观察线程启动前状态
        Thread.State state = thread.getState();
        System.out.println(state);  //new
        //观察线程启动后状态
        thread.start();
        state=thread.getState();   //runnable
        System.out.println(state);

        while (state!=Thread.State.TERMINATED){ //线程结束 terminated
            Thread.sleep(100);
            state=thread.getState();     //线程休眠时候 timed_waiting
            System.out.println(state);
        }
    }
}
```

### 线程优先级 Priority

> 优先级低知识意味着获得调度的概率低 并不是优先级低就不会被调用，这都是看CPU的调度

```java
public class ThreadPriority implements Runnable{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "-->" + Thread.currentThread().getPriority());
       
    }
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName() + "-->" + Thread.currentThread().getPriority());
        ThreadPriority threadPriority = new ThreadPriority();
        Thread t1=new Thread(threadPriority,"t1 Priority");
        Thread t2=new Thread(threadPriority,"t2 Priority");
        Thread t3=new Thread(threadPriority,"t3 Priority");
        Thread t4=new Thread(threadPriority,"t4 Priority");
        Thread t5=new Thread(threadPriority,"t5 Priority");

        t2.setPriority(Thread.MIN_PRIORITY);
        t3.setPriority(3);
        t4.setPriority(7);
        t5.setPriority(Thread.MAX_PRIORITY);
        t1.start();
        t2.start();
        t3.start();
        t4.start();
        t5.start();
    }
}
```

### 守护线程 daemon

- 线程分为**用户线程**和**守护线程**
- 虚拟机必须确保用户线程执行完毕
- 虚拟机不用等待守护线程执行完毕
- 如,后台记录操作日志,监控内存,垃圾回收等

```java
public class ThreadDaemon {
    public static void main(String[] args) {
        You you = new You();
        God god = new God();
        Thread thread = new Thread(god);
        thread.setDaemon(true);//守护线程
        thread.start();

        new Thread(you).start();

    }
}
class You implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 36500; i++) {
            System.out.println("你一生都开心活着");
        }
        System.out.println("GoodBye World!");
    }
}
class God implements Runnable{

    @Override
    public void run() {
        while (true){
            System.out.println("上帝保佑你");
        }
    }
}
```

### 线程同步

#### ArrayList线程不安全例子

```java
public class UnSafeList {
    public static void main(String[] args) {
        ArrayList<String> lists = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            new Thread(()->{
                lists.add(Thread.currentThread().getName());
            }).start();
        }
        System.out.println(lists.size());
    }
}
================================
// 运行结果为 976
    
    //synchronized 锁一下
    public class UnSafeList {
        public static void main(String[] args) {
            ArrayList<String> lists = new ArrayList<>();
            synchronized (lists){
                for (int i = 0; i < 100; i++) {
                    new Thread(()->{
                        lists.add(Thread.currentThread().getName());
                        System.out.println(lists.size());
                    }).start();
                }
            }
        }
    }
```

#### juc线程安全例子

```java
public class TestJUC {
    public static void main(String[] args) throws InterruptedException {
        CopyOnWriteArrayList<String> list=new CopyOnWriteArrayList<String>();
        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                list.add(Thread.currentThread().getName());
            }).start();
        }
        Thread.sleep(100);
        System.out.println(list.size());
    }
}
```

### 死锁

**产生死锁的四个必要条件：**

1. 互斥条件：一个资源每次只能被一个进程使用。
2. 请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放。
3. 不剥夺条件 : 进程已获得的资源，在末使用完之前，不能强行剥夺。
4. 循环等待条件 : 若干进程之间形成一种头尾相接的循环等待资源关系。



#### lock锁

```java
public class TestLock implements Runnable{
    private int ticket=1000;
    private final ReentrantLock lock=new ReentrantLock();

    @Override
    public void run() {
        try {
            lock.lock();
            while (ticket>0){
                System.out.println(Thread.currentThread().getName()+"   "+ticket--);
            }
        }  finally {
            lock.unlock();
        }
    }
    public static void main(String[] args) {
        TestLock testLock = new TestLock();
        Thread thread1 = new Thread(testLock,"t1");

        Thread thread2 = new Thread(testLock,"t2");
        thread2.start();
        thread1.start();
    }
}
```

#### synchronized 与 Lock 的对比

- Lock是显式锁（手动开启和关闭锁，别忘记关闭锁）synchronized是隐式锁，出了作用域自动释放
- Lock只有代码块锁，synchronized有代码块锁和方法锁使用Lock锁
- JVM将花费较少的时间来调度线程，性能更好。并且具有更好的扩展性（提供更多的子类）
- 优先使用顺序：
  Lock > 同步代码块（已经进入了方法体，分配了相应资源）> 同步方法（在方法体之外）

### 线程协作

| 方法名             | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| wait()             | 表示线程一直等待 , 直到其他线程通知 , 与sleep不同 , 会释放锁 |
| wait(long timeout) | 指定等待的毫秒数                                             |
| notify()           | 唤醒一个处于等待状态的线程                                   |
| notifyAll()        | 唤醒同一个对象上所有调用wait()方法的线程 , 优先级别高的线程优先调 |











