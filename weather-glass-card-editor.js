class WeatherGlassCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  get _language() { return this._config?.language || 'zh'; }
  get _title() { return this._config?.title || ''; }
  get _weather_entity() { return this._config?.weather_entity || ''; }
  get _temperature_entity() { return this._config?.temperature_entity || ''; }
  get _humidity_entity() { return this._config?.humidity_entity || ''; }
  get _air_quality_entity() { return this._config?.air_quality_entity || ''; }
  get _wind_entity() { return this._config?.wind_entity || ''; }
  get _uv_entity() { return this._config?.uv_entity || ''; }
  get _pollen_entity() { return this._config?.pollen_entity || ''; }
  get _api_key() { return this._config?.api_key || ''; }
  get _api_endpoint() { return this._config?.api_endpoint || 'https://api.openai.com/v1/chat/completions'; }
  get _api_model() { return this._config?.api_model || 'gpt-3.5-turbo'; }
  get _cloud_coverage_entity() { return this._config?.cloud_coverage_entity || ''; }
  get _house_image() { return this._config?.house_image || ''; }
  get _room_badges() { return this._config?.room_badges || []; }
  get _display_humidity() { return this._config?.display_humidity !== false; }
  get _display_air_quality() { return this._config?.display_air_quality !== false; }
  get _display_wind() { return this._config?.display_wind !== false; }
  get _display_uv() { return this._config?.display_uv !== false; }
  get _display_pollen() { return this._config?.display_pollen !== false; }

  _render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .editor-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .section {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
        }

        .section h3 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-desc {
          margin: 0 0 16px 0;
          color: #666;
          font-size: 14px;
          line-height: 1.4;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          accent-color: #667eea;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required {
          color: #ff6b6b;
          font-size: 12px;
        }

        input, select {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          transition: all 0.3s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .room-badges {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .badge-item {
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
        }

        .badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .badge-header span {
          font-weight: 600;
          color: #333;
        }

        .remove-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .remove-btn:hover {
          background: #ff5252;
        }

        .badge-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: end;
        }

        .position-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .position-fields input {
          padding: 8px;
          font-size: 13px;
        }

        .add-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .editor-container {
            padding: 16px;
            gap: 16px;
          }

          .form-row, .form-grid {
            grid-template-columns: 1fr;
          }

          .badge-fields {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="editor-container">
        <!-- 基本设置 -->
        <div class="section">
          <h3>基本设置</h3>

          <div class="form-row">
            <div class="form-group">
              <label>语言</label>
              <select id="language">
                <option value="zh" ${this._language === 'zh' ? 'selected' : ''}>中文</option>
                <option value="en" ${this._language === 'en' ? 'selected' : ''}>English</option>
              </select>
            </div>

            <div class="form-group">
              <label>卡片标题</label>
              <input type="text" id="title" value="${this._title}" placeholder="气候监控">
            </div>
          </div>
        </div>

        <!-- 必需实体 -->
        <div class="section">
          <h3>必需实体 <span class="required">*</span></h3>

          <div class="form-row">
            <div class="form-group">
              <label>天气实体</label>
              <select id="weather_entity">
                <option value="">选择天气实体...</option>
                ${this._getWeatherEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._weather_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>温度传感器</label>
              <select id="temperature_entity">
                <option value="">选择温度传感器...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._temperature_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>湿度传感器</label>
              <select id="humidity_entity">
                <option value="">选择湿度传感器...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._humidity_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- 可选实体 -->
        <div class="section">
          <h3>可选实体</h3>

          <div class="form-grid">
            <div class="form-group">
              <label>空气质量</label>
              <select id="air_quality_entity">
                <option value="">选择空气质量实体...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._air_quality_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>风速</label>
              <select id="wind_entity">
                <option value="">选择风速实体...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._wind_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>紫外线指数</label>
              <select id="uv_entity">
                <option value="">选择紫外线实体...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._uv_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>花粉浓度</label>
              <select id="pollen_entity">
                <option value="">选择花粉实体...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._pollen_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label>云覆盖</label>
              <select id="cloud_coverage_entity">
                <option value="">选择云覆盖实体...</option>
                ${this._getSensorEntities().map(entity =>
                  `<option value="${entity}" ${entity === this._cloud_coverage_entity ? 'selected' : ''}>${entity}</option>`
                ).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- 视觉设置 -->
        <div class="section">
          <h3>视觉设置</h3>

          <div class="form-group">
            <label>房子图像 URL</label>
            <input type="text" id="house_image" value="${this._house_image}" placeholder="/local/house.jpg">
          </div>
        </div>

        <!-- AI Assistant 设置 -->
        <div class="section">
          <h3>AI 智能建议设置</h3>

          <div class="form-group">
            <label>API Key (留空使用本地规则)</label>
            <input type="password" id="api_key" value="${this._api_key}" placeholder="sk-YOUR_API_KEY_HERE">
          </div>

          <div class="form-group">
            <label>API Endpoint</label>
            <input type="text" id="api_endpoint" value="${this._api_endpoint}" placeholder="https://api.openai.com/v1/chat/completions">
          </div>

          <div class="form-group">
            <label>API Model</label>
            <input type="text" id="api_model" value="${this._api_model}" placeholder="gpt-3.5-turbo">
          </div>
        </div>

        <!-- 房间徽章 -->
        <div class="section">
          <h3>房间温度徽章</h3>
          <p class="section-desc">在房子图像上显示各房间的温度</p>

          <div class="room-badges" id="room-badges">
            ${this._room_badges.map((badge, index) => `
              <div class="badge-item">
                <div class="badge-header">
                  <span>房间 ${index + 1}</span>
                  <button class="remove-btn" onclick="this.closest('weather-glass-card-editor')._removeBadge(${index})">删除</button>
                </div>
                <div class="badge-fields">
                  <input type="text" placeholder="房间名称" value="${badge.name || ''}" onchange="this.closest('weather-glass-card-editor')._updateBadgeName(${index}, this.value)">
                  <select onchange="this.closest('weather-glass-card-editor')._updateBadgeEntity(${index}, this.value)">
                    <option value="">选择温度实体...</option>
                    ${this._getSensorEntities().map(entity =>
                      `<option value="${entity}" ${entity === badge.temperature_entity ? 'selected' : ''}>${entity}</option>`
                    ).join('')}
                  </select>
                  <div class="position-fields">
                    <input type="number" placeholder="X位置 (%)" min="0" max="100" value="${badge.x || 50}" onchange="this.closest('weather-glass-card-editor')._updateBadgePosition(${index}, 'x', this.value)">
                    <input type="number" placeholder="Y位置 (%)" min="0" max="100" value="${badge.y || 50}" onchange="this.closest('weather-glass-card-editor')._updateBadgePosition(${index}, 'y', this.value)">
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <button class="add-btn" onclick="this.closest('weather-glass-card-editor')._addBadge()">添加房间徽章</button>
        </div>

        <!-- 传感器显示设置 -->
        <div class="section">
          <h3>传感器显示设置</h3>
          <div class="form-grid">
            <div class="form-group checkbox-group">
              <input type="checkbox" id="display_humidity" ?checked="${this._display_humidity}">
              <label for="display_humidity">显示湿度</label>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="display_air_quality" ?checked="${this._display_air_quality}">
              <label for="display_air_quality">显示空气质量</label>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="display_wind" ?checked="${this._display_wind}">
              <label for="display_wind">显示风速</label>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="display_uv" ?checked="${this._display_uv}">
              <label for="display_uv">显示紫外线</label>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="display_pollen" ?checked="${this._display_pollen}">
              <label for="display_pollen">显示花粉</label>
            </div>
          </div>
        </div>
      </div>
    `;

    // 绑定事件监听器
    this._bindEvents();
  }

  _bindEvents() {
    // 绑定基本设置事件
    this.shadowRoot.getElementById('language').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, language: e.target.value });
    });

    this.shadowRoot.getElementById('title').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, title: e.target.value });
    });

    // 绑定实体选择事件
    this.shadowRoot.getElementById('weather_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, weather_entity: e.target.value });
    });

    this.shadowRoot.getElementById('temperature_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, temperature_entity: e.target.value });
    });

    this.shadowRoot.getElementById('humidity_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, humidity_entity: e.target.value });
    });

    this.shadowRoot.getElementById('air_quality_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, air_quality_entity: e.target.value });
    });

    this.shadowRoot.getElementById('wind_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, wind_entity: e.target.value });
    });

    this.shadowRoot.getElementById('uv_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, uv_entity: e.target.value });
    });

    this.shadowRoot.getElementById('pollen_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, pollen_entity: e.target.value });
    });

    this.shadowRoot.getElementById('cloud_coverage_entity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, cloud_coverage_entity: e.target.value });
    });

    this.shadowRoot.getElementById('house_image').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, house_image: e.target.value });
    });

    this.shadowRoot.getElementById('api_key').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, api_key: e.target.value });
    });

    this.shadowRoot.getElementById('api_endpoint').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, api_endpoint: e.target.value });
    });

    this.shadowRoot.getElementById('api_model').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, api_model: e.target.value });
    });

    // 绑定传感器显示设置事件
    this.shadowRoot.getElementById('display_humidity').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, display_humidity: e.target.checked });
    });

    this.shadowRoot.getElementById('display_air_quality').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, display_air_quality: e.target.checked });
    });

    this.shadowRoot.getElementById('display_wind').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, display_wind: e.target.checked });
    });

    this.shadowRoot.getElementById('display_uv').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, display_uv: e.target.checked });
    });

    this.shadowRoot.getElementById('display_pollen').addEventListener('change', (e) => {
      this._updateConfig({ ...this._config, display_pollen: e.target.checked });
    });
  }

  // 事件处理方法
  _handleLanguageChange(e) {
    this._updateConfig({ ...this._config, language: e.target.value });
  }

  _handleTitleChange(e) {
    this._updateConfig({ ...this._config, title: e.target.value });
  }

  _handleWeatherChange(e) {
    this._updateConfig({ ...this._config, weather_entity: e.target.value });
  }

  _handleTempChange(e) {
    this._updateConfig({ ...this._config, temperature_entity: e.target.value });
  }

  _handleHumidityChange(e) {
    this._updateConfig({ ...this._config, humidity_entity: e.target.value });
  }

  _handleAirQualityChange(e) {
    this._updateConfig({ ...this._config, air_quality_entity: e.target.value });
  }

  _handleWindChange(e) {
    this._updateConfig({ ...this._config, wind_entity: e.target.value });
  }

  _handleUvChange(e) {
    this._updateConfig({ ...this._config, uv_entity: e.target.value });
  }

  _handlePollenChange(e) {
    this._updateConfig({ ...this._config, pollen_entity: e.target.value });
  }

  _handleCloudChange(e) {
    this._updateConfig({ ...this._config, cloud_coverage_entity: e.target.value });
  }

  _handleHouseImageChange(e) {
    this._updateConfig({ ...this._config, house_image: e.target.value });
  }

  _handleApiKeyChange(e) {
    this._updateConfig({ ...this._config, api_key: e.target.value });
  }

  _handleApiEndpointChange(e) {
    this._updateConfig({ ...this._config, api_endpoint: e.target.value });
  }

  _handleApiModelChange(e) {
    this._updateConfig({ ...this._config, api_model: e.target.value });
  }

  // 房间徽章方法
  _addBadge() {
    const badges = [...this._room_badges, { name: '', temperature_entity: '', x: 50, y: 50 }];
    this._updateConfig({ ...this._config, room_badges: badges });
  }

  _removeBadge(index) {
    const badges = [...this._room_badges];
    badges.splice(index, 1);
    this._updateConfig({ ...this._config, room_badges: badges });
  }

  _updateBadgeName(index, name) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], name };
    this._updateConfig({ ...this._config, room_badges: badges });
  }

  _updateBadgeEntity(index, entity) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], temperature_entity: entity };
    this._updateConfig({ ...this._config, room_badges: badges });
  }

  _updateBadgePosition(index, axis, value) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], [axis]: parseInt(value) || 0 };
    this._updateConfig({ ...this._config, room_badges: badges });
  }

  _getWeatherEntities() {
    if (!this._hass) return [];
    return Object.keys(this._hass.states).filter(entity => entity.startsWith('weather.'));
  }

  _getSensorEntities() {
    if (!this._hass) return [];
    return Object.keys(this._hass.states).filter(entity => entity.startsWith('sensor.'));
  }

  _updateConfig(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true
    }));
  }

}

customElements.define('weather-glass-card-editor', WeatherGlassCardEditor);
