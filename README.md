# DSA Formatter

A React TypeScript application for formatting and generating reports from DSA (Direct School Admission) student data.

## Features

- 📊 CSV file upload and parsing
- 🔍 Advanced search and filtering
- 📋 Student list management
- 📄 Individual student reports (PDF, HTML)
- 📊 Bulk export functionality (Excel, PDF, HTML)
- 🌙 Dark/Light mode toggle
- 📱 Responsive design

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to main

3. **Your app will be available at**:
   `https://[your-username].github.io/dsa-formatter/`

### Manual Deployment

If you prefer manual deployment:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

## Project Structure

```
dsa-formatter/
├── src/
│   ├── components/          # React components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions workflows
└── dist/                   # Production build (generated)
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **XLSX** for Excel file handling
- **Fontsource** for custom fonts

## License

MIT
