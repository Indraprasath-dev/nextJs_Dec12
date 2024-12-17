import { MAX_VISIBLE_SKILLS } from '@/constants/constants';
import styles from './memberCard.module.css';


interface MemberListProps {
    member: any;
}

const Card = ({ member }: MemberListProps) => {
    return (

        <div className={styles.card}>
            <div className={styles.card__imagecontainer}>
                <div className={styles.card__imagecontainer__image}>
                    <img
                        src="./photo.jpg"
                        alt="photo"
                        // style={{ width: '80px', height: '80px' }}
                    />
                </div>
            </div>
            <div className={styles.card__details}>
                <div className={styles.card__details__container}>
                    <div className={styles.card__details__container__name}>
                        {member.name}
                    </div>
                    <div className={styles.card__details__container__name__region}>
                        {member.location?.continent || "-"}
                    </div>
                    <div className={styles.card__details__container__name__region__country}>
                        {member.location?.country || "-"}
                    </div>
                </div>
            </div>

            <div className={styles.card__skills}>
                <span className={styles.card__skills__span}></span>
                <div className={styles.card__skills__divider__list}>
                    {member.skills?.slice(0, MAX_VISIBLE_SKILLS).map((skill: any) => (
                        <div className={styles.member__product} key={skill.uid}>
                            {skill.title}
                        </div>
                    ))}
                    {member.skills.length > MAX_VISIBLE_SKILLS && (
                        <div className={styles.member__product__tooltip}>
                            +{member.skills.length - MAX_VISIBLE_SKILLS}
                            <div className={styles.tooltiptext}>
                                {member.skills.slice(MAX_VISIBLE_SKILLS).map((skill: any) => (
                                    <div key={skill.uid}>{skill.title}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;