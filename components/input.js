/**
 * InputBase - A customizable input web component
 * Can be used with forms due to formAssociated property
 */
class InputBase extends HTMLElement {
  // Enable form association so this component can be used in forms
  static formAssociated = true;

  /**
   * Constructor - Initialize the component
   * Calls render() to create the shadow DOM structure
   * It attaches the internals for form association
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this.render();
  }

  /**
   * connectedCallback - Lifecycle method called when element is added to DOM
   * Sets up event listeners and applies attributes/styles based on element attributes
   */
  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');

    // Copy specified attributes from custom element to internal button element
    ['id', 'type', 'name', 'value', 'placeholder', 'disabled'].forEach((attr) => {
      const attrFromParent = this.getAttribute(attr);
      if (attrFromParent !== null) {
        this.input.setAttribute(attr, attrFromParent);
      }
    });

    // Apply disabled state if the disabled attribute is present
    if (this.hasAttribute('disabled')) {
      this.input.disabled = true;
    }

    // Set up event listeners for input changes
    this.input.addEventListener('input', () => {
      this.value = this.input.value;
    });
  }

  /**
   * render - Creates the HTML structure and styles for the input
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .label {
          display: flex;
          flex-direction: column;
          width: 100%;
          font-size: var(--text-small);
          font-weight: 500;
          gap: var(--gap);
          font-family: var(--font-family, "Helvetica", Sans-Serif);
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

// Register the custom element with the browser.
customElements.define('vona-input', InputBase);
