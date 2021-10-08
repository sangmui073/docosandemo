import * as React from 'react';
import { PaginationParams } from '../../../../Types';
import './Pagination.scss'

export interface PaginationProps {
    queryParams: PaginationParams;
    onChange?: (newPage: number) => void;
}

export function Pagination({ queryParams, onChange }: PaginationProps) {
    const { page, total, limit } = queryParams;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        if (!onChange) return;

        onChange(newPage);
    }

    return (
        <div className='pagination'>
            <button disabled={page <= 1} className={!Boolean(page <= 1) ? 'active' : ''} onClick={() => {
                handlePageChange(page - 1)
            }}>Prev</button>
            <button disabled={page >= totalPages} className={!Boolean(page >= totalPages) ? 'active' : ''} onClick={() => {
                handlePageChange(page + 1)
            }}>Next</button>
        </div>
    );
}
