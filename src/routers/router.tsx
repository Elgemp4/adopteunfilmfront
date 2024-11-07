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
import GroupDistributor from "../contexts/GroupContext.tsx";
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
                <Route path="/groups/*" element={
                    <Private>
                        <GroupDistributor>
                            <Routes>
                                <Route path="" element={<GroupList />} />
                                <Route path="create" element={<GroupCreate />} />
                                <Route path="join" element={<GroupJoin />} />
                                <Route path=":idGroup" element={<GroupSettings />} />
                                <Route path=":idGroup/film" element={<GroupMovieChoice />} />
                            </Routes>
                        </GroupDistributor>
                    </Private>
                } />
            </Routes>
        </Router>
    );
}