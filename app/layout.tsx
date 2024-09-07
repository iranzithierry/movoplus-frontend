import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { getUser } from '@/lib/helpers/auth';
import { Suspense, cache, use } from 'react';
import type { Metadata, Viewport } from 'next';
import { displayFont, monoFont } from '@/lib/fonts';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/components/base/providers';
import { GlobalProvider } from '@/contexts/global-context';

export const metadata: Metadata = {
  title: {
    default: 'Movo+',
    template: `%s | Movo+`,
  },
  description: 'Global marketplace for sellers of T-shirts & Shoes',
  applicationName: 'Movo+',
  keywords: 'movo plus, movo+, sell online, sell shoes, sell t-shirts',
  icons: {
    icon: [
      {
        url: '/images/favicons/favicon-dark.ico',
        type: 'ico',
        sizes: '256x256',
        media: '(prefers-color-scheme: light)',
        fetchPriority: 'high',
      },
      {
        url: '/images/favicons/favicon-light.ico',
        type: 'ico',
        sizes: '256x256',
        media: '(prefers-color-scheme: dark)',
        fetchPriority: 'high',
      },
    ],
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  colorScheme: 'light',
};

const getUserData = cache(async () => {
  // @ts-ignore
  const { user, accessToken } = await getUser();
  return { user, accessToken };
});

function AuthWrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  const { user, accessToken } = use(getUserData());
  return (
    <AuthProvider user={user} accessToken={accessToken}>
      {children}
    </AuthProvider>
  );
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background font-sans antialiased', displayFont.variable, monoFont.variable)}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <AuthWrapper> */}
            <GlobalProvider>
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                <Toaster closeButton richColors position="top-right" duration={2000} />
                {process.env.MAINTENANCE == 'true' ? <div>The Site Is Under Maintainence</div> : children}
              </ThemeProvider>
            </GlobalProvider>
          {/* </AuthWrapper> */}
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
