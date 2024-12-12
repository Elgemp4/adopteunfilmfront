import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import '../style/components/_main_body.sass';
import Private from '../routers/Private';

export default function MainBody() {
    return (
        <>
            <Private>
                <TopBar/>
            </Private>
            <div className="main-body">
                <Outlet/>
            </div>
        </>
    );
}