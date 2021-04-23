// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const LoginPage = () => import('@/views/auth/LoginPage')
const NotFoundPage = () => import('@/views/NotFoundPage')

const LaporanLembaga = () => import('@/views/LaporanLembaga')
const LaporanAnggaran = () => import('@/views/LaporanAnggaran')
const LaporanEstimasi = () => import('@/views/LaporanEstimasi')
const LaporanBiayaRiil = () => import('@/views/LaporanBiayaRiil')

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    meta: { isAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'laporan-lembaga',
        name: 'Laporan Lembaga',
        component: LaporanLembaga,
      },
      {
        path: 'laporan-anggaran',
        name: 'Laporan Anggaran',
        component: LaporanAnggaran,
      },
      {
        path: 'laporan-estimasi',
        name: 'Laporan Estimasi',
        component: LaporanEstimasi,
      },
      {
        path: 'laporan-biaya-riil',
        name: 'Laporan Biaya Riil',
        component: LaporanBiayaRiil,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
]
