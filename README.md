# 天气 Glassmorphism 卡片 v2.0

一款先进的 Home Assistant Lovelace 卡片，采用现代 glassmorphism 设计风格，专为监控家庭气候、天气状况和环境危害而设计。

## ✨ 新增功能 (v2.0)

### 🧠 AI Smart Advisor
- 智能分析天气预报、风速、紫外线、空气质量、花粉数据
- 提供人类可读的上下文建议
- 例如："风寒警告: 温度 5°C 但由于强风感觉像 -2°C"

### 🌦️ Prism Weather Engine
- **雨雪动画**: 优雅的、非侵入性的粒子动画（Prism Classic 风格）
- **星星**: 晴朗夜晚自动出现星星
- **雾气**: 雾天或雨夜出现有机雾气
- **云层**: 基于云覆盖实体的动态云密度
- **风物理**: 云和雨/雪根据真实风传感器数据改变方向和速度

### 🌗 Day/Night Cycle
- 房子图像在夜晚自动变暗以匹配仪表板主题

### 🎮 Gaming Ambient Mode
- 可切换的沉浸模式
- 在房子图像上叠加柔和的浮动环境光（品红/青色/紫色）

### 🌡️ Room Badges
- 可定位的温度徽章，叠加在房子图像上用于特定房间

## 特性

✨ **现代设计**
- 先进的 glassmorphism 视觉效果
- 毛玻璃背景效果（backdrop blur）
- 流畅的渐变和阴影

📊 **丰富的数据展示**
- 实时天气条件和温度显示
- 湿度、空气质量、风速、紫外线、花粉监控
- 天气图标自动适应

🎨 **响应式设计**
- 完全响应式布局
- 桌面和移动设备优化
- 平滑的过渡动画

🌡️ **多环境支持**
- 支持自定义实体绑定
- 灵活的配置选项
- 国际化文本支持

## 安装

### 方法 1: HACS（推荐）
1. 打开 Home Assistant，进入 HACS
2. 搜索 "Weather Glass Card"
3. 点击安装
4. 重启 Home Assistant

### 方法 2: 手动安装
1. 将 `weather-card.js` 下载到 `config/www/` 目录
2. 在 Home Assistant 中添加以下资源：

```yaml
resources:
  - url: /local/weather-card.js
    type: module
```

## 配置

### 完整配置选项

| 选项 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | string | ❌ | 气候监控 | 卡片标题 |
| `weather_entity` | string | ✅ | - | 天气实体 ID |
| `temperature_entity` | string | ✅ | - | 温度传感器实体 ID |
| `humidity_entity` | string | ✅ | - | 湿度传感器实体 ID |
| `air_quality_entity` | string | ❌ | - | 空气质量实体 ID |
| `wind_entity` | string | ❌ | - | 风速传感器实体 ID |
| `uv_entity` | string | ❌ | - | 紫外线指数实体 ID |
| `pollen_entity` | string | ❌ | - | 花粉浓度实体 ID |
| `cloud_coverage_entity` | string | ❌ | - | 云覆盖实体 ID |
| `house_image` | string | ❌ | - | 房子图像 URL |
| `room_badges` | array | ❌ | - | 房间温度徽章配置 |

### 完整配置示例
```yaml
type: custom:weather-glass-card
title: 我的家庭气候
weather_entity: weather.home
temperature_entity: sensor.living_room_temperature
humidity_entity: sensor.living_room_humidity
air_quality_entity: sensor.air_quality_index
wind_entity: sensor.wind_speed
uv_entity: sensor.uv_index
pollen_entity: sensor.pollen_count
cloud_coverage_entity: sensor.cloud_coverage
house_image: /local/house.jpg
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

## AI 智能建议

卡片会根据以下条件自动生成建议：

### 风寒警告
- 当温度 ≤ 10°C 且风速 ≥ 4.8 m/s 时计算风寒温度
- 显示实际温度 vs. 体感温度差异

### 紫外线警告
- UV ≥ 8: 危险，建议穿长袖、防晒霜
- UV ≥ 6: 高，建议使用防晒霜

### 空气质量警告
- AQI > 150: 空气质量差，减少户外活动
- AQI > 100: 空气质量不佳，敏感人群注意

### 花粉警告
- 花粉 > 50: 高浓度，过敏人群注意防护

### 天气提醒
- 下雨: 记得带伞，路面湿滑
- 下雪: 注意保暖，路面结冰
- 晴朗: 适合户外活动，注意防晒

## Prism 天气引擎

### 粒子效果
- **雨**: 细长粒子，从上向下移动
- **雪**: 大粒子，缓慢飘落
- **雾**: 扩散粒子，缓慢移动
- **星星**: 闪烁点，在夜晚晴朗时出现

### 风物理
- 所有粒子根据风速传感器数据调整移动方向和速度
- 风速越高，粒子移动越快，角度变化越大

### 云层密度
- 基于云覆盖百分比动态调整云层透明度和密度
- 晴朗时云层稀疏，阴天时云层密集

## 游戏环境模式

点击卡片右上角的 🎮 按钮切换游戏环境模式：

- 叠加柔和的彩色光晕
- 品红色、青色、紫色浮动光效
- 增强沉浸感

## 昼夜循环

- 自动检测时间（6:00-22:00 为白天）
- 夜晚时房子图像自动变暗
- 与天气实体的夜晚状态同步

## 使用示例

### 多房间监控
```yaml
type: vertical-stack
cards:
  - type: custom:weather-glass-card
    title: 客厅
    weather_entity: weather.home
    temperature_entity: sensor.living_room_temperature
    humidity_entity: sensor.living_room_humidity
    air_quality_entity: sensor.living_room_air_quality
    house_image: /local/living_room.jpg
    room_badges:
      - name: "沙发区"
        temperature_entity: "sensor.sofa_temp"
        x: 50
        y: 60

  - type: custom:weather-glass-card
    title: 卧室
    weather_entity: weather.home
    temperature_entity: sensor.bedroom_temperature
    humidity_entity: sensor.bedroom_humidity
    air_quality_entity: sensor.bedroom_air_quality
    house_image: /local/bedroom.jpg
    room_badges:
      - name: "床边"
        temperature_entity: "sensor.bed_temp"
        x: 40
        y: 50
```

## 自定义样式

使用 `card-mod` 扩展自定义样式：

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
      .ai-advisor-section {
        background: linear-gradient(135deg, rgba(255, 100, 100, 0.1) 0%, rgba(255, 150, 100, 0.1) 100%);
      }
```

## 常见问题

### Q: AI 建议不显示？
A: 确保已配置相关的传感器实体（风速、紫外线等）

### Q: 粒子动画不工作？
A: 检查浏览器是否支持 Canvas 2D，尝试刷新页面

### Q: 房子图像不显示？
A: 确保图像路径正确，可以使用 `/local/` 或完整 URL

### Q: 房间徽章位置不对？
A: x 和 y 是百分比坐标（0-100），调整这些值来定位徽章

## 浏览器支持

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+

## 许可证

MIT License

## 更新日志

### v2.0.0 (2026-02-04)
- ✨ 添加 AI Smart Advisor 智能建议系统
- 🌦️ 集成 Prism Weather Engine 天气动画
- 🌗 实现 Day/Night Cycle 昼夜循环
- 🎮 添加 Gaming Ambient Mode 游戏环境模式
- 🌡️ 新增 Room Badges 房间温度徽章
- 🎨 增强视觉效果和动画
- 📱 改进响应式设计

### v1.0.0 (2026-02-04)
- 初始版本发布
- 支持基本天气显示
- Glassmorphism 设计
- 空气质量指标
- 响应式设计