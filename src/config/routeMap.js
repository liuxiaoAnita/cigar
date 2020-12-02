import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});

// 新增的页面
const Home = Loadable({loader: () => import(/*webpackChunkName:'Home'*/'@/views/home'),loading: Loading});
const Login = Loadable({loader: () => import(/*webpackChunkName:'Login'*/'@/views/login'),loading: Loading});
const Register = Loadable({loader: () => import(/*webpackChunkName:'Register'*/'@/views/register'),loading: Loading});
const Forget = Loadable({loader: () => import(/*webpackChunkName:'Forget'*/'@/views/forget'),loading: Loading});
const Car = Loadable({loader: () => import(/*webpackChunkName:'Car'*/'@/views/car'),loading: Loading});
const Myself = Loadable({loader: () => import(/*webpackChunkName:'Myself'*/'@/views/account/myself'),loading: Loading});
const Heart = Loadable({loader: () => import(/*webpackChunkName:'Heart'*/'@/views/account/heart'),loading: Loading});
const MyPlatter = Loadable({loader: () => import(/*webpackChunkName:'MyPlatter'*/'@/views/myplatter'),loading: Loading});
const MyOrder = Loadable({loader: () => import(/*webpackChunkName:'MyOrder'*/'@/views/account/myorder'),loading: Loading});
const OrderDetail = Loadable({loader: () => import(/*webpackChunkName:'OrderDetail'*/'@/views/account/orderdetail'),loading: Loading});
const Paying = Loadable({loader: () => import(/*webpackChunkName:'Paying'*/'@/views/account/paying'),loading: Loading});
const MyRate = Loadable({loader: () => import(/*webpackChunkName:'MyRate'*/'@/views/account/myrate'),loading: Loading});
const WriteRate = Loadable({loader: () => import(/*webpackChunkName:'WriteRate'*/'@/views/account/writerate'),loading: Loading});
const CigarDetail = Loadable({loader: () => import(/*webpackChunkName:'CigarDetail'*/'@/views/cigardetail'),loading: Loading});
const Detail = Loadable({loader: () => import(/*webpackChunkName:'CigarDetail'*/'@/views/detail'),loading: Loading});

export default [
  { path: "/error/404", component: Error404 },
  
  // 新增
  { path: "/home", component: Home },
  { path: "/search", component: Home },
  { path: "/login", component: Login },
  { path: "/forget", component: Forget },
  { path: "/register", component: Register },
  { path: "/car", component: Car, needLogin: true  },
  { path: "/myself", component: Myself },
  { path: "/heart", component: Heart },
  { path: "/myplatter", component: MyPlatter },
  { path: "/myorder", component: MyOrder },
  { path: "/orderdetail", component: OrderDetail },
  { path: "/paying", component: Paying },
  { path: "/myrate", component: MyRate },
  { path: "/writerate", component: WriteRate },
  { path: "/cigardetail", component: CigarDetail },
  { path: "/detail", component: Detail },

  
];
