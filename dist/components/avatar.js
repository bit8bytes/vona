class AvatarBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const src = this.getAttribute('src');

    this.shadowRoot.innerHTML = `
        <style>
        .avatar {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
        }

        .avatar__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        </style>

        <div class="avatar">
            <img src="${src}" alt="user avatar" class="avatar__image"/>
        </div>
    `;
  }
}

customElements.define('vona-avatar', AvatarBase);
