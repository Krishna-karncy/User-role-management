
import { ConfigProvider, App } from "antd"
import ThemeConfig from "./config/ThemeConfig"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const AppComponent = () => {

  return (
    <ConfigProvider theme={ThemeConfig}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App>
            <RouterProvider router={router} />
          </App>
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  )
}

export default AppComponent