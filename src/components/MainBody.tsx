import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import '../style/components/_main_body.sass';

export default function MainBody() {
    return (
        <>
            <TopBar />
            <div className="main-body">
                <Outlet />
            </div>
        </>
    );
}