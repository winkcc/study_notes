# Java-IO

字节流

字符流

处理流

### 代码展示

#### 字符流-输入

```java
//输入
public class InputStreamDemo {
    public static void main(String[] args) {
        int b=0;
        //英文  字节流
        //FileInputStream in=null;
        //中文  字符流
        FileReader in=null;
        File file=new File("D:\\CODE_field\\JAVA_LEARN\\resources\\ioDemo.txt");

        try {
            in=new FileReader(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        //记录字数
        long num=0;

        try {
            while((b=in.read())!=-1){
                System.out.print((char)b);

                num++;
            }
            in.close();
            System.out.println();
            System.out.println("字数:"+num);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
```

#### 字符流-输出

```java
public class OutPutStreamDemo {
    public static void main(String[] args) {
        //转换作用
        int b;
        File infile = new File("D:\\CODE_field\\JAVA_LEARN\\resources\\ioDemo.txt");
        File outfile = new File("D:\\CODE_field\\JAVA_LEARN\\resources\\ioOutPutStreamDemo.txt");

        FileReader in = null;
        FileWriter out = null;
        try {
            in = new FileReader(infile);
            out = new FileWriter(outfile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            in.close();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("============结束============");
        }
    }
}

```

#### 处理流-缓冲流-mark reset

```java
public class BufferedInputStreamDemo {
    public static void main(String[] args) {
        FileInputStream fis;
        try {
            fis = new 		                       FileInputStream("D:\\CODE_field\\JAVA_LEARN\\resources\\bufferedInputStream.txt");
            // 在FileInputStream节点流的外面套接一层处理流BufferedInputStream
            BufferedInputStream bis = new BufferedInputStream(fis);
            int c;
            System.out.println((char) bis.read());
            System.out.println((char) bis.read());
            //在当前位置标记，可以可以在向后100个字符中使用reset方法
            bis.mark(100);
            for (int i = 0; i <= 10 && (c = bis.read()) != -1; i++) {
                System.out.print((char) c);
            }
            System.out.println();
            bis.reset();// 重新回到原来标记的地方
            for (int i = 0; i <= 10 && (c = bis.read()) != -1; i++) {
                System.out.print((char) c);
            }
            bis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### 第一种处理流-缓冲流-输入输出

```java
public class BufferedWriterDemo {
    public static void main(String[] args) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\CODE_field\\JAVA_LEARN\\resources\\butteredWriterDemo.txt"));
            //在节点流FileWriter的外面再套一层处理流BufferedWriter
            String s;
            for (int i = 0; i < 100; i++) {
                s = String.valueOf(Math.random());
                bw.write(s);
                bw.newLine();
            }
            //调用flush()方法清空缓冲区
            bw.flush();
            BufferedReader br = new BufferedReader(new FileReader("D:\\CODE_field\\JAVA_LEARN\\resources\\butteredWriterDemo.txt"));

            while ((s = br.readLine()) != null) {
                System.out.println(s);
            }
            bw.close();
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### 第二种处理流-转换流

```java
//将字节流转换为字符流 提高效率
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("D:\\char.txt"));
osw.write("MircosoftsunIBMOracleApplet");

// 使用getEncoding()方法取得当前系统的默认字符编码
System.out.println(osw.getEncoding());

// 如果在调用FileOutputStream的构造方法时没有加入true，那么新加入的字符串就会替换掉原来写入的字符串，在调用构造方法时指定了字符的编码
osw = new OutputStreamWriter(new FileOutputStream("D:\\char.txt", true), "ISO8859_1");
```

#### 第三种处理流-数据流

```java
ByteArrayOutputStream baos = new ByteArrayOutputStream();
//在调用构造方法时，首先会在内存里面创建一个ByteArray字节数组
DataOutputStream dos = new DataOutputStream(baos);
//在输出流的外面套上一层数据流，用来处理int，double类型的数


ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());

DataInputStream dis = new DataInputStream(bais);
System.out.println(dis.readDouble());//先写进去的就先读出来，调用readDouble()方法读取出写入的随机数
System.out.println(dis.readBoolean());//后写进去的就后读出来，这里面的读取顺序不能更改位置，否则会打印出不正确的结果
```

