# Kaho Tsang Portfolio

A modern, responsive portfolio website showcasing Kaho Tsang's skills, experience, and projects.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Animated elements that fade in as you scroll
- Interactive skill bars
- Project modal windows
- Contact form with validation
- Modern, clean UI with teal/navy color scheme

## Setup Instructions

1. **Clone or download this repository**

2. **Add your images**
   - Place your headshot at `images/headshot.jpg`
   - Add project images at `images/project-X.png` and thumbnails at `images/project-X-thumb.png`
   - See `images/placeholder.txt` for more details

3. **Customize content**
   - Edit `index.html` to update your personal information, experience, skills, and projects
   - Update social media links in the footer
   - Update contact information in the contact section

4. **Testing locally**
   - Open `index.html` in your web browser to preview the site
   - For best results, use a local server (e.g., Live Server extension in VS Code)

5. **Deployment**
   - Deploy to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Customization

### Colors
- Edit the CSS variables in `styles.css` to change the color scheme:
  ```css
  :root {
      --primary-accent: #008080; /* Teal accent color */
      --dark-navy: #1f2d47;      /* Dark blue for text and backgrounds */
      /* Other colors... */
  }
  ```

### Fonts
- The site uses Google Fonts (Inter and Poppins)
- Change fonts by updating the link in `<head>` and the font-family in CSS

### Projects
- Update project cards in the HTML to showcase your own work
- Be sure to update the data attributes for the modal functionality

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/) (Inter & Poppins)
- Smooth scroll functionality
- Intersection Observer API for animations

## License

This project is available for personal use.

---

© 2025 Kaho Tsang 