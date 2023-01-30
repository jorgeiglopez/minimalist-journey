import LoggedUser from './LoggedUser';
import SuggestionsBar from './SuggestionsBar';

export default function Sidebar() {
    return (
        <div className="p-4">
            <LoggedUser/>
            <SuggestionsBar/>
        </div>
    );
}
