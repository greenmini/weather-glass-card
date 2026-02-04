# Weather Glass Card Integration v2.1

这是一个完整的 Home Assistant 集成包，包含天气 Glassmorphism 卡片。

## ✨ 新功能 (v2.1)

### 🧠 API驱动AI智能提醒
- 支持OpenAI等API服务生成个性化天气建议
- 智能缓存和节流机制
- API不可用时自动回退到本地规则引擎

### 🎛️ 可配置传感器显示
- 用户可选择显示湿度、空气质量、风速、紫外线、花粉等传感器
- 动态网格布局，根据选择的传感器自动调整
- 提供更简洁、更个性化的界面

### 🌐 增强多语言支持
- 完整的英文和中文本地化
- AI建议支持双语输出

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
   - `INTEGRATION_README.md`

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

#### 可视化配置
卡片支持完全可视化的配置界面：
- 点击卡片配置按钮打开编辑器
- 从下拉菜单选择实体
- 配置AI设置（可选）
- 选择要显示的传感器
- 可视化设置房间温度徽章位置
- 无需手动编写 YAML 代码

## 文件说明
- `hacs.json`: HACS 配置
- `info.md`: 插件信息
- `weather-glass-card.js`: 主卡片文件
- `weather-glass-card-editor.js`: 配置编辑器
- `README.md`: 功能介绍
- `INSTALLATION_GUIDE.md`: 详细安装指南
- `INTEGRATION_README.md`: 集成说明