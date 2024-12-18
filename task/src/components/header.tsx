import React from "react";
import styles from './header.module.css';

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__navigation}>
                    <div className={styles.header__navigation__logo}>
                        <img src="/pblogo.svg" alt="Logo" />
                    </div>

                    <div className={styles.header__navigation__menu}>
                        <ul className={styles.header__navigation__menu__list}>
                            <li className={styles.header__navigation__menu__list__item}>
                                <a className={styles.header__navigation__menu__list__item__link}>
                                    <img src="/team.svg" alt="Teams" />
                                    Teams
                                </a>
                            </li>
                            <li className={styles.header__navigation__menu__list__item__link__active}>
                                <a className={styles.header__navigation__menu__list__item__link}>
                                    <img src="/members.svg" alt="Members" />
                                    Members
                                </a>
                            </li>
                            <li className={styles.header__navigation__menu__list__item}>
                                <a className={styles.header__navigation__menu__list__item__link}>
                                    <img src="/projects.svg" alt="Projects" />
                                    Projects
                                </a>
                            </li>
                            <li className={styles.header__navigation__menu__list__item}>
                                <a className={styles.header__navigation__menu__list__item__link}>
                                    <img src="/calendar.svg" alt="IRL Gathering" />
                                    IRL Gathering
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.header__actions}>
                    <div className={styles.header__actions__item}>
                        <button className={styles.header__actions__item__button__question}>
                            <img src="./question.svg" alt="Help" />
                        </button>
                    </div>
                    <div className={styles.header__actions__item}>
                        <button className={styles.header__actions__item__button__join}>
                            Join the network
                            <div className={styles.header__actions__item__button__icon}>
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M3.61427 5.53233C3.81426 5.77481 4.18574 5.77481 4.38573 5.53233L7.65534 1.56814C7.92431 1.24202 7.69234 0.75 7.26961 0.75L0.730393 0.75C0.307659 0.75 0.0756859 1.24202 0.344665 1.56814L3.61427 5.53233Z" fill="currentColor"> </path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div className={styles.header__actions__item}>
                        <button className={styles.header__actions__item__button__login}>
                            Login
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
