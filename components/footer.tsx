import { useTranslation } from 'next-export-i18n';

const Footer = function () {
  const { t } = useTranslation();
  return (
    <div className="columns has-text-centered footer-body">
      <div className="column">
        <p className="pl-1">© 2021 PyCon China</p>
        <div className="social-links is-size-4 mt-2">
          <a
            className="icon-text mx-2"
            target="_blank"
            rel="noreferrer"
            href="https://pychina.org/#gh"
            title={t('weixin')}
          >
            <span className="icon">
              <i className="fab fa-weixin" />
            </span>
          </a>
          <a
            className="icon-text mx-2"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/PyConChina"
            title="Twitter"
          >
            <span className="icon">
              <i className="fab fa-twitter" />
            </span>
          </a>
          <a
            className="icon-text mx-2"
            target="_blank"
            rel="noreferrer"
            href="https://facebook.com/PyConChina"
            title="Facebook"
          >
            <span className="icon">
              <i className="fab fa-facebook" />
            </span>
          </a>
          <a
            className="icon-text mx-2"
            target="_blank"
            rel="noreferrer"
            href="https://weibo.com/PyConCN"
            title={t('weibo')}
          >
            <span className="icon">
              <i className="fab fa-weibo" />
            </span>
          </a>
          <a
            className="icon-text mx-2"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/PyConChina"
            title="GitHub"
          >
            <span className="icon">
              <i className="fab fa-github" />
            </span>
          </a>
        </div>
        <p>
          <a href="mailto:conference@python-china.org.cn" target="_blank" rel="noreferrer">
            {t('contact-us')}
          </a>
          <a
            href="https://github.com/PyConChina/PyConChina2021/issues/new"
            target="_blank"
            rel="noreferrer"
            className="ml-4"
          >
            {t('report-bugs')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
