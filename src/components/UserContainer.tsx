import React, { MouseEventHandler } from "react";
import { TAddress } from "../types";
import st from "../styles/Container.module.css";

export default function UserContainer({
    name,
    username,
    email,
    address,
    onClick,
    isAddedUser = false,
}: {
    name: string;
    username: string;
    email: string;
    address: TAddress;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isAddedUser?: boolean;
}) {
    return (
        <button onClick={onClick} className={st.user__container}>
            <div className={st.avatar}>А</div>
            <div className={st.info__container}>
                <div className={st.email}>{email}</div>
                <div className={st.name}>{name}</div>
                <div className={st.address}>{address.city}</div>
            </div>
            {/* <button onClick={}></button> */}
            <div className={isAddedUser ? st.btn__delete : undefined} />
        </button>
    );
}
