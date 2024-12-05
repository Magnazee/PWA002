# Voice Rainbow PWA

A voice-enabled Progressive Web App that brings colors to life through speech synthesis. This project is an evolution of the Rainbow Hello World PWA, adding voice interaction to create a more immersive and accessible experience.

## Features

- **Color-changing Text**: Click the text to cycle through ROYGBIV colors
- **Voice Synthesis**: Each color speaks its name with a unique voice personality
- **Interactive Background**: Click anywhere on the background to toggle between black and white
- **Visual Feedback**: Speaking indicator shows when the app is actively speaking
- **Accessibility**: Full keyboard navigation and screen reader support
- **PWA Capabilities**: 
  - Installable on desktop and mobile devices
  - Works offline
  - Full-screen mode
  - Automatic updates

## Technical Details

### Built With
- React 18
- TypeScript
- Vite
- vite-plugin-pwa
- Tailwind CSS
- Web Speech API

### Voice Personalities
Each color has a unique voice configuration:
- Red: Standard voice with neutral pitch and rate
- Orange: Slightly higher pitch with slower rate
- Yellow: High pitch with faster rate
- Green: Lower pitch with slower rate
- Blue: Deep voice with slow rate
- Indigo: Lowest pitch with slowest rate
- Violet: High pitch with fastest rate

## Development

### Prerequisites
- Node.js (LTS version recommended)
- npm

### Installation
1. Clone the repository
\`\`\`bash
git clone [repository-url]
cd PWA002
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start development server
\`\`\`bash
npm run dev
\`\`\`

### Building
Build the production version:
\`\`\`bash
npm run build
\`\`\`

Preview the production build:
\`\`\`bash
npm run preview
\`\`\`

## Deployment
The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Browser Support
- Chrome/Edge (Recommended for best voice synthesis support)
- Firefox
- Safari (Limited voice synthesis support)
- Mobile browsers with Web Speech API support

## Accessibility
- High contrast color combinations
- Keyboard navigation
- ARIA labels and roles
- Screen reader compatibility
- Voice feedback

## Known Issues
- Voice synthesis support varies by browser
- Some mobile browsers have limited PWA support
- Voice synthesis may not work offline on all platforms

## Future Improvements
- Add voice recognition for hands-free color changes
- Implement additional voice customization options
- Add animation transitions between colors
- Support for multiple languages
- Save user voice preferences
- Add haptic feedback on mobile devices

## License
MIT