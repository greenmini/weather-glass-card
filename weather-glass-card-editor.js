import { LitElement, html, css } from "https://unpkg.com/lit@2.0.2?module";

class WeatherGlassCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  setConfig(config) {
    this.config = config;
  }

  // 获取配置值的方法
  get _language() { return this.config.language || 'zh'; }
  get _title() { return this.config.title || ''; }
  get _weather_entity() { return this.config.weather_entity || ''; }
  get _temperature_entity() { return this.config.temperature_entity || ''; }
  get _humidity_entity() { return this.config.humidity_entity || ''; }
  get _air_quality_entity() { return this.config.air_quality_entity || ''; }
  get _wind_entity() { return this.config.wind_entity || ''; }
  get _uv_entity() { return this.config.uv_entity || ''; }
  get _pollen_entity() { return this.config.pollen_entity || ''; }
  get _cloud_coverage_entity() { return this.config.cloud_coverage_entity || ''; }
  get _house_image() { return this.config.house_image || ''; }
  get _room_badges() { return this.config.room_badges || []; }

  render() {
    return html`
      <div class="editor-container">
        <!-- 基本设置 -->
        <div class="section">
          <h3>基本设置</h3>

          <div class="form-row">
            <div class="form-group">
              <label>语言</label>
              <select @change="${this._handleLanguageChange}">
                <option value="zh" ?selected="${this._language === 'zh'}">中文</option>
                <option value="en" ?selected="${this._language === 'en'}">English</option>
              </select>
            </div>

            <div class="form-group">
              <label>卡片标题</label>
              <input
                type="text"
                value="${this._title}"
                @change="${this._handleTitleChange}"
                placeholder="气候监控"
              />
            </div>
          </div>
        </div>

        <!-- 必需实体 -->
        <div class="section">
          <h3>必需实体 <span class="required">*</span></h3>

          <div class="form-row">
            <div class="form-group">
              <label>天气实体</label>
              <select @change="${this._handleWeatherChange}">
                <option value="">选择天气实体...</option>
                ${this._getWeatherEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._weather_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>温度传感器</label>
              <select @change="${this._handleTempChange}">
                <option value="">选择温度传感器...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._temperature_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>湿度传感器</label>
              <select @change="${this._handleHumidityChange}">
                <option value="">选择湿度传感器...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._humidity_entity}">${entity}</option>`
                )}
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
              <select @change="${this._handleAirQualityChange}">
                <option value="">选择空气质量实体...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._air_quality_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>风速</label>
              <select @change="${this._handleWindChange}">
                <option value="">选择风速实体...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._wind_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>紫外线指数</label>
              <select @change="${this._handleUvChange}">
                <option value="">选择紫外线实体...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._uv_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>花粉浓度</label>
              <select @change="${this._handlePollenChange}">
                <option value="">选择花粉实体...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._pollen_entity}">${entity}</option>`
                )}
              </select>
            </div>

            <div class="form-group">
              <label>云覆盖</label>
              <select @change="${this._handleCloudChange}">
                <option value="">选择云覆盖实体...</option>
                ${this._getSensorEntities().map(
                  entity => html`<option value="${entity}" ?selected="${entity === this._cloud_coverage_entity}">${entity}</option>`
                )}
              </select>
            </div>
          </div>
        </div>

        <!-- 视觉设置 -->
        <div class="section">
          <h3>视觉设置</h3>

          <div class="form-group">
            <label>房子图像 URL</label>
            <input
              type="text"
              value="${this._house_image}"
              @change="${this._handleHouseImageChange}"
              placeholder="/local/house.jpg"
            />
          </div>
        </div>

        <!-- 房间徽章 -->
        <div class="section">
          <h3>房间温度徽章</h3>
          <p class="section-desc">在房子图像上显示各房间的温度</p>

          <div class="room-badges">
            ${this._room_badges.map((badge, index) => html`
              <div class="badge-item">
                <div class="badge-header">
                  <span>房间 ${index + 1}</span>
                  <button @click="${() => this._removeBadge(index)}" class="remove-btn">删除</button>
                </div>
                <div class="badge-fields">
                  <input
                    type="text"
                    placeholder="房间名称"
                    value="${badge.name || ''}"
                    @change="${(e) => this._updateBadgeName(index, e.target.value)}"
                  />
                  <select @change="${(e) => this._updateBadgeEntity(index, e.target.value)}">
                    <option value="">选择温度实体...</option>
                    ${this._getSensorEntities().map(
                      entity => html`<option value="${entity}" ?selected="${entity === badge.temperature_entity}">${entity}</option>`
                    )}
                  </select>
                  <div class="position-fields">
                    <input
                      type="number"
                      placeholder="X位置 (%)"
                      min="0"
                      max="100"
                      value="${badge.x || 50}"
                      @change="${(e) => this._updateBadgePosition(index, 'x', e.target.value)}"
                    />
                    <input
                      type="number"
                      placeholder="Y位置 (%)"
                      min="0"
                      max="100"
                      value="${badge.y || 50}"
                      @change="${(e) => this._updateBadgePosition(index, 'y', e.target.value)}"
                    />
                  </div>
                </div>
              </div>
            `)}
          </div>

          <button @click="${this._addBadge}" class="add-btn">添加房间徽章</button>
        </div>
      </div>
    `;
  }

  // 事件处理方法
  _handleLanguageChange(e) {
    this._updateConfig({ ...this.config, language: e.target.value });
  }

  _handleTitleChange(e) {
    this._updateConfig({ ...this.config, title: e.target.value });
  }

  _handleWeatherChange(e) {
    this._updateConfig({ ...this.config, weather_entity: e.target.value });
  }

  _handleTempChange(e) {
    this._updateConfig({ ...this.config, temperature_entity: e.target.value });
  }

  _handleHumidityChange(e) {
    this._updateConfig({ ...this.config, humidity_entity: e.target.value });
  }

  _handleAirQualityChange(e) {
    this._updateConfig({ ...this.config, air_quality_entity: e.target.value });
  }

  _handleWindChange(e) {
    this._updateConfig({ ...this.config, wind_entity: e.target.value });
  }

  _handleUvChange(e) {
    this._updateConfig({ ...this.config, uv_entity: e.target.value });
  }

  _handlePollenChange(e) {
    this._updateConfig({ ...this.config, pollen_entity: e.target.value });
  }

  _handleCloudChange(e) {
    this._updateConfig({ ...this.config, cloud_coverage_entity: e.target.value });
  }

  _handleHouseImageChange(e) {
    this._updateConfig({ ...this.config, house_image: e.target.value });
  }

  // 房间徽章方法
  _addBadge() {
    const badges = [...this._room_badges, { name: '', temperature_entity: '', x: 50, y: 50 }];
    this._updateConfig({ ...this.config, room_badges: badges });
  }

  _removeBadge(index) {
    const badges = [...this._room_badges];
    badges.splice(index, 1);
    this._updateConfig({ ...this.config, room_badges: badges });
  }

  _updateBadgeName(index, name) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], name };
    this._updateConfig({ ...this.config, room_badges: badges });
  }

  _updateBadgeEntity(index, entity) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], temperature_entity: entity };
    this._updateConfig({ ...this.config, room_badges: badges });
  }

  _updateBadgePosition(index, axis, value) {
    const badges = [...this._room_badges];
    badges[index] = { ...badges[index], [axis]: parseInt(value) || 0 };
    this._updateConfig({ ...this.config, room_badges: badges });
  }

  _getWeatherEntities() {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter(entity => entity.startsWith('weather.'));
  }

  _getSensorEntities() {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter(entity => entity.startsWith('sensor.'));
  }

  _updateConfig(config) {
    this.config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true
    }));
  }

  static get styles() {
    return css`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 20px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
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

      input::placeholder {
        color: #999;
      }

      /* 房间徽章样式 */
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

      /* 响应式设计 */
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
    `;
  }
}

customElements.define('weather-glass-card-editor', WeatherGlassCardEditor);
