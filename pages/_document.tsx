import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { Locales } from '../types/enums';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { locale: string }> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || Locales.EN };
  }

  render() {
    return (
      <Html
        dir={this.props.locale === Locales.AR ? 'rtl' : 'ltr'}
        lang={this.props.locale}
      >
        <Head>
          <link
            rel="preload"
            as="font"
            href="/fonts/merriweather-sans/merriweather-sans-v26-latin-regular.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/vazirmatn/vazirmatn-v13-latin-regular.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/outfit/outfit-v11-latin-regular.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
