/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab } from './types';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { DepartmentListPage } from './pages/DepartmentListPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { PlacementPage } from './pages/PlacementPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { CampusPage } from './pages/CampusPage';
import { NaacPage } from './pages/NaacPage';
import { CommitteesPage } from './pages/CommitteesPage';
import { ContactPage } from './pages/ContactPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { AdminDataProvider } from './context/AdminDataContext';
import { FloatingHomeButton } from './components/common/FloatingHomeButton';
import { ExplodedWebsiteView } from './components/common/ExplodedWebsiteView';
import { VisianAiBot } from './components/common/VisianAiBot';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [isExplodedViewOpen, setIsExplodedViewOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return (
        path.includes('explode') ||
        path.includes('exlodview') ||
        hash.includes('explode') ||
        hash.includes('exlodview')
      );
    }
    return false;
  });
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(undefined);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  // Sync /exlodview & /explode routes
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path.includes('explode') ||
        path.includes('exlodview') ||
        hash.includes('explode') ||
        hash.includes('exlodview')
      ) {
        setIsExplodedViewOpen(true);
      }
    };
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  // Sync hash routing & anchor scroll
  useEffect(() => {
    if (activeAnchor) {
      setTimeout(() => {
        const el = document.getElementById(activeAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentTab, selectedDepartmentId, activeAnchor]);

  const handleTabChange = (tab: NavigationTab, anchorId?: string, departmentId?: string) => {
    setCurrentTab(tab);
    setActiveAnchor(anchorId);
    if (departmentId) {
      setSelectedDepartmentId(departmentId);
    } else if (tab !== 'department') {
      setSelectedDepartmentId(null);
    }
  };

  const handleSelectDepartment = (id: string) => {
    setCurrentTab('department');
    setSelectedDepartmentId(id);
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage
            onTabChange={handleTabChange}
            onOpenExplodedView={() => setIsExplodedViewOpen(true)}
          />
        );

      case 'about':
        return <AboutPage initialAnchor={activeAnchor || 'vision'} />;

      case 'admissions':
        return <AdmissionsPage initialAnchor={activeAnchor || 'eligibility-ug'} />;

      case 'department':
        if (selectedDepartmentId) {
          return (
            <DepartmentDetailPage
              departmentId={selectedDepartmentId}
              onBack={() => setSelectedDepartmentId(null)}
              onNavigateAdmission={handleTabChange}
            />
          );
        }
        return <DepartmentListPage onSelectDepartment={handleSelectDepartment} />;

      case 'placement':
        return <PlacementPage />;

      case 'facilities':
        return <FacilitiesPage />;

      case 'campus':
        return <CampusPage />;

      case 'naac':
        return <NaacPage initialView="naac" />;

      case 'iqac':
        return <NaacPage initialView="iqac" />;

      case 'committees':
        return <CommitteesPage />;

      case 'contact':
        return <ContactPage />;

      case 'notifications':
        return <NotificationsPage onNavigateAdmission={() => handleTabChange('admissions')} />;

      case 'admin':
        return <AdminPortalPage onNavigate={handleTabChange} />;

      default:
        return <HomePage onTabChange={handleTabChange} />;
    }
  };

  return (
    <AdminDataProvider>
      <div className="min-h-screen bg-[#FFFFFF] text-[#0A2540] font-sans selection:bg-[#FF6B00] selection:text-white flex flex-col justify-between">
        <div>
          {/* Top Contact & Utility Bar */}
          <TopBar onNavigate={handleTabChange} currentTab={currentTab} />

          {/* Global Sticky Main Navigation Bar - Always visible at top of viewport across all pages */}
          <header 
            className="sticky top-0 z-[999] w-full bg-white shadow-md transition-shadow duration-300"
            style={{ position: 'sticky', top: 0, zIndex: 999 }}
          >
            <Navbar currentTab={currentTab} onTabChange={handleTabChange} />
          </header>

          {/* Main View Page with Seamless Motion Transition */}
          <main className="transition-all duration-200 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab + (selectedDepartmentId || '')}
                initial={{ opacity: 0, y: 10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.995 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {renderCurrentView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Global Layout Footer */}
        <Footer onTabChange={handleTabChange} />

        {/* Cute Visian AI Campus Assistant Bot - Floating across entire website */}
        <VisianAiBot onNavigate={handleTabChange} />

        {/* Global Persistent Floating Home Button - Always visible across all pages */}
        <FloatingHomeButton
          currentTab={currentTab}
          onNavigateHome={() => handleTabChange('home')}
        />

        {/* Full Interactive 3D Exploded Architecture View Modal */}
        <AnimatePresence>
          {isExplodedViewOpen && (
            <ExplodedWebsiteView
              onClose={() => {
                setIsExplodedViewOpen(false);
                if (
                  typeof window !== 'undefined' &&
                  (window.location.hash.includes('explode') ||
                    window.location.hash.includes('exlodview'))
                ) {
                  window.history.pushState(null, '', window.location.pathname);
                }
              }}
              onNavigateSection={(tab, anchorId) => {
                setIsExplodedViewOpen(false);
                handleTabChange(tab, anchorId);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminDataProvider>
  );
}
