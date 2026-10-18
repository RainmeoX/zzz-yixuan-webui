# ZZZ Yixuan WebUI

绝区零仪玄角色助手的前端界面，配合后端 [zzz-yixuan-assistant](https://github.com/RainmeoX/zzz-yixuan-assistant) 的 vLLM 服务使用。

## 项目背景

后端做好后需要一个直观的对话界面。我用纯前端还原 ZZZ 官网风格，不引入框架，保持轻量。

## 设计

- ZZZ 风格：赛博朋克 + 霓虹 + 黄黑配色
- 纯 HTML / CSS / JS，无框架
- 角色立绘展示、思考中动画、消息进入动画
- 响应式：桌面三栏 / 平板两栏 / 手机单栏 + 抽屉式侧边栏

## 技术栈

- 原生 JavaScript，`fetch` 调后端 API
- 前端只负责展示和交互，推理全在后端

## 运行方式

```bash
# 1. 修改 js/app.js 第 5 行的 API_BASE 为后端地址
# 2. 启动静态服务
python3 -m http.server 8080
# 访问 http://localhost:8080
```

也可以用 nginx 部署，把目录拷到 web 根目录即可。

## 我的工作

- 设计响应式布局（桌面 / 平板 / 手机三档）
- 实现流式对话与 Markdown 渲染
- 实现 RAG 开关等前端交互

## 项目不足

- 立绘等静态资源依赖手动放置
- 没有做单元测试
- 仅在主流浏览器验证过

## 后续计划

- 抽成可复用的角色助手前端模板
- 增加对话导出 / 分享

## Reflection

纯前端也能做出很完整的体验，关键是把交互状态管理清楚，不一定要上框架。这个项目也让我练了"前端对接本地推理服务"的联调流程。

## License

MIT
