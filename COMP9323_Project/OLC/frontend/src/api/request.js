import http from '../utils/http';


/**
 * 获取userInfo 
 */
 function getUserInfo(params1){
  return new Promise((resolve, reject) => {
    http("get",'/user/get_user_info',params1).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 获取个人userInfo 
 */
 function getMyInfo(params1){
  return new Promise((resolve, reject) => {
    http("get",'/user/get_my_info',params1).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 获取userInfo  post列表
 */
function getMyPosts(params1){
  return new Promise((resolve, reject) => {
    const params={
      user_id:params1.user_id,
      type:params1.type,
    }
    http("get",'/post/getMyPosts',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 获取userInfo  answer列表
 */
 function getAnswers(params1){
  return new Promise((resolve, reject) => {
    const params={
      post_id:params1.post_id,
      user_id:params1.user_id,
      answer_id:params1.answer_id,
      search:params1.search,
    }
    http("get",'/answer/get_answers',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 获取userInfo  LIKE列表
 */
 function getFollowAnswers(params1){
  return new Promise((resolve, reject) => {
    const params={
      is_follow:1,
      user_id:params1.user_id,
    }
    http("get",'/answer/get_answers',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 点击关注
 */
 function following(params1){
  return new Promise((resolve, reject) => {
    const params={
      user_id:params1.user_id,
    }
    http("post",'/user/following',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 取消关注
 */
 function unfollowing(params1){
  return new Promise((resolve, reject) => {
    const params={
      user_id:params1.user_id,
    }
    http("post",'/user/unfollowing',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * cresult页面  
 */
 function getAllPosts(params){
  return new Promise((resolve, reject) => {
    http("get",'/post/getAllPosts',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * aPay页面  
 */
 function getPayExpert(params){
  return new Promise((resolve, reject) => {
    http("post",'/payment/pay_expert',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 个人信息编辑页面  
 */
 function updateProfile(params){
  return new Promise((resolve, reject) => {
    http("post",'/user/update_profile',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
/**
 * 成为专家页面  
 */
 function applyExpert(params){
  return new Promise((resolve, reject) => {
    http("post",'/apply_expert',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}
export {
    getMyPosts,
    getAnswers,
    getUserInfo,
    getFollowAnswers,
    getAllPosts,
    getPayExpert,
    getMyInfo,
    updateProfile,
    following,
    unfollowing,
    applyExpert
}
