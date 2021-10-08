import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useState } from 'react';
import { ListParams } from '../../../../Types';
import { DropDown } from '../Dropdown';
import { Icon } from '../Icon';
import './DoctorFilter.scss';
interface Options {
    label: string;
    value: string;
}

export interface DoctorFilterProps {
    queryParams: ListParams;
    onChange?: (newFilter: Partial<ListParams>) => void;
}

const optionSort: Options[] = [
    {
        label: 'Khoảng Cách',
        value: 'distance'
    },
    {
        label: 'Đánh Giá',
        value: 'rating'
    },
]

const optionLang: Options[] = [
    {
        label: 'Tiếng Việt',
        value: 'vi'
    },
    {
        label: 'English',
        value: 'en'
    },
    {
        label: 'Française',
        value: 'fr'

    },
    {
        label: 'China',
        value: 'cn'

    },

]

export function DoctorFilter({ queryParams, onChange }: DoctorFilterProps) {

    const handleSortChange = (newFilter: Partial<ListParams>) => {
        if (!onChange) return;
        setToggleModal('');

        onChange(newFilter)
    }

    const handleLangChange = (newFilter: Partial<ListParams>) => {
        if (!onChange) return;
        setToggleModal('');

        onChange({ ...newFilter, _page: 1 })
    }

    const [toggleModal, setToggleModal] = useState<string>('');


    const sortLabel = optionSort.find((x) => x.value === queryParams._sort)?.label;

    const langLabel = optionLang.find((x) => x.value === queryParams._lang)?.label;
    console.log(langLabel);
    return (
        <div className='doctor-filter'>
            <div className='doctor-filter--left'>
                <span>Sắp xếp theo</span>
                <button style={{ width: "125px", }}>
                    <span onClick={() => {
                        setToggleModal('_sort')
                    }}>
                        {sortLabel}
                    </span>
                </button>
                <div className='dropdown-list'>
                    {Boolean(toggleModal === '_sort') && <DropDown name='_sort' onFilterChange={handleSortChange} filter={queryParams._sort} options={optionSort} />}

                </div>
            </div>
            <div className='doctor-filter--right'>
                <span>Lọc kết quả</span>
                <button style={{ width: '110px' }} className={langLabel ? 'active' : ''}>

                    <span onClick={() => {
                        setToggleModal('_lang')
                    }} >{langLabel ? langLabel : 'Ngôn Ngữ'}</span>

                    {langLabel && <Icon props={{
                        icon: faTimes,
                        style: { marginLeft: '5px' },
                        onClick: (event: MouseEventHandler<SVGAElement> | unknown) => {
                            handleSortChange({ ...queryParams, _lang: '' })
                        }
                    }} />}

                </button>
                <div className='dropdown-list'>

                    {Boolean(toggleModal === '_lang') && <DropDown onFilterChange={handleLangChange} name='_lang' filter={queryParams._lang} options={optionLang} />}
                </div>
            </div>
        </div>
    );
}
