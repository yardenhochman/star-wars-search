import { Outlet, useHref, useNavigate, type NavigateOptions } from "react-router-dom";
import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum';
import './App.css'

function RootLayout() {
  const navigate = useNavigate();

  return (
    <SpectrumProvider theme={defaultTheme} router={{ navigate, useHref }}>
      <div className='flex flex-col items-center justify-center'>
        <Outlet />
      </div>
    </SpectrumProvider>
  )
}

export default RootLayout


declare module '@adobe/react-spectrum' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}