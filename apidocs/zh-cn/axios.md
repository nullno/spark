# axios
https://github.com/axios/axios

[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)
[![CDNJS](https://img.shields.io/cdnjs/v/axios.svg?style=flat-square)](https://cdnjs.com/libraries/axios)
[![build status](https://img.shields.io/travis/axios/axios/master.svg?style=flat-square)](https://travis-ci.org/axios/axios)
[![code coverage](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)](https://coveralls.io/r/mzabriskie/axios)
[![install size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)
[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](http://npm-stat.com/charts.html?package=axios)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)](https://gitter.im/mzabriskie/axios)
[![code helpers](https://www.codetriage.com/axios/axios/badges/users.svg)](https://www.codetriage.com/axios/axios)

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。


## 特性

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

## 浏览器支持

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |



## 安装

使用 npm:

```bash
$ npm install axios
```

Using bower:

```bash
$ bower install axios
```

使用 bower:
```bash
$ yarn add axios
```


使用 cdn:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 案例

执行 GET 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

//想使用async / await吗？ 将`async`关键字添加到您的外部函数/方法中。
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

执行 POST 请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```

## axios API

可以通过向 axios 传递相关配置来创建请求

##### axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

```js
//在node.js中获取远程图像的请求
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

##### axios(url[, config])

```js
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

### 请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

##### axios.request(config)
##### axios.get(url[, config])
##### axios.delete(url[, config])
##### axios.head(url[, config])
##### axios.options(url[, config])
##### axios.post(url[, data[, config]])
##### axios.put(url[, data[, config]])
##### axios.patch(url[, data[, config]])

###### 注意
在使用别名方法时， url、method、data 这些属性都不必在配置中指定。

### 并发
请使用Promise.all替换以下功能。

Helper函数用于处理并发请求。

axios.all(iterable)
axios.spread(callback)

### 创建实例

您可以使用自定义配置创建axios的新实例。

##### axios.create([config])

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例方法

以下是可用的实例方法。指定的配置将与实例的配置合并

##### axios#request(config)
##### axios#get(url[, config])
##### axios#delete(url[, config])
##### axios#head(url[, config])
##### axios#options(url[, config])
##### axios#post(url[, data[, config]])
##### axios#put(url[, data[, config]])
##### axios#patch(url[, data[, config]])
##### axios#getUri([config])

## 请求配置

这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

 // `method` 是创建请求时使用的方法
  method: 'get', // default

 // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

 // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

 // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },
  

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000, // default is `0` (no timeout)

 // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

 // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  //`responseEncoding`表示用于解码响应的编码（仅限Node.js）
   //注意：忽略“流”或客户端请求的“ responseType”
  responseEncoding: 'utf8', // default

 // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

//`xsrfHeaderName`是带有xsrf令牌值的http标头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

 // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

// `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  //`maxBodyLength`（仅节点选项）定义http请求内容的最大大小（以字节为单位）
  maxBodyLength: 2000,

   //`validateStatus`定义是解决还是拒绝给定的承诺
   // HTTP响应状态代码。 如果`validateStatus`返回`true`（或设置为`null`或`undefined`），则承诺将得到解决； 否则，承诺将是拒绝。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

 //`maxRedirects`定义了node.js中要遵循的最大重定向数。
   //如果设置为0，则不会进行重定向。
  maxRedirects: 5, // default

  //`socketPath`定义要在node.js中使用的UNIX套接字。
   //例如 '/var/run/docker.sock'将请求发送到Docker守护程序。
   //只能指定`socketPath`或`proxy`。
   //如果两者都指定，则使用`socketPath`。
  socketPath: null, // default

  //`httpAgent`和`httpsAgent`定义了执行http时要使用的自定义代理
   //和https请求，分别在node.js中。 这样可以添加选项，例如
   //默认情况下未启用的“ keepAlive”。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

//`proxy`定义代理服务器的主机名和端口。
   //您还可以使用常规的`http_proxy`和
   //`https_proxy`环境变量。 如果您使用环境变量
   //对于您的代理配置，您还可以定义`no_proxy`环境
   //变量，以逗号分隔的不应该被代理的域列表。
   //使用`false`禁用代理，忽略环境变量。
   //`auth`指示应使用HTTP Basic auth连接到代理，并且
   //提供凭据。
   //这将设置`Proxy-Authorization`标头，覆盖所有现有标头
   //您使用`headers`设置的`Proxy-Authorization`自定义标题。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  //`cancelToken`指定一个取消令牌，可用于取消请求
   //（有关详细信息，请参见下面的“取消”部分）
  cancelToken: new CancelToken(function (cancel) {
  }),

  //`decompress`指示是否应该对响应主体进行解压缩
   //自动。 如果设置为“ true”，还将删除“ content-encoding”标头
   //来自所有解压缩响应的响应对象
   //-仅节点（XHR无法关闭解压缩）
  decompress: true // default

}
```

## 响应结构

某个请求的响应包含以下信息

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 //'request'
   //`request`是生成此响应的请求
   //这是node.js中的最后一个ClientRequest实例（在重定向中）
   //和一个XMLHttpRequest实例的浏览器
  request: {}
}
```

使用 then 时，你将接收下面这样的响应 :

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

当使用`catch`或传递[拒绝回调]（https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then）作为'then'的第二个参数时， 如[处理错误]（＃handling-errors）部分所述，该响应将通过`error`对象提供。

## 配置默认值

你可以指定将被用在各个请求的配置默认值

### 全局的 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```js
//创建实例时设置默认配置
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

//创建实例后更改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置的优先顺序

Config将以优先顺序合并。 顺序是在[lib / defaults.js]（https://github.com/axios/axios/blob/master/lib/defaults.js#L28）中找到的库默认值，然后是实例的“ defaults”属性，以及 最后是请求的config参数。 后者将优先于前者。 这是一个例子。

```js
//使用库提供的配置默认值创建实例
//此时，超时配置值为0，这是该库的默认值
const instance = axios.create();

//覆盖库默认超时
//现在使用此实例的所有请求将等待2.5秒，然后再超时
instance.defaults.timeout = 2500;

//覆盖此请求的超时，因为它需要花费很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```

## 拦截器

您可以先拦截请求或响应，然后再由`then`或`catch`处理。
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
   // 在发送请求之前做些什么
    return config;
  }, function (error) {
   // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
   // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 axios 实例添加拦截器

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 错误处理

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
     //发出了请求，服务器返回了状态码
       //不在2xx范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //已发出请求，但未收到响应
       //`error.request`是浏览器中XMLHttpRequest的实例，也是
       // node.js中的http.ClientRequest
      console.log(error.request);
    } else {
     //设置触发错误的请求时发生了什么
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

使用`validateStatus`配置选项，您可以定义应该抛出错误的HTTP代码。
```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
})
```

使用`toJSON`，您将获得一个对象，其中包含有关HTTP错误的更多信息。
```js
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```

## 取消

使用 cancel token 取消请求

> Axios 的 cancel token API 基于 [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises).

您可以使用`CancelToken.source`工厂创建一个取消令牌，如下所示：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

您还可以通过将执行程序函数传递给`CancelToken`构造函数来创建一个取消token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

> 注意: 可以使用同一个 cancel token 取消多个请求

#### 使用 application/x-www-form-urlencoded format

默认情况下，axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据，您可以使用以下选项之一。
### 浏览器

在浏览器中，您可以使用 [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API as follows:

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 请注意，并非所有浏览器都支持“ URLSearchParams”(see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), 但可以使用 [polyfill](https://github.com/WebReflection/url-search-params) (确保填充全局环境).

或者，您可以使用[`qs`](https://github.com/ljharb/qs) 对数据进行编码:

```js
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者以另一种方式（ES6）

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### Node.js

#### Query string

在node.js中, 您可以使用 [`querystring`](https://nodejs.org/api/querystring.html) 模块，如下所示：

```js
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

或者使用['URLSearchParams'](https://nodejs.org/api/url.html#url_class_urlsearchparams) from ['url module'](https://nodejs.org/api/url.html) as follows:

```js
const url = require('url');
const params = new url.URLSearchParams({ foo: 'bar' });
axios.post('http://something.com/', params.toString());
```

您可以使用[`qs`](https://github.com/ljharb/qs) 对数据进行编码:


###### NOTE
The `qs` library is preferable if you need to stringify nested objects, as the `querystring` method has known issues with that use case (https://github.com/nodejs/node-v0.x-archive/issues/1665).

#### Form data

In node.js, you can use the [`form-data`](https://github.com/form-data/form-data) library as follows:

```js
const FormData = require('form-data');
 
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })
```

Alternatively, use an interceptor:

```js
axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});
```

## Semver

在axios达到1.0版之前，重大更改将以新的次要版本发布。 例如`0.5.1`和`0.5.4`将具有相同的API，但是`0.6.0`将具有重大更改。

## Promises

xios 依赖原生的 ES6 Promise 实现而被[支持](http://caniuse.com/promises).
如果你的环境不支持 ES6 Promise, 你可以使用 [polyfill](https://github.com/jakearchibald/es6-promise).

## TypeScript
axios包括[TypeScript](http://typescriptlang.org)定义。
```typescript
import axios from 'axios';
axios.get('/user?ID=12345');
```


