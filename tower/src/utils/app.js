/**
 将会话相关的数据存放在sessionStorage中
 */
const App = {
  storage: {
    getStorage: function () {
      return sessionStorage;
    },
    getValue: function (key) {  //获取缓存数据
      return this.getStorage().getItem(key);
    },
    setValue: function (key, value) { //向缓存中存放数据
      this.getStorage().setItem(key, value);
    },
    getObject: function (key) {
      var v = this.getStorage().getItem(key);
      return v ? App.common.str2json(v) : null;
    },
    setObject: function (key, value) {
      this.getStorage().setItem(key, App.common.json2str(value));
    },
    remove: function (key) { //通过key向缓存中删除数据
      this.getStorage().removeItem(key);
    },
    clear: function () { //清除当前缓存中的数据
      this.getStorage().clear();
    }
  },
  common: {
    // 获取项目 基础路径
    getContext: function () {
      var obj = window.location;
      var contextPath = obj.pathname.split("/")[1];
      var basePath = obj.protocol + "//" + obj.host + "/" + contextPath;
      return basePath;
    },
    getFileServicePath:function(){
      return "http://192.168.0.207:8090/upload/";
    },
    objectToJson: function (json) {
      return JSON.stringify(json);
    },
    jsonToObject : function (json) {
      return JSON.parse(json);
    },
    getRootPath:function(){
      return "http://192.168.0.207:8089/";
    }
  }
}

export default App
