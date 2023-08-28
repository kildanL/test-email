import React, { useState, useEffect } from "react";
import "./App.css";
import { TUser } from "./types";
import { FetchAllUsers, FetchSearchUsers } from "./service/api";
import UserContainer from "./components/UserContainer";

function App() {
    const [users, setUsers] = useState<TUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchEmail, setSearchEmail] = useState<string>("");

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        const Debounce = setTimeout(async () => {
            const searchedUsers = await FetchSearchUsers(searchEmail);
            setUsers(searchedUsers.data);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [searchEmail]);

    async function getAllUsers() {
        try {
            setIsLoading(true);
            // const result = await FetchSearchUsers();
            const result = await FetchAllUsers();
            setUsers(result.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    function addUser() {}

    if (isLoading) {
        <div className="App__loading">
            <h1 className="h1__loading">Загрузка...</h1>
        </div>;
    }

    return (
        <div className="App">
            <h1>Команда организации</h1>
            <p>
                Владельцы команд могут добавлять участников в команду своей
                организации, добавляя их адреса электронной почты. У них должна
                быть учетная запись на сайте.
            </p>
            <form>
                <div>Введите email участника</div>
                <div>
                    <input
                        className="input__email"
                        type="email"
                        name="email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        autoComplete="off"
                    ></input>
                    <button className="button__email" onClick={() => addUser()}>
                        Добаваить участника
                    </button>
                </div>
            </form>
            <div className="container">
                {users.map((user) => {
                    return (
                        <UserContainer
                            key={user.id}
                            name={user.name}
                            username={user.username}
                            address={user.address}
                            email={user.email}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
