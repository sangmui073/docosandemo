import * as React from 'react';
import { Doctor } from '../../../../Types';
import { DoctorItem } from '../DoctorItem';
import './DoctorList.scss';

export interface DoctorListProps {
    listData: Doctor[]
}

export function DoctorList({ listData }: DoctorListProps) {
    return (
        <div className="doctor-list">
            {listData.map((data) => (
                <DoctorItem key={data.id} item={data} />
            ))}
        </div>
    );
}
