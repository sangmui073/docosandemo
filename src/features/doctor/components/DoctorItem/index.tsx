import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { randomNumberAToB } from '../../../../app/utils';
import { Doctor } from '../../../../Types';
import { Icon } from '../Icon';
import './DoctorItem.scss';
export interface DoctorItemProps {
    item: Doctor
}

export function DoctorItem({ item }: DoctorItemProps) {

    const specialtyList = item.specialty.map((x) => x.name).join(' && ');

    const listStar = Array.from({ length: Math.round(item?.rating as number) }, (_, i) => i);

    const avatar = item?.avatar ? item.avatar : "https://via.placeholder.com/130";

    const coutRandom: number = randomNumberAToB((Math.round(item.rating as number) * 10), (Math.round(item.rating as number) * 20));


    return (
        <div className='doctor-item'>
            <div className='doctor-item--left'>
                <img src={avatar} alt={avatar} />
            </div>
            <div className='doctor-item--right'>
                <div className='item-top'>
                    <h3 className='doctor-name'>
                        {item.display_name}
                    </h3>
                    <div className='doctor-rating'>
                        <div className='rating'>
                            {listStar.map((num) => (
                                <Icon props={{
                                    fontSize: 24,
                                    icon: faStar,
                                    size: '1x',
                                    color: 'goldenrod'
                                }} key={num} />
                            ))}
                        </div>
                        <span>
                            {`${coutRandom} bệnh nhân`}
                        </span>
                    </div>
                    <span className='doctor-specialize'>
                        {specialtyList}
                    </span>
                </div>
                <div className='item-bottom'>
                    <span>
                        {item.clinic_name}
                    </span>
                    <span>
                        {item.clinic_address}
                    </span>
                </div>

            </div>
        </div>
    );
}
