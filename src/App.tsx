import React, { useState, useEffect } from "react";
import "./App.css";
import { TUser } from "./types";
import { FetchAllUsers, FetchSearchUsers } from "./service/api";
import UserContainer from "./components/UserContainer";

function App() {
    const [users, setUsers] = useState<TUser[]>([]);
    const [addedUsers, setAddedUsers] = useState<TUser[]>([]);
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

    function addUser() {
        const foundUser = users.find((user) => {
            return (
                user.email.toLowerCase() === searchEmail.toLowerCase().trim()
            );
        });
        if (!foundUser) return;
        if (!addedUsers.find((user) => user.id === foundUser.id)) {
            setAddedUsers([...addedUsers, foundUser]);
        }
        setSearchEmail("");
    }

    function deleteUser(id: number) {
        setAddedUsers(addedUsers.filter((user) => user.id !== id));
    }

    function handleUserClick(email: string) {
        setSearchEmail(email);
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
            <div>Введите email участника</div>
            <div>
                <input
                    className="input__email"
                    type="search"
                    name="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    autoComplete="off"
                    required
                ></input>
                <button
                    className="button__email"
                    onClick={() => addUser()}
                    disabled={!searchEmail}
                >
                    Добаваить участника
                </button>
            </div>
            {!users.length ? (
                <div>Участники не найдены</div>
            ) : (
                <div className="container">
                    {users.map((user) => {
                        return (
                            <UserContainer
                                key={user.id}
                                name={user.name}
                                username={user.username}
                                address={user.address}
                                email={user.email}
                                onClick={() => handleUserClick(user.email)}
                            />
                        );
                    })}
                </div>
            )}

            <h1>Добавленные участники</h1>
            <div className="container">
                {addedUsers.map((user) => {
                    return (
                        <UserContainer
                            key={user.id}
                            name={user.name}
                            username={user.username}
                            address={user.address}
                            email={user.email}
                            isAddedUser={true}
                            onClick={() => deleteUser(user.id)}
                        />
                    );
                })}
            </div>

            <button
                className="button__save"
                onClick={() => console.log(addedUsers)}
            >
                Сохранить
            </button>
        </div>
    );
}

export default App;
