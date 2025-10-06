import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { IncidentsView } from './components/IncidentsView'
import { IntelligenceView } from './components/IntelligenceView'
import { ReportsView } from './components/ReportsView'
import { SearchView } from './components/SearchView'
import { ARVRView } from './components/ARVRView'
import { SettingsView } from './components/SettingsView'
import { NavigationProvider, useNavigation } from './components/NavigationContext'

function AppContent() {
  const { activeSection } = useNavigation()

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'incidents':
        return <IncidentsView />
      case 'intelligence':
        return <IntelligenceView />
      case 'upload':
        return <Dashboard /> // Show dashboard with upload focus
      case 'search':
        return <SearchView />
      case 'reports':
        return <ReportsView />
      case 'arvr':
        return <ARVRView />
      case 'settings':
        return <SettingsView />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-70 pt-18 p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}