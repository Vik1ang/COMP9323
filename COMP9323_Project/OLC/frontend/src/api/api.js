// const URL = 'http://localhost:5000/'
const URL = 'http://121.5.155.221:80/';

const apiRequest = async (type, method, request, optional) => {
  const token = localStorage.getItem('token');
  // const id=localStorage.getItem('uId');
  let response;
  switch (type) {
    case 'login': {
      const options = {
          headers: {
              'Content-type': 'application/json',
          },
          method,
          body: JSON.stringify({
              username: request[0],
              password: request[1],
          }),
      }
      response = await fetch(`${URL}${type}`, options);
      console.log('resssss',request);
      break;
  }
  case 'register': {
      const options = {
        headers: {
          'Content-type': 'application/json',
        },
        method,
        body: JSON.stringify({
          username: request[0],
          password: request[1],
        }),
      };
      console.log('ddddddd',request)
      response = await fetch(`${URL}${type}`, options);
      break;
  }
  case 'logout': {
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': token,
          },
          method,
      };
      // console.log('ddddddd',request)
      response = await fetch(`${URL}logout`, options);
      break;
  }
  case 'expertApplication': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        method,
      };
      // console.log('ddddddd',request)
      response = await fetch(`${URL}admin/expert_applications${optional}`, options);
      break;
  }
  case 'expertOrder': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        method,
      };
      // console.log('ddddddd',request)
      response = await fetch(`${URL}admin/payments${optional}`, options);
      break;
  }
  case 'getAllPosts':{
      const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          method,
        };
        // console.log('ddddddd',request)
        response = await fetch(`${URL}/admin/get_all${optional}`, options);
        break;
  }
  case 'getDailyData':{
      const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          method,
        };
        response = await fetch(`${URL}admin/get_daily_report`, options);
        break;
  }
  case 'getAllData':{
      const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          method,
        };
        response = await fetch(`${URL}admin/get_total_report`, options);
        break;
  }
  case 'adminDeletePost':{
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer '+token,
          },
          method,
          body: JSON.stringify({
            post_uuid: request,
          }),
        };
        response = await fetch(`${URL}/admin/delete`, options);
        break;
  }
  case 'getExpert': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        method,
      };
      console.log('ddddddd',request)
      response = await fetch(`${URL}admin/experts`, options);
      break;
  }
  case 'logout': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          'token': token,
        },
        method,
      };
      console.log('ddddddd',request)
      response = await fetch(`${URL}admin/experts`, options);
      break;
  }
  case 'getMyPosts': {
    const options = {
      headers: {
        'Content-type': 'application/json',
        'token': token,
      },
      method,
      body: JSON.stringify({
        type: request[0],
        user_id: request[1],
      }),
    };
    console.log('ddddddd',request)
    response = await fetch(`${URL}post/getMyPosts`, options);
    break;
  }
  case 'adminLetter':{
    const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
      };
      response = await fetch(`${URL}/admin/get_reports`, options);
      break;
  }
  case 'adminExpertPassorNot':{
    const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          expert_id: request[0],
          status: request[1],
        }),
      };
      response = await fetch(`${URL}/admin/deal_expert_application`, options);
      break;
  }
  case 'adminExpertPassorNotNo':{
    const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          expert_id: request[0],
          status: request[1],
          reason:request[2],
        }),
      };
      response = await fetch(`${URL}/admin/deal_expert_application`, options);
      break;
  }
  case 'adminExpertDetail':{
    const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
      };
      response = await fetch(`${URL}/admin/get_expert_details${optional}`, options);
      break;
  }
    case 'apply_expert': {
      const loggedinToken = localStorage.getItem('token');
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loggedinToken}`,
        },
        method,
        body: request,
      };
      console.log('ddddddd', request)
      response = await fetch(`${URL}apply_expert`, options);
      break;
    }
    case 'adminExpertRevoke': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          expert_id: request,
        }),
      };
      response = await fetch(`${URL}/admin/delete_expert`, options);
      break;
    }
    case 'userLetter': {
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        method,
      };
      response = await fetch(`${URL}user/get_notifications`, options);
      break;
    }
    case 'readUserLetter': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          notification_id: request,
        }),
      };
      response = await fetch(`${URL}/user/read_notification`, options);
      console.log('eee',response)
      break;
    }
    case 'getAllcommunity':{
      const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          method,
        };
        response = await fetch(`${URL}/community/getAllCommunity`, options);
        break;
    }
    case 'addCommunity': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          community_name: request,
        }),
      };
      response = await fetch(`${URL}/community/addCommunity`, options);
      console.log('eee',response)
      break;
    }
    case 'dealAppointment': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          status:request[0],
          order_id:request[1],
          link:request[2],
          reason:request[3],
          notification_id:request[4]
        }),
      };
      response = await fetch(`${URL}payment/deal_appointment`, options);
      console.log('eee',request)
      console.log('eee',response)
      break;
    }
    case 'deleteCommunity': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          community:request,
        }),
      };
      response = await fetch(`${URL}community/delete_community`, options);
      console.log('eee',response)
      break;
    }
    case 'InfoP':{
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer '+token,
          },
          method,
        };
        response = await fetch(`${URL}/post/getAllPosts${optional}`, options);
        break;
    }
    case 'InfoA':{
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer '+token,
          },
          method,
        };
        response = await fetch(`${URL}/answer/get_answers${optional}`, options);
        break;
    }
    case 'getUserInfo':{
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
      };
      response = await fetch(`${URL}/user/get_user_info${optional}`, options);
      break;
    }
    case 'followingU': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          user_id:request,
        }),
      };
      response = await fetch(`${URL}user/following`, options);
      console.log('eee',response)
      break;
    }
    case 'unfollowingU': {
      const options = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        method,
        body: JSON.stringify({
          user_id:request,
        }),
      };
      response = await fetch(`${URL}user/unfollowing`, options);
      console.log('eee',response)
      break;
    }
    case 'pay': {
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer '+token,
          },
          method,
          body: JSON.stringify({
            expert_id:request[0],
            start_time:request[1],
            duration:request[2],
            price:request[3],
          }),
      }
      response = await fetch(`${URL}payment/pay_expert`, options);
      console.log('ressss112221s',request);
      break;
    }
    case 'deleteOwnPost': {
      const options = {
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer '+token,
          },
          method,
          body: JSON.stringify({
            post_id:request
          }),
      }
      response = await fetch(`${URL}post/delete`, options);
      console.log('resssss',request);
      break;
    }
    

  }
  return response;
}

export default apiRequest;