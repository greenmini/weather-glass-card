# Weather Glass Card v2.1

一款先进的 Home Assistant Lovelace 卡片，采用现代 glassmorphism 设计风格，专为监控家庭气候、天气状况和环境危害而设计。

## ✨ 新特性

🧠 **API驱动AI智能提醒**
- 支持OpenAI等API服务生成个性化建议
- 智能缓存和节流机制
- 自动回退到规则引擎

🎛️ **可配置传感器显示**
- 用户可选择显示的传感器（湿度、空气质量、风速、紫外线、花粉）
- 动态布局调整
- 简洁高级的UI设计

🌐 **多语言支持**
- 英文和中文界面
- 完整的本地化

## 特性

✨ **现代设计**
- 先进的 glassmorphism 视觉效果
- 毛玻璃背景效果（backdrop blur）
- 流畅的渐变和阴影

🧠 **AI Smart Advisor**
- 智能分析天气预报、风速、紫外线、空气质量、花粉数据
- 提供人类可读的上下文建议

🌦️ **Prism Weather Engine**
- 雨雪动画、星星、雾气、云层效果
- 基于真实传感器数据的动态动画

🌗 **Day/Night Cycle**
- 房子图像在夜晚自动变暗

🎮 **Gaming Ambient Mode**
- 可切换的沉浸模式

🌡️ **Room Badges**
- 可定位的温度徽章

⚡ **闪电风暴效果**
- 雷暴天气的真实闪电动画

## 安装

通过 HACS 安装：
1. HACS → 前端 → 添加自定义仓库
2. 仓库 URL: `https://github.com/yourusername/weather-glass-card`
3. 类别: Frontend
4. 安装并重启 Home Assistant

## 配置

```yaml
type: custom:weather-glass-card
language: "zh"  # "en" 或 "zh"
title: "气候监控"

# AI 设置 (可选)
api_key: "your-openai-api-key"
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
temperature_entity: sensor.temperature
humidity_entity: sensor.humidity

# 可选实体
air_quality_entity: sensor.air_quality
wind_entity: sensor.wind_speed
uv_entity: sensor.uv_index
pollen_entity: sensor.pollen_count
```

更多配置选项请参考完整文档。