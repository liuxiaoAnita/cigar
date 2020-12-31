import Loadable from 'react-loadable';
import Loading from '@/components/Loading'


const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});

// 新增的页面
const Search = Loadable({loader: () => import(/*webpackChunkName:'Home'*/'@/views/h5/search'),loading: Loading});
const Home = Loadable({loader: () => import(/*webpackChunkName:'Home'*/'@/views/h5/home'),loading: Loading});
const Login = Loadable({loader: () => import(/*webpackChunkName:'Login'*/'@/views/h5/login'),loading: Loading});
const Register = Loadable({loader: () => import(/*webpackChunkName:'Register'*/'@/views/h5/register'),loading: Loading});
const Forget = Loadable({loader: () => import(/*webpackChunkName:'Forget'*/'@/views/h5/forget'),loading: Loading});
const Car = Loadable({loader: () => import(/*webpackChunkName:'Car'*/'@/views/h5/car'),loading: Loading});
const Myself = Loadable({loader: () => import(/*webpackChunkName:'Myself'*/'@/views/h5/myself'),loading: Loading});
const MyAddress = Loadable({loader: () => import(/*webpackChunkName:'MyAddress'*/'@/views/h5/myaddress'),loading: Loading});
const EditAddress = Loadable({loader: () => import(/*webpackChunkName:'EditAddress'*/'@/views/h5/myaddress/ModalAddAress'),loading: Loading});

const Heart = Loadable({loader: () => import(/*webpackChunkName:'Heart'*/'@/views/h5/heart'),loading: Loading});
const MyPlatter = Loadable({loader: () => import(/*webpackChunkName:'MyPlatter'*/'@/views/h5/myplatter'),loading: Loading});
const MyOrder = Loadable({loader: () => import(/*webpackChunkName:'MyOrder'*/'@/views/h5/myorder'),loading: Loading});
const OrderDetail = Loadable({loader: () => import(/*webpackChunkName:'OrderDetail'*/'@/views/account/orderdetail'),loading: Loading});
const Paying = Loadable({loader: () => import(/*webpackChunkName:'Paying'*/'@/views/account/paying'),loading: Loading});
const MyRate = Loadable({loader: () => import(/*webpackChunkName:'MyRate'*/'@/views/h5/myrate'),loading: Loading});
const WriteRate = Loadable({loader: () => import(/*webpackChunkName:'WriteRate'*/'@/views/h5/writerate'),loading: Loading});
const CigarDetail = Loadable({loader: () => import(/*webpackChunkName:'CigarDetail'*/'@/views/h5/cigardetail'),loading: Loading});
const Detail = Loadable({loader: () => import(/*webpackChunkName:'CigarDetail'*/'@/views/h5/detail'),loading: Loading});

export default [
  { path: "/error/404", component: Error404 },
  
  // 新增
  { path: "/home", component: Home },
  { path: "/search", component: Search },
  { path: "/login", component: Login },
  { path: "/forget", component: Forget },
  { path: "/register", component: Register },
  { path: "/car", component: Car },
  { path: "/myself", component: Myself },
  { path: "/myaddress", component: MyAddress },
  { path: "/editaddress", component: EditAddress },
  
  { path: "/heart", component: Heart },
  { path: "/myplatter", component: MyPlatter },
  { path: "/myorder", component: MyOrder },
  { path: "/orderdetail", component: Home },
  { path: "/paying", component: Home },
  { path: "/myrate", component: MyRate },
  { path: "/writerate", component: WriteRate },
  { path: "/cigardetail", component: CigarDetail },
  { path: "/detail", component: Detail },

  
];
