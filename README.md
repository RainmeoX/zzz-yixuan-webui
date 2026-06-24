# ZZZ Yixuan WebUI

> 🎮 绝区零仪玄角色助手 - 前端 UI（ZZZ官网风格）

## 📐 架构说明

本项目是**前端**部分，需要配合后端使用：

```
前端 (本仓库)                    后端 (zzz-yixuan-assistant)
┌─────────────────┐              ┌─────────────────────┐
│  纯 HTML/CSS/JS  │ ──API请求──→ │  vLLM 推理服务       │
│  ZZZ 风格 UI     │ ←─响应────  │  (端口 8000)         │
│  静态文件        │              │  Qwen3-4B + LoRA     │
└─────────────────┘              └─────────────────────┘
```

## ✨ 设计特点

- **ZZZ 官网风格**：赛博朋克 + 霓虹 + 黄黑配色
- **纯前端**：HTML + CSS + JS，无框架依赖
- **华丽 UI**：
  - 金色发光边框
  - 角色立绘展示
  - 角色档案卡片
  - 思考中动画
  - 消息进入动画
- **响应式**：支持桌面和移动端

## 📱 设备适配

### 桌面端（>1200px）
- 三栏布局：左侧角色立绘 + 中间聊天 + 右侧功能面板
- 横版背景图

### 平板端（768-1200px）
- 两栏布局：中间聊天 + 右侧功能面板
- 隐藏左侧立绘

### 手机端（<768px）
- **单栏布局**：仅聊天区
- **底部导航栏**：档案 / 对话 / 功能
- **抽屉式侧边栏**：
  - 左滑出：角色档案
  - 右滑出：功能设置 + 快捷提问
- **竖版背景图**
- 触摸优化

### 超小屏幕（<480px）
- 进一步精简界面

## 📁 项目结构

```
zzz-yixuan-webui/
├── index.html              # 主页面
├── css/
│   └── style.css           # 样式（ZZZ风格 + 响应式）
├── js/
│   └── app.js              # 前端逻辑（调用API）
├── assets/                 # 静态资源
│   ├── favicon.ico         # 图标
│   ├── yixuan_03.png       # 原始立绘
│   ├── yixuan_main.png     # 显示用立绘
│   ├── zzz_bg_desktop.png  # 桌面横版背景
│   └── zzz_bg_mobile.jpg   # 手机竖版背景
└── README.md
```

## 🚀 使用方法

### 方式 1：直接打开

1. 修改 `js/app.js` 第 5 行的 `API_BASE` 为后端地址
2. 用浏览器打开 `index.html`

### 方式 2：用 nginx 部署（推荐）

```bash
# 1. 克隆
git clone https://github.com/RainmeoX/zzz-yixuan-webui.git
cd zzz-yixuan-webui

# 2. 修改 API 地址
# 编辑 js/app.js，把 API_BASE 改成后端地址

# 3. 用 nginx 部署
cp -r * /var/www/html/
nginx
```

### 方式 3：用 Python 简易服务器

```bash
cd zzz-yixuan-webui
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## ⚙️ 配置

### 修改后端 API 地址

编辑 `js/app.js`：

```javascript
const API_BASE = 'http://your-backend:8000';
```

### 修改模型名称

```javascript
const MODEL_NAME = 'yixuan-lora';
```

## 🎨 配色方案

| 颜色 | 色值 | 用途 |
|---|---|---|
| ZZZ 黄 | `#FFD100` | 主强调色 |
| 亮黄 | `#FFE600` | 悬停效果 |
| 暗黄 | `#B89B00` | 渐变 |
| 黑 | `#0A0A0A` | 背景 |
| 深灰 | `#141414` | 卡片背景 |
| 红 | `#FF3D00` | 故障效果 |
| 青 | `#00E5FF` | 故障效果 |

## 📦 相关仓库

| 仓库 | 说明 |
|---|---|
| **后端** | [zzz-yixuan-assistant](https://github.com/RainmeoX/zzz-yixuan-assistant) - 模型训练 + vLLM 服务 |
| **数据集** | [zzz-yixuan-dataset](https://github.com/RainmeoX/zzz-yixuan-dataset) - 角色资料 |

## 💡 对话方式

除了网页界面，还可以用以下方式对话：

### OpenCode（推荐）

后端仓库提供了 OpenCode 配置，可以在终端用 OpenCode 对话：

```bash
# 在后端仓库目录
./scripts/setup-opencode.sh
opencode run "你是谁？"
```

### 命令行

```bash
./scripts/chat.sh "你是谁？"
```

### API 调用

```bash
curl http://localhost:8000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "yixuan-lora",
        "messages": [{"role": "user", "content": "你是谁？"}],
        "max_tokens": 200
    }'
```

## 📄 License

MIT License
