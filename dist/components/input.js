class InputBase extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return ['value', 'required', 'minlength', 'maxlength', 'pattern', 'name', 'type', 'placeholder', 'disabled'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');
    this.syncAttributes();
    this._internals.setFormValue(this.input.value);

    this.input.addEventListener('input', () => {
      this._internals.setFormValue(this.input.value);
      this.updateValidity();
    });

    this.updateValidity();
  }

  attributeChangedCallback(name, newValue) {
    if (this.input && newValue !== null) {
      this.input.setAttribute(name, newValue);
      if (name === 'value') {
        this.input.value = newValue;
        this._internals.setFormValue(newValue);
        this.updateValidity();
      }
    }
  }

  syncAttributes() {
    for (const attr of InputBase.observedAttributes) {
      const val = this.getAttribute(attr);
      if (val !== null) {
        this.input.setAttribute(attr, val);
      }
    }
  }

  updateValidity() {
    if (!this.input) return;

    if (this.input.validity.valid) {
      this._internals.setValidity({});
    } else {
      this._internals.setValidity(
        { customError: true },
        this.input.validationMessage,
        this.input
      );
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
      </label>
    `;
  }

  get form() {
    return this._internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get value() {
    return this.input?.value || '';
  }

  set value(val) {
    this.setAttribute('value', val);
    if (this.input) {
      this.input.value = val;
      this._internals.setFormValue(val);
      this.updateValidity();
    }
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
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
}

customElements.define('vona-input', InputBase);
