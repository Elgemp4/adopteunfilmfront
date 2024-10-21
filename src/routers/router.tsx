import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import UserProviders from '../components/UserProviders';
import UserSettings from '../pages/UserSettings';
import MovieTinder from '../pages/MovieTinder';
import GroupList from '../pages/GroupList';
import GroupCreate from '../pages/GroupCreate';
import GroupJoin from '../pages/GroupJoin';
import GroupSettings from '../pages/GroupSettings';
import GroupMovieChoice from '../pages/GroupMovieChoice';
import ProviderDistributor from '../contexts/ProviderContext';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/providers" element={
                    <ProviderDistributor>
                        <UserProviders />
                    </ProviderDistributor>
                } />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/film/:id" element={<MovieTinder />} />
                <Route path="/group" element={<GroupList />} />
                <Route path="/group/create" element={<GroupCreate />} />
                <Route path="/group/join" element={<GroupJoin />} />
                <Route path="/group/:idGroup" element={<GroupSettings />} />
                <Route path="/group/:idGroup/film" element={<GroupMovieChoice />} />
            </Routes>
        </Router>
    );
}