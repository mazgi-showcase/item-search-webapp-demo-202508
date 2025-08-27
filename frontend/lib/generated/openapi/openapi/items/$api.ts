import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_id@string'
import type { Methods as Methods2 } from './findByText/_text@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/openapi/items'
  const PATH1 = '/openapi/items/findByText'
  const GET = 'GET'
  const POST = 'POST'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * @returns Return the item.
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option).json(),
        /**
         * @returns Return the item.
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
    findByText: {
      _text: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          /**
           * @returns Return matched items.
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['get']['resBody'],
              BasicHeaders,
              Methods2['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * @returns Return matched items.
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['get']['resBody'],
              BasicHeaders,
              Methods2['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
    },
    post: (option: {
      body: Methods0['post']['reqBody']
      config?: T | undefined
    }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option,
      ).send(),
    $post: (option: {
      body: Methods0['post']['reqBody']
      config?: T | undefined
    }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option,
      )
        .send()
        .then((r) => r.body),
    /**
     * @returns Return all items.
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    /**
     * @returns Return all items.
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
