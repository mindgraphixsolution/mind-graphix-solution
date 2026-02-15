import { PortfolioItem, QuoteRequest, Service, TeamMember, Testimonial, BlogPost } from '../types';
import { PORTFOLIO_ITEMS, TEAM_MEMBERS, SERVICES, TESTIMONIALS, BLOG_POSTS, STATISTICS, CONTACT_INFO } from '../constants';

const KEYS = {
  MESSAGES: 'mgs_db_messages',
  PORTFOLIO: 'mgs_db_portfolio',
  USERS: 'mgs_db_users',
  SETTINGS: 'mgs_db_settings',
  STATS: 'mgs_db_stats',
  TEAM: 'mgs_db_team',
  SERVICES: 'mgs_db_services',
  CONTENT: 'mgs_db_content',
  LOGS: 'mgs_db_logs',
  MEDIA: 'mgs_db_media', 
  TESTIMONIALS: 'mgs_db_testimonials',
  NOTIFICATIONS: 'mgs_db_notifications',
  BLOG: 'mgs_db_blog',
  PAGES: 'mgs_db_pages',
  DESIGN_SYSTEM: 'mgs_db_design_system',
  SECURITY_CONFIG: 'mgs_db_security_config',
  ROLES: 'mgs_db_roles',
  BACKUPS: 'mgs_db_backups',
  BACKUP_CONFIG: 'mgs_db_backup_config',
  SEO_DATA: 'mgs_db_seo_data',
  PERF_CONFIG: 'mgs_db_perf_config',
  PREFERENCES: 'mgs_db_preferences', 
  TOUR_COMPLETED: 'mgs_db_tour_completed',
  HERO_CONTENT: 'mgs_db_hero',
  PROMOTIONS: 'mgs_db_promotions',
  PRODUCTS: 'mgs_db_products',
  PAGE_VERSIONS: 'mgs_db_page_versions',
  CAMPAIGNS: 'mgs_db_campaigns',
  AUTOMATIONS: 'mgs_db_automations',
  SUBSCRIBERS: 'mgs_db_subscribers',
  LEADS: 'mgs_db_leads',
  LOYALTY: 'mgs_db_loyalty',
  INVENTORY: 'mgs_db_inventory',
  INVOICES: 'mgs_db_invoices',
  DAM_FOLDERS: 'mgs_db_dam_folders',
  DAM_ASSETS: 'mgs_db_dam_assets',
  AUDIT_LOGS: 'mgs_db_audit_logs',
  DELEGATIONS: 'mgs_db_delegations',
  APPROVALS: 'mgs_db_approvals',
  AI_HISTORY: 'mgs_db_ai_history',
  AUTOMATION_RULES: 'mgs_db_automation_rules',
  API_KEYS: 'mgs_db_api_keys',
  WEBHOOKS: 'mgs_db_webhooks',
  INTEGRATIONS: 'mgs_db_integrations',
  COMMENTS: 'mgs_db_comments',
  CUSTOM_DASHBOARDS: 'mgs_db_custom_dashboards',
  SCHEDULED_REPORTS: 'mgs_db_scheduled_reports',
  BENCHMARK: 'mgs_db_benchmark',
  SHARED_LINKS: 'mgs_db_shared_links'
};

const triggerUpdate = () => {
  window.dispatchEvent(new Event('mgs_db_update'));
};

const initDB = () => {
  if (!localStorage.getItem(KEYS.USERS)) localStorage.setItem(KEYS.USERS, JSON.stringify([
    { id: 'usr_1', name: 'Badior Ouattara', email: 'admin@mindgraphix.com', role: 'super_admin', status: 'active', joined: '2023-01-15' }
  ]));
  
  if (!localStorage.getItem(KEYS.HERO_CONTENT)) localStorage.setItem(KEYS.HERO_CONTENT, JSON.stringify({
    titlePrefix: "MIND",
    titleSpan: "GRAPHIX",
    titleSuffix: "SOLUTION",
    description: "Nous fusionnons l'art du design émotionnel avec la puissance d'un code performant pour sculpter des expériences web qui ne se contentent pas d'exister, mais qui dominent.",
    ctaPrimary: "Lancer mon Projet",
    ctaSecondary: "Explorer le Portfolio",
    stats: [
      { label: "Projets", value: 150 },
      { label: "Satisfaction", value: 98 }
    ]
  }));

  if (!localStorage.getItem(KEYS.PORTFOLIO)) localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(PORTFOLIO_ITEMS));
  if (!localStorage.getItem(KEYS.TEAM)) localStorage.setItem(KEYS.TEAM, JSON.stringify(TEAM_MEMBERS));
  if (!localStorage.getItem(KEYS.SERVICES)) localStorage.setItem(KEYS.SERVICES, JSON.stringify(SERVICES));
  if (!localStorage.getItem(KEYS.TESTIMONIALS)) localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(TESTIMONIALS));
  if (!localStorage.getItem(KEYS.BLOG)) localStorage.setItem(KEYS.BLOG, JSON.stringify(BLOG_POSTS));
  if (!localStorage.getItem(KEYS.STATS)) localStorage.setItem(KEYS.STATS, JSON.stringify(STATISTICS));
  
  if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify({
    maintenanceMode: false,
    maintenanceTitle: "Site en Maintenance",
    maintenanceMessage: "Nous effectuons une mise à jour technique."
  }));

  if (!localStorage.getItem(KEYS.DESIGN_SYSTEM)) localStorage.setItem(KEYS.DESIGN_SYSTEM, JSON.stringify({
    colors: { primary: '#5e35b1', secondary: '#4527a0', accent: '#ffab00', surface: '#1a1a2e', text: '#ffffff' }
  }));

  if (!localStorage.getItem(KEYS.SEO_DATA)) localStorage.setItem(KEYS.SEO_DATA, JSON.stringify({
    global: { siteName: "Mind Graphix Solution", titleSuffix: " | Agence Digitale", defaultImage: "", twitterHandle: "@mgs" },
    pages: [{ path: '/', title: 'Accueil', description: 'Agence digitale premium', keywords: 'web, design', ogImage: '' }]
  }));

  if (!localStorage.getItem(KEYS.PERF_CONFIG)) localStorage.setItem(KEYS.PERF_CONFIG, JSON.stringify({
    score: 92, metrics: { lcp: 1.2, fid: 15, cls: 0.05 }, caching: { browser: true, server: true, cdn: true },
    minification: { html: true, css: true, js: true }, imageOptimization: { webp: true, lazyLoad: true, compressionLevel: 80 },
    uptime: { uptimePercentage: 99.98 }
  }));
};

export const mockDB = {
  init: initDB,
  
  // --- HERO & HOME ---
  getHero: () => JSON.parse(localStorage.getItem(KEYS.HERO_CONTENT) || '{}'),
  saveHero: (data: any) => { localStorage.setItem(KEYS.HERO_CONTENT, JSON.stringify(data)); triggerUpdate(); },

  // --- CONTENT CRUD ---
  getServices: () => JSON.parse(localStorage.getItem(KEYS.SERVICES) || '[]'),
  updateService: (svc: Service) => {
    const list = mockDB.getServices();
    const newList = svc.id ? list.map((s: Service) => s.id === svc.id ? svc : s) : [...list, { ...svc, id: Date.now().toString() }];
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteService: (id: string | number) => {
    const newList = mockDB.getServices().filter((s: Service) => s.id !== id);
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(newList));
    triggerUpdate();
  },

  getTeam: () => JSON.parse(localStorage.getItem(KEYS.TEAM) || '[]'),
  saveTeamMember: (member: any) => {
    const list = mockDB.getTeam();
    const newList = member.id ? list.map((m: any) => m.id === member.id ? member : m) : [...list, { ...member, id: Date.now() }];
    localStorage.setItem(KEYS.TEAM, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteTeamMember: (id: number) => {
    const list = mockDB.getTeam().filter((m: any) => m.id !== id);
    localStorage.setItem(KEYS.TEAM, JSON.stringify(list));
    triggerUpdate();
  },

  getPortfolio: () => JSON.parse(localStorage.getItem(KEYS.PORTFOLIO) || '[]'),
  savePortfolioItem: (item: any) => {
    const list = mockDB.getPortfolio();
    const newList = item.id ? list.map((p: any) => p.id === item.id ? item : p) : [...list, { ...item, id: Date.now() }];
    localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(newList));
    triggerUpdate();
  },
  deletePortfolioItem: (id: number) => {
    const list = mockDB.getPortfolio().filter((p: any) => p.id !== id);
    localStorage.setItem(KEYS.PORTFOLIO, JSON.stringify(list));
    triggerUpdate();
  },

  getTestimonials: () => JSON.parse(localStorage.getItem(KEYS.TESTIMONIALS) || '[]'),
  saveTestimonials: (list: any[]) => { localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(list)); triggerUpdate(); },
  saveTestimonial: (test: any) => {
    const list = mockDB.getTestimonials();
    const newList = test.id ? list.map((t: any) => t.id === test.id ? test : t) : [...list, { ...test, id: Date.now().toString() }];
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteTestimonial: (id: string | number) => {
    const newList = mockDB.getTestimonials().filter((t: any) => t.id !== id);
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(newList));
    triggerUpdate();
  },

  getPosts: () => JSON.parse(localStorage.getItem(KEYS.BLOG) || '[]'),

  // --- MESSAGING & NOTIFS ---
  getMessages: () => JSON.parse(localStorage.getItem(KEYS.MESSAGES) || '[]'),
  addMessage: (m: any) => {
    const list = mockDB.getMessages();
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify([...list, { ...m, id: `msg_${Date.now()}`, date: new Date().toISOString(), status: 'new' }]));
    triggerUpdate();
  },
  getNotifications: () => JSON.parse(localStorage.getItem(KEYS.NOTIFICATIONS) || '[]'),
  markAllNotificationsRead: () => {
    const list = mockDB.getNotifications().map((n: any) => ({ ...n, read: true }));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
    triggerUpdate();
  },
  deleteNotification: (id: string) => {
    const list = mockDB.getNotifications().filter((n: any) => n.id !== id);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
    triggerUpdate();
  },

  // --- SYSTEM & PREFS ---
  getSettings: () => JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}'),
  saveSettings: (s: any) => { localStorage.setItem(KEYS.SETTINGS, JSON.stringify(s)); triggerUpdate(); },
  getPreferences: () => JSON.parse(localStorage.getItem(KEYS.PREFERENCES) || '{"accentColor":"#5e35b1","sidebarPosition":"left","density":"comfortable","shortcuts":{"open_command":"k"},"dashboardLayout":["stats_visitors","chart_traffic","list_activity","card_actions"]}'),
  savePreferences: (p: any) => { localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(p)); triggerUpdate(); },
  getSecurityConfig: () => JSON.parse(localStorage.getItem(KEYS.SECURITY_CONFIG) || '{"require2FA":true,"sessionTimeout":30,"passwordPolicy":"strong","allowBiometrics":true}'),
  saveSecurityConfig: (c: any) => { localStorage.setItem(KEYS.SECURITY_CONFIG, JSON.stringify(c)); triggerUpdate(); },
  getDesignSystem: () => JSON.parse(localStorage.getItem(KEYS.DESIGN_SYSTEM) || '{}'),
  getWhiteLabelConfig: () => JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}').whiteLabel || { appName: 'AdminForge', primaryColor: '#5e35b1' },
  saveWhiteLabelConfig: (c: any) => {
    const s = mockDB.getSettings();
    mockDB.saveSettings({ ...s, whiteLabel: c });
  },

  // --- STATS ---
  getStats: () => ({
    visitors: 45200,
    pipelineValue: 12500000,
    trafficData: [450, 620, 580, 890, 720, 1100, 1245],
    projectsCount: mockDB.getPortfolio().length,
    unreadMessages: mockDB.getMessages().filter((m:any) => m.status === 'new').length,
    conversionRate: 2.4,
    bounceRate: '34%',
    avgSession: '2m 45s',
    usersCount: 15
  }),
  getAdvancedStats: () => ({
    realtime: { activeUsers: 24 },
    roi: { ratio: 4.2 },
    funnel: { impressions: 125000, clicks: 15200, leads: 1245, conversions: 89 },
    heatmap: [{x: 20, y: 30, value: 80}, {x: 50, y: 50, value: 100}, {x: 80, y: 20, value: 60}],
    aiInsights: [{ type: 'opportunity', impact: 'High', message: 'Hausse d\'engagement mobile.' }]
  }),

  // --- AUDIT & SECURITY ---
  getAuditLogs: () => JSON.parse(localStorage.getItem(KEYS.AUDIT_LOGS) || '[]'),
  logAudit: (event: string, user: string, method?: string, severity: string = 'info') => {
    const logs = mockDB.getAuditLogs();
    const newLog = { id: Date.now(), timestamp: new Date().toISOString(), event, user, method: method || 'N/A', severity, ip: '127.0.0.1', location: 'Local', device: 'Chrome/Mac' };
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify([newLog, ...logs].slice(0, 500)));
    triggerUpdate();
  },
  exportLogsToCSV: () => {
    const logs = mockDB.getAuditLogs();
    const csv = 'Timestamp,Event,User,Severity\n' + logs.map((l:any) => `${l.timestamp},${l.event},${l.user},${l.severity}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit_logs.csv';
    link.click();
  },

  // --- ROLES & PERMS ---
  getRoles: () => JSON.parse(localStorage.getItem(KEYS.ROLES) || '[{"id":"super_admin","name":"Super Admin","description":"All privileges","permissions":["*"]}]'),
  saveRole: (role: any) => {
    const roles = mockDB.getRoles();
    const id = role.id || `role_${Date.now()}`;
    const newList = roles.find((r:any) => r.id === id) ? roles.map((r:any) => r.id === id ? { ...role, id } : r) : [...roles, { ...role, id }];
    localStorage.setItem(KEYS.ROLES, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteRole: (id: string) => {
    const newList = mockDB.getRoles().filter((r:any) => r.id !== id);
    localStorage.setItem(KEYS.ROLES, JSON.stringify(newList));
    triggerUpdate();
  },
  getDelegations: () => JSON.parse(localStorage.getItem(KEYS.DELEGATIONS) || '[]'),
  saveDelegation: (d: any) => {
    const list = mockDB.getDelegations();
    localStorage.setItem(KEYS.DELEGATIONS, JSON.stringify([{ ...d, id: Date.now().toString(), active: true }, ...list]));
    triggerUpdate();
  },
  revokeDelegation: (id: string) => {
    const list = mockDB.getDelegations().map((d:any) => d.id === id ? { ...d, active: false } : d);
    localStorage.setItem(KEYS.DELEGATIONS, JSON.stringify(list));
    triggerUpdate();
  },
  getApprovals: () => JSON.parse(localStorage.getItem(KEYS.APPROVALS) || '[]'),
  processApproval: (id: string, status: string) => {
    const list = mockDB.getApprovals().map((a:any) => a.id === id ? { ...a, status } : a);
    localStorage.setItem(KEYS.APPROVALS, JSON.stringify(list));
    triggerUpdate();
  },

  // --- BACKUPS ---
  getBackups: () => JSON.parse(localStorage.getItem(KEYS.BACKUPS) || '[]'),
  getBackupConfig: () => JSON.parse(localStorage.getItem(KEYS.BACKUP_CONFIG) || '{"retention":10,"autoBackup":true,"frequency":"daily"}'),
  saveBackupConfig: (c: any) => { localStorage.setItem(KEYS.BACKUP_CONFIG, JSON.stringify(c)); triggerUpdate(); },
  createBackup: (type: string, note: string) => {
    const bks = mockDB.getBackups();
    const newBk = { id: Date.now().toString(), timestamp: new Date().toISOString(), type, note, size: Math.random() * 5000000, version: '1.0.0' };
    localStorage.setItem(KEYS.BACKUPS, JSON.stringify([newBk, ...bks]));
    const cfg = mockDB.getBackupConfig();
    mockDB.saveBackupConfig({ ...cfg, lastBackup: newBk.timestamp });
    triggerUpdate();
  },
  // Fix: Added explicit return type with optional error property
  restoreBackup: (id: string): { success: boolean; error?: string } => ({ success: true }),
  deleteBackup: (id: string) => {
    const newList = mockDB.getBackups().filter((b:any) => b.id !== id);
    localStorage.setItem(KEYS.BACKUPS, JSON.stringify(newList));
    triggerUpdate();
  },
  downloadFullExport: () => {
    const data = { ...localStorage };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'full_export.json';
    link.click();
  },

  // --- MEDIA & DAM ---
  getMedia: () => JSON.parse(localStorage.getItem(KEYS.MEDIA) || '[]'),
  // Fix: Added explicit return type with optional error property
  addMedia: (m: any): { success: boolean; error?: string } => {
    const list = mockDB.getMedia();
    localStorage.setItem(KEYS.MEDIA, JSON.stringify([{ ...m, id: Date.now().toString() }, ...list]));
    triggerUpdate();
    return { success: true };
  },
  deleteMedia: (id: string) => {
    const list = mockDB.getMedia().filter((m:any) => m.id !== id);
    localStorage.setItem(KEYS.MEDIA, JSON.stringify(list));
    triggerUpdate();
  },
  getDamFolders: () => JSON.parse(localStorage.getItem(KEYS.DAM_FOLDERS) || '[{"id":"root","name":"Racine","parentId":null}]'),
  getDamAssets: () => JSON.parse(localStorage.getItem(KEYS.DAM_ASSETS) || '[]'),
  saveAsset: (a: any) => {
    const list = mockDB.getDamAssets();
    const id = a.id || Date.now().toString();
    const newList = list.find((x:any) => x.id === id) ? list.map((x:any) => x.id === id ? { ...a, id } : x) : [{ ...a, id, uploadedAt: new Date().toISOString() }, ...list];
    localStorage.setItem(KEYS.DAM_ASSETS, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteAsset: (id: string) => {
    const list = mockDB.getDamAssets().filter((a:any) => a.id !== id);
    localStorage.setItem(KEYS.DAM_ASSETS, JSON.stringify(list));
    triggerUpdate();
  },
  toggleAssetFavorite: (id: string) => {
    const list = mockDB.getDamAssets().map((a:any) => a.id === id ? { ...a, isFavorite: !a.isFavorite } : a);
    localStorage.setItem(KEYS.DAM_ASSETS, JSON.stringify(list));
    triggerUpdate();
  },
  optimizeAsset: (id: string) => {
    const list = mockDB.getDamAssets().map((a:any) => a.id === id ? { ...a, optimization: { status: 'optimized', originalSize: a.size, optimizedSize: '45 KB', savings: '65%', formats: ['webp', 'avif'], cdnUrl: a.url } } : a);
    localStorage.setItem(KEYS.DAM_ASSETS, JSON.stringify(list));
    triggerUpdate();
  },
  createFolder: (name: string, parentId: string) => {
    const folders = mockDB.getDamFolders();
    localStorage.setItem(KEYS.DAM_FOLDERS, JSON.stringify([...folders, { id: Date.now().toString(), name, parentId }]));
    triggerUpdate();
  },
  generateVideoTranscription: (id: string) => {
    const list = mockDB.getDamAssets().map((a:any) => a.id === id ? { ...a, videoMetadata: { ...a.videoMetadata, hasSubtitles: true, transcription: [{ start: '00:00', text: 'Hello world' }] } } : a);
    localStorage.setItem(KEYS.DAM_ASSETS, JSON.stringify(list));
    triggerUpdate();
  },
  batchProcessAssets: (ids: string[], action: string, config: any) => triggerUpdate(),

  // --- CRM & MARKETING ---
  getLeads: () => JSON.parse(localStorage.getItem(KEYS.LEADS) || '[]'),
  saveLead: (l: any) => {
    const leads = mockDB.getLeads();
    const id = l.id || `lead_${Date.now()}`;
    const newList = leads.find((x:any) => x.id === id) ? leads.map((x:any) => x.id === id ? { ...l, id } : x) : [{ ...l, id, timestamp: new Date().toISOString() }, ...leads];
    localStorage.setItem(KEYS.LEADS, JSON.stringify(newList));
    triggerUpdate();
  },
  updateLeadStatus: (id: string, status: string) => {
    const list = mockDB.getLeads().map((l:any) => l.id === id ? { ...l, status } : l);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(list));
    triggerUpdate();
  },
  deleteLead: (id: string) => {
    const newList = mockDB.getLeads().filter((l:any) => l.id !== id);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(newList));
    triggerUpdate();
  },
  getEmailCampaigns: () => JSON.parse(localStorage.getItem(KEYS.CAMPAIGNS) || '[]'),
  getEmailAutomations: () => JSON.parse(localStorage.getItem(KEYS.AUTOMATIONS) || '[]'),
  getSubscribers: () => JSON.parse(localStorage.getItem(KEYS.SUBSCRIBERS) || '[]'),
  saveCampaign: (c: any) => {
    const list = mockDB.getEmailCampaigns();
    const id = c.id || `camp_${Date.now()}`;
    const newList = list.find((x:any) => x.id === id) ? list.map((x:any) => x.id === id ? { ...c, id } : x) : [c, ...list];
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteCampaign: (id: string) => {
    const newList = mockDB.getEmailCampaigns().filter((c:any) => c.id !== id);
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(newList));
    triggerUpdate();
  },
  getPromotions: () => JSON.parse(localStorage.getItem(KEYS.PROMOTIONS) || '[]'),
  getProducts: () => JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]'),
  savePromotion: (p: any) => {
    const list = mockDB.getPromotions();
    const id = p.id || `promo_${Date.now()}`;
    const newList = list.find((x:any) => x.id === id) ? list.map((x:any) => x.id === id ? { ...p, id } : x) : [{ ...p, id, usage: 0, maxUsage: 100 }, ...list];
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(newList));
    triggerUpdate();
  },
  deletePromotion: (id: string) => {
    const newList = mockDB.getPromotions().filter((p:any) => p.id !== id);
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(newList));
    triggerUpdate();
  },
  getLoyaltyData: () => JSON.parse(localStorage.getItem(KEYS.LOYALTY) || '{"config":{"silver":1000,"gold":5000,"platinum":10000},"members":[]}'),

  // --- ECOMMERCE & INVENTORY ---
  getInventory: () => JSON.parse(localStorage.getItem(KEYS.INVENTORY) || '[]'),
  updateInventory: (i: any) => {
    const list = mockDB.getInventory();
    const newList = list.map((x:any) => x.id === i.id ? i : x);
    localStorage.setItem(KEYS.INVENTORY, JSON.stringify(newList));
    triggerUpdate();
  },
  getInvoices: () => JSON.parse(localStorage.getItem(KEYS.INVOICES) || '[]'),

  // --- SEO & PAGES ---
  getSeoData: () => JSON.parse(localStorage.getItem(KEYS.SEO_DATA) || '{}'),
  saveSeoData: (d: any) => { localStorage.setItem(KEYS.SEO_DATA, JSON.stringify(d)); triggerUpdate(); },
  getPageVersions: (pageId: string) => JSON.parse(localStorage.getItem(KEYS.PAGE_VERSIONS) || '[]').filter((v:any) => v.pageId === pageId),
  savePageVersion: (pageId: string, name: string, elements: any[]) => {
    const list = JSON.parse(localStorage.getItem(KEYS.PAGE_VERSIONS) || '[]');
    localStorage.setItem(KEYS.PAGE_VERSIONS, JSON.stringify([{ id: Date.now().toString(), pageId, name, elements, timestamp: new Date().toISOString() }, ...list]));
    triggerUpdate();
  },
  deletePageVersion: (id: string) => {
    const list = JSON.parse(localStorage.getItem(KEYS.PAGE_VERSIONS) || '[]').filter((v:any) => v.id !== id);
    localStorage.setItem(KEYS.PAGE_VERSIONS, JSON.stringify(list));
    triggerUpdate();
  },
  savePage: (p: any) => triggerUpdate(),

  // --- AI & AUTOMATION ---
  getAIHistory: () => JSON.parse(localStorage.getItem(KEYS.AI_HISTORY) || '[]'),
  saveAIHistory: (e: any) => {
    const list = mockDB.getAIHistory();
    localStorage.setItem(KEYS.AI_HISTORY, JSON.stringify([e, ...list].slice(0, 50)));
    triggerUpdate();
  },
  getAutomationRules: () => JSON.parse(localStorage.getItem(KEYS.AUTOMATION_RULES) || '[]'),
  saveAutomationRule: (r: any) => {
    const list = mockDB.getAutomationRules();
    const id = r.id || `rule_${Date.now()}`;
    const newList = list.find((x:any) => x.id === id) ? list.map((x:any) => x.id === id ? { ...r, id } : x) : [{ ...r, id }, ...list];
    localStorage.setItem(KEYS.AUTOMATION_RULES, JSON.stringify(newList));
    triggerUpdate();
  },
  deleteAutomationRule: (id: string) => {
    const newList = mockDB.getAutomationRules().filter((r:any) => r.id !== id);
    localStorage.setItem(KEYS.AUTOMATION_RULES, JSON.stringify(newList));
    triggerUpdate();
  },

  // --- DEVELOPER & API ---
  getApiKeys: () => JSON.parse(localStorage.getItem(KEYS.API_KEYS) || '[]'),
  generateApiKey: (name: string) => {
    const list = mockDB.getApiKeys();
    const key = `sk_live_${Math.random().toString(36).substring(2, 24)}`;
    localStorage.setItem(KEYS.API_KEYS, JSON.stringify([{ id: Date.now().toString(), name, key, created: new Date().toISOString() }, ...list]));
    triggerUpdate();
  },
  revokeApiKey: (id: string) => {
    const list = mockDB.getApiKeys().filter((k:any) => k.id !== id);
    localStorage.setItem(KEYS.API_KEYS, JSON.stringify(list));
    triggerUpdate();
  },
  getWebhooks: () => JSON.parse(localStorage.getItem(KEYS.WEBHOOKS) || '[]'),
  saveWebhook: (w: any) => {
    const list = mockDB.getWebhooks();
    localStorage.setItem(KEYS.WEBHOOKS, JSON.stringify([{ ...w, id: Date.now().toString() }, ...list]));
    triggerUpdate();
  },
  deleteWebhook: (id: string) => {
    const list = mockDB.getWebhooks().filter((w:any) => w.id !== id);
    localStorage.setItem(KEYS.WEBHOOKS, JSON.stringify(list));
    triggerUpdate();
  },
  getIntegrations: () => JSON.parse(localStorage.getItem(KEYS.INTEGRATIONS) || '[]'),
  saveIntegration: (i: any) => {
    const list = mockDB.getIntegrations();
    const newList = list.find((x:any) => x.id === i.id) ? list.map((x:any) => x.id === i.id ? i : x) : [...list, i];
    localStorage.setItem(KEYS.INTEGRATIONS, JSON.stringify(newList));
    triggerUpdate();
  },

  // --- COLLABORATION ---
  getComments: () => JSON.parse(localStorage.getItem(KEYS.COMMENTS) || '[]'),
  addComment: (c: any) => {
    const list = mockDB.getComments();
    localStorage.setItem(KEYS.COMMENTS, JSON.stringify([{ ...c, id: Date.now().toString(), timestamp: new Date().toISOString() }, ...list]));
    triggerUpdate();
  },
  resolveComment: (id: string) => {
    const list = mockDB.getComments().map((c:any) => c.id === id ? { ...c, resolved: true } : c);
    localStorage.setItem(KEYS.COMMENTS, JSON.stringify(list));
    triggerUpdate();
  },

  // --- REPORTING & BI ---
  getCustomDashboards: () => JSON.parse(localStorage.getItem(KEYS.CUSTOM_DASHBOARDS) || '[]'),
  getScheduledReports: () => JSON.parse(localStorage.getItem(KEYS.SCHEDULED_REPORTS) || '[]'),
  saveScheduledReport: (r: any) => {
    const list = mockDB.getScheduledReports();
    localStorage.setItem(KEYS.SCHEDULED_REPORTS, JSON.stringify([{ ...r, id: Date.now().toString() }, ...list]));
    triggerUpdate();
  },
  deleteScheduledReport: (id: string) => {
    const list = mockDB.getScheduledReports().filter((r:any) => r.id !== id);
    localStorage.setItem(KEYS.SCHEDULED_REPORTS, JSON.stringify(list));
    triggerUpdate();
  },
  getBenchmarkData: () => JSON.parse(localStorage.getItem(KEYS.BENCHMARK) || '{"goals":{"revenue":5000000,"visitors":10000,"conversion":3}}'),
  saveSharedLink: (l: any) => triggerUpdate(),

  // --- OTHERS ---
  getPerfConfig: () => JSON.parse(localStorage.getItem(KEYS.PERF_CONFIG) || '{}'),
  savePerfConfig: (c: any) => { localStorage.setItem(KEYS.PERF_CONFIG, JSON.stringify(c)); triggerUpdate(); },
  purgeCache: (type: string) => new Promise(r => setTimeout(r, 1000)),
  exportData: (type: string, format: string) => {
    const data = localStorage.getItem(`mgs_db_${type}`);
    const blob = new Blob([data || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}_export.${format}`;
    link.click();
  },
  // Fix: Removed duplicate getUsers, getAuditLogs, getRoles, getDelegations, getApprovals at the end of the object.
  getUsers: () => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  isTourCompleted: () => localStorage.getItem(KEYS.TOUR_COMPLETED) === 'true',
  completeTour: () => { localStorage.setItem(KEYS.TOUR_COMPLETED, 'true'); triggerUpdate(); }
};