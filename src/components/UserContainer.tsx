import React from "react";
import { TAddress } from "../types";
import st from "../styles/Container.module.css";

export default function UserContainer({
    name,
    username,
    email,
    address,
}: {
    name: string;
    username: string;
    email: string;
    address: TAddress;
}) {
    return (
        <div className={st.user__container}>
            <div className={st.avatar}>А</div>
            <div className={st.info__container}>
                <div className={st.email}>{email}</div>
                <div className={st.name}>{name}</div>
                <div className={st.address}>{address.city}</div>
            </div>

            <div className={st.btn__delete} />
        </div>
    );
}
