import React, {useEffect, useState} from 'react';
import Card, {CardVariant} from "./components/Card";
import UserList from "./components/UserList";
import {IUser} from "./types/types";
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {

    }, [])
    async function fetchUsers() {
        try {
            const resp = await axios.get("https://jsonplaceholder.typicode.com/users")
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <Card  variant={CardVariant.outlined} width="400px" height="400px">
                <button>Button</button>
            </Card>
            <UserList users={users}/>
        </div>
    );
};

export default App;