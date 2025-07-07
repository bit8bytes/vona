# Vona

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Plug-and-play landing page UI blocks.

A minimalist and lightweight starter kit that that utilises Pico for beautiful plug-and-play landing page UI blocks.

Copy HTML, Add Pico CSS and Vona CSS, change your content, and deploy.

## Table of contents

- [Getting Started](#quick-start)
- [Contributing](#contributing)
- [Copyright and license](copyright-and-license)

## Quick Start

There are two ways to include vona.css:

### Install manually

Download Pico and Vona and link both in the <head> of your website.

```html
<link rel="stylesheet" href="css/pico.min.css" />
<link rel="stylesheet" href="css/vona.min.css" />
```

### Usage from CDN

Alternatively, you can use jsDelivr CDN to link pico.css and vona.css.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/bit8bytes/vona@v0.0.3/dist/vona.min.css"
/>
```

### Starter HTML template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/pico.min.css" />
    <link rel="stylesheet" href="css/vona.min.css" />
    <title>My Vona Page</title>
  </head>
  <body class="vona">
    <main class="container">
      <h1>Hello Vona!</h1>
    </main>
  </body>
</html>
```

## Documentation

### Getting Started

- [Introduction](https://vona.bit8bytes.com/docs/introduction)
- [Quick Start](https://vona.bit8bytes.com/docs/installation)

### Blocks

- [Header](https://vona.bit8bytes.com/docs/blocks/header)
- [Hero](https://vona.bit8bytes.com/docs/blocks/hero)
- [Features](https://vona.bit8bytes.com/docs/blocks/features)
- [Newsletter](https://vona.bit8bytes.com/docs/blocks/newsletter)
- [Footer](https://vona.bit8bytes.com/docs/blocks/footer)

## Contributing

If you are interested in contributing to Vona CSS, please send a email to <a href="mailto:gleiter.tobias@gmail.com">gleiter.tobias@gmail.com</a>.

## Pages that use Vona

- [Goalkeepr](https://goalkeepr.io)
- [Filmlet](https://filmlet.app)

## Copyright and license

Licensed under the [MIT License](https://github.com/bit8bytes/vona/blob/main/LICENSE).
