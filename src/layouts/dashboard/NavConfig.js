// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: '주차시스템',
    path: '/dashboard/parking-system',
    icon: getIcon('ic:outline-local-parking'),
  },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: '사용자관리',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: '회원가입',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'VIP등록',
    path: '/vip-register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
