import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import dateFormat from 'dateformat';

let arr1 = Array(24).fill(" ");
let arr2 = Array(24).fill(" ");
let arr3 = Array(24).fill(" ");
let arr5 = Array(24).fill(" ");
let arr4 = Array(24).fill(" ");

arr1[0] = "Reading";

const Container = styled.div`
    width: 100vw;
    overflow: hidden;
    background-color: white;
`
const Wrapper = styled.div`
    width: 100vw;
    background-color: aliceblue;
    position: relative;
    top: 70px;
    min-height: 91vh;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const Tr = styled.tr`
    display: flex;
    width: 100vw;
    background: #000;
    flex-direction: row;
    align-items: center;
`
const Td = styled.td`
    flex: 1;
    height: 10vh;
    border: 1px solid black;
    text-align: center;
    padding: 10px;
    font-size: 20px;
    font-weight: 500;
    background-color: #ececec;
`
const Th = styled.td`
    flex: 1;
    height: 100%;
    border: 1px solid black;
    text-align: center;
    padding: 10px;
    font-size: 20px;
    font-weight: 500;
    background-color: #ececec;
`

const Calender = () => {
    
    return (
        <Container>
            <Navbar />
            {/* <h1>Calender</h1> */}
            <Wrapper>
                <table>
                    <Tr>
                        <Th>Timings</Th>
                        <Th>{dateFormat(Date.now(), 'dd mmm yyyy')}</Th>
                        <Th>{dateFormat(Date.now() + 24 * 60 * 60 * 1000, 'dd mmm yyyy')}</Th>
                        <Th>{dateFormat(Date.now() + 2 * 24 * 60 * 60 * 1000, 'dd mmm yyyy')}</Th>
                        <Th>{dateFormat(Date.now() + 3 * 24 * 60 * 60 * 1000, 'dd mmm yyyy')}</Th>
                        <Th>{dateFormat(Date.now() + 4 * 24 * 60 * 60 * 1000, 'dd mmm yyyy')}</Th>

                    </Tr>
                    {arr1.map((item, index) => {
                        return <Tr>
                            <Td>{index} :00 - {index + 1}:00</Td>
                            <Td>{arr1[index]}</Td>
                            <Td>{arr2[index]}</Td>
                            <Td>{arr3[index]}</Td>
                            <Td>{arr4[index]}</Td>
                            <Td>{arr5[index]}</Td>
                        </Tr>
                    })}
            </table>
        </Wrapper>
        </Container >
    );

}

export default Calender;
