import { SIDE_NAV_LIGHT, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Swift_Tech';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_TOP,
	topNavColor: '#093b6e',
	headerNavColor: '#1674ce',
	mobileNav: false
};
