import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import UserProviders from '../pages/UserProviders';
import UserSettings from '../pages/UserSettings';
import MovieTinder from '../pages/MovieTinder';
import GroupList from '../pages/GroupList';
import GroupCreate from '../pages/GroupCreate';
import GroupJoin from '../pages/GroupJoin';
import GroupSettings from '../pages/GroupSettings';
import GroupMovieChoice from '../pages/GroupMovieChoice';
import ProviderDistributor from '../contexts/ProviderContext';
import Private from './Private';
import SkipIfLoggedIn from './SkipIfLoggedIn';
import PostLoginRedirection from '../pages/PostLoginRedirection';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<SkipIfLoggedIn><LoginForm /></SkipIfLoggedIn>} />
                <Route path="/loggedin" element={<PostLoginRedirection/>}/>
                <Route path="/register" element={<SkipIfLoggedIn><RegisterForm /></SkipIfLoggedIn>} />
                <Route path="/providers" element={
                    <Private>
                        <ProviderDistributor>
                            <UserProviders />
                        </ProviderDistributor>
                    </Private>
                } />
                <Route path="/settings" element={<Private><UserSettings /></Private>} />
                <Route path="/movies" element={<Private><MovieTinder /></Private>} />
                <Route path="/group" element={<Private><GroupList /></Private>} />
                <Route path="/group/create" element={<Private><GroupCreate /></Private>} />
                <Route path="/group/join" element={<Private><GroupJoin /></Private>} />
                <Route path="/group/:idGroup" element={<Private><GroupSettings /></Private>} />
                <Route path="/group/:idGroup/film" element={<Private><GroupMovieChoice /></Private>} />
            </Routes>
        </Router>
    );
}