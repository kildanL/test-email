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
        <div className="user-contaner">
            <div className=""></div>
        </div>
    );
}
