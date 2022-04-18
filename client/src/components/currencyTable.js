import React from "react";

function CurrencyTable(props) {
    return (
        <table className='centered striped'>
            <thead>
                <tr>{props.colNames.map((item, i) => <th key={i}>{item}</th>)}</tr>
            </thead>
            <tbody>{
                props.data.map((item, i) =>
                    <tr key={i}>
                        {Object.keys(item).map((keyName, j) => <td key={j}>{item[keyName]}</td>)}
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}

export default CurrencyTable;