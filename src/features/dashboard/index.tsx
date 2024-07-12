import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    dashboardActions,
    selectDashboardLoading,
    selectDashboardStatistics,
    selectHightestStudentList,
    selectLowestStudentList,
    selectRankingByCityList,
} from 'features/dashboard/dashboardSlice';
import { useEffect } from 'react';

export default function DashBoard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectHightestStudentList);
    const lowestStudentList = useAppSelector(selectLowestStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    console.log({
        loading,
        statistics,
        highestStudentList,
        lowestStudentList,
        rankingByCityList,
    });

    useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);

    return <div>Dashboard</div>;
}
