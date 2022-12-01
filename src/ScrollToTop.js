import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { highlightPreferences } from './redux/features/highlightSlice';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(highlightPreferences(pathname.slice(1)));
    }, [pathname, dispatch]);

    return null;
}
