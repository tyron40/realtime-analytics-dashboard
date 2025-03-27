# Real-time Analytics Dashboard

A modern, interactive dashboard for visualizing real-time analytics data with customizable widgets and live updates.

![screencapture-lucent-cobbler-fea903-netlify-app-2025-03-27-17_23_10](https://github.com/user-attachments/assets/18b1d2c3-bf83-4b87-b9bc-83ec6a6a8c5d)
![screencapture-lucent-cobbler-fea903-netlify-app-widgets-2025-03-27-17_23_29](https://github.com/user-attachments/assets/c2a43514-ea70-4362-b838-3136355143dc)
![screencapture-lucent-cobbler-fea903-netlify-app-settings-2025-03-27-17_23_45](https://github.com/user-attachments/assets/427650c6-13ba-4abe-826c-fe90db70b655)


## Features

- **Real-time Data Updates**: Live data visualization with WebSocket integration
- **Customizable Dashboard**: Add, remove, and configure widgets based on your needs
- **Multiple Widget Types**: Charts, metrics, tables, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme Support**: Choose your preferred visual style
- **Multiple Layouts**: Save and switch between different dashboard configurations

## Tech Stack

- **Vue 3**: Frontend framework with Composition API
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive charts and graphs
- **Socket.io**: Real-time WebSocket communication
- **Pinia**: State management
- **Vue Router**: Navigation and routing
- **Vite**: Fast development and building

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/realtime-analytics-dashboard.git
   cd realtime-analytics-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Vue components
│   │   ├── layout/      # Layout components
│   │   └── widgets/     # Dashboard widgets
│   ├── router/          # Vue Router configuration
│   ├── services/        # API and WebSocket services
│   ├── stores/          # Pinia stores
│   ├── types/           # TypeScript type definitions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Available Widgets

1. **Chart Widget**: Visualize data with line, bar, pie, or doughnut charts
2. **Metric Widget**: Display single metrics with icons and color coding
3. **Table Widget**: Show tabular data with sorting capabilities
4. **Map Widget**: Display geographical data (coming soon)
5. **Custom Widget**: Create your own widget types

## Data Sources

The dashboard currently uses simulated data for demonstration purposes. In a production environment, you would connect to your actual data sources via WebSockets or REST APIs.

To connect to a real data source:

1. Update the WebSocket URL in `src/services/socketService.ts`
2. Modify the data handling logic to match your data structure
3. Update widget configurations to use your data sources

## Customization

### Adding New Widgets

1. Navigate to the Widget Gallery page
2. Select a widget type
3. Configure the widget settings
4. Click "Add Widget to Dashboard"

### Creating Custom Layouts

1. Go to the Settings page
2. Enter a name for your new layout
3. Click "Create Layout"
4. Arrange widgets as desired
5. Save your layout

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Socket.io](https://socket.io/)
