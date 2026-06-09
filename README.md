# Dr. Shaan Sherif - Professional Portfolio

A luxury, full-stack ready portfolio website built with React + Vite.

## Features

- **Professional Design**: Elegant gravity-themed animations with gold accents
- **Component Architecture**: Modular structure with separated components
- **Data-Driven Content**: All content extracted to centralized data files
- **Full-Stack Ready**: Contact form prepared for backend integration
- **Responsive**: Mobile-first design that adapts to all screen sizes
- **Performance Optimized**: Built with Vite for fast loading and development

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── components/             # Reusable UI components
│   ├── GravityCanvas.jsx   # Animated gravity canvas background
│   ├── Nav.jsx             # Navigation bar
│   └── PhotoPlaceholder.jsx # Profile photo with placeholder support
├── data/                   # Content data files
│   └── content.js          # All website content (profile, ventures, etc.)
├── hooks/                  # Custom React hooks
│   └── useReveal.js        # Scroll reveal animation hook
└── assets/                 # Static assets (images, etc.)
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Adding Your Professional Photo

1. Place your photo in `public/images/` directory (e.g., `profile.jpg`)
2. Open `src/App.jsx`
3. Find the `About` component
4. Update the `PHOTO_URL` variable:
   ```javascript
   const PHOTO_URL = "/images/profile.jpg";
   ```

Alternatively, you can use an external URL:
```javascript
const PHOTO_URL = "https://example.com/your-photo.jpg";
```

## Full-Stack Integration

### Contact Form Backend

The contact form is ready for backend integration. To connect it to your API:

1. Create an endpoint at `/api/contact` on your server
2. The form sends a POST request with JSON body:
   ```json
   {
     "name": "John Doe",
     "org": "Organization Name",
     "email": "john@example.com",
     "subject": "Inquiry Subject",
     "message": "Message content..."
   }
   ```

3. Update the `handleSubmit` function in the `Contact` component if needed

### Example Backend (Node.js/Express)

```javascript
app.post('/api/contact', async (req, res) => {
  const { name, org, email, subject, message } = req.body;
  
  // Process the inquiry (send email, save to database, etc.)
  await sendEmail({ to: 'contact@drshaansherif.com', subject, body: message });
  
  res.json({ success: true });
});
```

## Customization

### Updating Content

All content is stored in `src/data/content.js`. Edit this file to update:
- Profile information
- Bio text
- Ventures
- Innovations/Patents
- Recognition/Awards
- Publications
- Contact information

### Styling

Global styles are defined in the `Styles` component within `App.jsx`. CSS variables allow easy theming:
- `--gold`: Primary accent color
- `--cream`: Text color
- `--ink`: Background color
- Font families and sizes

## Technologies Used

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Canvas API**: Gravity animation
- **Intersection Observer**: Scroll reveal animations
- **CSS Variables**: Theming system

## License

© 2024 Dr. Shaan Sherif. All rights reserved.
