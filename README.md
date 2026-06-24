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
  - 霓虹发光效果
  - 扫描线动画
  - 故障文字效果
  - 网格背景
  - 角色档案卡片
  - 思考中动画
- **响应式**：支持桌面和移动端

## 📁 项目结构

```
zzz-yixuan-webui/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式（ZZZ风格）
├── js/
│   └── app.js          # 前端逻辑（调用API）
├── assets/             # 静态资源
│   ├── favicon.ico
│   ├── zzz_bg_01.jpg   # 背景图
│   └── zzz_hero.png    # 角色图
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

- **后端**: [zzz-yixuan-assistant](https://github.com/RainmeoX/zzz-yixuan-assistant) - 模型训练 + vLLM 服务
- **数据集**: [zzz-yixuan-dataset](https://github.com/RainmeoX/zzz-yixuan-dataset) - 角色资料

## 📄 License

MIT License
