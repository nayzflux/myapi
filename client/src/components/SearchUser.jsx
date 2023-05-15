import React, { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce';
import { searchUser, sendFriendRequest } from '@/utils/api';
import UserResult from './UserResult';

const SearchUser = () => {
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        debouceSearch(input);
    }, [input]);

    const debouceSearch = useCallback(
        debounce((query) => {
            searchUser(query).then(users => {
                setResults(users);
            })
        }, 1000), []
    );

    return (
        <div className=''>
            <input placeholder='Rechercher un utilisateur' value={input} onChange={(e) => setInput(e.target.value)} />
            {/* Resultat de la recherche */}
            <div>
                {results?.map(user => (
                    <UserResult key={user._id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default SearchUser
