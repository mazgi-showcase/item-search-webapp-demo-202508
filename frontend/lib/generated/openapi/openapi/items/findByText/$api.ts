import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './_text@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/openapi/items/findByText'
  const GET = 'GET'

  return {
    _text: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * @returns Return matched items.
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option).json(),
        /**
         * @returns Return matched items.
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
