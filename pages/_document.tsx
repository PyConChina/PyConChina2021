import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="has-navbar-fixed-top">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
