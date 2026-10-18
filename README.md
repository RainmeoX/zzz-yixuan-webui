# Stream Chat WebUI

> 纯原生 HTML/CSS/JS 流式对话前端：无框架、主题化视觉、RAG 开关 ｜ 配合 vLLM 后端使用

轻量级对话 WebUI，配合后端 [style-chat-assistant](https://github.com/RainmeoX/style-chat-assistant) 的 vLLM 服务使用。验证「不上前端框架，纯原生也能做出完整对话体验」。

## 特性

- **流式对话**：逐 token 渲染，打字机效果
- **Markdown 渲染**：支持代码块、列表、表格
- **RAG 开关**：前端一键切换检索增强模式
- **主题化视觉**：深色撞色 + 霓虹风格自定义 UI
- **响应式布局**：桌面三栏 / 平板两栏 / 手机单栏 + 抽屉式侧边栏
- **零框架依赖**：原生 JavaScript，`fetch` 调用后端 API，推理全部在后端

## 运行

```bash
# 1. 修改 js/app.js 第 5 行的 API_BASE 为后端地址
# 2. 启动静态服务
python3 -m http.server 8080
# 访问 http://localhost:8080
```

也可以用 nginx 部署：把目录拷到 web 根目录即可。

## 技术要点

- 交互状态管理（连接中 / 思考中 / 流式输出中 / 错误态）全部用原生 JS 状态机实现
- SSE / fetch stream 双模式适配后端流式接口
- 三档响应式布局共用一套 DOM，仅 CSS 断点切换

## 项目不足

- 静态资源（图像素材）依赖手动放置
- 没有做单元测试
- 仅在主流浏览器验证过

## 后续计划

- 抽成可复用的对话前端模板（主题可配置）
- 增加对话导出 / 分享

## License

MIT
