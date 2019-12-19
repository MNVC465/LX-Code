
/**
 * vue 项目中使用到的工具方法
 */
 const configData={
   //或者项目路径根路径
   getProjectRoot: function(){
     const obj = window.location;
     const contextPath = obj.pathname.split("/")[1];
     const hostName=obj.hostname;
     let basePath;
     //IP正则表达式
     const regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
     if(hostName=="localhost" || regex.test(hostName)){
       basePath = obj.protocol + "//" + obj.host + "/" + contextPath;
     }else{
       basePath = obj.protocol + "//" + obj.host + "/" ;
     }
     return basePath;
   }

}
export  default configData
