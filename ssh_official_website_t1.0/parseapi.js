import {GenerateSwaggerApi} from "swagger-to-api-v3"
// 请求 url 生成请求api
const createApi = new GenerateSwaggerApi({
  // json 读取模式 网络地址 | 文件路径 "url"|"file" 默认url 模式
  readJsonMode: "url",
  // readJsonMode 为 url 时，读取网络swagger配置json，本地文件可以利用Live Server插件启动本地文件服务
  url: "http://114.115.169.105:8098/api_site/v2/api-docs",
  // readJsonMode 为 file 时，读取本地swagger配置json
  path: "./swagger.json",
  // 可选： 存放api的目录 默认项目目录下 swagger-api/文件夹
  basedir: "src/",
  // 可选： 引用request请求函数的路径
  requirePath: 'import request from "@/utils/request"\n\n',
  // 可选： 函数名及接口模型生成模式（数据源）1.简单模式 2.url 全链解析模式 3.唯一ID operationId模式 默认 simple， "simple"| "url" | "operationId"
  generateFuncNameMode: "simple",
  // 可选： generateFuncNameMode 为url时，函数名处理掉公共前缀(函数名生成规则：接口path拼接 /api/front/appController/getPag )，处理后appControllerGetPag
  ignorePrefix: ["api"],
  // 可选： 自定义替换规则，例如：new Map([["object", "any"]]), 将object替换为any
  replaceRule: new Map(),
  // 可选： 使用 swagger 的example数据辅助生成类型 例如：某Long类型 标识为{ example: String}，就将其处理为string类型，此处理优先级较高
  useExample: false
})
createApi.generate_api()
