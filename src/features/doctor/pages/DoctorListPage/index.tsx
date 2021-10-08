import React, { useEffect, useState, useMemo } from 'react';
import { doctorApi } from '../../../../app/api/doctorApi';
import { Doctor, ListParams, ListResponve, PaginationParams } from '../../../../Types';
import { DoctorFilter } from '../../components/DoctorFilter';
import { DoctorList } from '../../components/DotorList';
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'querystring';
import './DoctorList.scss';
import { Pagination } from '../../components/Pagination';


export default function DoctorListPage() {

    const location = useLocation();
    const history = useHistory()

    const [loading, setLoading] = useState<boolean>(false);

    const [pagination, setPagiantion] = useState<PaginationParams>();

    const queryParams: ListParams = useMemo(() => {
        const params = queryString.parse(location.search.replace("?_page", "_page")) as ListParams;
        return {
            ...params,
            _page: Number.parseInt(params._page as unknown as string) || 1,
            _limit: Number.parseInt(params._limit as unknown as string) || 5,
            _sort: params._sort as string || "rating",
            _lang: params._lang as string || ''
        }
    }, [location.search])

    const [doctorList, setDoctorList] = useState<Doctor[]>();

    useEffect(() => {
        (async () => {
            setLoading((x) => x = true);
            try {
                const responve: ListResponve<Doctor> = await doctorApi.getAll(queryParams);

                setDoctorList(responve.data);
                setPagiantion(responve.pagination)
            } catch (error) {
                console.log(error);
            }

            setLoading((x) => x = false);
        })()
    }, [queryParams])


    const handleFilterChange = (newFilter: Partial<ListParams>) => {
        const newParams: ListParams = {
            ...queryParams,
            ...newFilter
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newParams)
        })
    }
    const handlePageChange = (newPage: number) => {
        const newParams: ListParams = {
            ...queryParams,
            _page: newPage
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newParams)
        })
    }

    return (
        <div className='docosan'>
            <div className='hight-light'>

            </div>
            <div className='docosan-icon'>
                <h1 className='icon'>
                </h1>
                <span>Docosan</span>
            </div>

            <div className='container'>
                <h3 className='title'>Danh Sách Các Bác Sĩ</h3>
                <DoctorFilter queryParams={queryParams} onChange={handleFilterChange} />

                {
                    (Array.isArray(doctorList) && doctorList.length > 0) && <DoctorList listData={doctorList} />
                }
                {Boolean(pagination) && <Pagination onChange={handlePageChange} queryParams={pagination as PaginationParams} />}
            </div>

            <footer className='footer'>
                <div className='footer-container'>
                    <div className='footer-left'>
                        <div className='docosan-icon'>
                            <h1 className='icon'>
                            </h1>
                            <span>Docosan</span>
                        </div>

                    </div>

                    <div className='footer-right'>
                        <ul>
                            <li>
                                16192 Coacal Highway
                            </li>
                            <li>
                                Lewes, Delaware 19958
                            </li>
                            <li>
                                United Stated of America
                            </li>
                        </ul>

                        <ul>
                            <li>Lim Tower 25F,</li>
                            <li>9-11 Ton Duc Thang Street</li>
                            <li>Ho Chi Minh City, VietNam</li>
                        </ul>
                    </div>
                </div>
                <p className='website'>
                    <a href="#">
                        www.docosan.com
                    </a>
                </p>

            </footer>

            <div className='hight-light'>

            </div>
        </div>
    );
}
