class LinkBase extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.link = this.querySelector('a');
    ['href', 'target', 'name'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.link[attr] = attrValue;
      }
    });

    if (this.hasAttribute('secondary')) {
      console.log('secondary');
      this.link.classList.add('link--secondary');
    }
  }

  render() {
    this.innerHTML = `
        <style>
        .link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          border: 0px solid transparent;
          border-radius: calc(var(--radius) * 1);
          font-size: var(--text-small);
          font-weight: 500;
          padding: calc(var(--padding) * 2) calc(var(--padding) * 4);
          cursor: pointer;
          color: var(--primary);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-color: transparent;
          text-underline-offset: 4px;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }

        .link--secondary {
          color: var(--secondary-foreground);
        }

        .link--secondary:hover {
          color: var(--accent-foreground);
        }
        </style>
  
        <a class="link">${this.innerHTML}<a/>
      `;
  }
}

customElements.define('vona-link', LinkBase);
