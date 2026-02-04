# Weather Glass Card Integration

这是一个完整的 Home Assistant 集成包，包含天气 Glassmorphism 卡片。

## 安装步骤

### 1. 创建 GitHub 仓库
1. 在 GitHub 上创建一个新仓库，命名为 `weather-glass-card`
2. 将以下文件上传到仓库：
   - `hacs.json`
   - `info.md`
   - `weather-glass-card.js`
   - `weather-glass-card-editor.js`
   - `README.md`
   - `INSTALLATION_GUIDE.md`

### 2. 通过 HACS 安装
1. 打开 HACS
2. 转到 "Frontend"
3. 点击右上角菜单 → "Custom repositories"
4. 添加仓库：
   - Repository: `https://github.com/YOUR_USERNAME/weather-glass-card`
   - Category: `Frontend`
5. 点击 "ADD"
6. 找到 "Weather Glass Card" 并安装
7. 重启 Home Assistant

### 3. 使用卡片
安装完成后，在 Lovelace 仪表板中添加卡片时就能找到 "Weather Glass Card"。

## 文件说明
- `hacs.json`: HACS 配置
- `info.md`: 插件信息
- `weather-card.js`: 主卡片文件
- `weather-card-editor.js`: 配置编辑器
- `README.md`: 功能介绍
- `INSTALLATION_GUIDE.md`: 详细安装指南