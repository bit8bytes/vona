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

    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .pt-14 { padding-top: 3.5rem; }
    .lg:px-8 { padding-left: 2rem; padding-right: 2rem; }

    .rounded-md { border-radius: 0.375rem; }

    .h-6 { height: 2rem; }

    @media (min-width: 1024px) {
      .lg:px-8 { padding-left: 2rem; padding-right: 2rem; }
      .lg:py-56 { padding-top: 14rem; padding-bottom: 14rem; }
    }

    .mx-auto { margin-left: auto; margin-right: auto; }
    .max-w-2xl { max-width: 42rem; }
    .py-32 { padding-top: 8rem; padding-bottom: 8rem; }

    @media (min-width: 640px) {
      .sm:py-48 { padding-top: 12rem; padding-bottom: 12rem; }
      .sm:text-7xl { font-size: 4.5rem; line-height: 1; }
      .sm:text-xl { font-size: 1.25rem; line-height: 2rem; }
    }

    .text-center { text-align: center; }
    .text-5xl { font-size: 3rem; line-height: 1; }
    .font-semibold { font-weight: 600; }
    .tracking-tight { letter-spacing: -0.025em; }
    .mt-8 { margin-top: 2rem; }
    .mt-10 { margin-top: 2.5rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .flex { display: flex; }
    .flex-row { flex-direction: row; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .gap-x-6 { column-gap: 1.5rem; }
    
    .text-balance { text-wrap: balance; }
    .text-pretty { text-wrap: pretty; }

    .bg-primary { background-color: var(--color-primary, hsl(240 6% 10%)); }
    .primary-foreground { color: var(--color-primary-foreground, hsl(223.81 0% 98%)); }

    .bg-secondary { background-color: var(--color-secondary, hsl(210 40% 96.1%)); }
    .secondary-foreground { color: var(--color-secondary-foreground, hsl(222.2 47.4% 11.2%)); }

    .bg-muted { background-color: var(--color-muted, hsl(210 40% 96.1%)); }
    .text-muted { color: var(--color-muted-foreground, hsl(240.08 6% 64%)); }

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
                <p class="mt-8 text-lg font-medium text-pretty sm:text-xl text-muted">
                    <slot name="description"></slot>
                </p>
                <div class="flex flex-row gap-x-6 mt-10 flex items-center justify-center">
                  <div class="flex bg-primary primary-foreground items-center justify-center rounded-md h-6 px-4 py-2" tabindex="0">
                    <slot name="primary"></slot> 
                  </div>
                  <div class="flex bg-secondary secondary-foreground items-center justify-center rounded-md h-6 px-4 py-2" tabindex="0">
                    <slot name="secondary"></slot>
                  </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('vona-block-hero', VonaBlockHero);
