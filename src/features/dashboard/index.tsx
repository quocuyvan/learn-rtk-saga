import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, ChatRounded, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StatisticItem from 'features/dashboard/components/StatisticItem';
import StudentRankingList from 'features/dashboard/components/StudentRankingList';
import Widget from 'features/dashboard/components/Widget';
import {
    dashboardActions,
    selectDashboardLoading,
    selectDashboardStatistics,
    selectHightestStudentList,
    selectLowestStudentList,
    selectRankingByCityList,
} from 'features/dashboard/dashboardSlice';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export default function DashBoard() {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectHightestStudentList);
    const lowestStudentList = useAppSelector(selectLowestStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);

    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatRounded fontSize="large" color="primary" />}
                        label="female"
                        value={statistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ArrowUpward fontSize="large" color="primary" />}
                        label="mark >= 8"
                        value={statistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ArrowDownward fontSize="large" color="primary" />}
                        label="mark <= 5"
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            {/* All students rankings */}
            <Box mt={5}>
                <Typography variant="h4">All Students</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with lowest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Rankings by city */}
            <Box mt={5}>
                <Typography variant="h4">Rankings by city</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={ranking.cityName}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
