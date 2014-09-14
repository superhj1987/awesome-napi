#数据库设计

时间 | 版本号 | 修订人 | 修订内容
----|------|----
2014-07-27 | 1.0  | 杭建 | 初始版本

1. 用户基本信息库

   **cpk_account**

   列名      |    类型  |  备注
   ---------|----------|-------
   id(pk)   |  varchar | userId
   userName |  varchar |  用户名
   password | varchar  | 密码(md5(md5(pas) + salt))
   mobile   | varchar  | 手机号
   email    | varchar  | 邮箱
   type     |    int    | 类型：1 操盘手 2 高净值用户
   createTime |  bigint |  创建时间
   updateTime |  bigint |  更新时间
   token     |  varchar | 令牌，用来取回密码等
   status     |  int     | 状态：0 不可用 1 可用 2 创建未完成

2. 操盘手信息

   **cpk_trader**

   列名      |    类型  |  备注
   ---------|----------|-------
   uid(pk fk)      |  varchar | userId
   teamName   | varchar | 团队名称
   tradeCategory |  int |  操盘品种：1 A股 2 美股 3 港股 4 股指期货 5 对冲基金 6 商品期货 7 外汇
   recentReturn | varchar  | 近三年所有账户平均收益率格式（2.3-2.3-3.4）
   maxLostMonthly     |    float    | 最大单月亏损
   maxRetracement   | float | 最大回撤%
   totalManagedFund | float | 已管理的资金总量（万）
   opMethod | int | 操作方法选项:1 超级短线 2 短线 3 中线 4 长线
   level | varchar | 操作评级
   timeTag |  bigint |  时间戳

3. 投资者信息（高净值用户）

   **cpk_investor**

   列名      |    类型  |  备注
   ---------|----------|-------
   uid(pk fk) |  varchar | userId
   uName | varchar | 客户姓名
   fundToInvest   |   float |  代理操盘的资金量/万元
   annualReturn | float  | 要求年化收益率%
   totalFund     |    int    | 个人总共可投资金量：1 十万 2 百万 3 千万 4 上亿
   timeTag |  bigint |  时间戳

4. 历史操盘记录

   **cpk_trade_log**

   列名      |    类型  |  备注
   ---------|----------|-------
   id(pk)  |  bigint   | 
   uid(fk) |  varchar | 操盘手ID
   cname   |   varchar |  客户姓名
   fund | bigint  | 资金
   cycle    |    int    | 周期（月）
   totalReturn | bigint  | 回报
   progress | int | 进度（%）
   timeTag |  bigint |  时间戳
   
5. 操盘手理财需求

   **cpk_trade_need**

   列名      |    类型  |  备注
   ---------|----------|-------
   id(pk)  |  bigint   | 
   uid(fk) |  varchar | 操盘手ID
   needFund | bigint  | 需要资金总量
   maxRetracement   | float | 最大回撤%
   minProxyAmount   | bigint | 单个代客理财账户最小金额
   annualReturn | float  | 预计年化收益率%
   shareProportion | int | 分成比例%
   preserveFlag | int | 是否给客户保本：0 否 1 是
   other |  varchar | 其他要求
   timeTag |  bigint |  时间戳

6. 安全问题

   **cpk_sec_qa**

   列名      |    类型  |  备注
   ---------|----------|-------
   id(pk)  |  bigint   | 
   uid(fk) |  varchar | 用户ID
   qno | int  | 问题编号
   answer  | varchar |  答案
   timeTag |  bigint |  时间戳