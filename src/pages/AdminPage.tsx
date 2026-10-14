import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Plus, Trash2, Edit3, Eye, Download, Upload, 
  Lock, LogOut, Check, X, 
  Search, ExternalLink, Image as ImageIcon, Users, 
  FolderKanban, Camera, Database, Sparkles, AlertTriangle
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { CATEGORIES, type Project, type ProjectCategory } from '../data/projects';
import type { TeamMember } from '../data/team';
import type { FakarolaItem } from '../data/fakarola';
import PageTransition from '../components/PageTransition';

type AdminTab = 'projects' | 'team' | 'fakarola' | 'backup';

export default function AdminPage() {
  const { 
    projects, addProject, updateProject, deleteProject, resetProjects,
    teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, resetTeam,
    fakarolaItems, addFakarolaItem, updateFakarolaItem, deleteFakarolaItem, resetFakarola,
    resetAll, exportBackup, importBackup,
    isCloudConnected, syncToCloud, uploadMedia
  } = useData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mdterra_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');

  // Search & Filter
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Modals state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [isCreatingTeamMember, setIsCreatingTeamMember] = useState(false);

  const [editingFakarola, setEditingFakarola] = useState<FakarolaItem | null>(null);
  const [isCreatingFakarola, setIsCreatingFakarola] = useState(false);

  // Delete Confirmation Modal
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'project' | 'team' | 'fakarola' | 'reset-all';
    id?: number | string;
    name?: string;
  } | null>(null);

  // Notification Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes accepted: mdterra, admin, mdterra2026
    if (passcode === 'mdterra' || passcode === 'admin' || passcode === 'mdterra2026') {
      setIsAuthenticated(true);
      localStorage.setItem('mdterra_admin_auth', 'true');
      setAuthError(false);
      showToast('Welcome to Mdterra Studio Admin');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mdterra_admin_auth');
    showToast('Signed out of Admin');
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = projectSearch === '' || 
        p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        (p.location && p.location.toLowerCase().includes(projectSearch.toLowerCase())) ||
        (p.year && p.year.includes(projectSearch));
      const matchesCategory = selectedCategoryFilter === 'All' || 
        p.categories.includes(selectedCategoryFilter as ProjectCategory);
      return matchesSearch && matchesCategory;
    });
  }, [projects, projectSearch, selectedCategoryFilter]);

  // Handle JSON Backup Download
  const handleExportJson = () => {
    const jsonStr = exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mdterra-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Database backup downloaded successfully');
  };

  // Handle JSON Import
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importBackup(content);
        if (success) {
          showToast('Data imported successfully!');
        } else {
          alert('Failed to parse backup JSON. Please check file format.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Helper for image upload (Supabase Storage with Base64 fallback)
  const handleImageFileToBase64 = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    callback: (imageUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isCloudConnected) {
      showToast('Uploading image to Supabase Storage...');
      const cloudUrl = await uploadMedia(file);
      if (cloudUrl) {
        callback(cloudUrl);
        showToast('Image uploaded successfully to Supabase Storage!');
        return;
      }
      showToast('Cloud storage upload failed, falling back to local encoding');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // ─────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-bg-primary flex flex-col justify-center items-center px-4 py-20">
          <div className="w-full max-w-md bg-white border border-border p-8 sm:p-10 rounded-sm shadow-xl relative overflow-hidden">
            {/* Top Accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <img 
                  alt="Mdterra Architecture" 
                  className="h-12 w-auto mx-auto" 
                  src="/images/logo.png" 
                />
              </Link>
              <p className="text-label text-accent tracking-[0.25em] mb-1">STUDIO CMS</p>
              <h1 className="text-heading-2 text-text-primary">Admin Access</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-label text-text-muted mb-2 uppercase tracking-wider">
                  Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => { setPasscode(e.target.value); setAuthError(false); }}
                    placeholder="Enter studio passcode..."
                    className={`w-full px-4 py-3 bg-bg-tertiary border text-body text-text-primary rounded-sm focus:outline-none transition-colors ${
                      authError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                    }`}
                    autoFocus
                  />
                  <Lock className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                </div>
                {authError && (
                  <p className="text-xs text-red-500 mt-2">
                    Invalid passcode. (Hint: default passcode is <code className="bg-red-50 px-1 py-0.5 rounded">mdterra</code>)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-accent text-white font-medium text-label hover:bg-accent-alt transition-colors duration-300 rounded-sm uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Enter Studio</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link to="/" className="text-label text-text-muted hover:text-accent transition-colors">
                  ← Return to public website
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageTransition>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-primary pt-28 pb-32">
        {/* Floating Toast Notification */}
        {toast && createPortal(
          <div className="fixed bottom-6 right-6 z-[9999] bg-bg-secondary text-white px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 border border-white/20 animate-fade-in text-body-sm">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>,
          document.body
        )}

        <div className="container-main">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm ${
                  isCloudConnected 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
                    : 'bg-amber-50 border border-amber-200 text-amber-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isCloudConnected ? 'Supabase Connected' : 'Local Storage Mode'}
                </span>
                <span className="text-label text-accent tracking-[0.2em]">Mdterra Studio</span>
              </div>
              <h1 className="text-heading-1 text-text-primary">Admin Control Panel</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-border text-label text-text-primary hover:border-accent hover:text-accent transition-colors duration-200 rounded-sm flex items-center gap-2"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-border text-label text-text-muted hover:text-red-600 hover:border-red-300 transition-colors duration-200 rounded-sm flex items-center gap-2"
                title="Log out of Admin"
              >
                <span>Sign Out</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-border/60">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-3 rounded-sm text-label uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                activeTab === 'projects'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-bg-tertiary text-text-muted hover:text-text-primary hover:bg-border/20'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`px-5 py-3 rounded-sm text-label uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                activeTab === 'team'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-bg-tertiary text-text-muted hover:text-text-primary hover:bg-border/20'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team & Office ({teamMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('fakarola')}
              className={`px-5 py-3 rounded-sm text-label uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                activeTab === 'fakarola'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-bg-tertiary text-text-muted hover:text-text-primary hover:bg-border/20'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Fakarola Photo Dump ({fakarolaItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-5 py-3 rounded-sm text-label uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                activeTab === 'backup'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-bg-tertiary text-text-muted hover:text-text-primary hover:bg-border/20'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Backup & Tools</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────
              TAB 1: PROJECTS MANAGEMENT
             ───────────────────────────────────────────────────────── */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fade-in">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Search */}
                  <div className="relative min-w-[260px] max-w-sm flex-1">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-bg-tertiary border border-border text-body-sm text-text-primary rounded-sm focus:outline-none focus:border-accent"
                    />
                    <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    {projectSearch && (
                      <button 
                        onClick={() => setProjectSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-2.5 bg-bg-tertiary border border-border text-label text-text-primary rounded-sm focus:outline-none focus:border-accent"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Add button */}
                <button
                  onClick={() => setIsCreatingProject(true)}
                  className="px-5 py-2.5 bg-accent text-white font-medium text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt transition-colors duration-200 flex items-center justify-center gap-2 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="group bg-white border border-border rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] bg-bg-tertiary overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {project.year && (
                            <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono rounded-sm">
                              {project.year}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.categories.slice(0, 2).map((cat) => (
                            <span 
                              key={cat} 
                              className="text-[10px] uppercase font-mono px-2 py-0.5 bg-accent/10 text-accent rounded-sm border border-accent/20"
                            >
                              {cat}
                            </span>
                          ))}
                          {project.categories.length > 2 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 text-text-muted">
                              +{project.categories.length - 2}
                            </span>
                          )}
                        </div>

                        <h3 className="text-body font-bold text-text-primary line-clamp-1 mb-1">
                          {project.title}
                        </h3>

                        {project.location && (
                          <p className="text-label text-text-muted text-[11px] mb-3">
                            {project.location}
                          </p>
                        )}

                        <p className="text-body-sm text-text-secondary/70 line-clamp-2 text-xs">
                          {project.subtitle || project.description?.[0] || 'No summary provided.'}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-5 py-3 border-t border-border bg-bg-tertiary/40 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-mono">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{(project.galleryImages?.length || 0) + 1} imgs</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/projects/${project.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-text-muted hover:text-accent transition-colors"
                          title="Preview project page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-1.5 text-text-muted hover:text-accent transition-colors"
                          title="Edit project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({ type: 'project', id: project.id, name: project.title })}
                          className="p-1.5 text-text-muted hover:text-red-600 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-24 border border-dashed border-border rounded-sm">
                  <p className="text-heading-3 text-text-muted mb-2">No projects found</p>
                  <p className="text-body-sm text-text-muted mb-6">Try clearing your search query or filter</p>
                  <button
                    onClick={() => { setProjectSearch(''); setSelectedCategoryFilter('All'); }}
                    className="px-4 py-2 border border-accent text-accent text-label uppercase tracking-wider rounded-sm hover:bg-accent hover:text-white transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 2: TEAM & OFFICE MANAGEMENT
             ───────────────────────────────────────────────────────── */}
          {activeTab === 'team' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-heading-2 text-text-primary">Team Members</h2>
                  <p className="text-body-sm text-text-muted">Manage architects, engineers and staff shown on the Office page.</p>
                </div>
                <button
                  onClick={() => setIsCreatingTeamMember(true)}
                  className="px-5 py-2.5 bg-accent text-white font-medium text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt transition-colors duration-200 flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <div 
                    key={member.id} 
                    className="bg-white border border-border rounded-sm p-5 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {/* Photo preview */}
                      <div className="aspect-[4/5] bg-bg-tertiary rounded-sm overflow-hidden mb-4 relative">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          loading="lazy"
                        />
                      </div>

                      <h3 className="text-body font-bold text-text-primary">{member.name}</h3>
                      <p className="text-body-sm text-text-muted text-xs mb-1">{member.role}</p>
                      {member.role_el && (
                        <p className="text-body-sm text-text-muted/60 text-[11px] mb-2 font-light">
                          {member.role_el}
                        </p>
                      )}
                      {member.email && (
                        <p className="text-label text-accent text-[11px]">{member.email}</p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingTeamMember(member)}
                        className="px-3 py-1.5 border border-border text-label text-text-primary hover:border-accent hover:text-accent transition-colors rounded-sm flex items-center gap-1.5 text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation({ type: 'team', id: member.id, name: member.name })}
                        className="p-1.5 text-text-muted hover:text-red-600 transition-colors rounded-sm"
                        title="Delete member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 3: FAKAROLA PHOTO DUMP MANAGEMENT
             ───────────────────────────────────────────────────────── */}
          {activeTab === 'fakarola' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-heading-2 text-text-primary">Fakarola Photo Dump</h2>
                  <p className="text-body-sm text-text-muted">Sketches, work-in-progress photos, notes, and architectural artifacts.</p>
                </div>
                <button
                  onClick={() => setIsCreatingFakarola(true)}
                  className="px-5 py-2.5 bg-accent text-white font-medium text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt transition-colors duration-200 flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo / Note</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fakarolaItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-border rounded-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      {item.image ? (
                        <div className="aspect-[16/10] bg-bg-tertiary overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider rounded-sm">
                            {item.type}
                          </span>
                        </div>
                      ) : (
                        <div className={`p-6 bg-gradient-to-br ${item.color || 'from-accent/10 to-transparent'} border-b border-border`}>
                          <span className="px-2 py-0.5 bg-bg-primary text-text-muted border border-border text-[10px] font-mono uppercase tracking-wider rounded-sm inline-block mb-3">
                            {item.type}
                          </span>
                          <h4 className="text-body font-bold text-text-primary">{item.title}</h4>
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-body font-bold text-text-primary leading-tight">
                            {item.title}
                          </h3>
                          <span className="text-label text-text-muted/60 font-mono text-xs">
                            #{item.id}
                          </span>
                        </div>
                        <p className="text-body-sm text-text-muted text-xs line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 border-t border-border bg-bg-tertiary/40 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-text-muted">
                        Span: {item.span || '1x1'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingFakarola(item)}
                          className="p-1.5 text-text-muted hover:text-accent transition-colors"
                          title="Edit entry"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({ type: 'fakarola', id: item.id, name: item.title })}
                          className="p-1.5 text-text-muted hover:text-red-600 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              TAB 4: BACKUP & DATA TOOLS
             ───────────────────────────────────────────────────────── */}
          {activeTab === 'backup' && (
            <div className="max-w-4xl space-y-10 animate-fade-in">
              <div>
                <h2 className="text-heading-2 text-text-primary mb-2">Backup & Database Tools</h2>
                <p className="text-body text-text-muted">
                  Export backups, restore previous snapshots, or reset any section back to initial defaults.
                </p>
              </div>

              {/* Supabase Cloud Sync Card */}
              <div className="p-6 bg-white border border-border rounded-sm shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                      isCloudConnected 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      {isCloudConnected ? 'Supabase Connected' : 'Local Mode (.env missing)'}
                    </span>
                  </div>
                  <h3 className="text-heading-3 text-text-primary mb-2">Supabase Cloud Sync</h3>
                  <p className="text-body-sm text-text-muted mb-6">
                    {isCloudConnected 
                      ? 'Όλα τα έργα, τα μέλη της ομάδας και τα Fakarola items συγχρονίζονται απευθείας στο PostgreSQL cloud του Supabase.'
                      : 'Για να συνδέσεις το cloud, δημιούργησε ένα δωρεάν project στο supabase.com και πρόσθεσε τα VITE_SUPABASE_URL και VITE_SUPABASE_ANON_KEY στο αρχείο .env.'
                    }
                  </p>
                </div>
                <button
                  onClick={async () => {
                    if (!isCloudConnected) {
                      alert('Το Supabase δεν έχει ρυθμιστεί ακόμα. Πρόσθεσε τα VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY στο .env σου.');
                      return;
                    }
                    showToast('Συγχρονισμός δεδομένων με το Supabase Cloud...');
                    const res = await syncToCloud();
                    showToast(res.message);
                  }}
                  disabled={!isCloudConnected}
                  className={`w-full py-2.5 text-label uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 ${
                    isCloudConnected
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Συγχρονισμος ολων των δεδομενων στο Supabase</span>
                </button>
              </div>

              {/* Export / Import Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-border rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="text-heading-3 text-text-primary mb-2">Export Data Backup</h3>
                    <p className="text-body-sm text-text-muted mb-6">
                      Download a single JSON file containing all projects, team members, and Fakarola entries.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-2.5 bg-accent text-white text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="p-6 bg-white border border-border rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="text-heading-3 text-text-primary mb-2">Import Data Backup</h3>
                    <p className="text-body-sm text-text-muted mb-6">
                      Restore your site state from an existing exported JSON backup file.
                    </p>
                  </div>
                  <label className="w-full py-2.5 border border-accent text-accent hover:bg-accent hover:text-white transition-colors text-label uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Select JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Defaults Section */}
              <div className="p-8 border border-red-200 bg-red-50/40 rounded-sm">
                <div className="flex items-start gap-3 mb-6">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-heading-3 text-red-800">Danger Zone: Reset Content</h3>
                    <p className="text-body-sm text-red-700/80">
                      Revert content to original source code defaults. This will erase custom additions unless you have exported a backup.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (confirm('Reset all projects to code defaults?')) {
                        resetProjects();
                        showToast('Projects reset to defaults');
                      }
                    }}
                    className="px-4 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-label uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Reset Projects
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Reset team members to code defaults?')) {
                        resetTeam();
                        showToast('Team members reset to defaults');
                      }
                    }}
                    className="px-4 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-label uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Reset Team
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Reset Fakarola items to code defaults?')) {
                        resetFakarola();
                        showToast('Fakarola items reset to defaults');
                      }
                    }}
                    className="px-4 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-label uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Reset Fakarola
                  </button>

                  <button
                    onClick={() => setDeleteConfirmation({ type: 'reset-all', name: 'All Data' })}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 text-label uppercase tracking-wider rounded-sm transition-colors ml-auto"
                  >
                    Reset Entire Database
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────
            MODAL 1: PROJECT EDITOR (Create & Edit)
           ───────────────────────────────────────────────────────── */}
        {(editingProject || isCreatingProject) && (
          <ProjectEditorModal
            project={editingProject}
            isOpen={true}
            onClose={() => {
              setEditingProject(null);
              setIsCreatingProject(false);
            }}
            onSave={(projectData) => {
              if (editingProject) {
                updateProject(editingProject.id, projectData);
                showToast(`Saved changes to "${projectData.title}"`);
              } else {
                addProject(projectData as Omit<Project, 'id'>);
                showToast(`Created new project "${projectData.title}"`);
              }
              setEditingProject(null);
              setIsCreatingProject(false);
            }}
            handleImageUpload={handleImageFileToBase64}
          />
        )}

        {/* ─────────────────────────────────────────────────────────
            MODAL 2: TEAM MEMBER EDITOR
           ───────────────────────────────────────────────────────── */}
        {(editingTeamMember || isCreatingTeamMember) && (
          <TeamMemberEditorModal
            member={editingTeamMember}
            isOpen={true}
            onClose={() => {
              setEditingTeamMember(null);
              setIsCreatingTeamMember(false);
            }}
            onSave={(memberData) => {
              if (editingTeamMember) {
                updateTeamMember(editingTeamMember.id, memberData);
                showToast(`Updated team member "${memberData.name}"`);
              } else {
                addTeamMember(memberData as Omit<TeamMember, 'id'>);
                showToast(`Added team member "${memberData.name}"`);
              }
              setEditingTeamMember(null);
              setIsCreatingTeamMember(false);
            }}
            handleImageUpload={handleImageFileToBase64}
          />
        )}

        {/* ─────────────────────────────────────────────────────────
            MODAL 3: FAKAROLA ITEM EDITOR
           ───────────────────────────────────────────────────────── */}
        {(editingFakarola || isCreatingFakarola) && (
          <FakarolaEditorModal
            item={editingFakarola}
            isOpen={true}
            onClose={() => {
              setEditingFakarola(null);
              setIsCreatingFakarola(false);
            }}
            onSave={(itemData) => {
              if (editingFakarola) {
                updateFakarolaItem(editingFakarola.id, itemData);
                showToast(`Updated Fakarola entry "${itemData.title}"`);
              } else {
                addFakarolaItem(itemData as Omit<FakarolaItem, 'id'>);
                showToast(`Added Fakarola entry "${itemData.title}"`);
              }
              setEditingFakarola(null);
              setIsCreatingFakarola(false);
            }}
            handleImageUpload={handleImageFileToBase64}
          />
        )}

        {/* ─────────────────────────────────────────────────────────
            MODAL 4: DELETE CONFIRMATION MODAL
           ───────────────────────────────────────────────────────── */}
        {deleteConfirmation && createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-border p-6 sm:p-8 rounded-sm max-w-md w-full shadow-2xl animate-scale-up">
              <h3 className="text-heading-3 text-text-primary mb-2">Confirm Delete</h3>
              <p className="text-body-sm text-text-muted mb-6">
                Are you sure you want to delete <strong className="text-text-primary font-semibold">{deleteConfirmation.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 border border-border text-label uppercase tracking-wider rounded-sm text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteConfirmation.type === 'project' && typeof deleteConfirmation.id === 'number') {
                      deleteProject(deleteConfirmation.id);
                      showToast(`Project deleted`);
                    } else if (deleteConfirmation.type === 'team' && typeof deleteConfirmation.id === 'string') {
                      deleteTeamMember(deleteConfirmation.id);
                      showToast(`Team member deleted`);
                    } else if (deleteConfirmation.type === 'fakarola' && typeof deleteConfirmation.id === 'number') {
                      deleteFakarolaItem(deleteConfirmation.id);
                      showToast(`Fakarola entry deleted`);
                    } else if (deleteConfirmation.type === 'reset-all') {
                      resetAll();
                      showToast('Database reset to defaults');
                    }
                    setDeleteConfirmation(null);
                  }}
                  className="px-5 py-2 bg-red-600 text-white text-label uppercase tracking-wider rounded-sm hover:bg-red-700 transition-colors shadow-sm"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </PageTransition>
  );
}

// ─────────────────────────────────────────────────────────
// PROJECT EDITOR MODAL COMPONENT
// ─────────────────────────────────────────────────────────
interface ProjectEditorProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Project>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}

function ProjectEditorModal({ project, isOpen, onClose, onSave, handleImageUpload }: ProjectEditorProps) {
  const [formData, setFormData] = useState<Partial<Project>>(() => {
    if (project) return { ...project };
    return {
      title: '',
      slug: '',
      categories: ['Residential'],
      image: '/projects/mdhp1v2.jpg',
      headerImage: '',
      subtitle: '',
      subtitle_el: '',
      year: new Date().getFullYear().toString(),
      location: 'Athens, Greece',
      location_el: 'Αθήνα, Ελλάδα',
      client: '',
      designTeam: 'Mdterra Architecture',
      mep: '',
      structuralDesign: '',
      contractor: '',
      photographer: '',
      plotSize: '',
      builtArea: '',
      capacity: '',
      galleryImages: [],
      description: [''],
      description_el: [''],
    };
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  if (!isOpen) return null;

  const handleSlugify = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const toggleCategory = (cat: ProjectCategory) => {
    const current = formData.categories || [];
    if (current.includes(cat)) {
      if (current.length > 1) {
        setFormData({ ...formData, categories: current.filter(c => c !== cat) });
      }
    } else {
      setFormData({ ...formData, categories: [...current, cat] });
    }
  };

  const addGalleryImage = (url: string) => {
    if (!url.trim()) return;
    setFormData(prev => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), url.trim()]
    }));
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Please provide a project title');
      return;
    }
    const slug = formData.slug?.trim() || handleSlugify(formData.title);
    onSave({ ...formData, slug });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-border rounded-sm max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl animate-scale-up my-auto">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-bg-tertiary">
          <div>
            <h2 className="text-heading-3 text-text-primary">
              {project ? `Edit Project: ${project.title}` : 'Create New Project'}
            </h2>
            <p className="text-body-sm text-text-muted text-xs">
              Manage project metadata, bilingual copy, and imagery.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Section: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-label text-accent uppercase tracking-wider font-semibold border-b border-border pb-2">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug: prev.slug ? prev.slug : handleSlugify(title)
                    }));
                  }}
                  placeholder="e.g. SISMANOGLIO HOSPITAL CICU"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. sismanoglio-hospital-cicu"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm font-mono text-xs rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Location (English)
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Athens, Greece"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Location (Greek)
                </label>
                <input
                  type="text"
                  value={formData.location_el || ''}
                  onChange={(e) => setFormData({ ...formData, location_el: e.target.value })}
                  placeholder="e.g. Αθήνα, Ελλάδα"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Client
                </label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Private / AEGEAS NPCC"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-label text-text-muted mb-2 text-xs uppercase">
                Categories (Select at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const isSelected = formData.categories?.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all ${
                        isSelected 
                          ? 'bg-accent text-white border border-accent shadow-sm' 
                          : 'bg-bg-tertiary text-text-muted border border-border hover:border-text-muted'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Imagery */}
          <div className="space-y-4">
            <h3 className="text-label text-accent uppercase tracking-wider font-semibold border-b border-border pb-2">
              2. Photography & Imagery
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Thumbnail */}
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Main Thumbnail Image URL or Upload
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/projects/..."
                    className="flex-1 px-3 py-2 bg-bg-tertiary border border-border text-xs font-mono rounded-sm focus:outline-none focus:border-accent"
                  />
                  <label className="px-3 py-2 bg-accent text-white text-xs rounded-sm cursor-pointer hover:bg-accent-alt transition-colors shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, (url) => setFormData({ ...formData, image: url }))}
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="aspect-[4/3] bg-bg-tertiary border border-border rounded-sm overflow-hidden w-40">
                    <img src={formData.image} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Header Image */}
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Header Banner Image (Optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.headerImage || ''}
                    onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
                    placeholder="Defaults to main image if empty"
                    className="flex-1 px-3 py-2 bg-bg-tertiary border border-border text-xs font-mono rounded-sm focus:outline-none focus:border-accent"
                  />
                  <label className="px-3 py-2 bg-accent text-white text-xs rounded-sm cursor-pointer hover:bg-accent-alt transition-colors shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, (url) => setFormData({ ...formData, headerImage: url }))}
                    />
                  </label>
                </div>
                {formData.headerImage && (
                  <div className="aspect-[16/9] bg-bg-tertiary border border-border rounded-sm overflow-hidden w-48">
                    <img src={formData.headerImage} alt="Header preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Images List */}
            <div className="pt-2">
              <label className="block text-label text-text-muted mb-2 text-xs uppercase">
                Project Gallery Images ({formData.galleryImages?.length || 0})
              </label>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Paste image URL to add to gallery..."
                  className="flex-1 px-3 py-2 bg-bg-tertiary border border-border text-xs font-mono rounded-sm focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => addGalleryImage(newGalleryUrl)}
                  className="px-4 py-2 bg-accent text-white text-xs font-medium rounded-sm hover:bg-accent-alt transition-colors"
                >
                  + Add URL
                </button>
                <label className="px-3 py-2 bg-bg-tertiary border border-border text-text-primary text-xs rounded-sm cursor-pointer hover:border-accent transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e, (url) => addGalleryImage(url))}
                  />
                </label>
              </div>

              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-3 bg-bg-tertiary border border-border rounded-sm">
                  {formData.galleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative group aspect-square bg-white border border-border rounded-sm overflow-hidden">
                      <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section: Subtitles & Descriptions */}
          <div className="space-y-4">
            <h3 className="text-label text-accent uppercase tracking-wider font-semibold border-b border-border pb-2">
              3. Subtitle & Narrative Copy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Subtitle (English)
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Redesign of Intensive Care Unit"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Subtitle (Greek)
                </label>
                <input
                  type="text"
                  value={formData.subtitle_el || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle_el: e.target.value })}
                  placeholder="e.g. Ανασχεδιασμός Μονάδας Εντατικής Θεραπείας"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Description (English)
                </label>
                <textarea
                  rows={4}
                  value={formData.description?.join('\n\n') || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value.split('\n\n').filter(Boolean) })}
                  placeholder="Enter paragraphs of description (separate paragraphs with blank line)..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">
                  Description (Greek)
                </label>
                <textarea
                  rows={4}
                  value={formData.description_el?.join('\n\n') || ''}
                  onChange={(e) => setFormData({ ...formData, description_el: e.target.value.split('\n\n').filter(Boolean) })}
                  placeholder="Εισαγωγή παραγράφων περιγραφής..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Section: Architectural Specifications */}
          <div className="space-y-4">
            <h3 className="text-label text-accent uppercase tracking-wider font-semibold border-b border-border pb-2">
              4. Technical & Architectural Credits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">Design Team</label>
                <input
                  type="text"
                  value={formData.designTeam || ''}
                  onChange={(e) => setFormData({ ...formData, designTeam: e.target.value })}
                  placeholder="Architects names..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">MEP Engineering</label>
                <input
                  type="text"
                  value={formData.mep || ''}
                  onChange={(e) => setFormData({ ...formData, mep: e.target.value })}
                  placeholder="MEP Engineer..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">Structural Design</label>
                <input
                  type="text"
                  value={formData.structuralDesign || ''}
                  onChange={(e) => setFormData({ ...formData, structuralDesign: e.target.value })}
                  placeholder="Structural consultant..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">Photographer</label>
                <input
                  type="text"
                  value={formData.photographer || ''}
                  onChange={(e) => setFormData({ ...formData, photographer: e.target.value })}
                  placeholder="Photographer name..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">Contractor</label>
                <input
                  type="text"
                  value={formData.contractor || ''}
                  onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                  placeholder="Construction firm..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
              <div>
                <label className="block text-label text-text-muted mb-1 text-xs uppercase">Built Area</label>
                <input
                  type="text"
                  value={formData.builtArea || ''}
                  onChange={(e) => setFormData({ ...formData, builtArea: e.target.value })}
                  placeholder="e.g. 1,200 sq.m."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-border flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-border text-label uppercase tracking-wider rounded-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-accent text-white text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt transition-colors shadow-md"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────
// TEAM MEMBER EDITOR MODAL COMPONENT
// ─────────────────────────────────────────────────────────
interface TeamEditorProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<TeamMember>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}

function TeamMemberEditorModal({ member, isOpen, onClose, onSave, handleImageUpload }: TeamEditorProps) {
  const [formData, setFormData] = useState<Partial<TeamMember>>(() => {
    if (member) return { ...member };
    return {
      name: '',
      role: 'Architect N.T.U.A.',
      role_el: 'Αρχιτέκτων Ε.Μ.Π.',
      email: '',
      image: '/images/team/Makis-Dimitroglou.jpg',
    };
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Please enter a team member name');
      return;
    }
    onSave(formData);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-border rounded-sm max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl animate-scale-up">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-bg-tertiary">
          <h2 className="text-heading-3 text-text-primary">
            {member ? `Edit Member: ${member.name}` : 'Add New Team Member'}
          </h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Maria Papadaki"
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Role (English) *</label>
            <input
              type="text"
              required
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Architect N.T.U.A."
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Role (Greek) *</label>
            <input
              type="text"
              required
              value={formData.role_el || ''}
              onChange={(e) => setFormData({ ...formData, role_el: e.target.value })}
              placeholder="e.g. Αρχιτέκτων Ε.Μ.Π."
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Email Address</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@mdterra.gr"
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Photo URL or Upload</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/team/..."
                className="flex-1 px-3 py-2 bg-bg-tertiary border border-border text-xs font-mono rounded-sm focus:outline-none focus:border-accent"
              />
              <label className="px-3 py-2 bg-accent text-white text-xs rounded-sm cursor-pointer hover:bg-accent-alt transition-colors shrink-0 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, (url) => setFormData({ ...formData, image: url }))}
                />
              </label>
            </div>
            {formData.image && (
              <div className="w-24 h-28 bg-bg-tertiary border border-border rounded-sm overflow-hidden mt-2">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-label uppercase tracking-wider rounded-sm text-text-muted hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-accent text-white text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────
// FAKAROLA ITEM EDITOR MODAL COMPONENT
// ─────────────────────────────────────────────────────────
interface FakarolaEditorProps {
  item: FakarolaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<FakarolaItem>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}

function FakarolaEditorModal({ item, isOpen, onClose, onSave, handleImageUpload }: FakarolaEditorProps) {
  const [formData, setFormData] = useState<Partial<FakarolaItem>>(() => {
    if (item) return { ...item };
    return {
      title: '',
      title_el: '',
      type: 'photo',
      type_el: 'φωτογραφία',
      description: '',
      description_el: '',
      span: 'col-span-1 row-span-1',
      color: 'from-accent/10 to-transparent',
      image: '',
    };
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Please enter a title');
      return;
    }
    onSave(formData);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-border rounded-sm max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl animate-scale-up">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-bg-tertiary">
          <h2 className="text-heading-3 text-text-primary">
            {item ? `Edit Fakarola Entry: #${item.id}` : 'Add Fakarola Photo / Note'}
          </h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Title (English) *</label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Seaside Concrete Detail"
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Title (Greek)</label>
            <input
              type="text"
              value={formData.title_el || ''}
              onChange={(e) => setFormData({ ...formData, title_el: e.target.value })}
              placeholder="e.g. Λεπτομέρεια Σκυροδέματος"
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-label text-text-muted mb-1 text-xs uppercase">Type</label>
              <select
                value={formData.type || 'photo'}
                onChange={(e) => {
                  const val = e.target.value;
                  const elMap: Record<string, string> = {
                    photo: 'φωτογραφία',
                    sketch: 'σκίτσο',
                    note: 'σημείωση',
                    drawing: 'σχέδιο',
                    painting: 'πίνακας'
                  };
                  setFormData({
                    ...formData,
                    type: val,
                    type_el: elMap[val] || val
                  });
                }}
                className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
              >
                <option value="photo">Photo</option>
                <option value="sketch">Sketch</option>
                <option value="note">Note</option>
                <option value="drawing">Drawing</option>
                <option value="painting">Painting</option>
              </select>
            </div>

            <div>
              <label className="block text-label text-text-muted mb-1 text-xs uppercase">Grid Span Size</label>
              <select
                value={formData.span || 'col-span-1 row-span-1'}
                onChange={(e) => setFormData({ ...formData, span: e.target.value })}
                className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm"
              >
                <option value="col-span-1 row-span-1">Standard (1x1)</option>
                <option value="col-span-2 row-span-1">Wide (2x1)</option>
                <option value="col-span-1 row-span-2">Tall (1x2)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Photo / Image (Optional)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Paste image URL or upload..."
                className="flex-1 px-3 py-2 bg-bg-tertiary border border-border text-xs font-mono rounded-sm focus:outline-none focus:border-accent"
              />
              <label className="px-3 py-2 bg-accent text-white text-xs rounded-sm cursor-pointer hover:bg-accent-alt transition-colors shrink-0 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, (url) => setFormData({ ...formData, image: url }))}
                />
              </label>
            </div>
            {formData.image && (
              <div className="h-32 bg-bg-tertiary border border-border rounded-sm overflow-hidden mt-2">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Description / Caption (English)</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Notes, medium, or context..."
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-label text-text-muted mb-1 text-xs uppercase">Description / Caption (Greek)</label>
            <textarea
              rows={3}
              value={formData.description_el || ''}
              onChange={(e) => setFormData({ ...formData, description_el: e.target.value })}
              placeholder="Σημείωση στα ελληνικά..."
              className="w-full px-3 py-2 bg-bg-tertiary border border-border text-body-sm rounded-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-label uppercase tracking-wider rounded-sm text-text-muted hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-accent text-white text-label uppercase tracking-wider rounded-sm hover:bg-accent-alt"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
