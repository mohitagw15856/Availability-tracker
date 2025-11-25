# Team Availability Tracker

A modern, responsive team leave management system with Confluence integration capabilities.

## Features

- 📊 **Dashboard Analytics** - Visual charts showing leave trends and team availability
- 📝 **Easy Leave Entry** - Simple form for adding sick and planned leaves
- 📅 **Calendar View** - Monthly calendar showing who's on leave
- 🔄 **Confluence Integration** - Sync with your team's Confluence calendar
- 📥 **CSV Export** - Download leave data for external reporting
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Vercel account (free tier works)
- Optional: Confluence/Atlassian account for integration

## Deployment to Vercel

### Method 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory**
   ```bash
   cd team-tracker-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project?: No
   - Project name: team-availability-tracker (or your choice)
   - Directory: ./
   - Override settings?: No

5. **Set Environment Variables (Optional)**
   ```bash
   vercel env add CONFLUENCE_API_URL
   vercel env add CONFLUENCE_API_TOKEN
   ```

### Method 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project (defaults work fine)
   - Add environment variables in Settings → Environment Variables
   - Click "Deploy"

### Method 3: Direct Upload

1. **Build the project**
   ```bash
   npm install
   npm run build
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Choose "Upload Folder"
   - Upload the entire project folder
   - Configure and deploy

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
CONFLUENCE_API_URL=https://your-domain.atlassian.net
CONFLUENCE_API_TOKEN=your_api_token_here
```

### Confluence Integration Setup

1. **Get API Token**
   - Log into Confluence
   - Go to Account Settings → Security → API Tokens
   - Create new token
   - Copy the token

2. **Configure in App**
   - Go to Settings tab
   - Enter your Confluence URL
   - Paste API token
   - Click Connect

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
team-tracker-app/
├── app/
│   ├── api/
│   │   └── confluence/
│   │       └── sync/
│   │           └── route.js    # API endpoint for Confluence sync
│   ├── globals.css              # Global styles
│   ├── layout.js                # App layout
│   └── page.js                  # Main application
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind CSS config
└── vercel.json                  # Vercel deployment config
```

## Features in Detail

### Dashboard
- Real-time statistics cards
- Monthly leave distribution chart
- Leave type pie chart
- 7-day availability forecast

### Leave Management
- Add/delete leave entries
- Assign coverage persons
- Track leave status
- Support for half-day leaves

### Confluence Sync
- Bi-directional synchronization
- Auto-sync capabilities
- Manual sync option
- Conflict resolution

### Data Export
- CSV export functionality
- Formatted reports for management
- Historical data tracking

## Troubleshooting

### Common Issues

1. **Build fails on Vercel**
   - Check Node.js version (needs 18+)
   - Verify all dependencies are listed in package.json
   - Check for any hardcoded localhost URLs

2. **Confluence sync not working**
   - Verify API token is valid
   - Check Confluence URL format
   - Ensure proper permissions on Confluence

3. **Data not persisting**
   - Data is stored in browser localStorage
   - For production, consider adding a database

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email notifications
- [ ] Slack integration
- [ ] Google Calendar sync
- [ ] Advanced reporting features
- [ ] Team approval workflow
- [ ] Mobile app

## Support

For issues or questions, please create an issue in the GitHub repository.

## License

MIT License - feel free to use this for your team!
