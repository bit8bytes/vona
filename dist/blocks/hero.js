class VonaBlockHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get styles() {
    return `
    /* ====== Tailwind Utility Equivalents ====== */
    :host {
        display: block;
        font-size: var(--text-small, 14px);
        font-family: var(--font-family, "Helvetica", sans-serif);
    }

    .relative { position: relative; }
    .isolate { isolation: isolate; }
    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .pt-14 { padding-top: 3.5rem; }
    .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }

    @media (min-width: 1024px) {
      .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      .lg\\:py-56 { padding-top: 14rem; padding-bottom: 14rem; }
    }

    .mx-auto { margin-left: auto; margin-right: auto; }
    .max-w-2xl { max-width: 42rem; }
    .py-32 { padding-top: 8rem; padding-bottom: 8rem; }

    @media (min-width: 640px) {
      .sm\\:py-48 { padding-top: 12rem; padding-bottom: 12rem; }
      .sm\\:text-7xl { font-size: 4.5rem; line-height: 1; }
      .sm\\:text-xl\\/8 { font-size: 1.25rem; line-height: 2rem; }
    }

    .text-center { text-align: center; }
    .text-5xl { font-size: 3rem; line-height: 1; }
    .font-semibold { font-weight: 600; }
    .tracking-tight { letter-spacing: -0.025em; }
    .text-gray-900 { color: #111827; }
    .text-gray-500 { color: #6b7280; }
    .mt-8 { margin-top: 2rem; }
    .mt-10 { margin-top: 2.5rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .gap-x-6 { column-gap: 1.5rem; }
    
    .text-balance { text-wrap: balance; }
    .text-pretty { text-wrap: pretty; }

    /* ====== Custom Component Styles ====== */

    ::slotted([slot="primary"]) {
        display: inline-block;
        border-radius: 0.375rem;
        background-color: var(--primary, black);
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary-foreground, white);
        text-decoration: none;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        transition: background-color 0.2s ease;
    }

    ::slotted([slot="primary"]:hover) {
       background: var(--primary-hover, black);
    }

    ::slotted([slot="secondary"]) {
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 0.375rem;
        padding: 0.625rem 0.875rem;
        color: var(--secondary-foreground, #111827);
        text-decoration: none;
        transition: background-color 0.2s ease;
    }

    ::slotted([slot="secondary"]:hover) {
       background: var(--secondary-hover, white);
    }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${this.styles}</style>

    <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
                <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                    <slot name="headline"></slot>
                </h1>
                <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    <slot name="description"></slot>
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <slot name="primary"></slot>
                    <slot name="secondary"></slot>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('vona-block-hero', VonaBlockHero);
