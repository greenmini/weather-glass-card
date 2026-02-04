# Weather Glass Card

一款先进的 Home Assistant Lovelace 卡片，采用现代 glassmorphism 设计风格，专为监控家庭气候、天气状况和环境危害而设计。

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

## 安装

通过 HACS 安装：
1. HACS → 前端 → 添加自定义仓库
2. 仓库 URL: `https://github.com/yourusername/weather-glass-card`
3. 类别: Frontend
4. 安装并重启 Home Assistant

## 配置

```yaml
type: custom:weather-glass-card
weather_entity: weather.home
temperature_entity: sensor.temperature
humidity_entity: sensor.humidity
```

更多配置选项请参考文档。