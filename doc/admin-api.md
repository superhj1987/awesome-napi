#后台管理Api设计

时间 | 版本号 | 修订人 | 修订内容
----|------|-----|-----
2014-09-01 | 1.0  | 杭建 | 初始版本

## 概述

* 接口形式：http://[host]/xxx

* host：
 
  * 测试、联调：api.caopanke.com(映射到61.153.100.245)
  * 线上：https://api.caopanke.com

* 访问权限：在请求header中加入
    
      Token：80456secrethjsuperadmin1678954

* return：
  
  http code:200(成功)，其他（失败）
  
      {
        code:xxx, //返回码
        result:xxx,//成功的返回结果
        message:xxx //错误的返回消息
      }

  下面所有接口的统一返回格式如上，故只对result做说明。

* Example: http://api.caopanke.com/admin/traders
* 数据交换格式：json

### 登录

* 验证帐号
  
    * URL: /admin/authAccount
    * method: post
    * params: 
      
          {
            account:'', //邮箱/手机号
            password:'' //md5加密
          }

    * result: 
    
          {
            'authToken':'xxx'
          }

以下接口需要登录后调用，header中加入Authorization：authToken

## 接口
* 用户信息

    * URL: /admin/users/{uid}
    * method: get
    * result: user


* 操盘手列表

    * URL: /admin/traders
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: trader[]

* 操盘手操盘申请列表

    * URL: /admin/tradeNeeds
    * method: get
    * url params:
    
      * offset
      * limit
      * order //排序列（如timeTag,needFund,maxRetracement,annualReturn）
      * teamName : '' //不为空的时候根据团队名称搜索
    
    * result: tradeNeed[]

* 推荐操盘手列表

    * URL: /admin/recommendTraders
    * method : get
    * url params:

        * offset
        * limit

    * result: trader[]

* 推荐操盘手

    * URL: /admin/traders/{uid}/recommend
    * method: post 
    * param:
      
        {
          recommendOrder : xx //0 不推荐；>0的时候是表示顺序，数字越小排在前面 
        }

    * result: true/false

* 高净值用户列表

    * URL: /admin/investors
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: investor[]

* 公告列表

    * URL: /admin/news
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: news[]

* 公告详细信息

    * URL: /admin/news/{newsId}
    * method: get
    * result: news

* 添加公告

    * URL: /admin/news
    * method: post 
    * param:
      
        {
          title : '',//标题
          content : ''//内容
        }

    * result: news

* 更新公告

    * URL: /admin/news
    * method: put 
    * param:
      
        {
          title : '',//标题
          content : ''//内容
        }

    * result: news

* 删除公告

    * URL: /admin/news/{newsId}
    * method: delete
    * result: true/false