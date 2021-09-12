import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const TextPage = ({ children }: { children: string }) => (
  <div className="container py-6">
    <div className="content px-2">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
    </div>
  </div>
);

export default TextPage;
