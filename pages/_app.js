import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <Script src="https://kit.fontawesome.com/60c391129f.js" crossorigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);

export default App;
