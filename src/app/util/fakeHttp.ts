import {Injectable} from '@angular/core';

@Injectable()
export class Http {

  private static routes = {
    get: [],
    post: [],
    put: [],
    delete: [],
  };
  private static rule = [];

  constructor() {
    console.log('实例化成功')
  }

  // 设置路径，供子类调用
  protected setRoute (url, type: string, cb) {
    type = type.toLowerCase();
    let exp;

    // expStr: 判断该路由是否匹配这个路由正则
    // regExp: 如果匹配，则将该段用于匹配的文字替换为真正的路由
    // replaceRegExp: 真正的路由
    Http.rule.forEach(function (ruleObj) {
      if (url.indexOf(ruleObj.execStr) > -1) {
        url = url.replace(ruleObj.regExp,ruleObj.replaceRegExp);
      }
    });
    exp = new RegExp('^' + url + '$');

    Http.routes[type].push({
      path: exp,
      action: cb
    });
  }

  /**
   * 查询routes是否存在该方法与url，如果存在则执行逻辑函数
   * @param type
   * @param url
   * @param data
   */
  private use(type, url, data) {
    return new Promise((res, rej)=>{
      const typeRoutes = Http.routes[type];

      let expResult;

      const urlObj = this.splitUrl(url);

      const route = typeRoutes.find(route=>{
        const pathExp = route.path;
        if (pathExp.test(urlObj.url)) {
          expResult = pathExp.exec(urlObj.url);
          expResult = [].concat(expResult);
          expResult.shift();
          route.path.lastIndex = 0;
          return true;
        }
      });

      const cb = route.action;

      if (cb) {
        if (cb instanceof Function) {
          let params: any = [data];
          params.push(urlObj.query || {});
          cb(...params, ...expResult).then((data)=>{
            res(data);
          })
        } else {
          throw new Error('回调函数必须是函数')
        }
      } else {
        // 404错误
        console.error.apply(console,['Error',this.response404(url)]);
      }
    });
  }

  private splitUrl(url: string) {
    url = url.split('#')[0];
    const [base, query] = url.split('?');
    let result: any = {
      url: base,
    };
    if (query && query.length > 0) {
      const queryArr = query.split('&');
      const queryObj: any = {};
      queryArr.forEach(item=>{
        const [key, value] = item.split('=');
        if (queryObj[key]) {
          if (queryObj[key] instanceof Array) {
            queryObj[key].push(value);
          } else {
            queryObj[key] = [queryObj[key], value];
          }
        } else {
          queryObj[key] = value;
        }
      });
      result.query = queryObj;
    }
    return result;
  }

  get (url, data?) {
    return this.use('get', url, data)
  }

  post (url, data?) {
    return this.use('post', url, data)
  }

  put (url, data?) {
    return this.use('put', url, data)
  }

  delete (url, data?) {
    return this.use('delete', url, data)
  }

  /**
   * 向路由正则添加规则
   * @param {string} execStr 标识符
   * @param {RegExp} regExp 标识符正则
   * @param {string} replaceRegExp 将标识符正则替换的正则
   */
  protected addRule(execStr, regExp, replaceRegExp) {
    Http.rule.push({
      execStr: execStr,
      regExp: regExp,
      replaceRegExp: replaceRegExp
    });
  }

  // 404
  private response404(url) {
    return {
      body: {
        error: `Collection '${url}' not found`
      },
      status: 404,
      statusText: 'Not Found',
      url: url,
    }
  }

  // 在app.module中调用，传入子类从而实例化子类
  static forRoot(classList) {
    classList.forEach(klass=>{
      const newKlass = new klass();
    });
  }
}
