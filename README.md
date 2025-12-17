# CGCApps - Personal Portfolio Site

[![Astro](https://img.shields.io/badge/Astro-4.0-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Personal portfolio and development tools site for Carlos Guajardo - Fullstack Developer. Built with
Astro, React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚀 **Fast & Performant** - Built with Astro for optimal performance
- ♿ **Fully Accessible** - WCAG AA compliant with comprehensive ARIA support
- 📱 **Responsive Design** - Works flawlessly on all devices
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 🔒 **Privacy-Focused** - Tools process data locally (no uploads)
- 🛠️ **Developer Tools** - Image converter and more utilities
- 📊 **SEO Optimized** - Proper meta tags, sitemap, and semantic HTML
- 🎯 **Type-Safe** - Full TypeScript coverage

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or higher
- pnpm v8.x or higher (recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cgcapps-site

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

Visit `http://localhost:4321` to see the site.

## 📦 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Start development server with hot reload |
| `pnpm build`        | Build for production                     |
| `pnpm preview`      | Preview production build locally         |
| `pnpm lint`         | Run ESLint on all files                  |
| `pnpm lint:fix`     | Auto-fix ESLint issues                   |
| `pnpm format`       | Format all files with Prettier           |
| `pnpm format:check` | Check formatting without writing         |
| `pnpm type-check`   | Run TypeScript type checking             |

## 🏗️ Project Structure

```
cgcapps-site/
├── public/              # Static assets
│   ├── images/         # Image assets
│   ├── videos/         # Video files
│   ├── _headers        # HTTP headers configuration
│   └── robots.txt      # SEO directives
├── src/
│   ├── components/     # Reusable components
│   │   ├── react/     # React components (client-side)
│   │   └── *.astro    # Astro components (SSR)
│   ├── data/          # JSON data files
│   ├── images/        # Optimized images
│   ├── layouts/       # Page layouts
│   ├── pages/         # Routes (file-based routing)
│   ├── sections/      # Page sections
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── types.ts       # TypeScript definitions
├── DEVELOPMENT.md     # Development guide
├── COMPONENTS.md      # Component documentation
└── CONTRIBUTING.md    # Contribution guidelines
```

## 🛠️ Tech Stack

### Core

- **[Astro](https://astro.build)** - Static site generator
- **[React](https://react.dev)** - UI library for interactive components
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS

### Tools & Libraries

- **[Atropos](https://atroposjs.com)** - 3D parallax effects
- **[Axios](https://axios-http.com)** - HTTP client
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS sanitization
- **[Compressor.js](https://fengyuanchen.github.io/compressorjs)** - Image compression

### Development

- **[ESLint](https://eslint.org)** - Code linting
- **[Prettier](https://prettier.io)** - Code formatting
- **[Husky](https://typicode.github.io/husky)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 📚 Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Complete development guide
- **[COMPONENTS.md](./COMPONENTS.md)** - Component documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

## 🌟 Key Features

### Portfolio

- Showcase of web and mobile development projects
- Interactive 3D card effects
- Project details with galleries
- Technology stack badges
- GitHub and live site links

### Developer Tools

- **Image Converter**: Convert and compress images (PNG, JPG, WebP, GIF)
- Privacy-focused: All processing happens in your browser
- Copy base64 or download results
- More tools coming soon!

### Contact Form

- Rate limiting (3 submissions/minute)
- Input sanitization (DOMPurify)
- Cloudflare Turnstile captcha
- Animated success/error states

### Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader optimized
- Focus indicators
- WCAG AA compliant

### Performance

- Lazy loading images
- Code splitting
- Resource preloading
- Optimized builds
- Static site generation

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# API Configuration
PUBLIC_API_URL=https://cgcapps-api.vercel.app

# Cloudflare Turnstile
PUBLIC_TURNSTILE_SITE_KEY=your_key_here

# Site Configuration
PUBLIC_SITE_URL=https://www.cgcapps.cl
PUBLIC_SITE_NAME=CGCApps
```

## 📄 License

See LICENSE file for details.

## 👤 Author

**Carlos Guajardo**

- Website: [cgcapps.cl](https://www.cgcapps.cl)
- GitHub: [@cjguajardo](https://github.com/cjguajardo)
- LinkedIn: [cjguajardo](https://linkedin.com/in/cjguajardo)
- Email: cj.guajardo@cgcapps.cl

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code
of conduct and the process for submitting pull requests.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

---

Made with ❤️ by Carlos Guajardo
