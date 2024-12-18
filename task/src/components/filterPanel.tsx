'use client';
import styles from './filterPanel.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export interface FilterData {
    countries: string[],
    regions: string[]
}

interface LocationProps {
    locationData: FilterData;
    specificLocationData: FilterData;
}

const FilterPanel = ({ locationData, specificLocationData }: LocationProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const hasFilters = searchParams.toString().length > 0;

    const handleRegion = (region: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get('region') === region) {
            params.delete('region');
            params.delete('country');
        } else {
            params.set('region', region);
            params.delete('country');
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleCountry = (country: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get('country') === country) {
            params.delete('country');
        } else {
            params.set('country', country);
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleClearFilters = () => {
        router.push('/members');
    };

    const handleToggle = (toggleKey: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const isActive = params.get(toggleKey) === 'true';

        if (isActive) {
            params.delete(toggleKey);
        } else {
            params.set(toggleKey, 'true');
        }

        router.push(`/members?${params.toString()}`);
    };


    return (
        <>
            <div className={styles.filter}>
                <div className={styles.filter__control}>Filters</div>
                <div className={styles.filter__control__clear}>
                    <button onClick={handleClearFilters} disabled={!hasFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className={styles.filter__divider}></div>

            <div className={styles.filter__list}>
                <div className={styles.filter__list__item}>
                    <h3 className={styles.filter__list__item__title}>Only Show Members with Office Hours</h3>
                    <label className={styles.filter__list__item__title__toggle}>
                        <input
                            type="checkbox"
                            checked={searchParams.get('OfficeHours') === 'true'}
                            onChange={() => handleToggle('OfficeHours')} />
                        <span className={styles.filter__list__item__title__toggle__slider}></span>
                    </label>
                </div>

                <div className={styles.filter__list__item}>
                    <h3 className={styles.filter__list__item__title}>Open to Collaborate</h3>
                    <label className={styles.filter__list__item__title__toggle}>
                        <input
                            type="checkbox"
                            checked={searchParams.get('OpenToCollaborate') === 'true'}
                            onChange={() => handleToggle('OpenToCollaborate')} />
                        <span className={styles.filter__list__item__title__toggle__slider}></span>
                    </label>
                </div>

                <div className={styles.filter__list__item}>
                    <h3 className={styles.filter__list__item__title}>Include Friends of Protocol Labs</h3>
                    <label className={styles.filter__list__item__title__toggle}>
                        <input
                            type="checkbox"
                            checked={searchParams.get('Friends') === 'true'}
                            onChange={() => handleToggle('Friends')} />
                        <span className={styles.filter__list__item__title__toggle__slider}></span>
                    </label>
                </div>

                <div className={styles.filter__list__item}>
                    <h3 className={styles.filter__list__item__title}>New Members</h3>
                    <label className={styles.filter__list__item__title__toggle}>
                        <input
                            type="checkbox"
                            checked={searchParams.get('NewMember') === 'true'}
                            onChange={() => handleToggle('NewMember')} />
                        <span className={styles.filter__list__item__title__toggle__slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles.filter__region}>
                <span className={styles.filter__region__divider}></span>
                <h2>Region</h2>
                <div className={styles.filter__region__divider__list}>
                    {locationData?.regions?.map((region: any) => {
                        const isActive = searchParams.get('region') === region;
                        return (
                            <button
                                key={region}
                                onClick={() => handleRegion(region)}
                                className={`${styles.filter__region__divider__list__button} ${isActive ? styles.filter__region__divider__list__button__active : ''}`} >
                                {region}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.filter__country}>
                <span className={styles.filter__country__divider}></span>
                <h2>Country</h2>
                <div className={styles.filter__country__divider__list}>
                    {locationData?.countries?.map((country: any) => {
                        const isRegionSelected = !!searchParams.get('region');
                        const isDisabled = !isRegionSelected ||
                            (isRegionSelected && !specificLocationData?.countries?.includes(country));
                        const isActive = searchParams.get('country') === country;

                        return (
                            <button
                                key={country}
                                disabled={isDisabled}
                                onClick={() => handleCountry(country)}
                                className={`${styles.filter__country__divider__list__button} ${isActive
                                    ? styles.filter__country__divider__list__button__active
                                    : ''
                                    } ${isDisabled
                                        ? styles.filter__country__divider__list__button__active__disabled
                                        : ''
                                    }`}>
                                {country}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FilterPanel;