/**
 * ButtonBase - A customizable button web component
 * Provides various visual styles (primary, secondary, destructive, outline, ghost, link)
 * and can be used with forms due to formAssociated property
 */
class ButtonBase extends HTMLElement {
  // Enable form association so this component can be used in forms
  static formAssociated = true;

  /**
   * Constructor - Initialize the component
   * Calls render() to create the light DOM structure
   */
  constructor() {
    super();
    this.render();
  }

  /**
   * connectedCallback - Lifecycle method called when element is added to DOM
   * Sets up event listeners and applies attributes/styles based on element attributes
   */
  connectedCallback() {
    this.button = this.querySelector('button');
    
    // Copy specified attributes from custom element to internal button element
    ['type', 'name', 'disabled'].forEach((attr) => {
      // Special handling for boolean attributes like 'required'
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);
      
      if (attrValue !== null && attrValue !== undefined) {
        this.button[attr] = attrValue;
      }
    });

    // Set up click event handling
    this.button.addEventListener('click', () => {
      // If button is a submit button, submit the form
      // Note: this.internals needs to be initialized in constructor with this.attachInternals()
      if (this.getAttribute('type') === 'submit') {
        this.internals.form.requestSubmit();
      }
    });

    // Apply styling variants based on attributes
    // Secondary variant (alternative color scheme)
    if (this.hasAttribute('secondary')) {
      this.button.classList.add('button--secondary');
    }
    
    // Destructive variant (typically red, for delete actions)
    if (this.hasAttribute('destructive')) {
      this.button.classList.add('button--destructive');
    }
    
    // Outline variant (transparent with border)
    if (this.hasAttribute('outline')) {
      this.button.classList.add('button--outline');
    }
    
    // Ghost variant (transparent without border)
    if (this.hasAttribute('ghost')) {
      this.button.classList.add('button--ghost');
    }
    
    // Apply disabled state if the disabled attribute is present
    if (this.hasAttribute('disabled')) {
      this.button.disabled = true;
    }
  }

  /**
   * render - Creates the HTML structure and styles for the button
   * This sets innerHTML which replaces any existing content
   */
  render() {
    this.innerHTML = `
      <style>
        /* Base button styling */
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
          cursor: pointer;
          color: var(--primary-foreground);
          background-color: var(--primary);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Hover state */
        .button:hover {
          opacity: 85%;
        }

        /* Focus state - for accessibility */
        .button:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Secondary variant - alternative color scheme */
        .button--secondary {
          color: var(--secondary-foreground);
          background-color: var(--secondary);
        }

        /* Destructive variant - for delete/remove actions */
        .button--destructive {
          color: var(--destructive-foreground);
          background-color: var(--destructive);
        }

        /* Outline variant - transparent with border */
        .button--outline {
          border: 1px solid var(--input);
          border-radius: var(--radius);
          background-color: var(--background);
          color: var(--foreground);
        }

        .button--outline:hover {
          color: var(--accent-foreground);
          background-color: var(--accent);
        }

        /* Ghost variant - transparent without border */
        .button--ghost {
          border: 0px solid transparent;
          background-color: transparent;
          color: var(--foreground);
        }

        .button--ghost:hover {
          color: var(--accent-foreground);
          background-color: var(--accent);
        }

        /* Link variant - appears as a text link */
        .button--link {
          color: var(--primary);
          background-color: transparent;
          text-underline-offset: 4px;
          text-decoration: none;
        }

        .button--link:hover {
          text-decoration: underline;
        }

        /* Important: Move the disabled styles to the end to ensure they override other styles */
        /* Disabled state - Note the !important flag to ensure these styles take precedence */
        .button:disabled,
        .button[disabled] {
          pointer-events: none !important;
          cursor: not-allowed !important;
          opacity: 50% !important;
        }
      </style>
      <button
        tabindex="0"
        aria-pressed="false"
        class="button"
      >
        ${this.innerHTML}
        <div class="spinner"></div>
      </button>
    `;
  }
}

// Register the custom element with the browser
customElements.define('vona-button', ButtonBase);