# project-no
  
  A modern Next.js application created with **Template Next**.
  
  ## 🚀 Tech Stack
  
  - **Next.js 16** - React framework with App Router
  - **TypeScript** - Type-safe JavaScript
  - **Tailwind CSS** - Utility-first CSS framework
  - **Shadcn/ui** - Beautiful, accessible UI components
  - **Prettier** - Code formatting with Tailwind plugin
  
  ## 🛠️ Getting Started
  
  ### Prerequisites
  - Node.js 20.9 or later
  - npm, yarn, or pnpm
  
  ### Installation
  
  1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
  ```
  
  2. Run the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```
  
  3. Open [http://localhost:3000](http://localhost:3000) in your browser.
  
  ## 📁 Project Structure
  
  ```
  project-no/
  ├── src/
  │   ├── app/
  │   │   ├── globals.css      # Shadcn/ui + Tailwind styles
  │   │   ├── layout.tsx
  │   │   └── page.tsx
  │   ├── components/
  │   │   └── ui/              # Shadcn/ui components
  │   └── lib/
  ├── public/
  ├── .prettierrc
  ├── .vscode/
  │   └── settings.json
  ├── components.json          # Shadcn/ui configuration
  ├── next.config.ts
  ├── postcss.config.mjs
  ├── eslint.config.mjs
  ├── tsconfig.json
  └── package.json
  ```
  
  ## 🎨 Adding Components
  
  This project uses Shadcn/ui. Add new components:
  
  ```bash
  npx shadcn@latest add button
  npx shadcn@latest add card
  npx shadcn@latest add input
  ```
  
  ## 📝 Available Scripts
  
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run start` - Start production server
  - `npm run lint` - Lint code with ESLint
  - `npm run format` - Format code with Prettier
  
  ## 🤝 Contributing
  
  Created with [Template Next](https://www.npmjs.com/package/@edward-hyde/template-next)
  
  ## 📄 License
  
  MIT License
  