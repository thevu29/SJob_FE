export const ROUTES = {
  HOME: '/',

  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },

  // Recruiter routes
  RECRUITER: {
    DASHBOARD: '/recruiter-dashboard',
    JOBS: {
      LIST: '/recruiter-dashboard/job',
      CREATE: '/recruiter-dashboard/job/posting',
      EDIT: (id: string) => `/recruiter-dashboard/job/${id}`
    },
    JOBSEEKER: {
      INVITATION_LISTING: '/recruiter-dashboard/invitation-listing',
      SEARCH: '/recruiter-dashboard/job-seeker/search',
      DETAIL: (id: string) => `/recruiter-dashboard/job-seeker/${id}`
    },
    SETTINGS: {
      COMPANY_GENERAL: '/recruiter-dashboard/company-general',
      MY_ACCOUNT: '/recruiter-dashboard/my-account'
    }
  },

  // Job Seeker routes
  JOBSEEKER: {
    // DASHBOARD: '/jobseeker/dashboard',
    PROFILE: '/user/profile',
    JOBS: {
      SEARCH: '/job',
      DETAIL: (id: string) => `/job/${id}`,
      APPLIED: '/user/jobs/applied',
      SAVED: '/user/jobs/saved',
      VIEWED: '/user/jobs/viewed'
    },
    SETTINGS: '/user/setting-accounts'
  },

  // Error pages
  ERROR: {
    NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
    UNAUTHORIZED: '/401',
    FORBIDDEN: '/403'
  }
} as const;

// Helper type for type-safe route access
export type AppRoutes = typeof ROUTES;
