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
    DASHBOARD: '/recruiter',
    JOBS: {
      LIST: '/recruiter/job',
      CREATE: '/recruiter/job/posting',
      EDIT: (id: string) => `/recruiter/job/${id}`
      // DETAIL: (id: string) => `/recruiter/jobs/${id}`,
    },
    JOBSEEKER: {
      INVITATION_LISTING: '/recruiter/invitation-listing',
      SEARCH: '/recruiter/job-seeker/search',
      DETAIL: (id: string) => `/recruiter/job-seeker/${id}`
    },
    SETTINGS: {
      COMPANY_GENERAL: '/recruiter/company-general',
      MY_ACCOUNT: '/recruiter/my-account'
    }
  },

  // Job Seeker routes
  JOBSEEKER: {
    // DASHBOARD: '/jobseeker/dashboard',
    PROFILE: '/user/profile',
    JOBS: {
      SEARCH: '/jobs-search',
      DETAIL: (id: string) => `/job/${id}`,
      APPLIED: '/jobseeker/jobs/applied',
      SAVED: '/jobseeker/jobs/saved'
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
