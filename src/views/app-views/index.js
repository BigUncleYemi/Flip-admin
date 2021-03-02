import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import { getCurrentUser } from "redux/actions/user";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/user`} component={lazy(() => import(`./user`))} />
        <Route path={`${APP_PREFIX_PATH}/withdrawal`} component={lazy(() => import('./withdrawal'))} />
        <Route path={`${APP_PREFIX_PATH}/giftCard`} component={lazy(() => import('./giftCard'))} />
        <Route path={`${APP_PREFIX_PATH}/buy-giftCard`} component={lazy(() => import('./buyGiftCard'))} />
        <Route path={`${APP_PREFIX_PATH}/btc`} component={lazy(() => import('./BTC'))} />
        <Route path={`${APP_PREFIX_PATH}/super`} component={lazy(() => import('./superadmin'))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale } =  theme;
  return { locale }
};

const mapDispatchToProps  = (dispatch) => ({
  persistUser: () => {
    dispatch(getCurrentUser());
  },
})

export default React.memo(connect(mapStateToProps,  mapDispatchToProps)(AppViews));
