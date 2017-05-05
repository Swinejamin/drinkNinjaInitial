import React from 'react';

import Dashboard from '../components/views/Dashboard';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
    { path: '/',
        exact: true,
        sidebar: () => <div>home!</div>,
        main: Dashboard
    },
    { path: '/about',
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>
    },
    { path: '/suggestions',
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
]

export default routes;
