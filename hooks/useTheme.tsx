/**
 * this is a hook which provides data regarding theme
 * and its configurations
 */
import React, {useContext, createContext, useState, useEffect} from 'react'
import Head from 'next/head'

/**
 * the main themes available for the whole website's pages
 * next the same in form of array to get it right away
 * and next up we have our default theme (globally)
 */
export type ThemeName =
    | 'light-blue'
    | 'light-yellow'
    | 'light-red'
    | 'light-green'
    | 'light-black'
export const ThemeNameAvailable: ThemeName[] = [
    'light-blue',
    'light-yellow',
    'light-red',
    'light-green',
    'light-black',
]
/**
 * these colors are mapped to colors specific to google
 * and its fours primary color theme
 */
export const ThemePrimaryColorMapping: {[key: string]: string} = {
    'light-blue': '#4285F4',
    'light-yellow': '#F4B400',
    'light-red': '#DB4437',
    'light-green': '#0F9D58',
    'light-black': '#101010',
}
export const DEFAULT_THEME_NAME: ThemeName = 'light-blue'

/**
 * must provide these data to the context
 * so that we could use those throughout the web page
 */
export interface ThemeContextModal {
    light: boolean
    themeName: ThemeName
    changeTheme(themeName: ThemeName): void
    toggleTheme(): void
    randomizeTheme(): void
}
const ThemeContext = createContext<ThemeContextModal>({
    light: true,
    themeName: 'light-blue',
    changeTheme: (_themeName: ThemeName) => {},
    toggleTheme: () => {},
    randomizeTheme: () => {},
})

export interface ThemeProviderProps {
    children: React.ReactNode
}
export default function ThemeProvider({children}: ThemeProviderProps) {
    const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME)

    /**
     * this function is used to change the theme
     * @param {ThemeName} themeName - name of the theme
     */
    const changeTheme = (themeName: ThemeName) => {
        if (ThemeNameAvailable.includes(themeName)) {
            setThemeName(themeName)
        }
    }

    /**
     * this method just changes the theme to the next one in the
     * available themes list
     */
    const toggleTheme = () => {
        const index = ThemeNameAvailable.indexOf(themeName)
        const nextIndex = (index + 1) % ThemeNameAvailable.length
        changeTheme(ThemeNameAvailable[nextIndex])
    }

    /**
     * this function is used to set the theme
     * to a random theme from the available themes list
     */
    const randomizeTheme = () => {
        const randomTheme =
            ThemeNameAvailable[
                Math.floor(Math.random() * ThemeNameAvailable.length)
            ]
        changeTheme(randomTheme)
    }

    /**
     * at the initial loading of website we will set a random theme
     * NOTE: totally optional
     */
    useEffect(() => {
        // randomizeTheme()
    }, [])

    const themeValues: ThemeContextModal = {
        light: themeName.includes('light'),
        themeName,
        changeTheme,
        toggleTheme,
        randomizeTheme,
    }
    return (
        <ThemeContext.Provider value={themeValues}>
            <Head>
                <meta
                    name="theme-color"
                    content={ThemePrimaryColorMapping[themeName]}
                />
            </Head>

            <div className={`theme-${themeName}`}>{children}</div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
