import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UserProviders from '../components/UserProviders';
import UserSettings from '../components/UserSettings';
import MovieTinder from '../components/MovieTinder';
import GroupList from '../components/GroupList';
import GroupCreate from '../components/GroupCreate';
import GroupJoin from '../components/GroupJoin';
import GroupSettings from '../components/GroupSettings';
import GroupMovieChoice from '../components/GroupMovieChoice';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/providers" element={<UserProviders />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/film/:id" element={<MovieTinder />} />
                <Route path="/group" element={<GroupList />} />
                <Route path="/group/createGroup" element={<GroupCreate />} />
                <Route path="/group/join" element={<GroupJoin />} />
                <Route path="/group/:idGroup" element={<GroupSettings />} />
                <Route path="/group/:idGroup/film" element={<GroupMovieChoice />} />
            </Routes>
        </Router>
    );
}