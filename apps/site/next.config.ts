import type { NextConfig } from 'next'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx', 'md'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

export default withMDX(nextConfig)
