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
      LIST: '/recruiter/job-listing',
      CREATE: '/recruiter/job-posting'
      // EDIT: (id: string) => `/recruiter/jobs/${id}/edit`,
      // DETAIL: (id: string) => `/recruiter/jobs/${id}`,
    },
    JOBSEEKER: {
      INVITATION_LISTING: '/recruiter/invitation_listing',
      SEARCH: '/recruiter/jobseeker-search'
      // DETAIL: (id: string) => `/recruiter/candidates/${id}`,
    },
    SETTINGS: {
      COMPANY_GENERAL: '/recruiter/company-general',
      MY_ACCOUNT: '/recruiter/my-account'
    }
  },

  // Job Seeker routes
  JOBSEEKER: {
    DASHBOARD: '/jobseeker/dashboard',
    PROFILE: '/jobseeker/profile',
    JOBS: {
      SEARCH: '/jobs/search',
      DETAIL: (id: string) => `/jobs/${id}`,
      APPLIED: '/jobseeker/jobs/applied',
      SAVED: '/jobseeker/jobs/saved'
    },
    COMPANIES: {
      LIST: '/companies',
      DETAIL: (id: string) => `/companies/${id}`
    }
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
