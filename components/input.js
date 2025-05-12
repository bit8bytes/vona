class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');
    ['id', 'type', 'name', 'value', 'placeholder', 'disabled'].forEach((attr) => {
      const attrValue = this.getAttribute(attr);
      if (attrValue !== null) {
        this.input.setAttribute(attr, attrValue);
      }
    });

    if (this.hasAttribute('disabled')) {
      this.input.disabled = true;
    }

    this.input.addEventListener('input', () => {
      this.value = this.input.value;
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .input {
          display: flex;
          flex-direction: column;
          width: 100%;
          font-size: var(--text-small);
          font-weight: 500;
          gap: var(--gap);
          font-family: var(--font-family, "Helvetica", Sans-Serif);
        }

        .input:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .input input:disabled {
          cursor: not-allowed;
          opacity: 50%;
        }

        .input__text {
          padding: calc(var(--padding) * 2) calc(var(--padding) * 3);
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background-color: var(--background);
        }

        .input__text:focus-visible {
          border-radius: var(--radius);
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      </style>
      <label class="input" tabindex="0">
        <slot></slot>
        <input class="input__text" />
      </label>`;
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.internals.setFormValue(value);
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }
}

customElements.define('vona-input', InputBase);
