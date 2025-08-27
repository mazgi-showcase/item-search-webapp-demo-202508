import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import { Status } from '~/lib/generated/openapi/@types'

const { publicRuntimeConfig } = getConfig()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>
) {
  res.status(200).json({
    name: publicRuntimeConfig.PACKAGE_NAME,
    environment: process.env.NODE_ENV,
    state: 'healthy',
    version: publicRuntimeConfig.PACKAGE_VERSION,
  })
}
