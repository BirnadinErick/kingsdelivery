import { jsx as _jsx } from "react/jsx-runtime";
// noinspection TypeScriptValidateTypes
import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from "react-redux";
import cartStore from "@/lib/cart";
const appName = import.meta.env.VITE_APP_NAME || "King's Delivery";
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(_jsx(Provider, { store: cartStore, children: _jsx(App, { ...props }) }));
    },
    progress: {
        color: '#4B5563',
    },
});
