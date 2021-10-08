import React, { useState, ChangeEvent } from 'react';
import { ListParams } from '../../../../Types';
import './DropDown.scss';

interface Options {
    label: string;
    value: string;
}

export interface DropdownProps {
    options: Options[];
    name?: string;
    filter?: string;
    onFilterChange?: (params: Partial<ListParams>) => void;
}

export function DropDown({ options, filter, name, onFilterChange }: DropdownProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onFilterChange) return;
        console.log(e.currentTarget.value);
        const { value, name } = e.currentTarget;
        onFilterChange({ [name]: value })
        // setValue(value)
    }

    return (
        <div className='dropdown'>
            {options.map((option) => (
                <label key={option.label} className="dropdown-container">
                    <span>{option.label}</span>
                    <input type="radio" onChange={(e) => {
                        handleChange(e)
                    }} checked={filter === option.value} value={option.value} name={name} />
                    <span className="checkmark"></span>
                </label>
            ))}
        </div>
    );
}
