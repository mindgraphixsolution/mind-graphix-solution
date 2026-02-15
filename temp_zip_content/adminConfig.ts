
// Configuration sécurisée (simulation) pour l'accès Admin
export const ADMIN_CREDENTIALS = {
  email: "admin@mindgraphix.com",
  password: "MGS_Admin_2025!", // À changer en production via variables d'environnement
  name: "Super Admin",
  role: "Administrator"
};

export const ADMIN_CONFIG = {
  dashboardName: "MGS Control Tower",
  version: "1.0.0-beta",
  modules: {
    inbox: true,
    portfolio: true,
    users: true,
    settings: true
  }
};
