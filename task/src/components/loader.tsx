import styles from "./loader.module.css";

const Loader = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__container}>
                    <div className={styles.wrapper__container__spinner}></div>
                    <div className={styles.wrapper__container__spinner__text}>
                        Loading...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
