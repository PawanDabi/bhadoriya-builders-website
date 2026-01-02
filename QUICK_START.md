# Quick Start Guide

## Your Website is Ready!

The professional construction website for your builder client has been successfully built and is ready to use!

## Accessing the Website

The development server is currently running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.0.195:3000

You can access it from your browser to see the live website!

## What's Included

### Pages Created:
1. **Homepage** (`/`) - Hero section, stats, services preview, testimonials, and CTAs
2. **Services** (`/services`) - Detailed service offerings and process overview
3. **Portfolio** (`/portfolio`) - Project gallery with category filtering
4. **About** (`/about`) - Company story, team, values, and certifications
5. **Contact** (`/contact`) - Contact form, business info, and FAQs

### Features:
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern, professional UI with smooth animations
- ✅ SEO optimized with metadata and sitemap
- ✅ Contact form with validation
- ✅ Project portfolio with filtering
- ✅ Testimonials section
- ✅ Fast performance with Next.js 15
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Next Steps

### 1. Customize Content
Edit the following files to add your client's actual content:

**Company Info:**
- `components/Navigation.tsx` - Update company name "BuildPro"
- `components/Footer.tsx` - Update contact details, address, phone, email

**Services:**
- `app/services/page.tsx` - Modify the services array with actual offerings

**Portfolio:**
- `app/portfolio/page.tsx` - Update the projects array
- Add project images to `public/images/`

**About:**
- `app/about/page.tsx` - Update team members, company story, certifications

**Contact:**
- `app/contact/page.tsx` - Update contact information and business hours

### 2. Add Images
1. Get high-quality photos from your client:
   - Project photos for portfolio
   - Team member photos
   - Company building/office photos
   - Logo and brand assets

2. Place images in `public/images/`

3. Update image references in the code using Next.js Image component:
   ```tsx
   import Image from 'next/image'

   <Image
     src="/images/project-1.jpg"
     alt="Modern Family Home"
     width={800}
     height={600}
   />
   ```

### 3. Update Colors/Branding
Edit `tailwind.config.ts` to match your client's brand colors:
```typescript
colors: {
  primary: {
    // Update these hex values
    500: '#your-color',
    600: '#your-color',
    700: '#your-color',
  },
}
```

### 4. Configure Contact Form
The contact form currently logs to console. To make it functional:

**Option A: Use Formspree (Easy)**
```bash
npm install @formspree/react
```

**Option B: Create API Route**
Create `app/api/contact/route.ts` and integrate with email service (SendGrid, Resend, etc.)

**Option C: Use Form Service**
Services like Netlify Forms, Vercel Forms, or Web3Forms

### 5. Deploy to Production

#### Deploy to Vercel (Recommended - Free):
1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Visit https://vercel.com
3. Import your GitHub repository
4. Vercel auto-detects Next.js and deploys!

#### Other Hosting Options:
- **Netlify**: https://netlify.com
- **Cloudflare Pages**: https://pages.cloudflare.com
- **AWS Amplify**: https://aws.amazon.com/amplify

### 6. Connect Custom Domain
1. Purchase domain from Namecheap, GoDaddy, or Cloudflare
2. In your hosting platform (Vercel/Netlify), add custom domain
3. Update DNS records as instructed
4. Update domain in `app/sitemap.ts` and `public/robots.txt`

### 7. Add Analytics
```bash
# Install Google Analytics
npm install @next/third-parties
```

Add to `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## Customization Tips

### Change Company Name
Search and replace "BuildPro" across all files:
```bash
# In the project directory
grep -r "BuildPro" app/ components/
```

### Update Metadata for SEO
Each page has its own metadata. Update titles and descriptions in:
- `app/layout.tsx` (global metadata)
- `app/services/page.tsx`
- `app/portfolio/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`

### Add New Pages
```bash
# Create new page directory
mkdir app/new-page

# Create page file
touch app/new-page/page.tsx
```

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Build errors:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Styling issues:**
```bash
# Rebuild Tailwind
npm run dev
```

## Support

For questions or issues:
1. Check the main README.md file
2. Review Next.js documentation: https://nextjs.org/docs
3. Review Tailwind CSS documentation: https://tailwindcss.com/docs

## Project Structure Reference

```
builder_website/
├── app/                    # Pages and routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # SEO sitemap
│   └── manifest.ts        # PWA manifest
├── components/            # Reusable components
│   ├── Navigation.tsx     # Header
│   └── Footer.tsx         # Footer
├── public/                # Static files
│   ├── images/           # Image assets
│   └── robots.txt        # SEO robots
└── package.json          # Dependencies
```

---

**Website successfully built and running!** 🎉

Visit http://localhost:3000 to see it in action!
