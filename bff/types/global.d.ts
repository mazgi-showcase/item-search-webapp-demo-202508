declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly DATABASE_URL: string
    readonly DATABASE_URL_REPLICA_0: string
    readonly DATABASE_URL_REPLICA_1: string
  }
}
