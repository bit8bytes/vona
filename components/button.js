class ButtonBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals(); // required for form association
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');

    // Copy attributes from host to internal button
    ['type', 'name', 'disabled'].forEach((attr) => {
      const val = this.getAttribute(attr);
      if (val !== null) {
        this.button.setAttribute(attr, val);
      }
    });

    // Handle click: submit or reset the form
    this.button.addEventListener('click', () => {
      const type = this.getAttribute('type') || 'submit';

      if (type === 'submit') {
        this._internals.form?.requestSubmit();
      } else if (type === 'reset') {
        this._internals.form?.reset();
      }
    });

    // Apply style variants
    if (this.hasAttribute('secondary')) {
      this.button.classList.add('button--secondary');
    }
    if (this.hasAttribute('destructive')) {
      this.button.classList.add('button--destructive');
    }
    if (this.hasAttribute('outline')) {
      this.button.classList.add('button--outline');
    }
    if (this.hasAttribute('ghost')) {
      this.button.classList.add('button--ghost');
    }
    if (this.hasAttribute('link')) {
      this.button.classList.add('button--link');
    }
    if (this.hasAttribute('disabled')) {
      this.button.disabled = true;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          display: inline-flex;
          gap: var(--gap);
          width: fit-content;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          border: 0px solid transparent;
          border-radius: calc(var(--radius) * 1);
          font-size: var(--text-small);
          font-weight: 500;
          padding: calc(var(--padding) * 2) calc(var(--padding) * 4);
          font-family: var(--font-family, "Helvetica", Sans-Serif);
          cursor: pointer;
          color: var(--primary-foreground);
          background-color: var(--primary);
          user-select: none;
        }

        .button:hover {
          opacity: 85%;
        }

        .button:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        .button--secondary {
          color: var(--secondary-foreground);
          background-color: var(--secondary);
        }

        .button--destructive {
          color: var(--destructive-foreground);
          background-color: var(--destructive);
        }

        .button--outline {
          border: 1px solid var(--input);
          background-color: var(--background);
          color: var(--foreground);
        }

        .button--outline:hover {
          color: var(--accent-foreground);
          background-color: var(--accent);
        }

        .button--ghost {
          background-color: transparent;
          color: var(--foreground);
        }

        .button--ghost:hover {
          color: var(--accent-foreground);
          background-color: var(--accent);
        }

        .button--link {
          color: var(--primary);
          background-color: transparent;
          text-underline-offset: 4px;
          text-decoration: none;
        }

        .button--link:hover {
          text-decoration: underline;
        }

        .button:disabled,
        .button[disabled] {
          pointer-events: none !important;
          cursor: not-allowed !important;
          opacity: 50% !important;
        }
      </style>
      <button type="button" class="button" tabindex="0">
        <slot></slot>
      </button>
    `;
  }

  get form() {
    return this._internals.form;
  }

  get type() {
    return this.getAttribute('type') || 'submit';
  }
}

customElements.define('vona-button', ButtonBase);
