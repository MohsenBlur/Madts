import type { NextConfig } from 'next'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx', 'md'],
}

export default withMDX(nextConfig)
