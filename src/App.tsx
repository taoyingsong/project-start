import React, { useState, useMemo } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import { Link, Outlet, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Loading from '@src/common/component/pageLoading/Loading'
import NoMatch from '@src/common/component/noMatch/NoMatch'
import Dashboard from './dashboard/Dashboard'
import './App.css'

const { Content, Sider } = Layout
const Counter = React.lazy(() => import('./counter/index'))
const Todo = React.lazy(() => import('./todo/index'))

const App = () => {
  const location = useLocation()
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route
            path="counter"
            element={
              <React.Suspense fallback={<Loading />}>
                <Counter />
              </React.Suspense>
            }
          />
          <Route
            path="todo/*"
            element={
              <React.Suspense fallback={<Loading />}>
                <Todo />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {location.pathname === '/' && <Navigate to="/dashboard" replace />}
    </>
  )
}
const MenuLinkMap: { [key: string]: string[] } = {
  '/dashboard': ['1'],
  '/counter': ['2'],
  '/todo': ['3'],
}
const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const locationPathArr = useMemo(() => location.pathname.split('/').slice(1), [location])
  const selectedMenuKeys = useMemo(() => {
    const levelOnePath = `/${locationPathArr[0]}`
    return MenuLinkMap[levelOnePath] ? MenuLinkMap[levelOnePath] : ['1']
  }, [location])
  return (
    <Layout className="site-page">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={_collapsed => {
          setCollapsed(_collapsed)
        }}
      >
        <Menu theme="dark" selectedKeys={selectedMenuKeys} defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/counter">Counter</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/todo">Todo</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Breadcrumb className="bread-crumb">
          <Breadcrumb.Item>{locationPathArr.join(' / ')}</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="site-content-background">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default React.memo(App)
