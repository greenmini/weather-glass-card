# 天气 Glassmorphism 卡片 - 完整使用指南 v2.2

## 📋 目录
1. [快速开始](#快速开始)
2. [详细安装](#详细安装)
3. [配置指南](#配置指南)
4. [实体设置](#实体设置)
5. [高级定制](#高级定制)
6. [故障排除](#故障排除)

---

## ✨ 核心特性

### 🧠 智能规则引擎
- 基于预设规则生成实用的天气建议
- 综合分析多传感器数据，提供优先级排序的建议
- 无需外部API，保持本地化处理

### 🎨 玻璃拟态设计
- 现代化的毛玻璃视觉效果
- 响应式布局，自适应不同屏幕
- 流畅的粒子动画和天气效果

### 📊 固定传感器显示
- 自动显示所有配置的传感器数据
- 湿度、空气质量、风速、紫外线、花粉实时监控
- 智能颜色编码，根据数值调整显示

---

## 快速开始

### 前置要求
- Home Assistant 2021.12 或更高版本
- 访问 Home Assistant 配置文件
- 至少一个天气实体和温度/湿度传感器

### 3 分钟快速安装

1. **复制文件到 www 目录**
   ```bash
   # 将以下文件复制到 config/www/ 目录
   - weather-card.js
   - weather-card-editor.js
   ```

2. **在 Home Assistant 中添加资源**

   编辑 `configuration.yaml` 或使用 UI：
   ```yaml
   lovelace:
     resources:
       - url: /local/weather-card.js
         type: module
       - url: /local/weather-card-editor.js
         type: module
   ```

3. **重启 Home Assistant**

   等待系统启动完成

4. **在 Lovelace 中添加卡片**

   编辑仪表板 → 添加卡片 → 搜索"Weather Glass Card"

---

## 详细安装

### 方法 1: HACS（推荐）

```
1. 打开 HACS（Home Assistant Community Store）
2. 点击"探索和下载存储库"
3. 搜索"Weather Glass Card"
4. 点击结果中的卡片
5. 点击"下载"
6. 重启 Home Assistant
```

### 方法 2: 手动安装

#### 步骤 1: 准备文件
```bash
# 创建目录（如果不存在）
mkdir -p config/www

# 将以下文件放在 config/www/ 目录
cp weather-card.js config/www/
cp weather-card-editor.js config/www/
```

#### 步骤 2: 配置资源
**选项 A: 编辑 YAML 文件**

编辑 `config/configuration.yaml`：
```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/weather-card.js
      type: module
    - url: /local/weather-card-editor.js
      type: module
```

**选项 B: 使用 UI**

1. 设置 → 仪表板 → 创建新仪表板
2. 编辑仪表板 → 编辑代码
3. 在 `resources` 部分添加：
```yaml
resources:
  - url: /local/weather-card.js
    type: module
  - url: /local/weather-card-editor.js
    type: module
```

#### 步骤 3: 刷新缓存

1. 按 F12 打开浏览器开发者工具
2. 按 Ctrl+Shift+R 硬刷新（或右键刷新按钮 → 清空缓存并硬刷新）
3. 等待页面加载完成

---

## 配置指南

### 基本配置示例

```yaml
type: custom:weather-glass-card
title: 气候监控
weather_entity: weather.home
temperature_entity: sensor.living_room_temperature
humidity_entity: sensor.living_room_humidity
air_quality_entity: sensor.air_quality_index
```

### 完整配置选项

| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| `type` | string | ✅ | 卡片类型 | `custom:weather-glass-card` |
| `language` | string | ❌ | 语言设置 | `"zh"` 或 `"en"` |
| `title` | string | ❌ | 卡片标题 | `气候监控` |
| `weather_entity` | string | ✅ | 天气实体 | `weather.home` |
| `temperature_entity` | string | ✅ | 温度传感器 | `sensor.temperature` |
| `humidity_entity` | string | ✅ | 湿度传感器 | `sensor.humidity` |
| `air_quality_entity` | string | ❌ | 空气质量实体 | `sensor.air_quality` |
| `wind_entity` | string | ❌ | 风速传感器 | `sensor.wind_speed` |
| `uv_entity` | string | ❌ | 紫外线指数 | `sensor.uv_index` |
| `pollen_entity` | string | ❌ | 花粉浓度 | `sensor.pollen_count` |
| `cloud_coverage_entity` | string | ❌ | 云覆盖 | `sensor.cloud_coverage` |
| `house_image` | string | ❌ | 房子图像 | `/local/house.jpg` |
| `room_badges` | array | ❌ | 房间徽章 | 见下文 |
| `api_key` | string | ❌ | OpenAI API密钥 | `sk-...` |
| `api_endpoint` | string | ❌ | API端点 | `https://api.openai.com/v1/chat/completions` |
| `api_model` | string | ❌ | AI模型 | `gpt-3.5-turbo` |
| `display_humidity` | boolean | ❌ | 显示湿度 | `true` |
| `display_air_quality` | boolean | ❌ | 显示空气质量 | `true` |
| `display_wind` | boolean | ❌ | 显示风速 | `true` |
| `display_uv` | boolean | ❌ | 显示紫外线 | `true` |
| `display_pollen` | boolean | ❌ | 显示花粉 | `true` |

### 房间徽章配置

```yaml
room_badges:
  - name: "客厅"
    temperature_entity: "sensor.living_room_temperature"
    x: 30  # 位置百分比 (0-100)
    y: 40  # 位置百分比 (0-100)
  - name: "卧室"
    temperature_entity: "sensor.bedroom_temperature"
    x: 70
    y: 35
```

### 完整配置示例
```yaml
type: custom:weather-glass-card
language: "zh"  # "en" 或 "zh"
title: 我的家庭气候

# AI 智能提醒设置 (可选)
api_key: "sk-your-openai-api-key-here"
api_endpoint: "https://api.openai.com/v1/chat/completions"
api_model: "gpt-3.5-turbo"

# 传感器显示设置
display_humidity: true
display_air_quality: true
display_wind: true
display_uv: true
display_pollen: true

# 必需实体
weather_entity: weather.home
temperature_entity: sensor.living_room_temperature
humidity_entity: sensor.living_room_humidity

# 可选实体
air_quality_entity: sensor.air_quality_index
wind_entity: sensor.wind_speed
uv_entity: sensor.uv_index
pollen_entity: sensor.pollen_count
cloud_coverage_entity: sensor.cloud_coverage
house_image: /local/house.jpg

# 房间温度徽章
room_badges:
  - name: "客厅"
    temperature_entity: "sensor.living_room_temperature"
    x: 30
    y: 40
  - name: "卧室"
    temperature_entity: "sensor.bedroom_temperature"
    x: 70
    y: 35
```

---

## 实体设置

### 获取正确的实体 ID

#### 方法 1: 通过开发者工具

1. 打开 Home Assistant
2. 进入 工具 → 开发者工具 → 状态
3. 查找相关实体
4. 记录实体 ID

#### 方法 2: 通过 Services 工具

1. 工具 → 开发者工具 → 服务
2. 服务：`homeassistant.get_config`
3. 查看响应中的实体列表

### 常用实体配置

#### OpenWeatherMap 集成

```yaml
type: custom:weather-glass-card
title: 天气预报
weather_entity: weather.openweathermap_home
temperature_entity: sensor.openweathermap_temperature
humidity_entity: sensor.openweathermap_humidity
air_quality_entity: sensor.openweathermap_pm10
wind_entity: sensor.openweathermap_wind_speed
uv_entity: sensor.openweathermap_uv_index
pollen_entity: sensor.openweathermap_pollen
cloud_coverage_entity: sensor.openweathermap_cloud_coverage
```

#### MeteoAlarm 集成

```yaml
type: custom:weather-glass-card
title: 本地天气
weather_entity: weather.meteoalarm
temperature_entity: sensor.meteoalarm_temp
humidity_entity: sensor.meteoalarm_humidity
wind_entity: sensor.meteoalarm_wind_speed
```

#### 多个房间配置

```yaml
type: vertical-stack
cards:
  - type: custom:weather-glass-card
    title: 客厅
    weather_entity: weather.home
    temperature_entity: sensor.living_room_temp
    humidity_entity: sensor.living_room_humidity
    air_quality_entity: sensor.living_room_aqi
    wind_entity: sensor.wind_speed
    uv_entity: sensor.uv_index
    house_image: /local/living_room.jpg
    room_badges:
      - name: "沙发区"
        temperature_entity: "sensor.sofa_temp"
        x: 50
        y: 60
      - name: "厨房"
        temperature_entity: "sensor.kitchen_temp"
        x: 80
        y: 40

  - type: custom:weather-glass-card
    title: 卧室
    weather_entity: weather.home
    temperature_entity: sensor.bedroom_temp
    humidity_entity: sensor.bedroom_humidity
    air_quality_entity: sensor.bedroom_aqi
    wind_entity: sensor.wind_speed
    uv_entity: sensor.uv_index
    house_image: /local/bedroom.jpg
    room_badges:
      - name: "床边"
        temperature_entity: "sensor.bed_temp"
        x: 40
        y: 50
      - name: "书桌"
        temperature_entity: "sensor.desk_temp"
        x: 70
        y: 30

  - type: custom:weather-glass-card
    title: 厨房
    weather_entity: weather.home
    temperature_entity: sensor.kitchen_temp
    humidity_entity: sensor.kitchen_humidity
    air_quality_entity: sensor.kitchen_aqi
    wind_entity: sensor.wind_speed
    uv_entity: sensor.uv_index
    house_image: /local/kitchen.jpg
    room_badges:
      - name: "灶台"
        temperature_entity: "sensor.stove_temp"
        x: 60
        y: 70
```

---

## 高级定制

### 使用 Card-Mod 自定义样式

首先安装 `card-mod` 卡片。

#### 修改背景颜色

```yaml
type: custom:weather-glass-card
title: 自定义卡片
weather_entity: weather.home
temperature_entity: sensor.temperature
humidity_entity: sensor.humidity
card_mod:
  style:
    weather-glass-card$: |
      .glass-card {
        background: linear-gradient(135deg, rgba(100, 150, 255, 0.25) 0%, rgba(150, 100, 255, 0.25) 100%);
      }
```

#### 修改文字颜色和大小

```yaml
card_mod:
  style:
    weather-glass-card$: |
      .header h2 {
        font-size: 28px;
        color: #ffffff;
      }
      .temperature {
        font-size: 40px;
      }
```

#### 自定义 AI 建议区域

```yaml
card_mod:
  style:
    weather-glass-card$: |
      .ai-advisor-section {
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 165, 0, 0.15) 100%);
        border: 1px solid rgba(255, 215, 0, 0.3);
      }
      .advisor-title {
        color: #ff8c00;
        font-size: 18px;
      }
      .advice-item.danger {
        background: rgba(255, 0, 0, 0.15);
        border-left-color: #ff4444;
      }
```

#### 自定义房间徽章

```yaml
card_mod:
  style:
    weather-glass-card$: |
      .room-badge {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        border: 2px solid rgba(102, 126, 234, 0.4);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      .badge-label {
        color: #666;
        font-weight: 600;
      }
      .badge-temp {
        color: #1a1a1a;
        font-size: 14px;
      }
```

#### 自定义游戏模式按钮

```yaml
card_mod:
  style:
    weather-glass-card$: |
      .gaming-toggle {
        background: linear-gradient(135deg, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.3) 100%);
        border: 1px solid rgba(255, 0, 255, 0.5);
        color: #ff00ff;
        font-size: 18px;
      }
      .gaming-toggle:hover {
        background: linear-gradient(135deg, rgba(255, 0, 255, 0.4) 0%, rgba(0, 255, 255, 0.4) 100%);
        transform: scale(1.1) rotate(5deg);
      }
```

### 创建快捷方式卡片

```yaml
type: vertical-stack
cards:
  - type: custom:weather-glass-card
    title: 主卧室
    weather_entity: weather.home
    temperature_entity: sensor.master_bedroom_temperature
    humidity_entity: sensor.master_bedroom_humidity
    air_quality_entity: sensor.master_bedroom_air_quality
    wind_entity: sensor.wind_speed
    uv_entity: sensor.uv_index
    house_image: /local/master_bedroom.jpg
    room_badges:
      - name: "床头"
        temperature_entity: "sensor.bed_head_temp"
        x: 45
        y: 55
      - name: "衣柜"
        temperature_entity: "sensor.wardrobe_temp"
        x: 80
        y: 40

  - type: custom:weather-glass-card
    title: 儿童房
    weather_entity: weather.home
    temperature_entity: sensor.kids_bedroom_temperature
    humidity_entity: sensor.kids_bedroom_humidity
    air_quality_entity: sensor.kids_bedroom_air_quality
    wind_entity: sensor.wind_speed
    uv_entity: sensor.uv_index
    house_image: /local/kids_bedroom.jpg
    room_badges:
      - name: "儿童床"
        temperature_entity: "sensor.kids_bed_temp"
        x: 35
        y: 60
      - name: "书桌"
        temperature_entity: "sensor.kids_desk_temp"
        x: 75
        y: 45
```

---

## 故障排除

### 问题 1: 卡片未显示

**症状**: 仪表板空白或显示错误信息

**解决方案**:
```bash
1. 检查浏览器控制台是否有错误（F12）
2. 确保资源已正确添加到 configuration.yaml
3. 硬刷新浏览器（Ctrl+Shift+R）
4. 检查文件是否在 config/www/ 目录中
5. 重启 Home Assistant
```

### 问题 2: 实体显示为 "--"

**症状**: 卡片显示，但数据未显示

**解决方案**:
```yaml
# 验证实体 ID
1. 打开 开发者工具 → 状态
2. 搜索您配置的实体 ID
3. 确保实体存在且有值
4. 检查实体配置中的大小写

# 示例：正确的实体 ID
weather_entity: weather.home           # 不是 Weather.Home
temperature_entity: sensor.temperature # 不是 Sensor.Temperature
wind_entity: sensor.wind_speed         # 不是 sensor.Wind_Speed
```

### 问题 3: AI 建议不显示

**症状**: AI 建议区域为空或只显示默认消息

**解决方案**:
```yaml
# 检查传感器配置
1. 确保已配置 wind_entity, uv_entity, air_quality_entity, pollen_entity
2. 验证传感器实体存在且有数值
3. 检查传感器数据格式是否正确

# 示例配置
wind_entity: sensor.wind_speed
uv_entity: sensor.uv_index
air_quality_entity: sensor.air_quality_index
pollen_entity: sensor.pollen_count
```

### 问题 4: 粒子动画不工作

**症状**: 天气动画不显示或卡顿

**解决方案**:
```bash
1. 检查浏览器是否支持 Canvas 2D API
2. 尝试在不同浏览器中测试
3. 确保 cloud_coverage_entity 配置正确（用于云层密度）
4. 检查 wind_entity 是否正确配置（用于风物理效果）
5. 刷新页面重新初始化动画
```

### 问题 5: 房子图像不显示

**症状**: 房子区域显示占位符而不是图像

**解决方案**:
```yaml
# 检查图像配置
1. 确保 house_image 路径正确
2. 使用 /local/ 前缀访问 config/www/ 目录中的图像
3. 检查图像文件是否存在且可访问
4. 尝试使用完整 URL

# 示例路径
house_image: /local/house.jpg          # config/www/house.jpg
house_image: /local/images/house.png   # config/www/images/house.png
house_image: https://example.com/house.jpg  # 外部 URL
```

### 问题 6: 房间徽章位置不对

**症状**: 温度徽章位置不正确或重叠

**解决方案**:
```yaml
# 调整徽章位置
1. x 和 y 值是百分比坐标（0-100）
2. (0,0) 是左上角，(100,100) 是右下角
3. 调整 x 值改变水平位置
4. 调整 y 值改变垂直位置

# 示例调整
room_badges:
  - name: "客厅"
    temperature_entity: "sensor.living_room_temp"
    x: 25  # 更靠左
    y: 35  # 稍微靠上
```

### 问题 7: 游戏模式不工作

**症状**: 点击游戏按钮没有效果

**解决方案**:
```bash
1. 确保浏览器支持 CSS 动画和渐变
2. 检查是否有其他样式冲突
3. 尝试刷新页面
4. 验证 Canvas 元素是否正确初始化
```

### 问题 8: 昼夜循环不工作

**症状**: 房子图像在夜晚不自动变暗

**解决方案**:
```yaml
1. 检查系统时间是否正确
2. 确保天气实体状态为 'clear-night' 或时间在 22:00-6:00 之间
3. 验证 house_image 已配置
4. 检查是否有 CSS 冲突覆盖了 filter 属性
```

### 问题 9: 样式显示奇怪

**症状**: 背景太暗或文本看不清

**解决方案**:
```yaml
# 使用 card-mod 调整透明度
card_mod:
  style:
    weather-glass-card$: |
      .glass-card {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%);
      }

# 调整文字对比度
card_mod:
  style:
    weather-glass-card$: |
      .temperature {
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      }
```

---

## 常见问题解答

**Q: 卡片可以在移动应用中使用吗？**
A: 是的，完全支持。卡片完全响应式设计，在手机和平板上会自动调整布局。

**Q: 我可以多次添加同一张卡片吗？**
A: 可以的，您可以为不同的实体添加多张卡片，甚至在同一仪表板中。

**Q: 如何更新卡片？**
A:
- HACS: 自动更新通知
- 手动: 用新版本覆盖旧文件，硬刷新浏览器

**Q: 卡片支持自动化吗？**
A: 卡片仅用于显示数据，不支持直接自动化。可与其他卡片组合使用。

**Q: AI 建议的语言可以自定义吗？**
A: 目前建议文本是硬编码的，但您可以通过 card-mod 修改 CSS 来隐藏或自定义显示。

**Q: 粒子动画会影响性能吗？**
A: 动画经过优化，只在需要时运行。现代设备上性能影响很小。

**Q: 如何备份我的配置？**
A: 您的 Lovelace 配置已保存在 Home Assistant 中，可以通过 设置 → 仪表板 → 编辑代码 导出。

**Q: 支持哪些图像格式？**
A: 支持所有 Web 标准图像格式：JPG, PNG, GIF, WebP, SVG。

---

## 支持的集成

✅ **已测试和支持**
- OpenWeatherMap
- MeteoAlarm
- Home Assistant Weather
- 任何天气实体 (weather.*)
- 任何传感器实体 (sensor.*)

✅ **兼容但未测试**
- Ecobee
- Honeywell
- 其他天气集成

---

## 许可证

MIT License - 自由使用和修改

## 贡献

欢迎提交 Pull Request 和 Issue！

---

## 更新日志

### v2.0.0 (2026-02-04)
- ✨ 添加 AI Smart Advisor 智能建议系统
- 🌦️ 集成 Prism Weather Engine 天气动画
- 🌗 实现 Day/Night Cycle 昼夜循环
- 🎮 添加 Gaming Ambient Mode 游戏环境模式
- 🌡️ 新增 Room Badges 房间温度徽章
- 🎨 增强视觉效果和动画
- 📱 改进响应式设计
- 🔧 扩展配置选项
- 📚 更新文档和示例

### v1.0.0 (2026-02-04)
- 初始版本发布
- 支持基本天气显示
- Glassmorphism 设计
- 空气质量指标
- 响应式设计

---

**版本**: 2.0.0  
**最后更新**: 2026-02-04  
**维护者**: Your Name