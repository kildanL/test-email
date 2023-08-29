import React, { useState, useEffect } from "react";
import "./App.css";
import { TUser } from "./types";
import { FetchAllUsers, FetchSearchUsers } from "./service/api";
import UserContainer from "./components/UserContainer";
import plus from "./assets/plus.png";

function App() {
    const [users, setUsers] = useState<TUser[]>([]); //array of users

    const [addedUsers, setAddedUsers] = useState<TUser[]>([]); //array of users added
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchEmail, setSearchEmail] = useState<string>(""); //var for search input

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        //delay for search request
        const Debounce = setTimeout(async () => {
            const searchedUsers = await FetchSearchUsers(searchEmail);
            setUsers(searchedUsers.data);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [searchEmail]);

    //get all users
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

    function addUser() {
        const foundUser = users.find((user) => {
            return (
                user.email.toLowerCase() === searchEmail.toLowerCase().trim()
            );
        });

        if (!foundUser) return;

        //add uniq user
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

    function saveAddedUsers() {
        if (addedUsers.length) {
            console.log(addedUsers);
            alert("Участники успешно сохранились!");
        } else {
            alert("Участники не добавлены в список");
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
            <div className="input__email_text">Введите e-mail участника</div>
            <div className="div__email_input_btn">
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
                    <img src={plus} width={14} height={14} />
                    Добаваить участника
                </button>
            </div>
            {!users.length ? (
                <div className="div__not_found">Участники не найдены</div>
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
            {!addedUsers.length ? (
                <div></div>
            ) : (
                <>
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
                </>
            )}

            <button className="button__save" onClick={() => saveAddedUsers()}>
                Сохранить
            </button>
        </div>
    );
}

export default App;
