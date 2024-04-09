import type { AppProps } from "next/app"
import { AppStoreProvider } from "@/lib/hooks/useAppStore"
import { AuthProvider } from '@/lib/hooks/useAuth'
import "@/styles/globals.scss"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AppStoreProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </AppStoreProvider>
    )
}
