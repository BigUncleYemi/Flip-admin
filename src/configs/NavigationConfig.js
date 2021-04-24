import {
  UserOutlined,
  WalletOutlined,
  PayCircleOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "user",
    path: `${APP_PREFIX_PATH}/user`,
    title: "User",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "withdrawal",
    path: `${APP_PREFIX_PATH}/withdrawal`,
    title: "Withdrawal",
    icon: WalletOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "btc",
    path: `${APP_PREFIX_PATH}/btc`,
    title: "Crypto",
    icon: PayCircleOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "giftCard",
    path: `${APP_PREFIX_PATH}/giftCard`,
    title: "Sell Gift Card",
    icon: SwapOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "buy-giftCard",
    path: `${APP_PREFIX_PATH}/buy-giftCard`,
    title: "Buy Gift Card",
    icon: CreditCardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "superAdmin",
    path: `${APP_PREFIX_PATH}/super`,
    title: "Super Admin",
    icon: SafetyCertificateOutlined,
    breadcrumb: false,
    submenu: [],
    superAdmin: "ADMIN_USER",
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
