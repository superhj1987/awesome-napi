#Api设计

时间 | 版本号 | 修订人 | 修订内容
----|------|-----|-----
2014-07-30 | 1.0  | 杭建 | 初始版本
2014-09-12 | 1.1  | 杭建 | 加入公告接口

## 概述

* 版本：v1
* 接口形式：http://[host]/[版本]/xxx

  上线后使用https连接，保证数据传输的安全性。

* host：
 
  * 测试、联调：api.caopanke.com(先映射到61.153.100.245)
  * 线上：https://api.caopanke.com

* 访问权限：在请求header中加入
    
      Token:xxx
    
    根据客户端不同此值不同：
      
      web:80456secretweb678954

* 公共参数：

    client:''//放在url中，取值范围：web/android/ios

* return：
  
  http code:200(成功)，其他（失败）
  
      {
        code:xxx, //返回码
        result:xxx,//成功的返回结果
        message:xxx //错误的返回消息
      }

  下面所有接口的统一返回格式如上，故只对result做说明。

* Example: http://api.caopanke.com/v1/account/auth?client=web
* 数据交换格式：json

## 用户端接口

用户验证通过后主动发起的请求，需要在header中加入
  
      Authorization:'' //(帐号验证通过或者创建帐号后，返回的authToken)

当code为401时，是auth error，表示用户Authorization错误或者已经过期需要重新登录。

可通过下面接口获取用户登录状态：

  * 获取authToken状态即用户的当前状态(header中Authorization: authToken)

    * URL: /account/authTokenStatus
    * method: get
    * result: 200(有效) / 401（无效）

### 注册/登录

* 验证帐号
  
    * URL: /authAccount
    * method: post
    * params: 
      
          {
            account:'', //邮箱/手机号
            password:'' //md5加密
          }

    * result: 
    
          {
            'account':account,
            'authToken':'xxx'
          }

    !!!tips:account的status字段为2时，表示注册未完成。需要跳转到身份选择页面，选择身份进行注册

* 发送手机验证码

    * URL: /sendValidCodeMsg
    * method: get
    * url params:
      
         * mobile

    * result: true/false

* 验证手机验证码

    * URL: /verifyValidCodeMsg
    * method: get
    * url params:
      
         * mobile
         * validCode

    * result: true/false

* 获取图片验证码

    * URL: /imageCaptcha
    * method: get
    * url param:
    
      * sid(这个标识唯一会话即可，由客户端自动生成，验证验证码的时候需要sid和captcha一起传递)

    * result: 验证码图片，文件名（不带扩展名）为sid

* 验证图片验证码

    * URL: /verifyImageCaptcha
    * method: get
    * url param:
    
      * sid(这个标识唯一会话即可，由客户端自动生成，验证验证码的时候需要sid和captcha一起传递)
      * captcha:''

    * result: true/false

* 注册帐号是否可用
  
    * URL: /account/isAccountAvailable
    * method: post
    * params: 
      
          {
            account:'', //邮箱/手机号
          }

    * result: true (可用) / false(不可用)
        
* 注册帐号

    * URL: /accounts
    * method: post
    * params:
      
          {
            email:'', //邮箱，必填
            password:'', //md5加密，必填
            mobile:'', //手机号，必填
            type:xx, //1 操盘手 2 高净值用户,必填
            validCode:'' //手机验证码，必填
          }

    * result: 

          {
            'account':account,
            'authToken':'xxx'
          }

* 注册操盘手(头部需要传递Authorization : authToken)
  
    * URL: /account/traders
    * method: post
    * params:

          {
              teamName:'xx', //团队名称
              tradeCategory：xx, //操盘品种：1 A股 2 美股 3 港股 4 股指期货 5 对冲基金 6 商品期货 7 外汇
              recentReturn:[xx,xx,xx],//近三年所有账户平均收益率
              maxLostMonthly:xx, //最大单月亏损
              maxRetracement:xx, //最大回撤%
              totalManagedFund:xx, //已管理的资金总量（万）
              opMethod :xx, //操作方法选项:1 超级短线 2 短线 3 中线 4 长线
          }

    * return: trader

* 注册高净值用户(头部需要传递Authorization : authToken)

    * URL： /account/investors
    * method: post
    * params:

          {
              uName: 'xx', //客户姓名
              fundToInvest:xx, //代理操盘的资金量/万元
              annualReturn:xx, //要求年化收益率%
              totalFund:xx //个人总共可投资金量：1 十万 2 百万 3 千万 4 上亿
          }

    * return: investor

* 推荐操盘手列表

    * URL: /recommendTraders
    * method : get
    * url params:

        * offset
        * limit

    * result: trader[]

* 公告列表

    * URL: /news
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: news[]

* 公告详细信息

    * URL: /news/{newsId}
    * method: get
    * result: news

* 操盘手列表

    * URL: /traders
    * method: get
    * url params:
    
      * offset
      * limit
      * tradeCategory：xx, //操盘品种：0 全部 1 A股 2 美股 3 港股 4 股指期货 5 对冲基金 6 商品期货 7 外汇 
    
    * result: trader[]
    
* 操盘手信息

    * URL: /traders/{userId}
    * method: get
    * result: trader

* 操盘手历史操盘记录

    * URL: /traders/{userId}/tradeLogs
    * method: get
    * result: traderLog[]

* 操盘需求列表

    * URL: /tradeNeeds
    * method: get
    * url params:
    
      * offset
      * limit
     
    * result: trade_need[]
    
### 帐号相关
    
* 获取帐号信息

    * URL: /account/info
    * method: get
    * result: account
    
* 修改帐号密码

    * URL: /account/password
    * method: put
    * params:
      
          {
            curPassword : '', //md5加密
            newPassword : '', //md5加密
          }

    * result: true/false

* 获取安全问题列表(所有)

    * URL: /secQuestions
    * method: get
    * result: secQuestion[]

* 获取安全问题列表(自己的)

    * URL: /account/secQuestions
    * method: get
    * result: secQuestion[]

* 设置安全问题

    * URL: /account/secQas
    * method: post
    * params:
      
          {
            qno : '', //问题编号
            answer : '', //答案
          }

    * result: secQa

* 修改安全问题

    * URL: /account/secQas
    * method: put
    * params:
      
          {
            qno : '', //问题编号
            curAnswer : '', //原答案
            newAnswer : '' //新答案
          }

    * result: secQa

* 验证安全问题

    * URL: /account/verifySecQa
    * method: post
    * params:
      
          {
            qno : '', //问题编号
            answer : '', //答案
          }

    * result: true/false

* 找回密码→验证帐号

    * URL: /verifyAccount
    * method: post
    * params:
      
          {
            account : '', //邮箱/手机
          }

    * result: 

          {
            mobile:'',//手机号，会掩盖住中间几位
            email:''//邮箱
          }

* 找回密码->根据邮箱发送验证码

    * URL: /sendValidCodeMsgByEmail
    * method: post
    * params:
      
          {
            email : ''//邮箱
          }

    * result: true/false

* 找回密码→根据邮箱修改密码

    * URL: /modifyAccountPassword
    * method: post
    * params:
      
          {
            email : '', //邮箱
            validCode : '',//手机验证码
            newPassword :'' //新的密码（md5加密）
          }

    * result: true

### 高净值用户操作

* 修改资料

    * URL: /investor/info
    * method: put
    * params:
      
          {
              uName: 'xx', //客户姓名
              fundToInvest:xx, //代理操盘的资金量/万元
              annualReturn:xx, //要求年化收益率%
          }

    * result: investor
    
### 操盘手操作    
    
* 发布操盘需求

    * URL: /trader/tradeNeeds
    * method: post
    * params:
      
          {
            needFund :xx, //需要资金总量
            maxRetracement:xx, //最大回撤%
            minProxyAmount:xx, //单个代客理财账户最小金额
            annualReturn:xx, //预计年化收益率%
            shareProportion:xx, //分成比例%
            preserveFlag:xx, //是否给客户保本：0 否 1 是
            other:"xx" //其他要求
          }

    * result: trade_need

* 查看发布的操盘需求

    * URL: /trader/tradeNeeds
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: trade_need[]

* 删除操盘需求

    * URL: /trader/tradeNeeds/{needId}
    * method: delete
    * result: true/false

* 查看历史操盘记录

    * URL: /trader/tradeLogs
    * method: get
    * url params:
    
      * offset
      * limit
    
    * result: trade_log[]

* 修改团队资料

    * URL: /trader/info
    * method: put
    * params:
      
          {
              teamName : 'xx', //团队名称
              tradeCategory：xx, //操盘品种：1 A股 2 美股 3 港股 4 股指期货 5 对冲基金 6 商品期货 7 外汇
              recentReturn:[xx,xx,xx],//近三年所有账户平均收益率
              maxLostMonthly:xx, //最大单月亏损
              maxRetracement:xx, //最大回撤%
              totalManagedFund:xx, //已管理的资金总量（万）
              opMethod :xx, //操作方法选项:1 超级短线 2 短线 3 中线 4 长线
          }

    * result: trader