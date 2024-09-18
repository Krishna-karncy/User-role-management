import { Layout } from 'antd';
import SidebarContent from './SidebarContent';

const { Sider } = Layout;

const style = {
  overflow: 'auto',
  height: '100vh',
  left: 0,
  top: 0,
  bottom: 0,
};

const Sidebar = () => {

  return (
    <Sider
      trigger={null}
      width={230}
      style={{ position: 'sticky', ...style }}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <SidebarContent onClose={() => {}}/>
    </Sider>
  );
};

export default Sidebar;
