import React, { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce';
import { searchUser } from '@/utils/api';

const SearchUser = () => {
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (input !== '') {
            debouceSearch(input);
        } else {
            setResults([])
        }
    }, [input]);

    const debouceSearch = useCallback(
        debounce((input) => {
            searchUser(input).then(users => {
                setResults(users);
            })
            console.log('search', input); 
        }, 1000), []
    );

    const handleFriendRequest = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className=''>
            <input placeholder='Rechercher un utilisateur' value={input} onChange={(e) => setInput(e.target.value)} />
            {/* Resultat de la recherche */}
            <div>
                {results?.map(user => (
                    <div key={user._id}>
                        <p>{user.username}</p>
                        <button onClick={handleFriendRequest}>Demander en ami</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchUser
