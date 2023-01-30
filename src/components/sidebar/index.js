import ActiveUser from './ActiveUser';
import SuggestionsBar from './SuggestionsBar';

export default function Sidebar() {
    return (
        <div className="p-4">
            <ActiveUser/>
            <SuggestionsBar/>
        </div>
    );
}
