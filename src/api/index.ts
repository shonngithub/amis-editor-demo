const axios = require('axios');

let cookies =
  'JSESSIONID=91BA7CF5996212A05A511D9B06755791; user_token=%7B%22refreshToken%22%3A%22VYcZvZkpJiKfCepIRYyhUcOaHJLFsCB9%22%2C%22tokenType%22%3A%22bearer%22%2C%22accessToken%22%3A%22HJgCti3JKUpgPuBV4hKDDA6tr2ghYVGv%22%2C%22expiresIn%22%3A7200%7D; user_token.sig=cwmzqTLuSkORdPdPDseuNO67a6OarEP4rVndoVrytHU';

let targetDir = '/test/';

const jsonApi = {
  basDir: 'src/',
  // targetDir: '/test',
  saveFile: async ({path, content}: {path: string; content: object}) => {
    if (!cookies) {
      const res = await axios.post('/api/v1/user/login', {
        username: '13120827721',
        type: 'password',
        token: Number.parseInt(String(Math.random() * 100000)).toString(),
        password: 'e10adc3949ba59abbe56e057f20f883e'
      });
      console.log(res.headers);
      cookies = res.headers['set-cookie']
        .map((str: string) => str.split(';')[0])
        .join(';');
    }

    const res = await axios.post(
      '/api/v1/admin/view/autoCreate',
      {
        path: targetDir + path,
        content: content,
        loadChild: false
        // type: 2
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-code': 'RECRUITMENT',
          'Cookie': cookies
        }
      }
    );

    if (res.data.code !== 0) {
      throw new Error(res.data.msg);
    }

    return res.data;
  },

  getAllFile: async () => {
    const res = await axios.get(`/api/v1/admin/appView?path=${targetDir}`, {
      // const res = await axios.get(`/api/v1/admin/view${targetDir}home.json`,{
      headers: {
        'Content-Type': 'application/json',
        'x-app-code': 'RECRUITMENT',
        'Cookie': cookies
      }
    });
    return res.data;
  },
  getFileByPath: async (path: string) => {
    const res = await axios.get(`/api/v1/admin/view${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-app-code': 'RECRUITMENT'
        // "Cookie": cookies
      }
    });
    return res.data;
  }
};
export default jsonApi;
