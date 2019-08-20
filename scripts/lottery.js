$(document).ready(function(){
  //随机数生成范围
  var MIN = 1;
  var MAX = 180;

  //p标签生成器
  function create_p(content) {
    var newP = document.createElement('p');
    newP.innerHTML = content;
    return newP;
  }

  //指定生成不重复数字个数并推送到相应的前端位置
  function push_n(n, id) {
    var arr = random_n(n);
    if(arr == undefined) {
      return false;
    }

    for (var i = 0; i < arr.length; i++) {
      if(arr[i] == undefined) {
        continue;
      }
      var index = i + 1;
      var p = create_p("第" + index + "个：" + arr[i]);
      $(id).append(p);
    }

    return true;
  }

  //清空指定round的结果内容
  function clear_round(id) {
    $(id).html("");
  }

  //重置所有
  function reset_all() {
    clear_round("#round1");
    clear_round("#round2");
    clear_round("#round3");
    reset_numberMap();
    $("#begin").html("Begin: Round 1");
  }

  //初始化begin按钮内容状态，并放入一个map中
  var beginMap = new Map();
  beginMap.set("Begin: Round 1", function(){
    var flag = push_n(30, "#round1");
    $("#begin").html("Begin: Round 2");
    return flag;
  });

  beginMap.set("Begin: Round 2", function(){
    var flag = push_n(20, "#round2");
    $("#begin").html("Begin: Round 3");
    return flag;
  });

  beginMap.set("Begin: Round 3", function(){
    var flag = push_n(10, "#round3");
    $("#begin").html("Reset");
    return flag;
  });

  beginMap.set("Reset", function(){
    reset_all();
  });

  //定义记录生成数字的map，来确定哪些数字已经生成
  var numberMap = new Map();
  for (var i = MIN; i <= MAX; ++i) {
    numberMap.set(i, false);
  }

  //重置记录数字的map
  function reset_numberMap() {
    for (var i = MIN; i <= MAX; ++i) {
      numberMap.set(i, false);
    }
  }

  //定义生成从minNum到maxNum的随机数的函数
  //引用于https://www.cnblogs.com/starof/p/4988516.html
  function randomNum(minNum, maxNum){ 
    switch(arguments.length){ 
      case 1: 
        return parseInt(Math.random()*minNum+1,10); 
        break; 
      case 2: 
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
      default: 
        return 0; 
        break; 
      } 
  }

  //生成指定范围不重复的数字
  function random_num_unique(min, max) {
    while(true) {
      var temp = randomNum(min, max);
      if (numberMap.get(temp) == undefined) {
        return false;
      }
      if (numberMap.get(temp) == true) {
        continue;
      }
      if (numberMap.get(temp) == false) {
        numberMap.set(temp, true);
        return temp;
      }
    }
  }

  //定义生成不重复指定数目的随机数的函数
  function random_n(n) {
    var result = new Array(0);
    for (var i = 0; i < n; ++i) {
      var item = random_num_unique(MIN, MAX);
      if (item == false) {
        return false;
      }
      result.push(item);
    }
    return result;
  }

  //定义begin按钮的click响应方法
  $("#begin").click(function(){
    //根据目前的状态来进行相应的行为
    var stat = $("#begin").html();
    var func = beginMap.get(stat);
    if (func == undefined) {
      reset_all();
    }

    var flag = func();
    
    if (flag == false) {
      reset_all();
    } 
    
  });



})
