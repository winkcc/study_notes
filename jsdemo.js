var student={
    sno:1,
    friends:["wink","tym"],

    test1:function(data){
        console.log(data);
    },
    //简化
    test2(data){
        console.log(data);
    },
    //箭头函数
    test3:(data)=> {
        console.log(data);
    },
    //箭头函数,当参数只有一个可以省略括号
    //使用箭头函数this不在指向本身
    test4:data=> {
        console.log(data);
        
    }
};


// console.log(student.sno);
// student.showId();
// console.log(student.friends[0]);
student.test4(111);

