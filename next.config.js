/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'globalThis.__DEV__': false,
      })
    );
    return config
  },
}

module.exports = nextConfig
