import React from "react";
export function TokenName({ data }: { data: any }) {
    return <a target="_blank" rel="noreferrer" href={`https://arbiscan.io/address/${data.id}`}>
        <p>{data.name}</p>
    </a>;
}
