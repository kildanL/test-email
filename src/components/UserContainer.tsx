import React, { MouseEventHandler } from "react";
import { TAddress } from "../types";
import st from "../styles/UserContainer.module.css";
import deleteIcn from "../assets/deleteIcn.png";

export default function UserContainer({
    name,
    email,
    address,
    onClick,
    isAddedUser = false,
}: {
    name: string;
    username: string;
    email: string;
    address: TAddress;
    onClick?: MouseEventHandler<HTMLDivElement>;
    isAddedUser?: boolean;
}) {
    function sliceFirstLetter(str: string) {
        return str.charAt(0).toUpperCase();
    }

    return (
        <div
            onClick={isAddedUser ? undefined : onClick}
            className={
                isAddedUser ? st.user__container_not_active : st.user__container
            }
        >
            <div className={st.avatar}>{sliceFirstLetter(name)}</div>
            <div className={st.info__container}>
                <div className={st.email}>{email}</div>
                <div className={st.name}>{name}</div>
                <div className={st.address}>{address.city}</div>
            </div>

            <img
                src={deleteIcn}
                onClick={onClick}
                className={
                    isAddedUser
                        ? st.btn__delete
                        : `${st.btn__delete} ${st.btn__delete_hide}`
                }
            ></img>
        </div>
    );
}
