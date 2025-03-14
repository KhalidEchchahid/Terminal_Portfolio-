# 🚀 My Terminal & 3D Portfolio

Welcome to the codebase behind my unique portfolio website! This project combines my passion for both terminal interfaces and 3D experiences to showcase my work as a software engineer from Morocco.

## ✨ What Makes This Portfolio Special

### Terminal Experience
Navigate my portfolio like you would your favorite command line! Use familiar commands to explore my projects, read my blog posts, and learn more about me. The terminal includes command history, tab completion, and even works great on mobile.

### Immersive 3D Showcase
Step into a three-dimensional space where my projects come to life! Orbit around and interact with 3D representations of my work. Each project is displayed with detailed information and interactive elements.

### Developer-Friendly Blog
Read my thoughts on software development in a clean, code-friendly blog format with:
- Beautiful syntax highlighting
- MDX support for interactive elements
- Estimated reading times
- Full SEO optimization

### Built For Everyone
- **Fully responsive** from tiny phones to ultrawide monitors
- **Accessibility-focused** with ARIA attributes and screen reader support
- **Dark mode by default** for those late-night coding sessions
- **Lightning fast** with optimized loading times

## 🛠️ Tech Stack

### Frontend
- **Next.js** with App Router for server components
- **React** + **TypeScript** for type-safe components
- **Tailwind CSS** + **shadcn/ui** for sleek styling
- **Framer Motion** for smooth animations

### 3D Magic
- **Three.js** for 3D rendering
- **React Three Fiber** as a React wrapper
- **@react-three/drei** for helpful 3D utilities
- **GLSL** shaders for custom visual effects

### Content Management
- **MDX** for blog posts with interactive components
- **gray-matter** + **reading-time** for content processing

### Performance & SEO
- Structured data with JSON-LD
- Comprehensive meta tags
- Automatic sitemap generation
- Next.js image optimization

## 📂 Project Structure

```
├── app/                      # Next.js App Router
│   ├── 3d_portfolio/         # 3D Portfolio experience
│   ├── blog/                 # Blog section
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage with terminal
├── components/               # React components
│   ├── 3d/                   # 3D experience components
│   ├── blog/                 # Blog components
│   ├── mdx/                  # mdx components
│   ├── sections/             # terminal sections (home , about , skills , projects and contact
│   ├── terminal/             # Terminal emulation
│   └── ui/                   # UI components
├── content/                  # Content files
│   └── blog/                 # Blog posts in MDX
├── contexts/                 # terminal contexts (theme , mode type ...)
├── content/                  # Content files
├── hooks/                    # App hooks
├── lib/                      
└── public/                   # Static assets
    └── assets/               # Images and 3D models
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or newer
- npm or yarn

### Installation

1. Clone the repo
```bash
git clone https://github.com/KhalidEchchahid/Terminal_Portfolio-.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment variables
```
# .env.local
NEXT_PUBLIC_SITE_URL=https://khalidechchahid.me
```

4. Start developing
```bash
npm run dev
# or
yarn dev
```

5. Visit http://localhost:3000 and start exploring!

## 🔧 Making It Your Own

### Personal Info
Update your details in:
- `app/layout.tsx` for site metadata
- `components/terminal/terminal.tsx` for terminal commands
- `app/page.tsx` for your bio and skills
- `sorry, but you need to check almost all the files to personalize your data` 


### Blog Posts
Create new blog posts as MDX files in `content/blog/`:

```markdown
---
title: "How I Built This Portfolio"
date: "2024-03-15"
description: "The journey of creating my terminal and 3D portfolio"
image: "/blog-images/portfolio-creation.jpg"
tags: ["Next.js", "Three.js", "Portfolio"]
featured: true
---

# The Journey Begins

I've always wanted a portfolio that truly represents me as a developer...
```

## 📱 Responsive Design

This portfolio adapts beautifully across all devices:

- **Desktop**: Full terminal experience with keyboard shortcuts and immersive 3D
- **Tablet**: Touch-optimized controls and responsive layouts
- **Mobile**: Simplified interface with touch-friendly navigation

## ⚡ Performance Optimizations

### 3D Experience
- Adaptive quality based on device capabilities
- Efficient model loading and rendering
- Optimized assets for faster loading

### Overall Site
- Server Components for speedy initial loads
- Code splitting and lazy loading
- Font optimization and image compression

## 🌐 Deployment

### The Easy Way (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Configure environment variables
4. Deploy!

### Other Options
Build the project with:
```bash
npm run build
# or
yarn build
```
Then deploy the `out` directory to your hosting provider.

## 🌍 Open Source

This project is completely **open source** under the MIT License. Feel free to:
- Use it for your own portfolio
- Modify it however you like
- Share your version with others

### Want to Contribute?

Contributions are always welcome! Here's how:
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

I appreciate all kinds of help:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 Design enhancements
- ⚡ Performance optimizations

### Found an Issue?

Please [open an issue](https://github.com/khalidEchchahid/Terminal_Portfolio-/issues) with:
- A clear description
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if helpful

## 📬 Get in Touch

Have questions or want to chat about this project?
- Email: [echchahidkhalid7@gmail.com](mailto:echchahidkhalid7@gmail.com)
- LinkedIn: [Khalid Echchahid](https://linkedin.com/in/khalid-echchahid)

## 💡 Used This Template?

If you've used this as inspiration for your own portfolio, I'd love to see it! Open an issue with the "showcase" tag to share your creation.

## 🙏 Thanks To

- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Created with ❤️ by [Khalid Echchahid](https://github.com/khalidechchahid)

⭐ Star this repo if you found it helpful!
