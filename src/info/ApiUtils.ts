const v1 = "http://localhost:8081/";

export default {
  API_USER_REGISTER: v1 + "user/register",
	API_USER_LOGIN: v1 + "login",
    API_PIPRODUCT_CLASS_ALL:v1+"class/all", //获致所有皮物分类
	API_UPLOAD_FILE:v1+"file/upload", // 文件上传
    API_PIPRODUCT_SEND:v1+"product/send",  // 发布皮物
    /**
     * POST协议: 1:在售，2:已售，3:下架，4:皮帖
     */
    API_PIPRODUCT:v1+"product", 
    /**
     * GET: 文章记录访问量
     */
    API_PIPRODUCT_X: v1+"product/x",
    /**
     * POST协议：获取的是要编辑的皮物
     * GET：获取一个正常的皮物，是不需要token，这个是展示界面的接口
     */
    API_PIPRODUCT_MANAGER_GET:v1+"product/get",
    /**
     * POST 协议 ，获取正常的皮物
     */
    API_PIPRODUCT_INDEX:v1+"product/index",
    /**
     * POST: 无参
     */
    API_PIPRODUCT_INDEX_ARTICLE:v1+"/product/index/article",
    /**
     * POST：下架皮物
     */
    API_PIPRODUCT_MANAGER_DOWN:v1+"product/down", 

    /**
     * 获取更多皮物
     */
    API_PIPRODUCT_ARTICLE:v1+'/product/article',

    /**
     * put 添加,get 获取,post 设置默认,delete 删除
     */
    API_ADDRESS:v1+"address",
    /**
     * post 分页获取皮物评论
     */
    API_COMMENT_PI:v1+"comment/pi",
    /**
     * PUT: 添加评论
     */
    API_COMMENT:v1+"comment",
    /**
     * POST: 点先或踩
     */
    API_COMMENT_LIKE:v1+"comment/like",
    /**
     * GET: 获取首页最新皮论
     */
    API_COMMENT_INDEX:v1+"comment/index",
    /**
     * PUT: 交易
     * POST: 分页获取交易记录
     */
    API_TRADE:v1+"trade",
    /**
     * GET: 通过username获取皮志
     */
    API_TRADE_PILOG:v1+'trade/log',

    /**
     * 根据时间获取皮志
     */
    API_TRADE_REAL_PILOG:v1+"trade/log/date",

    /**
     * POST: 获取足迹
     * PUT: 提交足迹
     */
    API_FOOTPRINT:v1+"footprint",

    /**
     * POST: 点赞
     */
    API_PILIKE:v1+"like",
    /**
     * POST: 收藏
     */
    API_COLLECT:v1+"collect",
    /**
     * POST: 获取用户收藏
     */
    API_COLLECT_USER:v1+"collect/user",

    API_USER_INFO:v1+"user/info", // POST设置用户信息,GET获取用户信息
    /**
     * GET: 获取个人主页用户信息,无参
     */
    API_USER_INDEX_INFO:v1+"user/index",
    /**
     * POST: PI Page  获取个人主页皮物
     */
    API_USER_SPACE_PRODUCT:v1+'user/product',
    /**
     * POST: Pi Page 获取个人主页皮帖
     */
    API_USER_SPACE_ARTICLE:v1+'user/article',
    /**
     * PUT: 关注和取消关注
     */
    API_FOLLOWS:v1+'follows',
    /**
     * PAGE: 参数为pipage，获取用户粉丝列表
     */
    API_FOLLOWS_FOLLOWERS:v1+"/follows/followers",
    /**
     * PAGE: 参数为pipage，获取用户关注列表
     */
    API_FOLLOWS_FOLLOWING:v1+"/follows/following",


    API_WALLET_GET:v1+"wallet/get" // 获取当铺用户的钱包


};
