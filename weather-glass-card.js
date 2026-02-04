const TRANSLATIONS = {
  en: {
    loading: "Analyzing environmental data...",
    home_median: "Home",

    // Conditions
    clear_night: "Clear Night", cloudy: "Cloudy", fog: "Fog", hail: "Hail",
    lightning: "Thunderstorm", lightning_rainy: "Thunderstorm & Rain",
    partlycloudy: "Partly Cloudy", pouring: "Pouring Rain", rainy: "Rainy",
    snowy: "Snowy", sunny: "Sunny", windy: "Windy",

    // --- AI NARRATIVES ---

    // 1. DANGER / STORM
    alert_storm: "⚠️ CRITICAL ALERT: A storm with lightning is active nearby. Strong winds and heavy rain are expected. Please secure loose objects outside and stay indoors for safety.",

    // 2. HEALTH (AQI / POLLEN)
    alert_aqi_bad: "😷 SMOG ALERT: Air quality is critical (PM2.5: {val}). Prolonged exposure is dangerous. Keep windows closed and run your air purifier.",
    alert_aqi_mod: "😶 AIR QUALITY WARNING: PM2.5 levels are elevated ({val}). Sensitive groups should limit outdoor exertion today.",
    alert_pollen: "🤧 ALLERGY ALERT: High pollen concentration detected. If you suffer from allergies, keep windows shut and have your medication ready.",

    // 3. FORECAST (FUTURE RAIN/SNOW)
    advice_rain_soon: "☂️ PLAN AHEAD: Rain is approaching and expected around {time} (approx. {val} mm). Don't leave without an umbrella.",
    advice_snow_soon: "❄️ WINTER ALERT: Snowfall is expected around {time}. Road conditions may deteriorate rapidly. Drive with caution.",

    // 4. CURRENT WEATHER
    advice_rain_now: "🌧️ CURRENTLY RAINING: Intensity is {val} mm/h. Wet surfaces and reduced visibility. Drive safely and wear waterproof gear.",
    advice_snow_now: "🌨️ SNOWING: Snow is falling right now. Enjoy the view, but dress warmly if you head out.",

    // 5. UV / SUN
    alert_uv_high: "☀️ HIGH UV RADIATION: The UV Index is {val}. Unprotected skin can burn quickly. Use sunscreen and wear sunglasses if you go out.",

    // 6. TEMPERATURE + WIND (Wind Chill)
    advice_cold_wind: "🥶 WIND CHILL WARNING: It's {val}°C, but the strong wind makes it feel much colder. Wear windproof layers and a hat.",
    advice_cold: "🧣 COLD WEATHER: Outside temperature is {val}°C. It's chilly—make sure to zip up your jacket and keep warm.",

    advice_hot: "🔥 HEAT ADVISORY: Temperatures have reached {val}°C. Avoid strenuous activity in direct sunlight and drink plenty of water.",
    advice_nice: "😎 COMFORTABLE CONDITIONS: Weather is stable at {val}°C with moderate wind. Great time for a walk or airing out the house.",

    advice_gaming: "🎮 GAMING MODE: Immersive lighting active. Notifications silenced.",
  },
  zh: {
    loading: "正在分析环境数据...",
    home_median: "室内",

    // 天气状况
    clear_night: "晴朗夜晚", cloudy: "多云", fog: "雾", hail: "冰雹",
    lightning: "雷暴", lightning_rainy: "雷暴雨",
    partlycloudy: "局部多云", pouring: "大雨", rainy: "雨",
    snowy: "雪", sunny: "晴朗", windy: "大风",

    // --- AI 叙述 ---

    // 1. 危险/风暴
    alert_storm: "⚠️ 严重警报：附近有雷暴天气。预计会有强风和大雨。请固定室外物品并留在室内。",

    // 2. 健康 (空气质量/花粉)
    alert_aqi_bad: "😷 雾霾警报：空气质量严重污染 (PM2.5: {val})。长时间暴露很危险。请关闭窗户并运行空气净化器。",
    alert_aqi_mod: "😶 空气质量警告：PM2.5水平升高 ({val})。敏感人群应限制户外活动。",
    alert_pollen: "🤧 过敏警报：检测到高浓度花粉。如果您对花粉过敏，请关闭窗户并准备好药物。",

    // 3. 预报 (即将到来的雨雪)
    advice_rain_soon: "☂️ 提前规划：雨水即将到来，预计在{time}左右 (约{val}mm)。出门请带伞。",
    advice_snow_soon: "❄️ 冬季警报：预计在{time}左右开始下雪。道路条件可能迅速恶化。请谨慎驾驶。",

    // 4. 当前天气
    advice_rain_now: "🌧️ 正在下雨：强度为{val}mm/h。路面湿滑，能见度降低。请安全驾驶并穿着防水装备。",
    advice_snow_now: "🌨️ 正在下雪：雪正在落下。欣赏美景，但出门请穿暖。",

    // 5. 紫外线/阳光
    alert_uv_high: "☀️ 高紫外线辐射：紫外线指数为{val}。未受保护的皮肤可能被晒伤。请使用防晒霜和太阳镜。",

    // 6. 温度+风 (风寒效应)
    advice_cold_wind: "🥶 风寒警告：温度为{val}°C，但强风使体感温度更低。请穿着防风衣物和帽子。",
    advice_cold: "🧣 寒冷天气：室外温度为{val}°C。天气寒冷，请确保拉上夹克拉链保暖。",

    advice_hot: "🔥 热浪警告：温度已达到{val}°C。请避免在阳光直射下剧烈活动，并多喝水。",
    advice_nice: "😎 舒适条件：天气稳定，温度为{val}°C，风力适中。适合散步或开窗通风。",

    advice_gaming: "🎮 游戏模式：沉浸式照明已激活。通知已静音。",
  }
};

class WeatherGlassCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
    this.hass = undefined;
    this.animationFrame = null;
    this.particles = [];
    this.ambientLights = [];
    this.gamingMode = false;
    this.lang = config.language || 'en'; // 语言设置
    this.lightningBolt = null;
    this.lightningTimer = 0;
    this.flashOpacity = 0;
    this.apiKey = config.api_key || '';
    this.apiEndpoint = config.api_endpoint || 'https://api.openai.com/v1/chat/completions';
    this.apiModel = config.api_model || 'gpt-3.5-turbo';
    this.aiCache = new Map(); // 缓存 AI 响应
    this.lastApiCall = 0; // API 调用节流

    // 新增：传感器显示配置
    this.displayHumidity = config.display_humidity !== false;
    this.displayAirQuality = config.display_air_quality !== false;
    this.displayWind = config.display_wind !== false;
    this.displayUV = config.display_uv !== false;
    this.displayPollen = config.display_pollen !== false;
  }

  // 翻译方法
  _t(key, repl) {
    repl = repl || {};
    let txt = TRANSLATIONS[this.lang]?.[key] || TRANSLATIONS['en'][key] || key;
    Object.keys(repl).forEach(k => {
      txt = txt.replace(new RegExp(`{${k}}`, 'g'), repl[k]);
    });
    return txt;
  }

  set hass(hass) {
    this._hass = hass;
    this.update();
  }

  get hass() {
    return this._hass;
  }

  update() {
    if (!this.hass) return;

    const {
      weather_entity,
      temperature_entity,
      humidity_entity,
      air_quality_entity,
      wind_entity,
      uv_entity,
      pollen_entity,
      cloud_coverage_entity,
      house_image,
      room_badges
    } = this.config;

    const weatherState = weather_entity ? this.hass.states[weather_entity] : null;
    const tempState = temperature_entity ? this.hass.states[temperature_entity] : null;
    const humidityState = humidity_entity ? this.hass.states[humidity_entity] : null;
    const airQualityState = air_quality_entity ? this.hass.states[air_quality_entity] : null;
    const windState = wind_entity ? this.hass.states[wind_entity] : null;
    const uvState = uv_entity ? this.hass.states[uv_entity] : null;
    const pollenState = pollen_entity ? this.hass.states[pollen_entity] : null;
    const cloudCoverageState = cloud_coverage_entity ? this.hass.states[cloud_coverage_entity] : null;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = this.getHtml();
      this.initializeCanvas();
      this.startAnimation();
      this.setupEventListeners();
    }

    this.updateValues(weatherState, tempState, humidityState, airQualityState, windState, uvState, pollenState, cloudCoverageState);
    this.updateAIAdvisor(weatherState, tempState, windState, uvState, airQualityState, pollenState);
    this.updateWeatherEngine(weatherState, windState, cloudCoverageState);
    this.updateDayNightCycle(weatherState);
    this.updateRoomBadges(room_badges);
  }

  updateValues(weather, temp, humidity, airQuality, wind, uv, pollen, cloudCoverage) {
    const root = this.shadowRoot;

    if (temp && root.querySelector('[data-temp]')) {
      root.querySelector('[data-temp]').textContent = `${temp.state}${temp.attributes.unit_of_measurement || '°C'}`;
    }

    if (humidity && root.querySelector('[data-humidity]')) {
      root.querySelector('[data-humidity]').textContent = `${humidity.state}%`;
    }

    if (weather) {
      const weatherIcon = root.querySelector('[data-weather-icon]');
      if (weatherIcon) {
        weatherIcon.textContent = this.getWeatherIcon(weather.state);
      }

      const condition = root.querySelector('[data-weather-condition]');
      if (condition) {
        condition.textContent = this.getWeatherText(weather.state);
      }
    }

    if (airQuality && root.querySelector('[data-air-quality]')) {
      const level = root.querySelector('[data-air-quality]');
      const value = parseFloat(airQuality.state);
      level.textContent = this.getAirQualityLevel(value);
      level.style.color = this.getAirQualityColor(value);
    }

    if (wind && root.querySelector('[data-wind]')) {
      root.querySelector('[data-wind]').textContent = `${wind.state} m/s`;
    }

    if (uv && root.querySelector('[data-uv]')) {
      const uvValue = parseFloat(uv.state);
      root.querySelector('[data-uv]').textContent = this.getUVLevel(uvValue);
      root.querySelector('[data-uv]').style.color = this.getUVColor(uvValue);
    }

    if (pollen && root.querySelector('[data-pollen]')) {
      const pollenValue = parseFloat(pollen.state);
      root.querySelector('[data-pollen]').textContent = this.getPollenLevel(pollenValue);
    }
  }

  updateAIAdvisor(weather, temp, wind, uv, airQuality, pollen) {
    const advisorElement = this.shadowRoot.querySelector('[data-ai-advisor]');
    if (!advisorElement) return;

    // 如果配置了 API，使用 API 生成建议，否则使用规则引擎
    if (this.apiKey && this.apiEndpoint) {
      this.generateAIAdviceAPI(weather, temp, wind, uv, airQuality, pollen)
        .then(advice => {
          advisorElement.innerHTML = advice;
        })
        .catch(error => {
          console.warn('AI API call failed, falling back to rule-based advice:', error);
          const advice = this.generateAIAdviceRules(weather, temp, wind, uv, airQuality, pollen);
          advisorElement.innerHTML = advice;
        });
    } else {
      const advice = this.generateAIAdviceRules(weather, temp, wind, uv, airQuality, pollen);
      advisorElement.innerHTML = advice;
    }
  }

  generateAIAdviceRules(weather, temp, wind, uv, airQuality, pollen) {
    if (!weather) return this._t('loading');

    const condition = weather.state;
    const tempValue = temp ? parseFloat(temp.state) : null;
    const forecast = weather.attributes?.forecast || [];
    const windSpeed = wind ? parseFloat(wind.state) : 10;
    const uvValue = uv ? parseFloat(uv.state) : null;
    const aqiValue = airQuality ? parseFloat(airQuality.state) : null;

    // 检查花粉
    let isHighPollen = false;
    if (pollen) {
      const pState = pollen.state;
      if (['high', 'very_high', 'extreme', 'red'].includes(pState.toLowerCase())) isHighPollen = true;
      if (!isNaN(parseFloat(pState)) && parseFloat(pState) > 50) isHighPollen = true;
    }

    let msg = "";
    let level = "normal";

    // --- 优先级层次 ---

    // 1. 生命危险 (风暴)
    if (['lightning', 'lightning-rainy', 'hail'].includes(condition)) {
      msg = this._t('alert_storm');
      level = "danger";
    }
    // 2. 健康: 空气质量差
    else if (aqiValue !== null && aqiValue > 50) {
      if (aqiValue > 100) {
        msg = this._t('alert_aqi_bad', {val: aqiValue});
        level = "danger";
      } else {
        msg = this._t('alert_aqi_mod', {val: aqiValue});
        level = "warning";
      }
    }
    // 3. 健康: 花粉
    else if (isHighPollen) {
      msg = this._t('alert_pollen');
      level = "warning";
    }
    // 4. 规划: 即将到来的雨雪
    else {
      const nextRain = forecast.slice(0, 3).find(f => ['rainy', 'pouring', 'snowy'].includes(f.condition) || (f.precipitation > 0));

      // 如果3小时内要下雨
      if (nextRain) {
        const time = new Date(nextRain.datetime).getHours() + ":00";
        const p = nextRain.precipitation || "~";
        msg = nextRain.condition === 'snowy'
          ? this._t('advice_snow_soon', {time})
          : this._t('advice_rain_soon', {time, val: p});
        level = "warning";
      }
      // 5. 当前天气
      else if (['rainy', 'pouring'].includes(condition)) {
        msg = this._t('advice_rain_now', {val: weather.attributes?.precipitation || "~"});
        level = "warning";
      }
      else if (['snowy', 'snowy-rainy'].includes(condition)) {
        msg = this._t('advice_snow_now');
        level = "warning";
      }
      // 6. 紫外线 (夏季)
      else if (uvValue !== null && uvValue > 6) {
        msg = this._t('alert_uv_high', {val: uvValue});
        level = "warning";
      }
      // 7. 温度 + 风 (冬季)
      else if (tempValue !== null && tempValue < 10 && windSpeed > 20) {
        // 又冷又刮风 - 风寒效应
        msg = this._t('advice_cold_wind', {val: tempValue});
      }
      else if (tempValue !== null && tempValue < 5) {
        msg = this._t('advice_cold', {val: tempValue});
      } else if (tempValue !== null && tempValue > 28) {
        msg = this._t('advice_hot', {val: tempValue});
        level = "warning";
      }
      // 8. 稳定
      else if (tempValue !== null) {
        msg = this._t('advice_nice', {val: tempValue});
      }
    }

    // 如果在游戏模式且状态正常，则显示游戏模式消息
    if (this.gamingMode && level === 'normal') {
      msg = this._t('advice_gaming');
    }

    return msg;
  }

  // API 基础的 AI 建议生成
  async generateAIAdviceAPI(weather, temp, wind, uv, airQuality, pollen) {
    // API 调用节流（每30秒最多一次）
    const now = Date.now();
    if (now - this.lastApiCall < 30000) {
      return this._t('loading');
    }
    this.lastApiCall = now;

    // 构建缓存键
    const cacheKey = this.buildCacheKey(weather, temp, wind, uv, airQuality, pollen);
    if (this.aiCache.has(cacheKey)) {
      return this.aiCache.get(cacheKey);
    }

    try {
      const prompt = this.buildAIPrompt(weather, temp, wind, uv, airQuality, pollen);
      const response = await this.callAIAPI(prompt);
      const advice = this.formatAIResponse(response);

      // 缓存结果（最多缓存10个结果）
      if (this.aiCache.size >= 10) {
        const firstKey = this.aiCache.keys().next().value;
        this.aiCache.delete(firstKey);
      }
      this.aiCache.set(cacheKey, advice);

      return advice;
    } catch (error) {
      throw error;
    }
  }

  buildCacheKey(weather, temp, wind, uv, airQuality, pollen) {
    const key = [
      weather?.state,
      temp?.state,
      wind?.state,
      uv?.state,
      airQuality?.state,
      pollen?.state,
      this.lang
    ].join('|');
    return btoa(key); // Base64 编码作为缓存键
  }

  buildAIPrompt(weather, temp, wind, uv, airQuality, pollen) {
    const data = {
      weather: weather?.state || 'unknown',
      temperature: temp ? `${temp.state}${temp.attributes?.unit_of_measurement || '°C'}` : 'unknown',
      humidity: this.hass.states[this.config.humidity_entity]?.state || 'unknown',
      wind: wind ? `${wind.state} m/s` : 'unknown',
      uv: uv ? uv.state : 'unknown',
      airQuality: airQuality ? airQuality.state : 'unknown',
      pollen: pollen ? pollen.state : 'unknown',
      forecast: weather?.attributes?.forecast?.slice(0, 3) || [],
      time: new Date().toLocaleTimeString(this.lang === 'zh' ? 'zh-CN' : 'en-US')
    };

    const language = this.lang === 'zh' ? '中文' : 'English';

    return `You are an intelligent weather assistant. Based on the current weather data, provide a helpful, concise advice in ${language}. Consider safety, health, and daily activities.

Current weather data:
- Weather condition: ${data.weather}
- Temperature: ${data.temperature}
- Humidity: ${data.humidity}%
- Wind speed: ${data.wind}
- UV index: ${data.uv}
- Air quality (AQI): ${data.airQuality}
- Pollen level: ${data.pollen}
- Time: ${data.time}

${data.forecast.length > 0 ? `Next few hours forecast: ${data.forecast.map(f => `${f.condition} at ${new Date(f.datetime).getHours()}:00`).join(', ')}` : ''}

Provide advice in this format:
- Start with an emoji that represents the overall situation
- Give 1-2 sentences of practical advice
- Keep it under 100 characters
- Use ${language} language

Examples:
English: "🌧️ Bring an umbrella - rain expected in 2 hours"
Chinese: "🌧️ 预计2小时后下雨，请带伞出行"

Your advice:`;
  }

  async callAIAPI(prompt) {
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.apiModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'Unable to generate advice';
  }

  formatAIResponse(response) {
    // 清理和格式化 API 响应
    let cleanResponse = response.replace(/^["']|["']$/g, ''); // 移除引号
    cleanResponse = cleanResponse.replace(/\n/g, ' '); // 移除换行符

    // 根据语言确定样式类
    const level = this.determineAdviceLevel(cleanResponse);

    return `<div class="advice-item ${level}">${cleanResponse}</div>`;
  }

  determineAdviceLevel(advice) {
    const dangerKeywords = ['danger', 'warning', 'alert', 'storm', 'thunder', '⚠️', '危险', '警报', '风暴'];
    const warningKeywords = ['caution', 'careful', '注意', '小心', '🌧️', '🌨️', '☀️', '🥶', '🔥'];

    const lowerAdvice = advice.toLowerCase();

    if (dangerKeywords.some(keyword => lowerAdvice.includes(keyword.toLowerCase()))) {
      return 'danger';
    } else if (warningKeywords.some(keyword => lowerAdvice.includes(keyword.toLowerCase()))) {
      return 'warning';
    } else {
      return 'info';
    }
  }

  calculateWindChill(temp, windSpeed) {
    // Simplified wind chill formula
    if (temp > 10 || windSpeed < 4.8) return temp;
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
  }

  getUVLevel(value) {
    if (value <= 2) return '低';
    if (value <= 5) return '中等';
    if (value <= 7) return '高';
    if (value <= 10) return '很高';
    return '极高';
  }

  getUVColor(value) {
    if (value <= 2) return '#00ff00';
    if (value <= 5) return '#ffff00';
    if (value <= 7) return '#ffa500';
    if (value <= 10) return '#ff0000';
    return '#8b0000';
  }

  getPollenLevel(value) {
    if (value <= 20) return '低';
    if (value <= 50) return '中等';
    if (value <= 100) return '高';
    return '很高';
  }

  initializeCanvas() {
    const canvas = this.shadowRoot.querySelector('#weather-canvas');
    if (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  resizeCanvas() {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }
  }

  startAnimation() {
    if (this.animationFrame) return;
    this.animate();
  }

  animate() {
    if (!this.ctx || !this.shadowRoot) return; // Check if component still exists
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawParticles();
    this.drawAmbientLights();
    this.handleLightning();
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  updateParticles() {
    // Update particle positions based on wind
    const windSpeed = this.config.wind_entity ? parseFloat(this.hass.states[this.config.wind_entity]?.state || 0) : 0;

    this.particles.forEach(particle => {
      particle.x += particle.vx + windSpeed * 0.1;
      particle.y += particle.vy;

      // Reset particles when they go off screen
      if (particle.type === 'star') {
        // Stars don't move, just twinkle
        particle.twinkle += 0.1;
      } else if (particle.y > this.canvas.height + 10) {
        // Reset falling particles
        particle.y = -10;
        particle.x = Math.random() * this.canvas.width;
      } else if (particle.x < -10 || particle.x > this.canvas.width + 10) {
        // Reset particles that go off sides
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
      }
    });
  }

  drawParticles() {
    this.particles.forEach(particle => {
      switch (particle.type) {
        case 'rain':
          this.ctx.fillStyle = 'rgba(200, 200, 255, 0.6)';
          this.ctx.fillRect(particle.x, particle.y, 1, particle.size * 2);
          break;
        case 'snow':
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'fog':
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 'star':
          // Twinkling effect
          const twinkle = Math.sin(particle.twinkle + Date.now() * 0.005) * 0.5 + 0.5;
          this.ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + twinkle * 0.5})`;
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        default:
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
      }
    });
  }

  drawAmbientLights() {
    if (!this.gamingMode) return;

    this.ambientLights.forEach(light => {
      const gradient = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
      gradient.addColorStop(0, light.color + '40');
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
      this.ctx.fill();

      light.x += light.vx;
      light.y += light.vy;

      if (light.x < -light.radius || light.x > this.canvas.width + light.radius) light.vx *= -1;
      if (light.y < -light.radius || light.y > this.canvas.height + light.radius) light.vy *= -1;
    });
  }

  updateWeatherEngine(weather, wind, cloudCoverage) {
    if (!this.canvas) return;

    const condition = weather?.state;
    const windSpeed = wind ? parseFloat(wind.state) : 0;
    const cloudDensity = cloudCoverage ? parseFloat(cloudCoverage.state) / 100 : 0.3;

    this.particles = [];

    if (condition === 'rainy' || condition === 'pouring') {
      // Add rain particles
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: windSpeed * 0.5,
          vy: 5 + Math.random() * 3,
          size: 1 + Math.random() * 2,
          type: 'rain'
        });
      }
    } else if (condition === 'snowy' || condition === 'sleet') {
      // Add snow particles
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: windSpeed * 0.3,
          vy: 1 + Math.random() * 2,
          size: 2 + Math.random() * 3,
          type: 'snow'
        });
      }
    }

    // Add fog particles for foggy weather
    if (condition === 'fog') {
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: windSpeed * 0.1,
          vy: 0.5,
          size: 5 + Math.random() * 10,
          type: 'fog'
        });
      }
    }

    // Handle lightning/thunderstorm weather
    if (condition === 'lightning' || condition === 'lightning-rainy') {
      // Add rain particles for thunderstorms
      for (let i = 0; i < 60; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: windSpeed * 0.7,
          vy: 6 + Math.random() * 4,
          size: 1 + Math.random() * 2,
          type: 'rain'
        });
      }
      // Enable lightning effects
      this.lightningBolt = { life: 0 }; // Initialize lightning system
    }
  }

  isNightTime() {
    const now = new Date();
    const hour = now.getHours();
    return hour < 6 || hour > 22;
  }

  updateDayNightCycle(weather) {
    const houseImage = this.shadowRoot.querySelector('.house-image');
    if (!houseImage) return;

    const isNight = this.isNightTime() || weather?.state === 'clear-night';
    houseImage.style.filter = isNight ? 'brightness(0.4) contrast(0.8)' : 'brightness(1) contrast(1)';
  }

  updateRoomBadges(roomBadges) {
    if (!roomBadges) return;

    const container = this.shadowRoot.querySelector('.room-badges');
    if (!container) return;

    container.innerHTML = '';

    roomBadges.forEach(badge => {
      const badgeElement = document.createElement('div');
      badgeElement.className = 'room-badge';
      badgeElement.style.left = badge.x + '%';
      badgeElement.style.top = badge.y + '%';

      const tempEntity = this.hass.states[badge.temperature_entity];
      const temp = tempEntity ? `${tempEntity.state}°C` : '--°C';

      badgeElement.innerHTML = `
        <div class="badge-label">${badge.name}</div>
        <div class="badge-temp">${temp}</div>
      `;

      container.appendChild(badgeElement);
    });
  }

  setupEventListeners() {
    const gamingToggle = this.shadowRoot.querySelector('.gaming-toggle');
    if (gamingToggle) {
      gamingToggle.addEventListener('click', () => this.toggleGamingMode());
    }
  }

  getHtml() {
    return `
      <div class="glass-card">
        <style>${this.getStyles()}</style>

        <div class="header">
          <h2>${this.config.title || '气候监控'}</h2>
          <button class="gaming-toggle">🎮</button>
        </div>

        <div class="content">
          <div class="weather-section">
            <div class="weather-icon" data-weather-icon>🌤️</div>
            <div class="weather-info">
              <div class="condition" data-weather-condition>晴朗</div>
              <div class="temperature">
                <span data-temp>--°C</span>
              </div>
            </div>
          </div>

          <div class="ai-advisor-section">
            <div class="advisor-title">🧠 AI 智能建议</div>
            <div class="advisor-content" data-ai-advisor>
              <div class="advice-item info">✅ 天气状况良好，适合正常活动</div>
            </div>
          </div>

          <div class="metrics-grid">
            ${this.displayHumidity ? `
              <div class="metric-card">
                <div class="metric-label">湿度</div>
                <div class="metric-value" data-humidity>--%</div>
                <div class="metric-icon">💧</div>
              </div>` : ''}

            ${this.displayAirQuality ? `
              <div class="metric-card">
                <div class="metric-label">空气质量</div>
                <div class="metric-value" data-air-quality>--</div>
                <div class="metric-icon">🌬️</div>
              </div>` : ''}

            ${this.displayWind ? `
              <div class="metric-card">
                <div class="metric-label">风速</div>
                <div class="metric-value" data-wind>-- m/s</div>
                <div class="metric-icon">🌪️</div>
              </div>` : ''}

            ${this.displayUV ? `
              <div class="metric-card">
                <div class="metric-label">紫外线</div>
                <div class="metric-value" data-uv>--</div>
                <div class="metric-icon">☀️</div>
              </div>` : ''}

            ${this.displayPollen ? `
              <div class="metric-card">
                <div class="metric-label">花粉</div>
                <div class="metric-value" data-pollen>--</div>
                <div class="metric-icon">🌸</div>
              </div>` : ''}
          </div>

          <div class="house-section">
            <div class="house-container">
              ${this.config.house_image ? `<img src="${this.config.house_image}" class="house-image" alt="House">` : '<div class="house-placeholder">🏠</div>'}
              <canvas id="weather-canvas" class="weather-canvas"></canvas>
              <div class="room-badges"></div>
            </div>
          </div>

          <div class="forecast-section">
            <div class="forecast-title">详细信息</div>
            <div class="forecast-grid">
              <div class="forecast-item">
                <span class="label">体感温度</span>
                <span class="value">--°C</span>
              </div>
              <div class="forecast-item">
                <span class="label">风速</span>
                <span class="value">-- m/s</span>
              </div>
              <div class="forecast-item">
                <span class="label">气压</span>
                <span class="value">-- hPa</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <span class="last-update">最后更新: 现在</span>
        </div>
      </div>
    `;
  }

  getStyles() {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .glass-card {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
        backdrop-filter: blur(10px) saturate(180%);
        -webkit-backdrop-filter: blur(10px) saturate(180%);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        padding: 24px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #1a1a1a;
        max-width: 500px;
        margin: 16px auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 12px;
      }

      .header h2 {
        font-size: 24px;
        font-weight: 600;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
      }

      .gaming-toggle {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 8px;
        padding: 8px 12px;
        color: #667eea;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .gaming-toggle:hover {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
        transform: scale(1.05);
      }

      .ai-advisor-section {
        padding: 16px;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%);
        border-radius: 12px;
        border: 1px solid rgba(255, 215, 0, 0.2);
        backdrop-filter: blur(10px);
      }

      .advisor-title {
        font-size: 16px;
        font-weight: 600;
        color: #ff8c00;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .advisor-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .advice-item {
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.4;
      }

      .advice-item.info {
        background: rgba(0, 255, 0, 0.1);
        border-left: 4px solid #00ff00;
        color: #006400;
      }

      .advice-item.warning {
        background: rgba(255, 255, 0, 0.1);
        border-left: 4px solid #ffff00;
        color: #8b8000;
      }

      .advice-item.danger {
        background: rgba(255, 0, 0, 0.1);
        border-left: 4px solid #ff0000;
        color: #8b0000;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }

      .house-section {
        margin: 20px 0;
      }

      .house-container {
        position: relative;
        width: 100%;
        height: 200px;
        border-radius: 12px;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border: 1px solid rgba(102, 126, 234, 0.2);
        backdrop-filter: blur(10px);
      }

      .house-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 1s ease;
      }

      .house-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: rgba(102, 126, 234, 0.5);
      }

      .weather-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .room-badges {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .room-badge {
        position: absolute;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 6px 8px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        text-align: center;
        min-width: 60px;
        pointer-events: auto;
      }

      .badge-label {
        font-size: 10px;
        color: #666;
        font-weight: 500;
        margin-bottom: 2px;
      }

      .badge-temp {
        font-size: 12px;
        font-weight: 700;
        color: #1a1a1a;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .weather-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
      }

      .weather-icon {
        font-size: 64px;
        min-width: 80px;
        text-align: center;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
      }

      .weather-info {
        flex: 1;
        margin-left: 16px;
      }

      .condition {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
        color: #667eea;
      }

      .temperature {
        font-size: 32px;
        font-weight: 700;
        color: #1a1a1a;
        text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .metric-card {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border: 1px solid rgba(102, 126, 234, 0.2);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }

      .metric-card:hover {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
        border-color: rgba(102, 126, 234, 0.3);
        transform: translateY(-2px);
      }

      .metric-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .metric-value {
        font-size: 24px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
      }

      .metric-icon {
        font-size: 24px;
      }

      .forecast-section {
        padding: 16px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
      }

      .forecast-title {
        font-size: 14px;
        font-weight: 600;
        color: #667eea;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .forecast-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      .forecast-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
      }

      .forecast-item .label {
        font-size: 11px;
        color: #888;
        font-weight: 500;
      }

      .forecast-item .value {
        font-size: 14px;
        font-weight: 700;
        color: #1a1a1a;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #999;
        padding-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }

      .last-update {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 12px;
        border: 1px solid rgba(102, 126, 234, 0.2);
      }

      @media (max-width: 600px) {
        .glass-card {
          padding: 16px;
          border-radius: 16px;
        }

        .weather-section {
          flex-direction: column;
          text-align: center;
        }

        .weather-info {
          margin-left: 0;
          margin-top: 12px;
        }

        .temperature {
          font-size: 28px;
        }

        .metrics-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  getWeatherIcon(condition) {
    const icons = {
      'sunny': '☀️',
      'clear-night': '🌙',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'sleet': '🌨️',
      'pouring': '⛈️',
      'windy': '💨',
      'fog': '🌫️',
      'partlycloudy': '⛅'
    };
    return icons[condition] || '🌤️';
  }

  getWeatherText(condition) {
    const conditions = {
      'sunny': '晴朗',
      'clear-night': '晴夜',
      'cloudy': '多云',
      'rainy': '下雨',
      'snowy': '下雪',
      'sleet': '雨夹雪',
      'pouring': '倾盆大雨',
      'windy': '有风',
      'fog': '有雾',
      'partlycloudy': '部分多云'
    };
    return conditions[condition] || '未知';
  }

  getAirQualityLevel(value) {
    if (value <= 50) return '优秀';
    if (value <= 100) return '良好';
    if (value <= 150) return '轻度污染';
    if (value <= 200) return '中度污染';
    if (value <= 300) return '重度污染';
    return '严重污染';
  }

  getAirQualityColor(value) {
    if (value <= 50) return '#00ff00';
    if (value <= 100) return '#90ee90';
    if (value <= 150) return '#ffff00';
    if (value <= 200) return '#ffa500';
    if (value <= 300) return '#ff0000';
    return '#8b0000';
  }

  static getConfigElement() {
    let element = document.createElement('weather-glass-card-editor');
    return element;
  }

  // 闪电效果
  handleLightning() {
    if (!this.lightningBolt) return;

    this.lightningTimer++;
    if (this.lightningTimer > 200 && Math.random() > 0.98) {
      this.triggerLightning();
      this.lightningTimer = 0;
    }

    if (this.lightningBolt && this.lightningBolt.life > 0) {
      this.drawLightningBolt(this.lightningBolt);
      this.lightningBolt.life--;
    }
  }

  triggerLightning() {
    const startX = Math.random() * this.canvas.width;
    const path = [{x: startX, y: 0}];
    let currX = startX, currY = 0;

    while (currY < this.canvas.height * 0.8) {
      currY += Math.random() * 40 + 20;
      currX += (Math.random() * 60) - 30;
      path.push({x: currX, y: currY});
    }

    this.lightningBolt = { path, life: 10 };
    this.flashOpacity = 0.5;
  }

  drawLightningBolt(bolt) {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
    for (let p of bolt.path) {
      this.ctx.lineTo(p.x, p.y);
    }
    this.ctx.stroke();
  }

  static getStubConfig() {
    return {
      language: "zh", // 支持 "en" 或 "zh"
      api_key: '', // 用户提供的 API Key
      api_endpoint: 'https://api.openai.com/v1/chat/completions', // API 端点
      api_model: 'gpt-3.5-turbo', // API 模型
      display_humidity: true,
      display_air_quality: true,
      display_wind: true,
      display_uv: true,
      display_pollen: true,
      title: '气候监控',
      weather_entity: 'weather.home',
      temperature_entity: 'sensor.living_room_temperature',
      humidity_entity: 'sensor.living_room_humidity',
      air_quality_entity: 'sensor.air_quality_index',
      wind_entity: 'sensor.wind_speed',
      uv_entity: 'sensor.uv_index',
      pollen_entity: 'sensor.pollen_count',
      cloud_coverage_entity: 'sensor.cloud_coverage',
      house_image: '/local/house.jpg',
      room_badges: [
        {
          name: '客厅',
          temperature_entity: 'sensor.living_room_temperature',
          x: 30,
          y: 40
        },
        {
          name: '卧室',
          temperature_entity: 'sensor.bedroom_temperature',
          x: 70,
          y: 35
        }
      ]
    };
  }
}

customElements.define('weather-glass-card', WeatherGlassCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'weather-glass-card',
  name: 'Weather Glass Card',
  description: 'Glassmorphism-styled weather card with climate monitoring',
  preview: true,
  documentationURL: 'https://github.com/yourusername/weather-glass-card'
});
