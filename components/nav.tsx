/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next//router';
import { useTranslation } from 'next-i18next';

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const Nav = function () {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleRouteChange = () => {
      setActive(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img src="/2021/assets/images/logo2021.png" alt="pychina" />
            <span className="ml-2 has-text-weight-bold">PyCon China</span>
          </a>
        </Link>

        <a
          role="button"
          className={cn('navbar-burger', { 'is-active': active })}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setActive((state) => !state)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={cn('navbar-menu', { 'is-active': active })}>
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{t('about')}</a>

            <div className="navbar-dropdown">
              <Link href="/about">
                <a className="navbar-item">PyCon China</a>
              </Link>
              <Link href="/coc">
                <a className="navbar-item">{t('coc')}</a>
              </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{t('conference')}</a>

            <div className="navbar-dropdown">
              <Link href="/schedule">
                <a className="navbar-item">{t('schedule')}</a>
              </Link>
              <Link href="/cfp">
                <a className="navbar-item">{t('cfp')}</a>
              </Link>
              <Link href="/video-guide">
                <a className="navbar-item">{t('video-guide')}</a>
              </Link>
              <Link href="/souvenir">
                <a className="navbar-item">{t('souvenir')}</a>
              </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{t('meetup')}</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">{t('beijing')}</a>
              <a className="navbar-item">{t('shanghai')}</a>
              <a href="http://hdxu.cn/t2YgP" className="navbar-item">
                {t('shenzhen')}
              </a>
              <a className="navbar-item">{t('hangzhou')}</a>
              <a className="navbar-item">{t('changsha')}</a>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{t('staff')}</a>

            <div className="navbar-dropdown">
              <Link href="/staff">
                <a className="navbar-item">{t('staff_list')}</a>
              </Link>
              <Link href="/joinus">
                <a className="navbar-item">{t('joinus')}</a>
              </Link>
            </div>
          </div>
          <a
            className="navbar-item"
            href="https://www.wjx.cn/vm/r20RGqF.aspx"
            target="_blank"
            rel="noreferrer"
          >
            {t('survey')}
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{t('history')}</a>

            <div className="navbar-dropdown">
              {range(2011, 2021).map((year) => (
                <a
                  className="navbar-item"
                  target="_blank"
                  href={`/${year}`}
                  key={year}
                  rel="noreferrer"
                >
                  {year}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link href={router.asPath} locale={router.locale === 'zh' ? 'en' : 'zh'}>
                <a className="button is-rounded">{t('locale')}</a>
              </Link>
              <a
                className="button is-primary is-rounded"
                href="https://www.huodongxing.com/event/9618480117522"
                target="_blank"
                rel="noreferrer"
              >
                <strong>{t('purchase')}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
