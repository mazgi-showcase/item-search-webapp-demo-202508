import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './openapi/items'
import type { Methods as Methods1 } from './openapi/items/_id@string'
import type { Methods as Methods2 } from './openapi/items/findByText/_text@string'
import type { Methods as Methods3 } from './openapi/status'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/openapi/items'
  const PATH1 = '/openapi/items/findByText'
  const PATH2 = '/openapi/status'
  const GET = 'GET'
  const POST = 'POST'

  return {
    openapi: {
      items: {
        _id: (val2: string) => {
          const prefix2 = `${PATH0}/${val2}`

          return {
            /**
             * @returns Return the item.
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods1['get']['resBody'],
                BasicHeaders,
                Methods1['get']['status']
              >(prefix, prefix2, GET, option).json(),
            /**
             * @returns Return the item.
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods1['get']['resBody'],
                BasicHeaders,
                Methods1['get']['status']
              >(prefix, prefix2, GET, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
        findByText: {
          _text: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`

            return {
              /**
               * @returns Return matched items.
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods2['get']['resBody'],
                  BasicHeaders,
                  Methods2['get']['status']
                >(prefix, prefix3, GET, option).json(),
              /**
               * @returns Return matched items.
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods2['get']['resBody'],
                  BasicHeaders,
                  Methods2['get']['status']
                >(prefix, prefix3, GET, option)
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
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
      },
      status: {
        /**
         * @returns The service status.
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods3['get']['resBody'],
            BasicHeaders,
            Methods3['get']['status']
          >(prefix, PATH2, GET, option).json(),
        /**
         * @returns The service status.
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods3['get']['resBody'],
            BasicHeaders,
            Methods3['get']['status']
          >(prefix, PATH2, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
