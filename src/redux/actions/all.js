import dashboardService from "redux/services/DashboardService";
import * as ActionTypes from "../constants/index";

//Dashboard
const GetDashboardData = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_DASHBOARD_DATA,
  })

  await dashboardService
    .getDashboardStat()
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_DASHBOARD_DATA_FAILED,
        payload: err
      });
    });
    return;
}

export const getDashboardData = () => dispatch => {
  dispatch(GetDashboardData());
};
