import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
    loading: boolean;
    list: Student[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15,
    },
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentList(state) {
            state.loading = true;
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchStudentListFailed(state) {
            state.loading = false;
        },

        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
