const v1 = "http://localhost:8081/";

export default {
  API_USER_REGISTER: v1 + "user/register",
	API_USER_LOGIN: v1 + "login",
    API_PIPRODUCT_CLASS_ALL:v1+"class/all", //获致所有皮物分类
	API_UPLOAD_FILE:v1+"file/upload", // 文件上传
    API_PIPRODUCT_SEND:v1+"product/send",  // 发布皮物
    /**
     * GET协议: 1:在售，2:已售，3:下架，4:皮帖
     */
    API_PIPRODUCT:v1+"product", 

    API_USER_INFO:v1+"user/info", // POST设置用户信息,GET获取用户信息

    API_WALLET_GET:v1+"wallet/get" // 获取当铺用户的钱包


};
