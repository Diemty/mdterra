import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { projects as defaultProjects, type Project } from '../data/projects';
import { defaultTeamMembers, type TeamMember } from '../data/team';
import { defaultFakarolaItems, type FakarolaItem } from '../data/fakarola';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface DataContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  fakarolaItems: FakarolaItem[];
  isCloudConnected: boolean;
  isLoadingCloud: boolean;
  
  // Projects
  addProject: (project: Omit<Project, 'id'>) => Promise<Project>;
  updateProject: (id: number, updated: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  reorderProjects: (newProjects: Project[]) => void;
  resetProjects: () => void;

  // Team
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<TeamMember>;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  reorderTeam: (newTeam: TeamMember[]) => void;
  resetTeam: () => void;

  // Fakarola
  addFakarolaItem: (item: Omit<FakarolaItem, 'id'>) => Promise<FakarolaItem>;
  updateFakarolaItem: (id: number, updated: Partial<FakarolaItem>) => Promise<void>;
  deleteFakarolaItem: (id: number) => Promise<void>;
  reorderFakarola: (newItems: FakarolaItem[]) => void;
  resetFakarola: () => void;

  // Cloud & Global tools
  syncToCloud: () => Promise<{ success: boolean; message: string }>;
  uploadMedia: (file: File) => Promise<string | null>;
  resetAll: () => void;
  exportBackup: () => string;
  importBackup: (jsonStr: string) => boolean;
}

const STORAGE_KEY_PROJECTS = 'mdterra_cms_projects';
const STORAGE_KEY_TEAM = 'mdterra_cms_team';
const STORAGE_KEY_FAKAROLA = 'mdterra_cms_fakarola';

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [isLoadingCloud, setIsLoadingCloud] = useState<boolean>(isSupabaseConfigured);

  // Load initial states from LocalStorage or Default
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load projects from localStorage', e);
    }
    return defaultProjects;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEAM);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load team from localStorage', e);
    }
    return defaultTeamMembers;
  });

  const [fakarolaItems, setFakarolaItems] = useState<FakarolaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAKAROLA);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load fakarola from localStorage', e);
    }
    return defaultFakarolaItems;
  });

  // Sync from Supabase on Mount
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      setIsLoadingCloud(false);
      return;
    }

    async function loadCloudData(apiClient: NonNullable<typeof supabase>) {
      try {
        const [projRes, teamRes, fakRes] = await Promise.all([
          apiClient.from('projects').select('*').order('id', { ascending: false }),
          apiClient.from('team_members').select('*'),
          apiClient.from('fakarola_items').select('*').order('id', { ascending: false }),
        ]);

        if (projRes.data && projRes.data.length > 0) {
          setProjects(projRes.data as Project[]);
          localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projRes.data));
        }

        if (teamRes.data && teamRes.data.length > 0) {
          setTeamMembers(teamRes.data as TeamMember[]);
          localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(teamRes.data));
        }

        if (fakRes.data && fakRes.data.length > 0) {
          setFakarolaItems(fakRes.data as FakarolaItem[]);
          localStorage.setItem(STORAGE_KEY_FAKAROLA, JSON.stringify(fakRes.data));
        }
      } catch (err) {
        console.warn('Failed to fetch from Supabase, relying on local cache:', err);
      } finally {
        setIsLoadingCloud(false);
      }
    }

    loadCloudData(client);
  }, []);

  // Persist to LocalStorage whenever state changes (offline backup)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAKAROLA, JSON.stringify(fakarolaItems));
  }, [fakarolaItems]);

  // ── Project Actions ──
  const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject: Project = { ...projectData, id: nextId };
    
    // Optimistic UI update
    setProjects(prev => [newProject, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').insert([newProject]);
        if (error) console.error('Supabase addProject error:', error);
      } catch (e) {
        console.error('Supabase addProject network error:', e);
      }
    }
    return newProject;
  };

  const updateProject = async (id: number, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').update(updated).eq('id', id);
        if (error) console.error('Supabase updateProject error:', error);
      } catch (e) {
        console.error('Supabase updateProject network error:', e);
      }
    }
  };

  const deleteProject = async (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) console.error('Supabase deleteProject error:', error);
      } catch (e) {
        console.error('Supabase deleteProject network error:', e);
      }
    }
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const resetProjects = () => {
    setProjects(defaultProjects);
  };

  // ── Team Actions ──
  const addTeamMember = async (memberData: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
    const newId = Date.now().toString();
    const newMember: TeamMember = { ...memberData, id: newId };
    setTeamMembers(prev => [...prev, newMember]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('team_members').insert([newMember]);
        if (error) console.error('Supabase addTeamMember error:', error);
      } catch (e) {
        console.error('Supabase addTeamMember network error:', e);
      }
    }
    return newMember;
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('team_members').update(updated).eq('id', id);
        if (error) console.error('Supabase updateTeamMember error:', error);
      } catch (e) {
        console.error('Supabase updateTeamMember network error:', e);
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) console.error('Supabase deleteTeamMember error:', error);
      } catch (e) {
        console.error('Supabase deleteTeamMember network error:', e);
      }
    }
  };

  const reorderTeam = (newTeam: TeamMember[]) => {
    setTeamMembers(newTeam);
  };

  const resetTeam = () => {
    setTeamMembers(defaultTeamMembers);
  };

  // ── Fakarola Actions ──
  const addFakarolaItem = async (itemData: Omit<FakarolaItem, 'id'>): Promise<FakarolaItem> => {
    const nextId = fakarolaItems.length > 0 ? Math.max(...fakarolaItems.map(f => f.id)) + 1 : 1;
    const newItem: FakarolaItem = { ...itemData, id: nextId };
    setFakarolaItems(prev => [newItem, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('fakarola_items').insert([newItem]);
        if (error) console.error('Supabase addFakarolaItem error:', error);
      } catch (e) {
        console.error('Supabase addFakarolaItem network error:', e);
      }
    }
    return newItem;
  };

  const updateFakarolaItem = async (id: number, updated: Partial<FakarolaItem>) => {
    setFakarolaItems(prev => prev.map(f => (f.id === id ? { ...f, ...updated } : f)));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('fakarola_items').update(updated).eq('id', id);
        if (error) console.error('Supabase updateFakarolaItem error:', error);
      } catch (e) {
        console.error('Supabase updateFakarolaItem network error:', e);
      }
    }
  };

  const deleteFakarolaItem = async (id: number) => {
    setFakarolaItems(prev => prev.filter(f => f.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('fakarola_items').delete().eq('id', id);
        if (error) console.error('Supabase deleteFakarolaItem error:', error);
      } catch (e) {
        console.error('Supabase deleteFakarolaItem network error:', e);
      }
    }
  };

  const reorderFakarola = (newItems: FakarolaItem[]) => {
    setFakarolaItems(newItems);
  };

  const resetFakarola = () => {
    setFakarolaItems(defaultFakarolaItems);
  };

  // ── Cloud Media Upload & Cloud Synchronization ──
  const uploadMedia = async (file: File): Promise<string | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `uploads/${Date.now()}_${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        return null;
      }

      const { data } = supabase.storage.from('media').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.error('Upload exception:', err);
      return null;
    }
  };

  const syncToCloud = async (): Promise<{ success: boolean; message: string }> => {
    if (!isSupabaseConfigured || !supabase) {
      return { 
        success: false, 
        message: 'Το Supabase δεν έχει ρυθμιστεί ακόμα. Πρόσθεσε τα VITE_SUPABASE_URL και VITE_SUPABASE_ANON_KEY στο .env' 
      };
    }

    try {
      if (projects.length > 0) {
        const { error: projErr } = await supabase.from('projects').upsert(projects, { onConflict: 'id' });
        if (projErr) throw projErr;
      }
      if (teamMembers.length > 0) {
        const { error: teamErr } = await supabase.from('team_members').upsert(teamMembers, { onConflict: 'id' });
        if (teamErr) throw teamErr;
      }
      if (fakarolaItems.length > 0) {
        const { error: fakErr } = await supabase.from('fakarola_items').upsert(fakarolaItems, { onConflict: 'id' });
        if (fakErr) throw fakErr;
      }
      return { success: true, message: 'Όλα τα δεδομένα συγχρονίστηκαν επιτυχώς με το Supabase Cloud!' };
    } catch (err: any) {
      console.error('Error syncing to Supabase:', err);
      return { success: false, message: err?.message || 'Αποτυχία συγχρονισμού.' };
    }
  };

  // ── Global Tools ──
  const resetAll = () => {
    setProjects(defaultProjects);
    setTeamMembers(defaultTeamMembers);
    setFakarolaItems(defaultFakarolaItems);
  };

  const exportBackup = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      projects,
      teamMembers,
      fakarolaItems,
    };
    return JSON.stringify(data, null, 2);
  };

  const importBackup = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      if (Array.isArray(data.teamMembers)) setTeamMembers(data.teamMembers);
      if (Array.isArray(data.fakarolaItems)) setFakarolaItems(data.fakarolaItems);
      return true;
    } catch (e) {
      console.error('Failed to import backup', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        teamMembers,
        fakarolaItems,
        isCloudConnected: isSupabaseConfigured,
        isLoadingCloud,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        resetProjects,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        reorderTeam,
        resetTeam,
        addFakarolaItem,
        updateFakarolaItem,
        deleteFakarolaItem,
        reorderFakarola,
        resetFakarola,
        syncToCloud,
        uploadMedia,
        resetAll,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
