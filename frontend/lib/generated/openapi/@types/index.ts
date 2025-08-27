/* eslint-disable */
export type Item = {
  /** The unique ID of the Item */
  id: string
  /** Any text. */
  text: string
}

export type Status = {
  /** The service name of BFF */
  name: string
  /** The service environment of BFF */
  environment: string
  /** The state of BFF */
  state: 'healthy' | 'unhealthy'
  /** The semantic version of BFF */
  version: string
}
