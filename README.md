# The Next Role - PM Career Coaching Website

A Next.js website for The Next Role, a career coaching business focused on helping aspiring and current Product Managers land their dream roles.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd the-next-role
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
the-next-role/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with Header/Footer
│   │   ├── page.tsx        # Homepage
│   │   ├── globals.css     # Global styles & Tailwind
│   │   ├── about/
│   │   │   └── page.tsx    # About page
│   │   └── services/
│   │       └── page.tsx    # Services & pricing page
│   └── components/
│       ├── Header.tsx      # Navigation header
│       └── Footer.tsx      # Site footer
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Pages

- **/** - Homepage with hero, value props, services preview, and CTAs
- **/services** - Full pricing table with all service offerings
- **/about** - Founder story and background

## Customization

### Calendly Integration
Replace `https://calendly.com` links throughout the codebase with your actual Calendly booking URL.

### Social Links
Update social media links in `src/components/Footer.tsx`.

### Colors
Customize the color palette in `tailwind.config.ts`. The site uses:
- `primary` - Blues for trust and professionalism
- `accent` - Purple/magenta for highlights

### Content
All content is in the page files. Update:
- `src/app/page.tsx` - Homepage content
- `src/app/about/page.tsx` - Your story and credentials
- `src/app/services/page.tsx` - Services and pricing

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Inter Font** - Typography

## Future Enhancements

- Calendly embed integration
- Stripe payment integration
- Blog/content section
- Client portal
- Testimonials management
