import { MAX_VISIBLE_SKILLS } from '@/constants/constants';
import styles from './memberCard.module.css';
import { Member } from './memberList';


interface MemberListProp {
    member: Member;
}

const Card = ({ member }: MemberListProp) => {
    return (

        <div className={styles.card}>
            <div className={styles.card__imagecontainer}>
                <div className={styles.card__imagecontainer__image}>
                    <img src="./photo.jpg" alt="photo" />
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
                <div className={styles.card__skills__list}>
                    {member.skills?.slice(0, MAX_VISIBLE_SKILLS).map((skill: any) => (
                        <div className={styles.card__skills__list__product} key={skill.uid}>
                            {skill.title}
                        </div>
                    ))}
                    {member.skills.length > MAX_VISIBLE_SKILLS && (
                        <div className={styles.card__skills__list__tooltip}>
                            +{member.skills.length - MAX_VISIBLE_SKILLS}
                            <div className={styles.card__skills__list__tooltip__tooltiptext}>
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