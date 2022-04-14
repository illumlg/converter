import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader';

function Currency() {
    const currency = useSelector((state) => state.rates.value);
    return (
        currency.length === 0 ?
            <Loader/> :
            <div className="tableCont">
                <table className='centered striped'>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Rate (to BTC)</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>{
                        currency.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.code}</td>
                                    <td>{item.rate}</td>
                                    <td>{item.description}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
    );  
}

export default Currency;