import { useEffect } from 'react'
import { flushSync } from 'react-dom'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { Header, Sidebar, FooterNavigation, SearchModal, BackToTop } from './index'
import { NAVIGATION_ITEMS } from './constants/navigation'
import { useAppStore } from './store/useAppStore'
import ComponentsPage from './pages/ComponentsPage'
import ButtonOverview from './pages/ButtonOverview'
import InputOverview from './pages/InputOverview'
import CheckboxOverview from './pages/CheckboxOverview'
import SwitchOverview from './pages/SwitchOverview'
import RadioOverview from './pages/RadioOverview'
import SelectOverview from './pages/SelectOverview'
import CalendarOverview from './pages/CalendarOverview'
import ToastOverview from './pages/ToastOverview'
import NumberInputOverview from './pages/NumberInputOverview';
import ModalOverview from './pages/ModalOverview';
import DropdownOverview from './pages/DropdownOverview';
import PopoverOverview from './pages/PopoverOverview';
import ComboboxOverview from './pages/ComboboxOverview';
import DatePickerOverview from './pages/DatePickerOverview';
import Introduction from './pages/Introduction';
import Quickstart from './pages/Quickstart';
import TabsOverview from './pages/TabsOverview';
import BreadcrumbOverview from './pages/BreadcrumbOverview';
import NavbarOverview from './pages/NavbarOverview';
import TableOverview from './pages/TableOverview';
import CardOverview from './pages/CardOverview';
import BadgeOverview from './pages/BadgeOverview';
import AvatarOverview from './pages/AvatarOverview';
import SkeletonOverview from './pages/SkeletonOverview';
import ProgressOverview from './pages/ProgressOverview';
import AlertOverview from './pages/AlertOverview';
import TooltipOverview from './pages/TooltipOverview';
import DrawerOverview from './pages/DrawerOverview';
import AlertDialogOverview from './pages/AlertDialogOverview';
import ScheduleCalendarOverview from './pages/ScheduleCalendarOverview';


import Overview from './pages/Overview';
function App() {
  const {
    theme,
    setTheme,
    isSidebarOpen,
    setSidebarOpen,
    setSearchOpen,
  } = useAppStore()

  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  

  // Derive active title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'MyUI';
    if (path === '/components') return 'Components';
    const parts = path.split('/');
    if (parts.length > 2) {
      const pageName = parts[parts.length - 1];
      return pageName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'MyUI';
  };

  const activePageTitle = getPageTitle();

  const handleThemeToggle = (event?: React.MouseEvent) => {
    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return;
    }

    const x = event?.clientX ?? window.innerWidth;
    const y = event?.clientY ?? 0;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty('--reveal-x', `${x}px`);
    document.documentElement.style.setProperty('--reveal-y', `${y}px`);
    document.documentElement.style.setProperty('--reveal-radius', `${radius}px`);

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      });
    });

    transition.finished.finally(() => {
      // Clean up if needed
    });
  };


  return (
    <div className="bg-background min-h-dvh font-sans text-foreground selection:bg-indigo-100 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 flex transition-colors duration-300 relative">
      <Toaster position="top-center" richColors theme={theme} closeButton />
      <AnimatePresence mode="popLayout">
        {!isHomePage && (
          <motion.div
            layout
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="z-40 fixed h-full"
          >
            <Sidebar
              items={NAVIGATION_ITEMS}
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div id="main-scroll-area" className={`flex-1 flex flex-col min-h-dvh w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-x-hidden ${isHomePage ? 'pl-0' : (isSidebarOpen ? 'lg:pl-72' : 'lg:pl-20')}`}>
        <Header
          title={activePageTitle}
          onMenuClick={!isHomePage ? () => setSidebarOpen(!isSidebarOpen) : undefined}
          isSidebarOpen={isSidebarOpen}
          isHomePage={isHomePage}
          theme={theme}
          onThemeToggle={(e) => handleThemeToggle(e)}
          onLogoClick={() => {
            navigate('/');
            setSidebarOpen(false);
          }}
          onDocsClick={() => {
            navigate('/introduction');
            setSidebarOpen(true);
          }}
          onComponentsClick={() => {
            navigate('/components');
            setSidebarOpen(true);
          }}
          onSearch={() => setSearchOpen(true)}
        />

        <main className={`flex-1 p-4 sm:p-6 lg:p-8 mt-8 max-w-[1600px] w-full mx-auto relative overflow-hidden transition-all duration-500  ${isHomePage ? 'pt-[88px]' : 'pt-20'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <Routes location={location}>
                <Route path="/" element={<Overview />} />
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/quickstart" element={<Quickstart />} />
                <Route path="/components" element={<ComponentsPage />} />
                <Route path="/components/button" element={<ButtonOverview />} />
                <Route path="/components/input" element={<InputOverview />} />
                <Route path="/components/select" element={<SelectOverview />} />
                <Route path="/components/checkbox" element={<CheckboxOverview />} />
                <Route path="/components/switch" element={<SwitchOverview />} />
                <Route path="/components/radio" element={<RadioOverview />} />
                <Route path="/components/calendar" element={<CalendarOverview />} />
                <Route path="/components/toast" element={<ToastOverview />} />
                <Route path="/components/number-input" element={<NumberInputOverview />} />
                <Route path="/components/modal" element={<ModalOverview />} />
                <Route path="/components/dropdown" element={<DropdownOverview />} />
                <Route path="/components/popover" element={<PopoverOverview />} />
                <Route path="/components/combobox" element={<ComboboxOverview />} />
                <Route path="/components/date-picker" element={<DatePickerOverview />} />
                <Route path="/components/schedule-calendar" element={<ScheduleCalendarOverview />} />
                <Route path="/components/tabs" element={<TabsOverview />} />
                <Route path="/components/breadcrumb" element={<BreadcrumbOverview />} />
                <Route path="/components/navbar" element={<NavbarOverview />} />
                <Route path="/components/table" element={<TableOverview />} />
                <Route path="/components/card" element={<CardOverview />} />
                <Route path="/components/badge" element={<BadgeOverview />} />
                <Route path="/components/avatar" element={<AvatarOverview />} />
                <Route path="/components/drawer" element={<DrawerOverview />} />
                <Route path="/components/alert-dialog" element={<AlertDialogOverview />} />
                <Route path="/components/skeleton" element={<SkeletonOverview />} />
                <Route path="/components/progress" element={<ProgressOverview />} />
                <Route path="/components/alert" element={<AlertOverview />} />
                <Route path="/components/tooltip" element={<TooltipOverview />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {location.pathname.startsWith('/components/') && (
                <FooterNavigation />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <SearchModal />
      <BackToTop />
    </div>
  )
}

export default App
