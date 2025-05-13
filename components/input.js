class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._internals = this.attachInternals();
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');

    // Copy and apply all relevant attributes
    ['id', 'type', 'name', 'value', 'placeholder', 'disabled'].forEach((attr) => {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.input.setAttribute(attr, value);
      }
    });

    // Sync value with internal state
    this._internals.setFormValue(this.input.value);

    this.input.addEventListener('input', () => {
      this.value = this.input.value; // Triggers setter
    });
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && this.input) {
      this.input.value = newValue;
      this._internals.setFormValue(newValue);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-size: var(--text-small, 14px);
          font-family: var(--font-family, "Helvetica", sans-serif);
        }
          
        .label {
          display: flex;
          flex-direction: column;
          width: 100%;
          font-size: var(--text-small);
          font-weight: 500;
          gap: var(--gap);
          font-size: inherit;
          font-family: inherit;
        }

        .label:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .label label:disabled {
          cursor: not-allowed;
          opacity: 50%;
        }

        .input {
          padding: calc(var(--padding) * 2) calc(var(--padding) * 3);
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background-color: var(--background);
          font-size: inherit;
          font-family: inherit;
        }

        .input:focus-visible {
          border-radius: var(--radius);
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      </style>
      <label class="label" tabindex="0">
        <slot></slot>
        <input class="input" />
      </label>`;
  }

  // Value getter and setter
  get value() {
    return this.input?.value || '';
  }

  set value(val) {
    if (this.input) {
      this.input.value = val;
      this._internals.setFormValue(val);
    }
    this.setAttribute('value', val); // keep attribute in sync
  }

  get form() {
    return this._internals?.form || null;
  }  

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }
}

customElements.define('vona-input', InputBase);
