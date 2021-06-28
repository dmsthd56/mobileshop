//상단 로고 및 메뉴 부분
$(function(){
    //로고 클릭시 메인페이지
    $("#c_mlogo").click(function(){
     location.href="./index.html";
    });
    $("#c_menu").click(function(){//pop_menu 실행
      var $side_w = $("#pop_menu_bg_outline").width();
      if($side_w==0){
          $("#pop_menu_bg_outline").css("display","block");
          $("#pop_menu_bg_outline").css("opacty","0.6");
          $("#pop_menu_bg_outline").animate({
            "width":"360px"
          },500, function(){
             $("#pop_menu_outline").css("display","block");
          });
      }
      else{
       $("#pop_menu_bg_outline").animate({
             "width":"0px"
         },500,function(){
             $("#pop_menu_outline").css("display","none");
        });
        $("#pop_menu_bg_outline").fadeOut();
      }
    });
    $("#c_search").click(function(){//돋보기 버튼 클릭
      let $searchs = $("#c_searchdiv").is(":visible");
      if($searchs==false){
          $("#c_searchdiv").slideDown();
      }
      else{
          $("#c_searchdiv").slideUp();
      }
    });
  
    $("#c_searchbtn").click(function(){//검색버튼시
       if($("#c_searchtxt").val()==""){
           alert("검색할 상품명을 입력해주세요.");
           $("#c_searchtxt").focus();
       }
       else{
          searchform.submit();
       }
    });


 //헤더 메뉴
    var $gopage;
    $("#cart").click(function(){
        location.href="./cart.html";
    });
    $("#join").click(function(){
    
    });
    $("#login_member").click(function(){
        $("#mem_login").css("display","block");
    });



  //메인 베너
  var $win_w = $(window).width();
  var $banner_ea = $("#c_mbanul>li").length;
  var $banner_node = 100 * $banner_ea;
  var $pages=0;
  
  $("#c_mbandiv").css("width",$win_w+"px");
  $("#c_mbanul").css("width",$banner_node+"%"); 
  $("#c_mbanul>li").css("width",$win_w+"px");

let $timer;
$timer = setTimeout(function remove(){
   if($pages<$banner_ea-1){
       $pages++;
   }
   else{
       $pages = 0;
   }
   var $move = $win_w * $pages;
   $("#c_mbanul").stop().animate({
      "left":"-"+$move+"px"
   },1000);
   $timer = setTimeout(remove,5000);
},5000);

$("#c_mbanul").bind({
  "swiperight":function(){
      if($pages==0){
          $pages=0;
      }
      else{
         $pages = $pages-1;
      }
      $(this).stop().animate({
      "left":"-"+$move+"px"
      },1000);
  },
  "swipeleft":function(){
      if($pages<$banner_ea-1){
       $pages++;
      }
      else{
       $pages = 0;
      }
      var $move = $win_w * $pages;
     $(this).stop().animate({
       "left":"-"+$move+"px"
      },1000);
  }
});
//Vue 부분

var arrs = [
   {img:"./img/sobanner1.png",url:"http://m.www.bluepops.co.kr/product/list.html?cate_no=747"}, 
   {img:"./img/sobanner2.png",url:"http://m.www.bluepops.co.kr/product/list_thumb.html?cate_no=46"}, 
   {img:"./img/sobanner3.png",url:"http://m.www.bluepops.co.kr/product/list_thumb.html?cate_no=559"}, 
]
var img ={ 
    template:"<img>"
  }
var img2 ={ 
  template:"<img>"
}

let sb_vue = new Vue({
 el:"#vueoutline",
 data:{
    sb1:"e-banner", 
    sb2:"e-soli1", 
    array:arrs,
    links:"./img/sobanner.png",
    surl:"http://m.www.bluepops.co.kr/product/list.html?cate_no=749"
 },
 components:{
    pimg:img,
    pimg2:img2
 },
 methods:{
    bban:function(){
        window.open(this.surl,"","width=360;height=auto;resizeable=no;scrollbars=auto");
    },
    sban:function(links){
        window.open(links,"","width=360;height=auto;resizeable=no;scrollbars=auto");
    }
 }
});





//베스트 상품
$.ajax({
    url:"./best.json",
    cache:false,
    type:"get",
    dataType:"json",
    success:function($result){
     $.fn.pd_data($result);
    },
    error:function(){
     console.log("데이터 오류!");
    }
  });
  var $pd_html;
  $.fn.pd_data=function($pdlist){
   $($pdlist.best_product).each(function($pdnode,$pdname){
     $pd_html='<div class="a_mwproduct">\
         <ul><li class="a_mwproduct1"><img src="'+$pdname.a_wkimg+'"></li>\
         <li class="a_mwproduct2" >'+$pdname.a_wktitle+'</li>\
         <li class="a_mwproduct3"><strike>'+$pdname.a_wkpd.toLocaleString()+'</strike></li>\
         <li class="a_mwproduct4" style="width:45%;">'+$pdname.a_wkdp+'</li>\
         <li class="a_mwproduct4" style="width:55%;">'+$pdname.a_wkap.toLocaleString()+'</li>\
         <li class="a_mwproduct5"><img src="'+$pdname.a_wkico+'"></li>\
         </ul></div>';
         $("#products").append($pd_html);
   });
  
     var $win_w2 = $(window).width();
     var $pd_ea = $("#products>div").length/2;
     var $pdpage=0;
     let $pdtimer;
 
    $("#products").css("width",($win_w2*$pd_ea)+"px");
   $pdtimer = setTimeout(function pdremove(){
      if($pdpage<$pd_ea-1){
          $pdpage++;
      }
      else{
          $pdpage = 0;
      }
     $(".pddisc").css("background-color","#ff8679");
     $("#pddisc"+$pdpage).css("background-color","#628dc8");

     var $move2 = 350 * $pdpage;
     $("#products").stop().animate({
         "margin-left":(-$move2)+"px"
      },1000);
     $pdtimer = setTimeout(pdremove,5000);
   },5000);
}
 
   let $ptitle_timer;
   $ptitle_timer = setInterval(function(){
     var $pdtitle = $("#pd_titles").css("display");
     if($pdtitle=="block"){
         $("#pd_titles").fadeOut();
     }
     else{
         $("#pd_titles").fadeIn();
     }
   },10000);


   //새로운 상품
   $.get({
    url:"./new.json",
    cache:false,
    type:"get",
    dataType:"json",
    success:function($result1){
     $.fn.new_data($result1);

    },
    error:function(){
     console.log("데이터 오류!");
    }
  });
  var $new_html;
  $.fn.new_data=function($newlist){
   $($newlist.new_product).each(function($newnode,$newname){
     $new_html='<div class="a_mnproduct"><ul>\
    <li class="a_mnproduct1"><img src="'+$newname.a_newimg+'"></li>\
    <li class="a_mnproduct2" >'+$newname.a_newtitle+'</li>\
    <li class="a_mnproduct3"><strike>'+$newname.a_newpd.toLocaleString()+'</strike></li>\
    <li class="a_mnproduct4" style="width:45%;">'+$newname.a_newdp+'</li>\
    <li class="a_mnproduct4" style="width:55%;">'+$newname.a_newap.toLocaleString()+'</li>\
    <li class="a_mnproduct5"><img src="'+$newname.a_newico+'"></li>\
    </ul></div>';
     $("#news").append($new_html);
   });
  
     var $win_w3 = $(window).width();
     var $new_ea = $("#news>div").length/2;
     var $new_page=0;
     
     $("#news").css("width",($win_w3*$new_ea)+"px");
   let $newtimer;
   $newtimer = setTimeout(function newremove(){
      if($new_page<$new_ea-1){
          $new_page++;
      }
      else{
          $new_page = 0;
      }
      var $move3 = 350 * $new_page;
     $(".newdisc").css("background-color","#ff8679");
     $("#newdisc"+$new_page).css("background-color","#628dc8");
      $("#news").stop().animate({
         "margin-left":(-$move3)+"px"
      },1000);
      $newtimer = setTimeout(newremove,5000);
   },5000);
}


 let $ntitle_timer;
 $ntitle_timer = setInterval(function(){
 var $newtitle = $("#new_titles").css("display");
 if($newtitle=="block"){
     $("#new_titles").fadeOut();
 }
 else{
     $("#new_titles").fadeIn();
 }
  },10000);

  //로그인 close btn 클릭시
  $("#member_close").click(function(){
    $("#mem_login").css("display","none");
  });
//비회원 close btn
$("#nonmember_close").click(function(){
    $("#nonmem_login").css("display","none");
})

//사이드 메뉴 부분
$.getJSON({
 url :"./ico.json",
 cache:false,
 data:"get",
 dataType:"json",
 success:function($iconr){
  $.fn.icons($iconr);
 },
 error:function(){
    console.log("데이터 오류!");
 }

});
let $ihtml;
$.fn.icons=function($i){
 $($i.c_ico).each(function($inode,$iname){
  $ihtml ='<li><span class="c_icoli1">\
  <img src="'+$iname.img+'"></span>\
  <span class="c_icoli2">'+$iname.name+'</span></li>';
  $("#totalicon").append($ihtml);
 });

 var $ok = "no"
 $("#smenus>li").click(function(){
   var $smenu_node = $(this).index();
    if($ok=="no"){
     $("#smenus>li:eq("+$smenu_node+")>div").slideDown();
     $ok = "ok";
    }
    else{
     $("#smenus>li:eq("+$smenu_node+")>div").slideUp();
     $ok = "no";
    }
 })
}

//비회원 문구 부분
let $non_timer;
var $non_ea = $("#nonmems>li").length;
var $non_page=0;
$non_timer = setTimeout(function non_move(){

    $("#nonmems>li").eq($non_page).stop().fadeOut(800);
        if($non_page<$non_ea-1){
          $non_page++;
    }
    else{
          $non_page=0;
    }
    $("#nonmems>li").eq($non_page).stop().fadeIn(800); 
    $non_timer = setTimeout(non_move,5000); 

},5000);

});//제이쿼리끝




//footer부분
function footck(recheck){
  var go_link;
  if(recheck==1){
    go_link="https://m.sonyunara.com/cs/index.php";
  }
  else if(recheck==2){
    go_link="https://m.sonyunara.com/cs/unknown.php";
  }
  else if(recheck==3){
    go_link="https://m.sonyunara.com/cs/delay.php";
  }
  else if(recheck==4){
    go_link="https://m.sonyunara.com/event/list.php";
  }
  else if(recheck==5){
    go_link="https://m.sonyunara.com/board/list.php?boardid=csnotice";
  }
  else if(recheck==6){
    go_link="https://m.sonyunara.com/board/list.php?boardid=cast";
  }
  else if(recheck==7){
    go_link="https://m.sonyunara.com/review/review_index.php";
  }
  window.open(go_link,"","width=360;height=auto;resizeable=no;scrollbars=auto");

}



//로그인
function loginck(memck){
    if(memck==2){
        $("#nonmem_login").css("display","block");
    }
    else{
     var memid = document.getElementById("d_m_nm").value;
     var mempw = document.getElementById("d_m_pw").value;
     var memid_ck = memid.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g);
   
     if(memid==""){
       alert("아이디를 입력해 주세요");
     }
     else if(memid_ck!=null){
       alert("아이디는 한글 사용이 불가합니다.");
     }
     else if(mempw==""){
       alert("비밀번호를 입력해 주세요");
     }
     else{
         const mid = "user_nm="+memid;
         const mpw = "&user_pw="+mempw;
         let members = mid + mpw;
         ajax(members);
     }
    }
   }
   let mem_data;
   function ajax(members){
   
      function windowck(){
          if(window.XMLHttpRequest){
              return new XMLHttpRequest();
          }
      }
   
      function login(){
       if(mem_data.readyState==XMLHttpRequest.DONE && mem_data.status==200){
           var recall = this.response;
           if(recall=="ok"){
             alert("고객님 로그인 하셨습니다.")
           }
           else if(recall=="cancel"){
            alert("해당 고객님은 가입이 되지 않으셨습니다.")
           }
       }
      }
   
      mem_data=windowck();
      mem_data.onreadystatechange = login;
      mem_data.open("POST","./m_login.php");
      mem_data.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      mem_data.send(members);
   }

//비회원 정보 확인 
function nonbtn(){
    var non_nm = document.getElementById("d_mno_nm").value;
    var non_num1 = document.getElementById("d_mno_num1").value;
    var non_num2 = document.getElementById("d_mno_num2").value;
    var non_pw = document.getElementById("d_mno_pw").value;
 
    if(non_nm==""){
     alert("주문자 이름을 입력해 주세요.");
    }
    else if(non_num1==""||non_num2==""){
      alert("주문번호를 입력해 주세요");
    }
    else if(isNaN(non_num1)==true||isNaN(non_num2)==true){
     alert("주문번호는 숫자로만 입력해 주세요.");
    }
    else if(non_num1.length!=6||non_num2.length!=7){
     alert("주문번호를 올바르게 입력해 주세요");
    }
    else if(non_pw==""){
     alert("비밀번호를 입력해 주세요.");
    }
    else{
      let nnums = non_num1+non_num2;
      const nnm = "order_name="+non_nm;
      const nnum = "&order_number="+nnums;
      const npw = "&order_pass="+non_pw;
      let total  = nnm + nnum +npw;
 
      nondata(total);
    }
    }
    let non_datas;
    function nondata(total){
     function windowck(){
           if(window.XMLHttpRequest){
               return new XMLHttpRequest();
           }
       }
    
       function nonck(){
        if(non_datas.readyState==XMLHttpRequest.DONE && non_datas.status==200){
            var recalls = this.response;
            
            if(recalls=="ok"){
              alert("잠시만 기다려 주세요! 출력 중입니다.")
            }
            else if(recalls=="no"){
             alert("해당 정보는 확인 되지 않습니다.")
            }
        }
       }
    
       non_datas=windowck();
       non_datas.onreadystatechange = nonck;
       non_datas.open("POST","./m_order.php");
       non_datas.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       non_datas.send(total);
    }

//전화연결
function tels(){
 location.href="tel:1599-0000";
}