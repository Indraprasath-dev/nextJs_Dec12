import { MAX_VISIBLE_SKILLS } from "@/constants/constants";
import styles from "./listCard.module.css";

const ListCard = ({member}: any) => {

    return (
        <div className={styles.listCard}>
            <div className={styles.listCard__details}>
                <div className={styles.listCard__image}>
                    <img src="./photo.jpg" alt="photo" />
                </div>
                <div className={styles.listCard__info}>
                    <div className={styles.listCard__name}>{member.name}</div>
                    <div className={styles.listCard__region}>
                        <div>{member.location?.continent || "-"}</div>
                        <div className={styles.listCard__country}>{member.location?.country || "-"}</div> 
                    </div>
                </div>
            </div>

            <div className={styles.listCard__skills}>
                <div className={styles.listCard__skills__list}>
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

    )
}

export default ListCard;