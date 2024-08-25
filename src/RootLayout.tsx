import { Outlet, useHref, useNavigate, type NavigateOptions } from "react-router-dom";
import { darkTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum';
import './App.css'
import Logo from './Star_Wars_Logo.svg'



function RootLayout() {
  const navigate = useNavigate();

  return (
    <SpectrumProvider theme={darkTheme} router={{ navigate, useHref }}>
      <div className='flex flex-col items-center bg-black h-[100vh]'>
        <img src={Logo} alt='star wars logo' className="mb-5" />
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