import { DashboardOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "user",
    path: `${APP_PREFIX_PATH}/user`,
    title: "User",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "withdrawal",
    path: `${APP_PREFIX_PATH}/withdrawal`,
    title: "Withdrawal",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "btc",
    path: `${APP_PREFIX_PATH}/btc`,
    title: "BTC",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "giftCard",
    path: `${APP_PREFIX_PATH}/giftCard`,
    title: "Sell Gift Card",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "buy-giftCard",
    path: `${APP_PREFIX_PATH}/buy-giftCard`,
    title: "Buy Gift Card",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "superAdmin",
    path: `${APP_PREFIX_PATH}/super`,
    title: "Super Admin",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
    superAdmin: "ADMIN_USER"
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
