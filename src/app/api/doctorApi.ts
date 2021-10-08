import { Doctor, ListParams, ListResponve } from "../../Types";
import DoctorData from '../FakeData/data.json';


export const doctorApi = {
    async getAll(params: ListParams): Promise<ListResponve<Doctor>> {
        const newParams = { ...params };
        const doctorList: Doctor[] = [...DoctorData];

        newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 10);
        const currentData: Doctor[] = doctorList.splice(newParams._start, newParams._limit);


        currentData.sort((preValue: Doctor, nextValue: Doctor) => {
            return nextValue[newParams?._sort as string] - preValue[newParams?._sort as string]
        })

        const dataFilterlang = currentData.filter((item) => item.language?.toString().includes(newParams._lang as string));


        return {
            data: dataFilterlang,
            pagination: {
                limit: newParams._limit || 5,
                page: newParams._page || 1,
                total: doctorList.length
            }
        }
    }
}