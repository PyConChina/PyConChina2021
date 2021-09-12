import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Footer = function () {
  const { t } = useTranslation('common');
  return (
    <div className="columns has-text-centered">
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
          <a href="mailto:conference@python-china.org.cn">conference@python-china.org.cn</a>
        </p>
      </div>
      <div className="column">
        <p className="title is-6">{t('about')}</p>
        <p>
          <Link href="/about">
            <a>PyCon China</a>
          </Link>
        </p>
        <p>
          <Link href="/coc">
            <a>{t('coc')}</a>
          </Link>
        </p>
      </div>

      <div className="column">
        <p className="title is-6">{t('conference')}</p>
        <p>
          <Link href="/schedule">
            <a>{t('schedule')}</a>
          </Link>
        </p>
        <p>
          <Link href="/cfp">
            <a>{t('cfp')}</a>
          </Link>
        </p>
      </div>
      <div className="column">
        <p className="title is-6">{t('meetup')}</p>
        <p>
          <a href="#">{t('beijing')}</a>
        </p>
        <p>
          <a href="#">{t('shanghai')}</a>
        </p>
        <p>
          <a href="#">{t('shenzhen')}</a>
        </p>
        <p>
          <a href="#">{t('hangzhou')}</a>
        </p>
      </div>
      <div className="column">
        <p className="title is-6">{t('staff')}</p>
        <p>
          <Link href="/staff"><a href="#">{t('volunteers')}</a></Link>
        </p>
        <p>
          <Link href="/joinus">
            <a>{t('joinus')}</a>
          </Link>
        </p>
      </div>
      <div className="column">
        <p className="title is-6">{t('derivatives')}</p>
        <p>
          <a href="https://www.wjx.cn/vm/r20RGqF.aspx">{t('survey')}</a>
        </p>
        <p>
          <Link href="/souvenir"><a>{t('souvenir')}</a></Link>
        </p>
      </div>
      <div className="column">
        <p className="title is-6">{t('history')}</p>
        <div className="columns is-centered is-mobile">
          <div className="column is-narrow p-0">
            <ul>
              <li>
                <a href="/2011" target="_blank">
                  2011
                </a>
              </li>
              <li>
                <a href="/2012" target="_blank">
                  2012
                </a>
              </li>
              <li>
                <a href="/2013" target="_blank">
                  2013
                </a>
              </li>
              <li>
                <a href="/2014" target="_blank">
                  2014
                </a>
              </li>
              <li>
                <a href="/2015" target="_blank">
                  2015
                </a>
              </li>
            </ul>
          </div>
          <div className="column is-narrow py-0">
            <ul>
              <li>
                <a href="/2016" target="_blank">
                  2016
                </a>
              </li>
              <li>
                <a href="/2017" target="_blank">
                  2017
                </a>
              </li>
              <li>
                <a href="/2018" target="_blank">
                  2018
                </a>
              </li>
              <li>
                <a href="/2019" target="_blank">
                  2019
                </a>
              </li>
              <li>
                <a href="/2020" target="_blank">
                  2020
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
