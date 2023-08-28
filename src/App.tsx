import React, { useState, useEffect } from "react";
import "./App.css";
import { TUser } from "./types";
import { FetchAllUsers } from "./service/api";
import UserContainer from "./components/UserContainer";

function App() {
    const [users, setUsers] = useState<TUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    async function getAllUsers() {
        try {
            setIsLoading(true);
            const result = await FetchAllUsers();

            setUsers(result.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

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
                    ></input>
                    <button className="button__email">
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
