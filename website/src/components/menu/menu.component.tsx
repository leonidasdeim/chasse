import { Link } from 'react-router-dom';
import { HomeIcon, ShareIcon } from '../../utilities/icons.utility'

export default function Menu() {
    return (
        <div className="flex sm:flex-col justify-center sm:mr-4 text-yellow">
            <div className="flex sm:flex-col mb-4 pt-2 sm:mb-0 sm:pt-4 sm:pb-4 bg-darkGreen rounded-full">
                <Link to="/" className="pb-2 pl-4 pr-4 sm:pl-2 sm:pr-2 sm:pt-2" onClick={() => { }}>
                    <HomeIcon />
                </Link>
                <button className="pb-2 pl-4 pr-4 sm:pl-2 sm:pr-2" onClick={() => { }}>
                    <ShareIcon />
                </button>
            </div>
        </div>
    );
}
