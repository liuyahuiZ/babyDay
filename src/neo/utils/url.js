export function getUrlParam(url = window.location.href) {
  const paramString = url.substr(url.indexOf('?') + 1);
  return paramString.split('&').reduce((map, param) => {
    map[param.split('=')[0]] = param.split('=')[1];
    return map;
  }, {});
}

export function isPC(){
  let userAgentInfo = navigator.userAgent.toLowerCase();
  const Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}