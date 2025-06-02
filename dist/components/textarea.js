class TextareaBase extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return ['value', 'disabled', 'placeholder', 'required', 'readonly', 'name'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.textarea = this.shadowRoot.querySelector('textarea');

    // Initialize from attributes
    this.syncAttributes();

    // Initial form value
    this._internals.setFormValue(this.textarea.value);

    // Reflect input changes
    this.textarea.addEventListener('input', () => {
      this._internals.setFormValue(this.textarea.value);
      this.setAttribute('value', this.textarea.value);
    });
  }

  attributeChangedCallback(name, _oldVal, newVal) {
    if (!this.textarea) return;

    switch (name) {
      case 'value':
        this.textarea.value = newVal;
        this._internals.setFormValue(newVal);
        break;
      case 'disabled':
        this.textarea.disabled = newVal !== null;
        break;
      case 'readonly':
        this.textarea.readOnly = newVal !== null;
        break;
      case 'required':
        this.textarea.required = newVal !== null;
        break;
      case 'placeholder':
        this.textarea.placeholder = newVal;
        break;
      case 'name':
        // No DOM update needed — just for `FormData`
        break;
    }
  }

  syncAttributes() {
    const booleanAttrs = ['disabled', 'readonly', 'required'];
    const stringAttrs = ['value', 'placeholder', 'rows', 'cols', 'name'];

    booleanAttrs.forEach(attr => {
      if (this.hasAttribute(attr)) {
        this.textarea[attr] = true;
      }
    });

    stringAttrs.forEach(attr => {
      const val = this.getAttribute(attr);
      if (val !== null) {
        this.textarea.setAttribute(attr, val);
        if (attr === 'value') {
          this.textarea.value = val;
        }
      }
    });
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

        .textarea {
          border: 1px solid var(--input);
          border-radius: var(--radius);
          padding: calc(var(--padding) * 2) calc(var(--padding) * 3);
          box-sizing: border-box;
          min-width: 100%;
          max-width: 100%;
          min-height: 54px;
          resize: vertical;
          overflow: auto;
          background-color: var(--background);  
          font-size: inherit;
          font-family: inherit;    
        }

        .textarea:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .textarea:disabled {
          cursor: not-allowed;
          opacity: 50%;
        }
      </style>
      <label class="label" tabindex="0">
        <slot></slot>
        <textarea class="textarea"></textarea>
      </label>
    `;
  }

  get value() {
    return this.textarea?.value || '';
  }

  set value(val) {
    this.setAttribute('value', val);
    if (this.textarea) {
      this.textarea.value = val;
      this._internals.setFormValue(val);
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  get form() {
    return this._internals.form;
  }

  get type() {
    return 'textarea';
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

customElements.define('vona-textarea', TextareaBase);
