const themeConfig = {
    token: {
        colorPrimary: '#57F92F',
        fontSize: 16,
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        Layout: {
            headerBg: 'rgba(255, 255, 255, 0.1)',
            siderBg: '#FFFFFF',
        },
        Menu: {
            itemBg: '#FFFFFF',
            itemSelectedBg: '#57F92F',
            itemSelectedColor: '#575656',
            activeBarBorderWidth: 0,
            itemHoverBg: '#F9FFE9'
        },
        Form: {
            fontSize: 14
        },
        Input: {
            fontSize: 12
        }
    }
};

export default themeConfig