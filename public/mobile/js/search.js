$(function(){
 init();         
   function init() {
    renderData();
     /* 
    分析:
    1 需要给搜索按钮绑定一个tap点击事件
    2 事件触发
      a 获取搜索框值txt 做个判断 
        如果 非法 return
        合法-的值
    3 把txt存到本地存储中
      a 获取本地存储的数据(数组字符串)判断有没有数据 有就获取 没有return->[]
      b 把数据(数组)渲染到ul标签里面 为了做删除单个的需要   把索引添加到了a标签上

    4 删除所有
      a 清空 本地存储 removeItem(key)
      b 重新渲染页面
    5 删除单个
      a 先获取 对应的索引
      b 再去做删除 arr.splice(索引,删除几个)
      
     把txt当作参数 跳转到另外的页面

     */

    /*1.给搜索按钮绑定一个tap点击事件 */  
    $(".searchBtn").on("tap",function(){
              // 获取搜索框的值
      var txt = $(".searchTxt").val();

      // 判断txt是否合法
      //  trim 去掉值的左右两边的空格 trim() 方法会从一个字符串的两端删除空白字符
      if (!$.trim(txt)) {
        //console.log("非法");

        // 使用mui内置的提示 显示一会 自己会消失
        mui.toast("非法");
        return;
      } 

      // 3 把txt存到本地存储中
      var ls = localStorage;
      var arr = (ls.getItem("letaoHistory") && JSON.parse(ls.getItem("letaoHistory"))) || [];

      // 循环判断数组中是否已经存在有相同的数据
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (element == txt) {
          // 已经存在了
          // splice 删除数组(索引,要删除几个)
          arr.splice(i, 1);
        }
      }

      // 添加txt到本地存储中 
      // push 从尾部添加一个数据
      // unshift 从头部加一个数据
      arr.unshift(txt);

      // 数组存入本地存储中
      ls.setItem("letaoHistory",JSON.stringify(arr));

      // 跳转页面searchList.html
      location.href = "./searchList.html?key="+txt;  
    })
    // 清除所有历史数据
    $(".clearAll").on("tap", function(){
     localStorage.removeItem("letaoHistory");
    })
    // 绑定移除单个事件
    // 注意 动态生成的dom在绑定事件的时候 要注意先后顺序
    // 先有dom元素 再绑定事件 -> 建议 事件委托 
    $(".his_recond ul").on("tap",".removeItem",function(e){
    console.log(123);
    var aDom = e.target;
    var index = $(aDom).parent().data("index");
    var ls = localStorage;

    var arr = (ls.getItem("letaoHistory") && JSON.parse(ls.getItem("letaoHistory"))) || [];
    arr.splice(index,1);

      var str="";
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      str+=' <li> '+element+' <a data-index='+i+' class="removeItem mui-pull-right" href="javascript:;"><span class="mui-icon mui-icon-closeempty"></span></a> </li>';
    }
    $(".his_recond ul").html(str);

    // 数组存入本地存储中
    ls.setItem("letaoHistory",JSON.stringify(arr));
    })

   }
   //把数据渲染到结构中
   function renderData(){
     // 获取本地存储的数据
      // 如果有数据的话 拿数据 没有 拿空数组  
      var ls = localStorage;
      var arr = (ls.getItem("letaoHistory") && JSON.parse(ls.getItem("letaoHistory"))) || [];
      //console.log(arr);
      var str="";
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];  //data-index='+i+'数据对应的自定义索引
        str+=' <li> '+element+' <a data-index='+i+' class="removeItem mui-pull-right" href="javascript:;"><span class="mui-icon mui-icon-closeempty"></span></a> </li>';
      }
     // console.log(str);
      $(".his_recond ul").html(str);

      //判断是否有数据
    if(arr.length>0){
       //数组长度大于0代表有数据直接让 （没有历史搜索记录）隐藏
       $(".his_info").hide();
    }else{
      //否则没数据让历史搜索记录列表隐藏
      $(".his_recond").hide();
    }

   }

})
