# Links Vault

A web application for managing and organizing your links. Built with React and TypeScript.

## What It Does

Links Vault allows you to store, search, and manage your important links in one place. All data is stored locally in your browser.

### Features

- Add, edit, and delete links
- Search across titles, URLs, descriptions, and tags
- Organize links with custom tags
- Sort links by date or title
- Export your links as JSON
- Import previously exported links
- Real-time input validation
- Responsive design for all devices

## Technologies Used

- React 18
- TypeScript
- CSS3
- Local Storage API
- React Icons

## Installation

Clone the repository:

```bash
git clone https://github.com/OrineaTovhakale/links-vault-app.git
```

Navigate to the project directory:

```bash
cd links-vault-app
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at http://localhost:3000

## Building for Production

Create a production build:

```bash
npm run build
```

The build files will be in the `build` folder.

## Project Structure

```
src/
├── components/         React components
│   ├── ConfirmModal/   Delete confirmation dialog
│   ├── EmptyState/     Empty state displays
│   ├── LinkForm/       Form for adding/editing links
│   ├── LinkList/       Display grid of link cards
│   ├── SearchBar/      Search input
│   ├── Toast/          Notification system
│   └── Toolbar/        Sort and export/import controls
├── constants/          Application constants
├── hooks/              Custom React hooks
├── utils/              Helper functions
│   ├── validation.ts   Input validation
│   ├── linkUtils.ts    Export/import/sort logic
│   └── accessibility.ts Accessibility helpers
├── types/              TypeScript interfaces
├── App.tsx             Main application
├── App.css             Styles
└── index.tsx           Entry point
```

## Usage

### Adding a Link

1. Click "Add a Link"
2. Fill in the title (required) and URL (required)
3. Optionally add a description and tags (comma-separated)
4. Click "Save Link"

### Managing Links

- View all links by clicking "View All Links"
- Search by clicking "Search Links" and typing
- Sort using the dropdown in the toolbar
- Edit or delete links using the buttons on each card
- Click tags to filter links

### Export and Import

- Export: Click the "Export" button to download all links as JSON
- Import: Click "Import" and select a JSON file

## Requirements

- Node.js version 14 or higher
- npm or yarn

## Browser Support

Works on all modern browsers including Chrome, Firefox, Safari, and Edge.

## Data Storage

All links are stored in your browser's local storage. Data persists between sessions but is specific to each browser and device.

## License

MIT License - see LICENSE file for details.

## Author

Orinea Tovhakale