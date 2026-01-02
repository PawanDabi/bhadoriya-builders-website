# BuildPro Construction Website

A professional, modern website for a construction and building company built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **SEO Optimized**: Built-in SEO features including metadata, sitemap, and robots.txt
- **Fast Performance**: Optimized for speed with Next.js 15 App Router
- **Type-Safe**: Full TypeScript support for better code quality
- **Easy to Customize**: Well-organized code structure for easy modifications

## Pages

1. **Home** - Hero section, services preview, stats, testimonials, and CTAs
2. **Services** - Comprehensive list of construction services with detailed descriptions
3. **Portfolio** - Project gallery with filtering by category (Residential, Commercial, Renovation)
4. **About** - Company story, team members, values, and certifications
5. **Contact** - Contact form, business information, and FAQ section

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter)
- **Icons**: Heroicons (inline SVG)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd /home/my/Desktop/builder_website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
builder_website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── manifest.ts        # PWA manifest
├── components/            # Reusable components
│   ├── Navigation.tsx     # Header navigation
│   └── Footer.tsx         # Footer component
├── public/                # Static assets
│   ├── images/           # Image files
│   └── robots.txt        # SEO robots file
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies

```

## Customization Guide

### Updating Content

1. **Company Name & Branding**:
   - Update "BuildPro" in `components/Navigation.tsx` and `components/Footer.tsx`
   - Modify colors in `tailwind.config.ts` under `theme.extend.colors`

2. **Contact Information**:
   - Update phone, email, address in `components/Footer.tsx` and `app/contact/page.tsx`

3. **Services**:
   - Edit the services array in `app/services/page.tsx`

4. **Portfolio Projects**:
   - Modify the projects array in `app/portfolio/page.tsx`
   - Add project images to `public/images/`

5. **Team Members**:
   - Update team array in `app/about/page.tsx`

6. **SEO Metadata**:
   - Edit metadata in each page file and `app/layout.tsx`
   - Update sitemap URL in `app/sitemap.ts` and `public/robots.txt`

### Adding Images

1. Place images in `public/images/`
2. Use Next.js Image component for optimization:
```tsx
import Image from 'next/image'

<Image
  src="/images/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Styling

- Global styles: `app/globals.css`
- Custom utility classes defined in `globals.css` under `@layer components`
- Modify Tailwind colors and theme in `tailwind.config.ts`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

Create a `.env.local` file for environment variables:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Adding Features

### Contact Form Integration

To connect the contact form to a backend service:

1. Install a form service (e.g., Formspree, SendGrid, or Resend)
2. Update the form submission handler in `app/contact/page.tsx`

Example with fetch API:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  // Handle response
};
```

### Google Analytics

1. Install next-google-analytics package
2. Add your tracking ID to environment variables
3. Import and configure in `app/layout.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse score target: 90+ for all metrics
- Core Web Vitals optimized
- Image optimization with Next.js Image component
- Code splitting and lazy loading

## License

This project is licensed for use by the client.

## Support

For questions or support, please contact the development team.

---

Built with ❤️ using Next.js and Tailwind CSS
