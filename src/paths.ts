export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    userDetail: '/userDetail',
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    resume: '/dashboard/resume',
    apply: '/dashboard/apply',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
