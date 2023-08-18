import axios from 'axios';
import {toast} from "amis-ui";

const userToken = getCookie('user_token');
if (userToken) {
  console.log('user_token 的值为:', userToken, userToken?.access_token||userToken?.accessToken);
} else {
  console.log('未找到名为 user_token 的 cookie');
}

const ajax = axios.create({
    // baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'x-app-code': 'RECRUITMENT',
      'Authorization': userToken?'bearer '+(userToken?.access_token||userToken?.accessToken):'',
    }
})
ajax.interceptors.response.use((response) => {
  // console.log('ajax.interceptors.response',response);
  return response
}, (error) => {
  console.log('ajax.interceptors.response',error);
  if (error.response && error.response.status === 401) {
    toast.error('用户信息失效，请重新登录', {position: 'top-center', duration: 10000});
  }
  return Promise.reject({code:400,...error});
  // return {code:400,...error}
})


// let cookies =
  // 'JSESSIONID=91BA7CF5996212A05A511D9B06755791; user_token=%7B%22refreshToken%22%3A%22VYcZvZkpJiKfCepIRYyhUcOaHJLFsCB9%22%2C%22tokenType%22%3A%22bearer%22%2C%22accessToken%22%3A%22HJgCti3JKUpgPuBV4hKDDA6tr2ghYVGv%22%2C%22expiresIn%22%3A7200%7D; user_token.sig=cwmzqTLuSkORdPdPDseuNO67a6OarEP4rVndoVrytHU';

function getCookie(name: string): {access_token?:string,accessToken?:string} | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop()?.split(';').shift()||''));
    }catch (e) {
      console.log(e);
      return undefined;
    }
  }
  return undefined;
}




let targetDir = '/test/';

const jsonApi = {
  basDir: 'src/',
  // targetDir: '/test',
  // saveFile: async ({path, content}: {path: string; content: object}) => {
  //   if (!cookies) {
  //     const res = await axios.post('/api/v1/user/login', {
  //       username: '13120827721',
  //       type: 'password',
  //       token: Number.parseInt(String(Math.random() * 100000)).toString(),
  //       password: 'e10adc3949ba59abbe56e057f20f883e'
  //     });
  //     console.log(res.headers);
  //     cookies = res.headers['set-cookie']
  //       .map((str: string) => str.split(';')[0])
  //       .join(';');
  //   }
  //
  //   const res = await axios.post(
  //     '/api/v1/admin/view/autoCreate',
  //     {
  //       path: targetDir + path,
  //       content: content,
  //       loadChild: false
  //       // type: 2
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-app-code': 'RECRUITMENT',
  //         'Cookie': cookies
  //       }
  //     }
  //   );
  //
  //   if (res.data.code !== 0) {
  //     throw new Error(res.data.msg);
  //   }
  //
  //   return res.data;
  // },

  saveFile: async ({id, content}: {id?: string; content: {label: string; icon: string; schema: object}}) => {
    console.log(content);
    const res = await ajax.post(
        '/api/recruitment/front/html/createOrUpdate',
        Object.assign({
          // path: targetDir + path,
          // tenantId: 9852130,
          jsonData: JSON.stringify(content),
          name: content?.label,
        },id?{id}:{})
    );
    return res.data;
  },

  remove: async (id: string) => {
    const res = await ajax.delete(`/api/recruitment/front/html/${id}
`);
    return res.data;
  },

  getAllFile: async () => {

    const res = await ajax.post(`/api/recruitment/front/html/page`,
        {
          // "tenantId": 9852130,
          "page": {
            "pageNumber": 1,
            "pageSize": 1000
          }
          });
    return res.data;

    // const res = await axios.get(`/api/v1/admin/appView?path=${targetDir}`, {
    //   // const res = await axios.get(`/api/v1/admin/view${targetDir}home.json`,{
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-app-code': 'RECRUITMENT',
    //     'Cookie': cookies
    //   }
    // });
    // return res.data;
  },
  getFileByPath: async (id: string) => {
    // const res = await axios.get(`/api/v1/admin/view${path}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-app-code': 'RECRUITMENT'
    //     // "Cookie": cookies
    //   }
    // });
    const res = await ajax.get(`/api/recruitment/front/html/public/${id}`,{
      headers: {
        'Authorization': '',
      }
    });
    return res.data;
  }
};
export default jsonApi;
