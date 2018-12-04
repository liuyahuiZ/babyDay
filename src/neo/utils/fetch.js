// const env = process.env.NODE_ENV || 'local';
import Toaster from '../Components/Toaster';
import Loader from '../Components/Loader';

export default function (url, options = {}) {
  const content = {
    method: options.method || 'GET',
    // body: JSON.stringify(options.data || {}),
    headers: Object.assign({}, {
      'Content-Type': 'application/json'
    }, options.headers),
    credentials: 'same-origin'
  };
  if (options.method === 'POST') {
    content.body = JSON.stringify(options.data || {});
  } else if (options.method === 'GET') {
    // 如果发送字段为空 则不发该字段，此处处理为了兼容后端。可能会有坑
    const params = Object.entries(options.data).filter(param => param[1] !== '').map(param => `${param[0]}=${param[1]}`).join('&');
    // const params = Object.entries(options.data).map(para
    // m => `${param[0]}=${param[1]}`).join('&');
    if (params !== '') {
      url += url.indexOf('?') > -1 ? `&${params}` : `?${params}`;
    }
  }
  Loader.showProgress();
  return fetch(`${url}`, content).then((response) => {
    Loader.hideProgress();
    if (response.status !== 200) {
      Toaster.toaster({ type: 'error', content: '系统错误', time: 3000 });
      throw new TypeError('系统错误!');
    } else {
      const res = response.json();
      return res;
    }
  }
  )
  .catch(error => error);
}
